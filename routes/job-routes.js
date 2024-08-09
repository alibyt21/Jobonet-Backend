import express from "express";
import JobController from "../controllers/job-controller.js";

const router = express.Router();

router.post("/jobs", JobController.addJob);
router.get("/jobs", JobController.getAll);
router.get("/jobs/:jobId", JobController.getById);
router.post("/jobs/:jobId", JobController.updateById);
router.delete("/jobs/:jobId", JobController.deleteById);

export default router;
