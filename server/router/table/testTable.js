import Sequelize from 'sequelize';
import instance from '../../config/mysql';

class TestTable extends Sequelize.Model {}

TestTable.init({
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    key1: {
        type: Sequelize.STRING(100)
    },
    key2: {
        type: Sequelize.INTEGER,
        unique: 'idx_key2'
    },
    key3: {
        type: Sequelize.STRING(100)
    },
    common_field: {
        type: Sequelize.STRING(100)
    },
    key_part1: {
        type: Sequelize.STRING(100),
        unique: 'idx_key_part'
    },
    key_part2: {
        type: Sequelize.STRING(100),
        unique: 'idx_key_part'
    },
    key_part3: {
        type: Sequelize.STRING(100),
        unique: 'idx_key_part'
    }
}, {
    sequelize: instance,
    modelName: 'test',
    timestamps: false,
    indexes: [
        {
            name: 'idx_key1',
            // using: 'BTREE',
            fields: ['key1']
        },
        {
            name: 'idx_key3',
            // using: 'BTREE',
            fields: ['key3']
        }
    ]
});

export default TestTable;
