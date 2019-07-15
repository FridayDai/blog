import Sequelize from 'sequelize';
import instance from '../../config/mysql';

class UserTable extends Sequelize.Model {}

UserTable.init({
    // attributes
    ip: {
        type: Sequelize.STRING
    },
    name: {
        type: Sequelize.STRING,
        primaryKey: true
        // allowNull defaults to true
    },
    password: {
        type: Sequelize.STRING
    },
    token: {
        type: Sequelize.STRING
    },
    readOnly: {
        type: Sequelize.INTEGER
    }
}, {
    sequelize: instance,
    timestamps: false,
    //
    // I do want createdAt
    createdAt: false,

    // I want updatedAt to actually be called updateTimestamp
    updatedAt: false,

    // And deletedAt to be called destroyTime (remember to enable paranoid for this to work)
    deletedAt: false,
    paranoid: false,
    // table name + s
    modelName: 'user',
    version: false // 乐观锁的时候加上一个version字段
});

export default UserTable;
