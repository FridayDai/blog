import Sequelize from 'sequelize';
import instance from '../../config/mysql';
import { createLogger } from '../../config/log4j';
import { axiosGet } from '../../util/axios';

const logger = createLogger('Test_Dao');
class User extends Sequelize.Model {}

User.init({
    // attributes
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
        // allowNull defaults to true
    }
}, {
    sequelize: instance,
    // timestamps: true,
    //
    // I do want createdAt
    createdAt: 'createTime',

    // I want updatedAt to actually be called updateTimestamp
    updatedAt: 'updateTime',

    // And deletedAt to be called destroyTime (remember to enable paranoid for this to work)
    deletedAt: 'destroyTime',
    paranoid: true,
    // table name + s
    modelName: 'users',
    version: true // 乐观锁的时候加上一个version字段
});

export const createTable = () => {
    User.sync().then(() => logger.info(`create user table success`)).catch(xhr => logger.error(xhr));
};
export const dropTable = () => {
    User.drop().then(() => logger.info(`drop user table success`)).catch(xhr => logger.error(xhr));
};

export const insertUser = (id, name) => {
    return User.create({ id, name }).then(res => res);
};

export const batchInsertUser = (obj) => {
    return User.bulkCreate(obj).then(res => res).catch(xhr => logger.error(xhr));
};

export const findAll = () => {
    return User.findAll().then(res => res);
};

export const findUser = () => {
    return User.findAll({
        where: {
            name: {
                [Op.like]: '%test'
            }
        }
    }).then(res => res).catch(xhr => logger.error(xhr));
};

export const findUserAndCountAll = () => {
    return User.findAndCountAll({
        attributes: ['id', 'name', 'createTime', 'updateTime'],
        offset: 1
    }).then(res => res).catch(xhr => logger.error(xhr));
};

export const updateUserById = (id, name) => {
    return User.update({ 'name': name }, {
        where: {
            id: id
        }
    }).then(res => res).catch(xhr => logger.error(xhr));
};

export const deleteUserById = (id) => {
    return User.destroy({
        where: {
            id
        }
    }).then(res => res).catch(xhr => logger.error(xhr));
};

export const restore = (id) => {
    return User.restore({
        where: {
            id: id
        }
    }).then(res => res).catch(xhr => logger.error(xhr));
};

export const testAxios = (url, data) => {
    return axiosGet(url);
};
