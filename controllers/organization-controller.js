import Organization from "../models/organization.js";

export default class OrganizationController {
    static async getAll(req, res) {
        try {
            let organizations = await Organization.findAll();
            organizations = organizations.map(
                (organization) => organization.dataValues
            );
            res.json({
                success: true,
                body: organizations,
                message: "All organizations fetched",
            });
        } catch (e) {
            res.status(500).json({
                success: false,
                body: null,
                message: "An internal error happend",
            });
        }
    }

    static async addOrganization(req, res) {
        try {
            const organization = await Organization.create({
                name: req.body.name,
                logo: req.body.logo,
            });

            res.json({
                success: true,
                body: {
                    insertedId: organization.id,
                },
                message: "organization is added successfully",
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
