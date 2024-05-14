import Execution from "../models/execution";

export default class ExecutionController {
    static async getAll(req, res) {
        try {
            let executions = await Execution.findAll({
                where: {
                    userId: req.user.userId,
                },
            });
            executions = executions.map((execution) => execution.dataValues);
            res.json({
                success: true,
                body: executions,
                message: "All executions fetched",
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