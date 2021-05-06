const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Fund extends Model { }

Fund.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        stock_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'stock',
                key: 'id'
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'fund'
    }
);

module.exports = Fund;
