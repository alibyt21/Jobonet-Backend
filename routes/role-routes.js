import express from "express";
import RoleController from "../controllers/role-controller.js";

const router = express.Router();

router.get("/roles", RoleController.getAll);
router.post("/roles", RoleController.updateAll);

export default router;
