const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Fund extends Model {}

// Fund Model Definition
Fund.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    member_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "member",
        key: "id",
      },
    },
    stock_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    initial_cost: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: true,
<<<<<<< HEAD
    },
=======
    }
>>>>>>> fdd5d5e455af8282b0e50e6a5c794765870bd051
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "fund",
  }
);

module.exports = Fund;
