import Analyse from "../models/analyse.js";

export default class AnalyseController {
    static async addAnalyse(req, res) {
        try {
            let users = req.body.users;
            let jobId = req.body.jobId;
            users.forEach(async (user) => {
                await Analyse.create({
                    userId: user,
                    jobId,
                });
            });
            res.json({
                success: true,
                body: null,
                message: "analyses added successfully",
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
