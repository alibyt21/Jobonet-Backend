import express from "express";
import "dotenv/config";
import sequelize from "./utils/db.js";
import contactRoutes from "./routes/contact-routes.js";
import groupRoutes from "./routes/group-routes.js";
import campaignRoutes from "./routes/campaign-routes.js";
import stepRoutes from "./routes/step-routes.js";
import messageRoutes from "./routes/message-routes.js";
import settingRoutes from "./routes/setting-routes.js";
import authRoutes from "./routes/auth-routes.js";
import userRoutes from "./routes/user-routes.js";
import insertData from "./utils/insertData.js";
import cors from "cors";
import ContactController from "./controllers/contact-controller.js";
import SendSMS from "./services/send-sms.js";
const { APP_PORT, API_BASE_URL } = process.env;

const app = express();

// setting essential headers for REST API
app.use(cors());

// using for parsing post request sended by forms
app.use(express.urlencoded({ extended: false }));
// using for parsing request sended with json format
app.use(express.json());

// api routes
// public routes
app.use(API_BASE_URL, userRoutes);
app.get(`${API_BASE_URL}/add-contact`, ContactController.addContact);
// protected routes
app.use(API_BASE_URL, authRoutes);
app.use(API_BASE_URL, contactRoutes);
app.use(API_BASE_URL, groupRoutes);
app.use(API_BASE_URL, campaignRoutes);
app.use(API_BASE_URL, stepRoutes);
app.use(API_BASE_URL, messageRoutes);
app.use(API_BASE_URL, settingRoutes);

// prevent from generating Cannot GET / ...
app.use("/", (req, res) => {
    res.status(404).json({
        message: "404",
    });
});

setTimeout(() => {
    // SendSMS.send_normal();
    // SendSMS.send_pattern("qncer227zn");
}, 1000);

// sync sequelize tables
await sequelize.sync();
insertData();
// running server
app.listen(APP_PORT, () => {
    console.log(`Server is running on http://localhost:${APP_PORT}`);
});
