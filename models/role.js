import { DataTypes } from "@sequelize/core";
import sequelize from "../utils/db.js";
import User from "./user.js";

const Role = sequelize.define("Role", {
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "unique_role",
    },
    permissions: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

Role.hasMany(User, {
    foreignKey: {
        allowNull: false,
    },
});

export default Role;
