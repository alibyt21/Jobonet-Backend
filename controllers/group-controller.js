import Contact from "../models/contact.js";
import Group from "../models/group.js";
import Join from "../models/join.js";

export default class GroupController {
    static async addContactToGroup(contactId, groupId) {
        const join = await Join.create({
            contactId,
            groupId,
        });
        return join.id;
    }
    static async getAll(req, res) {
        try {
            let groups = await Group.findAll({
                where: {
                    userId: req.user.userId,
                },
            });
            groups = groups.map((group) => group.dataValues);
            res.json({
                success: true,
                body: groups,
                message: "All groups fetched",
            });
        } catch (e) {
            res.status(500).json({
                success: false,
                body: null,
                message: "An internal error happend",
            });
        }
    }

    static async getAllContacts(req, res) {
        let contacts = await Contact.findAll({
            where: {
                userId: req.user.userId,
            },
            include: [
                {
                    model: Group,
                    where: {
                        id: req.params.groupId,
                    },
                    through: { attributes: [] }, // This line is optional and removes the join table attributes from the result
                },
            ],
        });
        contacts = contacts.map((contact) => contact.dataValues);
        res.json({
            success: true,
            body: contacts,
            message: "All contacts fetched",
        });
    }

    static async addGroup(req, res) {
        try {
            const group = await Group.create({
                userId: req.user.userId,
                name: req.body.name,
                description: req.body.description,
            });

            res.json({
                success: true,
                body: {
                    insertedId: group.id,
                },
                message: "group is added successfully",
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
