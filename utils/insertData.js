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
                permission: `["SUPER_USER_PERMISSIONS"]`,
            },
            {
                role: "organizationAdmin",
                permission: `["createNewUser","editUserPermission","editUser","deleteUser","createNewOrganization","viewOrganizationList","editOrganization","deleteOrganization","createNewJobAnalysis"]`,
            },
            {
                role: "humanResourcesManager",
                permission: `["createNewUser","editUserPermission","editUser","deleteUser","createNewOrganization","viewOrganizationList"]`,
            },
            {
                role: "jobAnalystExpert",
                permission: `["createNewUser","editUserPermission","editUser","deleteUser"]`,
            },
            {
                role: "jobAnalyst",
                permission: `["createNewUser","editUserPermission"]`,
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
            email: "test@gmail.com",
        },
    });
    if (!user) {
        const users = User.bulkCreate([
            {
                fullName: "علی بیات",
                email: "test@gmail.com",
                password:
                    "$2a$10$ZVZwXoIsFmFatOd3Grho7OhB.F9VrDHiHUtXAUPnDOsFsUxSKrNmm",
                roleId: 1,
                organizationId: null,
            },
            {
                fullName: "1علی بیات",
                email: "test1@gmail.com",
                password:
                    "$2a$10$ZVZwXoIsFmFatOd3Grho7OhB.F9VrDHiHUtXAUPnDOsFsUxSKrNmm",
                roleId: 2,
                organizationId: 1,
            },
            {
                fullName: "2علی بیات",
                email: "test2@gmail.com",
                password:
                    "$2a$10$ZVZwXoIsFmFatOd3Grho7OhB.F9VrDHiHUtXAUPnDOsFsUxSKrNmm",
                roleId: 3,
                organizationId: 1,
            },
            {
                fullName: "3علی بیات",
                email: "test3@gmail.com",
                password:
                    "$2a$10$ZVZwXoIsFmFatOd3Grho7OhB.F9VrDHiHUtXAUPnDOsFsUxSKrNmm",
                roleId: 4,
                organizationId: 1,
            },
            {
                fullName: "4علی بیات",
                email: "test4@gmail.com",
                password:
                    "$2a$10$ZVZwXoIsFmFatOd3Grho7OhB.F9VrDHiHUtXAUPnDOsFsUxSKrNmm",
                roleId: 5,
                organizationId: 1,
            },
        ]);
    }
}
