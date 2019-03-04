'use strict'

const PermissionPermissionModel = use('App/Models/PermissionPermission')

class PermissionRole {
    async first(id) {
        return await PermissionPermissionModel
            .query()
            .where('id', id).first()
    }

    async find({ roleId = 0 }) {
        let q = PermissionPermissionModel
            .query()
        if (roleId > 0) {
            q = q.whereExists(function () {
                this.from('permission_role_permissions')
                    .whereRaw('permission_permissions.id = permission_role_permissions.permission_id')
                    .where('permission_role_permissions.role_id', roleId)
            })
        }
        q = q.orderBy('action', 'asc')
            .orderBy('method', 'asc')
        return await q.fetch()
    }
}

module.exports = new PermissionRole()