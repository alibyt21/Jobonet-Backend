import express from "express";
import OrganizationController from "../controllers/organization-controller.js";

const router = express.Router();

router.get("/organizations", OrganizationController.getAll);
router.post("/organizations", OrganizationController.addOrganization);

export default router;
