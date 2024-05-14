import { DataTypes } from "@sequelize/core";
import sequelize from "../utils/db.js";
import User from "./user.js";
import Job from "./job.js";

const Organization = sequelize.define("Organization", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    logo: {
        type: DataTypes.STRING,
    },
});

Organization.hasMany(User);

Organization.hasMany(Job, {
    foreignKey: {
        allowNull: false,
    },
});

export default Organization;
