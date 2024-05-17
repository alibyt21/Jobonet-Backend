import Organization from "../models/organization.js";
import Role from "../models/role.js";
import User from "../models/user.js";

export default async function insertData() {
    const role = await Role.findOne({
        where: {
            role: "superAdmin",
        },
    });
    if (!role) {
        const roles = Role.bulkCreate([
            {
                role: "superAdmin",
                permissions: `["SUPER_USER_PERMISSIONS"]`,
            },
            {
                role: "organizationAdmin",
                permissions: `["createNewUser","editUserPermission","editUser","deleteUser","createNewOrganization","viewOrganizationList","editOrganization","deleteOrganization","createNewJobAnalysis"]`,
            },
            {
                role: "humanResourcesManager",
                permissions: `["createNewUser","editUserPermission","editUser","deleteUser","createNewOrganization","viewOrganizationList"]`,
            },
            {
                role: "jobAnalystExpert",
                permissions: `["createNewUser","editUserPermission","editUser","deleteUser"]`,
            },
            {
                role: "jobAnalyst",
                permissions: `["createNewUser","editUserPermission"]`,
            },
        ]);
    }
    const org = await Organization.findOne({
        where: {
            id: 1,
        },
    });
    if (!org) {
        const orgs = Organization.bulkCreate([
            {
                name: "سازمان امور مالیاتی کشور",
                logo: "som.png",
            },
        ]);
    }
    const user = await User.findOne({
        where: {
            email: "alibyt21@gmail.com",
        },
    });
    if (!user) {
        const users = User.bulkCreate([
            {
                fullName: "علی بیات",
                email: "alibyt21@gmail.com",
                password:
                    "$2a$10$ZVZwXoIsFmFatOd3Grho7OhB.F9VrDHiHUtXAUPnDOsFsUxSKrNmm",
                roleId: 1,
                organizationId: null,
            },
        ]);
    }
}
