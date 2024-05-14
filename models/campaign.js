import { DataTypes } from "@sequelize/core";
import sequelize from "../utils/db.js";
import Step from "./step.js";
import Contact from "./contact.js";
import Membership from "./membership.js";

const Campaign = sequelize.define("Campaign", {
    type: {
        type: DataTypes.STRING(15),
        defaultValue: "camp",
    },
    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING(4095),
    },
});

Campaign.hasMany(Step, {
    foreignKey: {
        allowNull: false,
    },
});

Campaign.belongsToMany(Contact, {
    through: Membership,
});
export default Campaign;
