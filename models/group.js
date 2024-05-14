import { DataTypes } from "@sequelize/core";
import sequelize from "../utils/db.js";
import Contact from "./contact.js";
import Join from "./join.js";

const Group = sequelize.define("Group", {
    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING(4095),
    },
});

Group.belongsToMany(Contact, {
    through: Join,
});
export default Group;
