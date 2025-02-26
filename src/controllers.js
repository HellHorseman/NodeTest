const { Request, Response } = require('express');
const RequestModel = require('../models/request.js');
const { RequestStatus } = require('./enum.js');
const { Op } = require('sequelize');

const createRequest = async (req, res) => {
    const { topic, description } = req.body;

    if (!topic || !description) {
        return res.status(400).json({ message: 'Тема и описание обязательны' });
    }

    try {
        const newRequest = await RequestModel.create({
            topic,
            description,
            status: RequestStatus.NEW,
        });
        res.status(201).json(newRequest);
    } catch (error) {
        console.error('Ошибка при создании обращения:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

const takeRequestInProgress = async (req, res) => {
    const { id } = req.params;

    try {
        const request = await RequestModel.findOne({
            where: { id, status: RequestStatus.NEW },
        });

        if (!request) {
            return res.status(400).json({ message: 'Обращение нельзя взять в работу' });
        }

        request.status = RequestStatus.IN_PROGRESS;
        await request.save();

        res.json({ message: 'Обращение взято в работу' });
    } catch (error) {
        console.error('Ошибка при взятии обращения в работу:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

const getRequests = async (req, res) => {
    const { date, startDate, endDate } = req.query;

    try {
        const where = {};

        if (date) {
            where.created_at = date;
        } else if (startDate && endDate) {
            where.created_at = { [Op.between]: [startDate, endDate] };
        }

        const requests = await RequestModel.findAll({ where });
        res.json(requests);
    } catch (error) {
        console.error('Ошибка при получении обращений:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

const updateStatus = async (req, res) => {
    const { id } = req.params;
    const { status, solution, cancel_reason } = req.body;

    if (!status || !Object.values(RequestStatus).includes(status)) {
        return res.status(400).json({ message: 'Некорректный статус' });
    }

    try {
        const request = await RequestModel.findByPk(id);

        if (!request) {
            return res.status(404).json({ message: 'Обращение не найдено' });
        }

        request.status = status;
        request.solution = solution || null;
        request.cancel_reason = cancel_reason || null;

        await request.save();

        res.json({
            message: 'Статус обновлён',
            data: {
                id: request.id,
                topic: request.topic,
                description: request.description,
                status: request.status,
                solution: request.solution,
                cancel_reason: request.cancel_reason,
                created_at: request.created_at,
                updated_at: request.updated_at
            }
        });
    } catch (error) {
        console.error('Ошибка при обновлении статуса:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

const cancelAllInProgress = async (_req, res) => {
    try {
        await RequestModel.update(
            { status: RequestStatus.CANCELLED, cancel_reason: 'Автоматическая отмена' },
            { where: { status: RequestStatus.IN_PROGRESS } }
        );

        res.json({ message: 'Все обращения в работе отменены' });
    } catch (error) {
        console.error('Ошибка при отмене обращений:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

module.exports = {
    createRequest,
    takeRequestInProgress,
    getRequests,
    updateStatus,
    cancelAllInProgress,
};
