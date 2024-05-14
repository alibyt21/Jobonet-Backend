import Message from "../models/message.js";
import Step from "../models/step.js";

export default class StepController {
    static async getAllMessages(req, res) {
        // میتونه تمام مسیج هایی که متعلق به یک کاربر دیگه هم هست رو هم ببینه
        let messages = await Message.findAll({
            include: [
                {
                    model: Step,
                    where: {
                        id: req.params.stepId,
                    },
                },
            ],
        });
        messages = messages.map((message) => message.dataValues);
        res.json({
            success: true,
            body: messages,
            message: "All messages fetched",
        });
    }

    static async addStep(req, res) {
        try {
            const step = await Step.create({
                userId: req.user.userId,
                name: req.body.name,
                type: req.body.type,
                description: req.body.description,
                stepTime: req.body.stepTime,
                campaignId: req.body.campaignId,
            });

            res.json({
                success: true,
                body: {
                    insertedId: step.id,
                },
                message: "step is added successfully",
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
