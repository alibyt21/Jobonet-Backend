import Job from "../models/job.js";
import Organization from "../models/organization.js";

export default class JobController {
    static async addJob(req, res) {
        try {
            const job = await Job.create({
                title: req.body.title,
                description: req.body.description,
                data: req.body.data,
                orgUnit: req.body.orgUnit,
                analyzeStatus: req.body.analyzeStatus,
                approveStatus: req.body.approveStatus,
                organizationId: req.body.organizationId,
            });

            res.json({
                success: true,
                body: {
                    insertedId: job.id,
                },
                message: "job is added successfully",
            });
        } catch (e) {
            res.json({
                success: false,
                body: null,
                message: e,
            });
        }
    }

    static async getAll(req, res) {
        try {
            let jobs = await Job.findAll({
                include: {
                    model: Organization,
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
}
