import { createLogger } from '../../config/log4j';
import Op from 'sequelize/lib/operators';
import DocTable from '../table/docTable';

const logger = createLogger('Doc_Dao');

export const getDocList = () => {
    return DocTable.findAndCountAll({
        where: {
            deleteFlag: {
                [Op.eq]: 0
            }
        }
    }).then(res => res).catch(xhr => logger.error(xhr));
};

// pageNo 从第一页开始
export const getDocListPage = (pageNo, pageSize) => {
    if(pageNo <= 0 || pageNo > Number.MAX_VALUE) {
        pageNo = 1;
    }
    const offset = (pageNo - 1) * pageSize;

    return DocTable.findAndCountAll({
        where: {
            deleteFlag: {
                [Op.eq]: 0
            }
        },
        offset: parseInt(offset),
        limit: parseInt(pageSize)
    }).then(res => res).catch(xhr => logger.error(xhr));
};

export const getDocTitle = () => {
    return DocTable.findAll({
        attributes: ['id', 'title'],
        where: {
            deleteFlag: {
                [Op.eq]: 0
            }
        }
    }).then(res => res).catch(xhr => logger.error(xhr));
};

export const getDocById = (id) => {
    return DocTable.findOne({
        attributes: ['id', 'title', 'desc', 'text'],
        where: {
            id: {
                [Op.eq]: id
            },
            deleteFlag: {
                [Op.eq]: 0
            }
        }
    }).then(res => res).catch(xhr => logger.error(xhr));
};

export const getDocListByKeyword = (keyword) => {
    return DocTable.findAll({
        attributes: ['id', 'title'],
        where: {
            deleteFlag: {
                [Op.eq]: 0
            },
            [Op.or]: [
                {
                    text: { [Op.like]: `%${keyword}%` }
                },
                {
                    title: { [Op.like]: `%${keyword}%` }
                }
            ]
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
