import express from "express";
import StepController from "../controllers/step-controller.js";

const router = express.Router();

router.get("/steps/:stepId/messages", StepController.getAllMessages);
router.post("/steps", StepController.addStep);

export default router;
