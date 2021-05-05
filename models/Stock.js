const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Stock extends Model { }

Stock.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        stock_name: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'stock'
    }
);

module.exports = Stock;
