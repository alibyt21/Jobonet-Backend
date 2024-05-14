import { DataTypes } from "@sequelize/core";
import sequelize from "../utils/db.js";

const Message = sequelize.define("Message", {
    messageId: {
        type: DataTypes.INTEGER,
    },
    name: {
        type: DataTypes.STRING,
    },
    type: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    order: {
        type: DataTypes.SMALLINT,
    },
    text: {
        type: DataTypes.TEXT,
    },
    pattern: {
        type: DataTypes.STRING,
    },
});

export default Message;
