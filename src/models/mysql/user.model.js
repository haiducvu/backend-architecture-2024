"use strict";

import sequelize from "../../dbs/sequelize";

const { DataTypes, Model } = require("sequelize");

const User = sequelize.define(
  "User",
  {
    usr_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    usr_slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usr_name: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    usr_password: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    usr_salf: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    usr_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usr_phone: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    usr_sex: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    usr_avatar: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    usr_date_of_birth: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    usr_status: {
      type: DataTypes.ENUM("pending", "active", "block"),
      defaultValue: "pending",
    },
  },
  {
    tableName: "Users",
    timestamps: true,
    underscored: true,
  }
);

// const Role = sequelize.define("Role", {
//   // Define fields for the Role model
// });

// User.belongsTo(Role, { foreignKey: "usr_role_id" });

module.exports = User;
