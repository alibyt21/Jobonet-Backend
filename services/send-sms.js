import axios from "axios";
const { SMS_USER, SMS_PASS, SMS_FROM } = process.env;

export default class SendSMS {
    static async send_normal() {
        try {
            const response = await axios.post("http://ippanel.com/api/select", {
                op: "send",
                uname: SMS_USER,
                pass: SMS_PASS,
                message: "salam",
                from: SMS_FROM,
                to: ["9356126747"],
            });
            // Check the response and see error or success message
            console.log(response.data);
        } catch (error) {
            console.log("whatever you want");
        }
    }
    static async send_pattern(patternCode) {
        try {
            const response = await axios.post("http://ippanel.com/api/select", {
                op: "pattern",
                user: SMS_USER,
                pass: SMS_PASS,
                fromNum: SMS_FROM,
                toNum: "9356126747",
                patternCode: patternCode,
                inputData: [{ "verification-code": 3000 }],
            });
            // Check the response and see error or success message
            console.log(response.data);
        } catch (error) {
            console.log("whatever you want");
        }
    }
}
