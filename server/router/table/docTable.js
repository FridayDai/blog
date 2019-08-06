import Sequelize from 'sequelize';
import instance from '../../config/mysql';

class DocTable extends Sequelize.Model {}

DocTable.init({
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING(255)
    },
    desc: {
        type: Sequelize.TEXT
    },
    text: {
        type: Sequelize.TEXT
    },
    deleteFlag: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
}, {
    sequelize: instance,
    modelName: 'doc',
    timestamps: true,
    // 我不想要 createdAt
    createdAt: 'createTime',

    // 我想 updateAt 实际上被称为 updateTimestamp
    updatedAt: 'updateTime',
    indexes: [
        {
            name: 'idx_title',
            // using: 'BTREE',
            fields: ['title']
        }
    ]
});

export default DocTable;
