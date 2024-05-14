import Message from "../models/message.js";

export default class MessageController {
    static async addMessage(req, res) {
        try {
            const message = await Message.create({
                messageId: req.body.messageId,
                name: req.body.name,
                type: req.body.type,
                order: req.body.order,
                text: req.body.text,
                pattern: req.body.pattern,
                stepId: req.body.stepId,
            });

            res.json({
                success: true,
                body: {
                    insertedId: message.id,
                },
                message: "message is added successfully",
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
