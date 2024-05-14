import { DataTypes } from "@sequelize/core";
import sequelize from "../utils/db.js";
import Campaign from "./campaign.js";
import Contact from "./contact.js";
import Group from "./group.js";
import Option from "./option.js";

const User = sequelize.define("User", {
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    subscription: {
        type: DataTypes.STRING,
    },
    type: {
        type: DataTypes.STRING(15),
        defaultValue: "member",
    },
    expireDate: {
        type: DataTypes.DATEONLY,
    },
});

User.hasMany(Campaign, {
    foreignKey: {
        allowNull: false,
    },
});
User.hasMany(Contact, {
    foreignKey: {
        unique: [
            "unique_userId_email",
            "unique_userId_phone",
            "unique_userId_username",
        ],
    },
});
User.hasMany(Group, {
    foreignKey: {
        allowNull: false,
    },
});
User.hasMany(Option, {
    foreignKey: {
        allowNull: false,
    },
});
export default User;
