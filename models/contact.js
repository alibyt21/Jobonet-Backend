import { DataTypes } from "@sequelize/core";
import sequelize from "../utils/db.js";

const Contact = sequelize.define("Contact", {
    firstName: {
        type: DataTypes.STRING,
    },
    lastName: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true,
        },
        unique: "unique_userId_email",
    },
    username: {
        type: DataTypes.STRING,
        unique: "unique_userId_username",
    },
    phone: {
        type: DataTypes.STRING,
        unique: "unique_userId_phone",
    },
    extra: {
        type: DataTypes.STRING,
    },
    joinDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    leaveDate: {
        type: DataTypes.DATE,
    },
});

export default Contact;
