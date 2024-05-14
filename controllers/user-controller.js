import bcrypt from "bcryptjs";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
const { RANDOMSTRING } = process.env;

// import User from '../models/user';
export default class UserController {
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            console.log(email);
            const user = await User.findOne({
                where: {
                    email,
                },
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
            const { email, password } = req.body;
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
                email,
                password: hashedPassword,
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
}
