import express from "express";
import OrganizationController from "../controllers/organization-controller.js";

const router = express.Router();

router.get("/organizations", OrganizationController.getAll);
router.get("/organizations/:organizationId/users", OrganizationController.getUsers);
router.get("/organizations/:organizationId", OrganizationController.getById);
router.post("/organizations", OrganizationController.addOrganization);
router.post(
    "/organizations/:organizationId",
    OrganizationController.editOrganization
);

export default router;
