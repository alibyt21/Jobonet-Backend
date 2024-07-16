import express from "express";
import AnalyseController from "../controllers/analyse-controller.js";

const router = express.Router();

router.post("/analyses", AnalyseController.addAnalyse);

export default router;
