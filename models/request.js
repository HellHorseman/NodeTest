const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/index.js');
const { RequestStatus } = require('../src/enum.js');

class Request extends Model {}

Request.init(
    {
        topic: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: RequestStatus.NEW,
            validate: {
                isIn: [[...Object.values(RequestStatus)]],
            },
        },
        solution: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        cancel_reason: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: 'request',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

module.exports = Request;
