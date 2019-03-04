'use strict'

const PermissionRoleDAO = use('App/DAO/PermissionRole')
const PermissionRolePermissionDAO = use('App/DAO/PermissionRolePermission')
const PermissionPermissionDAO = use('App/DAO/PermissionPermission')

class AclController {
    async roleIndex({ view }) {
        const roles = await PermissionRoleDAO.findAll()
        return view.render('admin/acl/role_index', {
            roles: roles.rows,
        })
    }

    async roleShow({ request, response, view, params }) {
        const { id = 0 } = params
        if (request.method() == 'POST') {
            const { permissions = {} } = request.all()
            // delete permissions
            const rPermissions = (await PermissionPermissionDAO.find({ roleId: id })).rows
            for (let i = 0; i < rPermissions.length; i++) {
                let p = rPermissions[i]
                if (permissions[p.id] == undefined) {
                    await PermissionRolePermissionDAO.deleteWhr({
                        role_id: id,
                        permission_id: p.id,
                    })
                }
            }
            // add new permissions
            let addPermissions = []
            const pKeys = Object.keys(permissions)
            for (let i = 0; i < pKeys.length; i++) {
                let pid = pKeys[i]
                let existed = false
                for (let i = 0; i < rPermissions.length; i++) {
                    let p = rPermissions[i]
                    if (p.id == pid) {
                        existed = true
                    }
                }
                if (!existed) {
                    addPermissions.push(pid)
                    await PermissionRolePermissionDAO.insert({
                        role_id: id,
                        permission_id: pid,
                    })
                }
            };
            return response.route('admin.acl.roleshow', { id: id })
        }
        const role = await PermissionRoleDAO.first(id)
        const permissions = await PermissionPermissionDAO.find({})
        const rolePermissions = await PermissionPermissionDAO.find({ roleId: id })
        let roleCheckPermissions = {}
        rolePermissions.rows.forEach(rp => {
            roleCheckPermissions[rp.id] = true
        });
        return view.render('admin/acl/role_form', {
            role: role,
            roleCheckPermissions: roleCheckPermissions,
            permissions: permissions.rows
        })
    }
}

module.exports = AclController
