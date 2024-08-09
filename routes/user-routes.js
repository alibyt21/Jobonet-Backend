import express from "express";
import UserController from "../controllers/user-controller.js";

const router = express.Router();

router.get("/users", UserController.getAll);
router.get("/user", UserController.getUser);
router.get("/users/white-list", UserController.whiteList);
router.post("/change-password", UserController.changePassword);
router.post("/users/", UserController.editUser);
router.delete("/users/:userId", UserController.deleteById);

export default router;
