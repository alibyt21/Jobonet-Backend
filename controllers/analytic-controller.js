import Analyse from "../models/analyse.js";
import Job from "../models/job.js";
import Organization from "../models/organization.js";
import User from "../models/user.js";

export default class AnalyticController {
    static async getAll(req, res) {
        try {
            const organizationCount = await Organization.count();
            const userCount = await User.count();
            const jobCount = await Job.count();
            res.json({
                success: true,
                body: {
                    userCount,
                    organizationCount,
                    jobCount,
                },
                message: "all analytics fetched",
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
