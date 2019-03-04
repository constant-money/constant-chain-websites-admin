'use strict'

const PermissionRoleDAO = use('App/DAO/PermissionRole')
const PermissionRolePermissionDAO = use('App/DAO/PermissionRolePermission')
const PermissionPermissionDAO = use('App/DAO/PermissionPermission')

class AclController {
    async roleIndex({ view }) {
        const roles = await PermissionRoleDAO.find({})
        return view.render('admin/acl/role_index', {
            roles: roles.rows,
        })
    }

    async roleShow({ request, response, view, params }) {
        const { id = 0 } = params
        if (request.method() == 'POST') {
            const { permissions = {} } = request.all()
            let reqPermissions = []
            Object.keys(permissions).forEach(e => {
                reqPermissions.push(permissions[e])
            })
            // delete permissions
            const rPermissions = (await PermissionPermissionDAO.find({ roleId: id })).rows
            for (let i = 0; i < rPermissions.length; i++) {
                let p = rPermissions[i]
                if (!reqPermissions.includes(p.id.toString())) {
                    await PermissionRolePermissionDAO.deleteWhr({
                        role_id: id,
                        permission_id: p.id,
                    })
                }
            }
            // add new permissions
            for (let i = 0; i < reqPermissions.length; i++) {
                let pid = reqPermissions[i]
                let existed = false
                for (let i = 0; i < rPermissions.length; i++) {
                    let p = rPermissions[i]
                    if (p.id == pid) {
                        existed = true
                    }
                }
                if (!existed) {
                    await PermissionRolePermissionDAO.insert({
                        role_id: id,
                        permission_id: pid,
                    })
                }
            };
            return response.route('admin.acl.roleshow', { id: id })
        }
        const role = await PermissionRoleDAO.first(id)
        if (role == undefined) {
            return response.route('admin.acl.roleindex')
        }
        const permissions = (await PermissionPermissionDAO.find({})).rows
        const rolePermissions = (await PermissionPermissionDAO.find({ roleId: id })).rows
        let roleCheckPermissions = {}
        rolePermissions.forEach(rp => {
            roleCheckPermissions[rp.id] = true
        });
        return view.render('admin/acl/role_form', {
            role: role,
            roleCheckPermissions: roleCheckPermissions,
            permissions: permissions
        })
    }
}

module.exports = AclController
