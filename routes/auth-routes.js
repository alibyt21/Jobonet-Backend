import express from "express";
import AuthController from "../controllers/auth-controller.js";

const router = express.Router();

router.use("/", AuthController.validate);

export default router;
