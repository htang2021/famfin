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
        // user_id: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: 'user',
        //         key: 'id'
        //     }
        // },
        stock_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: true,
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
