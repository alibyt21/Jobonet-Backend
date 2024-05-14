import express from "express";
import MessageController from "../controllers/message-controller.js";

const router = express.Router();

// router.get("/messages/:messageId/messages", TODO);
router.post("/messages", MessageController.addMessage);

export default router;
