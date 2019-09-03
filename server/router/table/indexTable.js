import Sequelize from 'sequelize';
import instance from '../../config/mysql';

class indexTable extends Sequelize.Model {}

indexTable.init({
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    a: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    b: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    c: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
}, {
    sequelize: instance,
    modelName: 'index',
    timestamps: false
    // indexes: [
    //     {
    //         name: 'idx_key1',
    //         // using: 'BTREE',
    //         fields: ['key1']
    //     },
    //     {
    //         name: 'idx_key3',
    //         // using: 'BTREE',
    //         fields: ['key3']
    //     }
    // ]
});

export default indexTable;
