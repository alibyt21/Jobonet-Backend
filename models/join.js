import { DataTypes } from "@sequelize/core";
import sequelize from "../utils/db.js";

// relation between group and contact
const Join = sequelize.define("Join", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
});
export default Join;
