import { Sequelize } from "@sequelize/core";
import "dotenv/config";

const { DB_HOST, DB_PASS, DB_USER, DB_NAME, DB_PORT } = process.env;
const sequelize = new Sequelize({
    host: DB_HOST,
    dialect: "mysql",
    database: DB_NAME,
    username: DB_USER,
    password: DB_PASS,
    logging: false,
    port: DB_PORT,
});

try {
    await sequelize.authenticate();
    console.log("connected");
} catch (e) {
    console.log(e.message);
    // process.exit();
}

export default sequelize;
