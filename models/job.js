import { DataTypes } from "@sequelize/core";
import sequelize from "../utils/db.js";
import Analyse from "./analyse.js";
import User from "./user.js";

const Job = sequelize.define("Job", {
    title: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.TEXT,
    },
    data: {
        type: DataTypes.TEXT("long"),
    },
    orgUnit: {
        type: DataTypes.STRING,
    },
    analyzeStatus: {
        type: DataTypes.STRING,
    },
    approveStatus: {
        type: DataTypes.STRING,
    },
});

Job.belongsToMany(User, {
    through: Analyse,
});

export default Job;
