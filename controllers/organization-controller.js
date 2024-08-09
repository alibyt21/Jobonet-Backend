import Job from "../models/job.js";
import Organization from "../models/organization.js";
import User from "../models/user.js";

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

    static async getUsers(req, res) {
        try {
            let users = await User.findAll({
                where: {
                    organizationId: req.params.organizationId,
                },
            });
            users = users.map((user) => user.dataValues);
            res.json({
                success: true,
                body: users,
                message: "All users fetched",
            });
        } catch (e) {
            res.status(500).json({
                success: false,
                body: null,
                message: "An internal error happend",
            });
        }
    }

    static async getJobs(req, res) {
        try {
            let jobs = await Job.findAll({
                where: {
                    organizationId: req.params.organizationId,
                },
            });
            jobs = jobs.map((job) => job.dataValues);
            res.json({
                success: true,
                body: jobs,
                message: "All jobs fetched",
            });
        } catch (e) {
            res.status(500).json({
                success: false,
                body: null,
                message: "An internal error happend",
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

    static async deleteById(req, res) {
        let result = await Organization.destroy({
            where: {
                id: req.params?.organizationId,
            },
        });
        res.json({
            success: true,
            body: null,
            message: "organization is deleted successfully",
        });
    }
}
