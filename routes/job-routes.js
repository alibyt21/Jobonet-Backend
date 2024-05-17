import express from "express";
import JobController from "../controllers/job-controller.js";

const router = express.Router();

router.post("/jobs", JobController.addJob);
router.get("/jobs", JobController.getAll);

export default router;
