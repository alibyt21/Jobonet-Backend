import { DataTypes } from "@sequelize/core";
import sequelize from "../utils/db.js";

const User = sequelize.define("User", {
    fullName: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true,
        },
        unique: "unique_email",
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default User;
