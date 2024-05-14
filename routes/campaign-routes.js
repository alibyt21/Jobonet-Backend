import express from "express";
import CampaignController from "../controllers/campaign-controller.js";

const router = express.Router();

router.get("/campaigns", CampaignController.getAll);
router.get("/campaigns/:campaignId/steps", CampaignController.getAllSteps);
router.post("/campaigns", CampaignController.addCampaign);
router.post("/campaigns", CampaignController.addCampaign);

export default router;
