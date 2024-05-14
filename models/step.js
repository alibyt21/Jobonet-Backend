import { DataTypes } from "@sequelize/core";
import sequelize from "../utils/db.js";
import Message from "./message.js";
import Execution from "./execution.js";
import Contact from "./contact.js";

const Step = sequelize.define("Step", {
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING(4095),
    },
    order: {
        type: DataTypes.SMALLINT,
    },
    stepTime: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

Step.hasMany(Message, {
    foreignKey: {
        allowNull: false,
    },
});
Step.belongsToMany(Contact, {
    through: Execution,
});
export default Step;
