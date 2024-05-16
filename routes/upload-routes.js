import express from "express";
import UploadController from "../controllers/upload-controller.js";

const router = express.Router();

router.post("/upload", UploadController.upload);

export default router;
