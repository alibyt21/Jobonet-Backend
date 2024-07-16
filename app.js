import express from "express";
import "dotenv/config";
import sequelize from "./utils/db.js";
import authRoutes from "./routes/auth-routes.js";
import uploadRoutes from "./routes/upload-routes.js";
import userRoutes from "./routes/user-routes.js";
import organizationRoutes from "./routes/organization-routes.js";
import roleRoutes from "./routes/role-routes.js";
import analyseRoutes from "./routes/analyse-routes.js";
import jobRoutes from "./routes/job-routes.js";
import insertData from "./utils/insertData.js";
import cors from "cors";
import AuthController from "./controllers/auth-controller.js";
const { APP_PORT, API_BASE_URL } = process.env;

const app = express();

// serve static files
app.use(API_BASE_URL, express.static("public"));

// setting essential headers for REST API
app.use(cors());

// using for parsing post request sended by forms
app.use(express.urlencoded({ extended: false }));
// using for parsing request sended with json format
app.use(express.json());

// api routes
// public routes
app.use(API_BASE_URL, authRoutes);
app.use(API_BASE_URL, uploadRoutes);
// protected routes
app.use("/", AuthController.validate);
app.use(API_BASE_URL, userRoutes);
app.use(API_BASE_URL, organizationRoutes);
app.use(API_BASE_URL, roleRoutes);
app.use(API_BASE_URL, jobRoutes);
app.use(API_BASE_URL, analyseRoutes);

// prevent from generating Cannot GET / ...
app.use("/", (req, res) => {
    res.status(404).json({
        message: "404",
    });
});

// sync sequelize tables
await sequelize.sync();
insertData();
// running server
app.listen(APP_PORT, () => {
    console.log(`Server is running on http://localhost:${APP_PORT}`);
});
