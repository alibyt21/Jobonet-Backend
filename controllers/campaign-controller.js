import Campaign from "../models/campaign.js";
import Membership from "../models/membership.js";
import Step from "../models/step.js";

export default class CampaignController {
    static async addContactToCampaign(contactId, campaignId) {
        const membership = await Membership.create({
            contactId,
            campaignId,
        });
        return membership.id;
    }

    static async getAllSteps(req, res) {
        let steps = await Step.findAll({
            include: [
                {
                    model: Campaign,
                    where: {
                        id: req.params.campaignId,
                        userId: req.user.userId,
                    },
                },
            ],
        });
        steps = steps.map((step) => step.dataValues);
        res.json({
            success: true,
            body: steps,
            message: "All steps fetched",
        });
    }

    static async getAll(req, res) {
        try {
            let campaigns = await Campaign.findAll({
                where: {
                    userId: req.user.userId,
                },
            });
            campaigns = campaigns.map((campaign) => campaign.dataValues);
            res.json({
                success: true,
                body: campaigns,
                message: "All campaigns fetched",
            });
        } catch (e) {
            res.status(500).json({
                success: false,
                body: null,
                message: "An internal error happend",
            });
        }
    }

    static async addCampaign(req, res) {
        try {
            const campaign = await Campaign.create({
                userId: req.user.userId,
                name: req.body.name,
                type: req.body.type,
                description: req.body.description,
            });

            res.json({
                success: true,
                body: {
                    insertedId: campaign.id,
                },
                message: "campaign is added successfully",
            });
        } catch (e) {
            res.json({
                success: false,
                body: null,
                message: e,
            });
        }
    }
}
