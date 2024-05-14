import Option from "../models/option.js";

export default class SettingController {
    static async getAll(req, res) {
        try {
            let settings = await Option.findAll({
                where: {
                    userId: req.user.userId,
                },
            });
            settings = settings.map((setting) => setting.dataValues);
            res.json({
                success: true,
                body: settings,
                message: "All settings fetched",
            });
        } catch (e) {
            res.status(500).json({
                success: false,
                body: null,
                message: "An internal error happend",
            });
        }
    }
    static async addSetting(req, res) {
        try {
            const setting = await Option.create({
                userId: req.user.userId,
                key: req.body.key,
                value: req.body.value,
            });

            res.json({
                success: true,
                body: {
                    insertedId: setting.id,
                },
                message: "setting is added successfully",
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
