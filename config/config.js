require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD || null,
        database: process.env.DATABASE_NAME,
        host: process.env.DATABASE_HOST,
        dialect: 'postgres',
    },
    test: {
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        host: process.env.DATABASE_HOST,
        dialect: 'postgres',
    },
    production: {
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        host: process.env.DATABASE_HOST,
        dialect: 'postgres',
    },
};
