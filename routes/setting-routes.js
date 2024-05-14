import express from "express";
import SettingController from "../controllers/setting-controller.js";

const router = express.Router();


router.get("/settings", SettingController.getAll);
router.post("/settings", SettingController.addSetting);

export default router;
