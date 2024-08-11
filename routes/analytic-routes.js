import express from "express";
import AnalyticController from "../controllers/analytic-controller.js";

const router = express.Router();

router.get("/analytics", AnalyticController.getAll);

export default router;
