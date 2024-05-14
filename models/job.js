import { DataTypes } from "@sequelize/core";
import sequelize from "../utils/db.js";

const Job = sequelize.define("Job", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
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

export default Job;
