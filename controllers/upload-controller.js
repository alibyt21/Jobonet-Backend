import formidable from "formidable";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url)); // get the name of the directory
const projectRoot = process.cwd(); // or process.env.PWD

export default class UploadController {
    static upload(req, res, next) {
        try {
            const form = formidable({});
            form.parse(req, async (err, fields, files) => {
                if (err) {
                    next(err);
                    return;
                }
                if (!files || !files.file) {
                    next(err);
                    return;
                }
                let oldpath = files?.file[0]?.filepath;
                let newpath = path.join(
                    projectRoot + "/public/img",
                    files?.file[0]?.originalFilename
                );

                await fs.copyFile(oldpath, newpath, function (err) {
                    // if (err) throw err;
                    // return res.status(200).json({
                    //     success: true,
                    //     message: "file uploaded",
                    // });
                });
                await fs.rm(oldpath, function (err) {
                    if (err) throw err;
                    return res.status(200).json({
                        success: true,
                        message: "file uploaded",
                    });
                });

                // res.json({ fields, files });
            });
        } catch (error) {
            res.status(401).json({
                success: false,
                body: null,
                message: error.message,
            });
        }
    }
}
