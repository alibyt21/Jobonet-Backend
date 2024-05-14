import jwt from "jsonwebtoken";
const { RANDOMSTRING } = process.env;

export default class AuthController {
    static validate(req, res, next) {
        const token = req.header("Authorization");
        if (!token) {
            res.status(401).json({
                success: false,
                body: {},
                message: "Access Denied - login pls",
            });
        }
        try {
            const decoded = jwt.verify(token, RANDOMSTRING);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({
                success: false,
                body: null,
                message: error.message,
            });
        }
    }
}
