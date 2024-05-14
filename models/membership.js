import { DataTypes } from "@sequelize/core";
import sequelize from "../utils/db.js";

// relation between campaign and contact
const Membership = sequelize.define("Membership", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
});
export default Membership;
