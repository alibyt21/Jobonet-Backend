import { DataTypes } from "@sequelize/core";
import sequelize from "../utils/db.js";


const Execution = sequelize.define(
    "Execution",
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        executionTime: {
            type: DataTypes.DATE,
        },
        status: {
            type: DataTypes.BOOLEAN,
        },
        result: {
            type: DataTypes.STRING,
        }
    },
);

export default Execution;
