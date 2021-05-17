const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
// const Test = sequelize.define("test", {
//   // attributes
//   name: {
//     type: DataType.STRING,
//     allowNull: false,
//   },
//   createdAt: {
//     type: DataType.DATE,
//     //note here this is the guy that you are looking for
//     get() {
//       return moment(this.getDataValue("createdAt")).format(
//         "DD/MM/YYYY h:mm:ss"
//       );
//     },
//   },
// });

class Member extends Model {}

Member.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      len: [1],
    },
    last_name: {
      type: DataTypes.STRING,
      len: [1],
    },
    relationship: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_user: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "member",
  }
);

module.exports = Member;
