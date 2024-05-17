import Role from "../models/role.js";

export default class RoleController {
    static async getAll(req, res) {
        try {
            let roles = await Role.findAll();
            roles = roles.map((role) => role.dataValues);
            res.json({
                success: true,
                body: roles,
                message: "All roles fetched",
            });
        } catch (e) {
            res.status(500).json({
                success: false,
                body: null,
                message: "An internal error happend",
            });
        }
    }

    static async updateAll(req, res) {
        try {
            for (let index = 0; index < req.body.length; index++) {
                await Role.update(
                    {
                        permissions: JSON.stringify(
                            req.body[index].permissions
                        ),
                    },
                    {
                        where: {
                            role: req.body[index].role,
                        },
                    }
                );
            }
            res.json({
                success: true,
                body: null,
                message: "all roles are edited successfully",
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
