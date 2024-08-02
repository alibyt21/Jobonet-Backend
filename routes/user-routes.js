import express from "express";
import UserController from "../controllers/user-controller.js";

const router = express.Router();

router.get("/users", UserController.getAll);
router.get("/user", UserController.getUser);
router.post("/change-password", UserController.changePassword);


export default router;
