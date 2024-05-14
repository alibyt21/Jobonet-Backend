import Contact from "../models/contact.js";
import { Op, sql } from "@sequelize/core";
import GroupController from "./group-controller.js";
import CampaignController from "./campaign-controller.js";

export default class ContactController {
    static async getAll(req, res) {
        try {
            let contacts = await Contact.findAll({
                where: {
                    userId: req.user.userId,
                },
            });
            contacts = contacts.map((contact) => contact.dataValues);
            res.json({
                success: true,
                body: contacts,
                message: "All contacts fetched",
            });
        } catch (e) {
            res.status(500).json({
                success: false,
                body: null,
                message: "An internal error happend",
            });
        }
    }

    static async addContact(req, res) {
        let userId = req.user?.userId || req.query?.userId;
        let firstName = req.body?.firstName || req.query?.firstName;
        let lastName = req.body?.lastName || req.query?.lastName;
        let email = req.body?.email || req.query?.email;
        let username = req.body?.username || req.query?.username;
        let phone = req.body?.phone || req.query?.phone;
        let extra = req.body?.extra;
        // only works in get request
        let campaignId = req.query?.campaignId;
        let groupId = req.query?.groupId;

        try {
            const contact = await Contact.create({
                userId,
                firstName,
                lastName,
                email,
                username,
                phone,
                extra,
            });

            if (groupId) {
                GroupController.addContactToGroup(contact.id, groupId);
            }

            if(campaignId) {
                CampaignController.addContactToCampaign(contact.id,campaignId);
            }

            res.json({
                success: true,
                body: {
                    insertedId: contact.id,
                },
                message: "contact is added successfully",
            });
        } catch (e) {
            res.json({
                success: false,
                body: null,
                message: e?.name,
            });
        }
    }
}
