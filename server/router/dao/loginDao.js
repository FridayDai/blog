import { createLogger } from '../../config/log4j';
import Op from 'sequelize/lib/operators';
import UserTable from '../table/userTable';

const logger = createLogger('Login_Dao');

export const findAll = () => {
    return UserTable.findAll().then(res => res);
};

export const findUser = (name, password) => {
    return UserTable.findOne({
        attributes: ['name', 'password', 'token', 'readOnly'],
        where: {
            name: {
                [Op.eq]: name
            },
            password: {
                [Op.eq]: password
            }
        }
    }).then(res => res).catch(xhr => logger.error(xhr));
};

// export const findUserAndCountAll = () => {
//     return User.findAndCountAll({
//         attributes: ['id', 'name', 'createTime', 'updateTime'],
//         offset: 1
//     }).then(res => res).catch(xhr => logger.error(xhr));
// };

// export const updateUserById = (id, name) => {
//     return User.update({ 'name': name }, {
//         where: {
//             id: id
//         }
//     }).then(res => res).catch(xhr => logger.error(xhr));
// };
//
// export const deleteUserById = (id) => {
//     return User.destroy({
//         where: {
//             id
//         }
//     }).then(res => res).catch(xhr => logger.error(xhr));
// };
//
// export const restore = (id) => {
//     return User.restore({
//         where: {
//             id: id
//         }
//     }).then(res => res).catch(xhr => logger.error(xhr));
// };
