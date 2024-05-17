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

    static async getById(req, res) {
        try {
            let organization = await Organization.findAll({
                where: {
                    id: req.params?.organizationId,
                },
            });
            organization = organization[0];
            res.json({
                success: true,
                body: organization,
                message: "organization fetched",
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

    static async editOrganization(req, res) {
        try {
            const organization = await Organization.findByPk(
                req.params?.organizationId
            );
            await organization.update({
                name: req.body?.name,
                logo: req.body?.logo,
            });

            res.json({
                success: true,
                body: null,
                message: "organization is edited successfully",
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
