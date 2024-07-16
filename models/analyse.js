import { DataTypes } from "@sequelize/core";
import sequelize from "../utils/db.js";

// relation between job and user
const Analyse = sequelize.define("Analyse", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
});
export default Analyse;
