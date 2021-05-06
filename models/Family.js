const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Family extends Model {}

Family.init(
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
    member_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'members',
            key: 'id'
        }
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'family'
  }
);

module.exports = Family;
