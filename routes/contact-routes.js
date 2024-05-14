import express from "express";
import ContactController from "../controllers/contact-controller.js";

const router = express.Router();

router.get("/contacts", ContactController.getAll);

router.post("/contacts", ContactController.addContact);
export default router;
