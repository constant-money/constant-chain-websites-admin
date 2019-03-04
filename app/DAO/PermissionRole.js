'use strict'

const PermissionRoleModel = use('App/Models/PermissionRole')

class PermissionRole {
    async first(id) {
        return await PermissionRoleModel.find(id)
    }

    async find({ userId = 0 }) {
        let q = PermissionRoleModel
            .query()
        if (userId > 0) {
            q = q.whereExists(function () {
                this.from('permission_user_roles')
                    .whereRaw('permission_user_roles.role_id = permission_roles.id')
                    .where('permission_user_roles.user_id', userId)
            })
        }
        q = q.orderBy('name', 'asc')
        return await q.fetch()
    }
}

module.exports = new PermissionRole()