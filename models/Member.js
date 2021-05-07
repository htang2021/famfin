const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Member extends Model { }

Member.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING,
            len: [1]
        },
        last_name: {
            type: DataTypes.STRING,
            len: [1]
        },
        relationship: {
            type: DataTypes.STRING,
            allowNull: true
        },
        isUser: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'member'
    }
);

module.exports = Member;
