import { DataTypes } from "@sequelize/core";
import sequelize from "../utils/db.js";

const Option = sequelize.define("Option", {
    key: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    value: {
        type: DataTypes.STRING(1023),
        allowNull: false,
    },
});

export default Option;
