import bcrypt from "bcryptjs";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import Role from "../models/role.js";
import Organization from "../models/organization.js";
const { RANDOMSTRING } = process.env;

// import User from '../models/user';
export default class UserController {
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({
                where: {
                    email,
                },
                include: [
                    {
                        model: Role,
                    },
                ],
            });

            if (!user) {
                return res.status(400).json({
                    success: false,
                    body: null,
                    message: "Invalid Credentials",
                });
            }
            const isPasswordMatch = await bcrypt.compare(
                password,
                user.toJSON().password
            );
            if (!isPasswordMatch) {
                return res.status(400).json({
                    success: false,
                    body: null,
                    message: "Invalid Credentials",
                });
            }
            const token = jwt.sign({ userId: user.id }, RANDOMSTRING, {
                expiresIn: "1h",
            });
            return res.status(200).json({
                success: true,
                body: {
                    token,
                    permission: user.toJSON().role.permission,
                },
                message: "logined",
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                body: null,
                message: error.message,
            });
        }
    }
    static async register(req, res) {
        try {
            const { fullName, email, password, roleId, organizationId } =
                req.body;
            let user = await User.findOne({
                where: {
                    email,
                },
            });
            if (user) {
                return res.status(400).json({
                    success: false,
                    body: null,
                    message: "user exists",
                });
            }
            let hashedPassword = await bcrypt.hash(password, 10);
            user = await User.create({
                fullName,
                email,
                password: hashedPassword,
                roleId,
                organizationId,
            });
            res.status(201).json({
                success: true,
                body: {
                    insertedId: user.id,
                },
                message: "new user has been created",
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                body: null,
                message: error.message,
            });
        }
    }
    static async getPermission(req, res) {
        const token = req.header("Authorization");
        if (!token) {
            return res.status(400).json({
                success: false,
                body: null,
                message: "Invalid Credentials",
            });
        }
        try {
            const decoded = jwt.verify(token, RANDOMSTRING);
            const user = await User.findOne({
                where: {
                    id: decoded.userId,
                },
                include: [
                    {
                        model: Role,
                    },
                ],
            });
            if (!user) {
                return res.status(400).json({
                    success: false,
                    body: null,
                    message: "Invalid Credentials",
                });
            }
            return res.status(200).json({
                success: true,
                body: {
                    permission: user.toJSON().role.permission,
                },
                message: "successful",
            });
        } catch (error) {
            res.status(401).json({
                success: false,
                body: null,
                message: error.message,
            });
        }
    }
    static async getAll(req, res) {
        try {
            let users = await User.findAll({
                include: [
                    {
                        model: Organization,
                    },
                ],
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
}
