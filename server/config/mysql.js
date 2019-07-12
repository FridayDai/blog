import Sequelize from 'sequelize';
import mysql2 from 'mysql2';

const instance = new Sequelize('koa', 'root', 'root', {
    host: '106.15.93.13',
    dialect: 'mysql',
    dialectModule: mysql2,
    define: {
        // The `timestamps` field specify whether or not the `createdAt` and `updatedAt` fields will be created.
        timestamps: true,
        freezeTableName: true
    },
    pool: {
        max: 20, // 最大连接数
        min: 1, // 最小连接数
        idle: 30000 // 30秒释放
    }
});

instance
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

export default instance;
