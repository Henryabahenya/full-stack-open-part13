const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

class ReadingList extends Model {}

ReadingList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "blogs",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "reading_list",
  },
);

module.exports = ReadingList;
