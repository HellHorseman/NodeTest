const express = require('express');
const { router } = require('./routes.js');

const app = express();

app.use(express.json());

app.use('/api', router);

app.use((err, req, res, next) => {
    console.error('Ошибка сервера:', err);
    res.status(500).send('Что-то пошло не так');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер работает на порту ${PORT}`);
});
