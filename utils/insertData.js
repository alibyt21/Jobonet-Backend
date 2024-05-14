import User from "../models/user.js";

export default function insertData() {
    const users = User.bulkCreate([
        // {
        //     email: "alibyt21@gmail.com",
        //     password: "1234",
        //     subscription: "unlimited",
        //     type: "administrator",
        // },
    ]);
}
