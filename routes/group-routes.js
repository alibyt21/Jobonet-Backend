import express from "express";
import GroupController from "../controllers/group-controller.js";

const router = express.Router();

router.get("/groups", GroupController.getAll);
router.get("/groups/:groupId/contacts", GroupController.getAllContacts);

router.post("/groups", GroupController.addGroup);


export default router;
