import { createLogger } from '../../config/log4j';
import instance from '../../config/mysql';
// import { axiosGet } from '../../util/axios';
import TestTable from '../table/testTable';

const logger = createLogger('Test_Dao');

export const createTable = () => {
    TestTable.sync().then(() => logger.info(`create user table success`)).catch(xhr => logger.error(xhr));
};
export const dropTable = () => {
    TestTable.drop().then(() => logger.info(`drop user table success`)).catch(xhr => logger.error(xhr));
};

const random = (min, max) => Math.floor(Math.random() * (max-min+1) + min);

export const randomInsert = () => {
    const str = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3'];

    const values = [];
    for(let i = 0; i < 10000; i++) {
        const key1 = str[random(0,str.length - 1)];
        const key2 = i + 10000;
        const key3 = str[random(0,str.length - 1)];
        const common_field = str[random(0,str.length - 1)];
        const key_part1 = str[random(0,str.length - 1)] + str[random(0,str.length - 1)] + str[random(0,str.length - 1)];
        const key_part2 = str[random(0,str.length - 1)] + str[random(0,str.length - 1)] + str[random(0,str.length - 1)];
        const key_part3 = str[random(0,str.length - 1)] + str[random(0,str.length - 1)] + str[random(0,str.length - 1)];

        values.push({
            key1,
            key2,
            key3,
            common_field,
            key_part1,
            key_part2,
            key_part3
        });
    }

    return instance.transaction(t => {
        return TestTable.bulkCreate(values, {transaction: t});
    }).then(res => res).catch(xhr => logger.error(xhr));
};

// export const insertUser = (id, name) => {
//     return TestTable.create({ id, name }).then(res => res);
// };
//
// export const batchInsertUser = (obj) => {
//     return TestTable.bulkCreate(obj).then(res => res).catch(xhr => logger.error(xhr));
// };
//
// export const findAll = () => {
//     return TestTable.findAll().then(res => res);
// };
//
// export const findUser = () => {
//     return TestTable.findAll({
//         where: {
//             name: {
//                 [Op.like]: '%test'
//             }
//         }
//     }).then(res => res).catch(xhr => logger.error(xhr));
// };
//
// export const findUserAndCountAll = () => {
//     return TestTable.findAndCountAll({
//         attributes: ['id', 'name', 'createTime', 'updateTime'],
//         offset: 1
//     }).then(res => res).catch(xhr => logger.error(xhr));
// };
//
// export const updateUserById = (id, name) => {
//     return TestTable.update({ 'name': name }, {
//         where: {
//             id: id
//         }
//     }).then(res => res).catch(xhr => logger.error(xhr));
// };
//
// export const deleteUserById = (id) => {
//     return TestTable.destroy({
//         where: {
//             id
//         }
//     }).then(res => res).catch(xhr => logger.error(xhr));
// };
//
// export const restore = (id) => {
//     return TestTable.restore({
//         where: {
//             id: id
//         }
//     }).then(res => res).catch(xhr => logger.error(xhr));
// };
//
// export const testAxios = (url, data) => {
//     return axiosGet(url);
// };
