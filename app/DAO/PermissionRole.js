'use strict'

const PermissionRoleModel = use('App/Models/PermissionRole')

class PermissionRole {
    async first(id) {
        return await PermissionRoleModel.find(id)
    }

    async findAll() {
        let q = PermissionRoleModel
            .query()
            .orderBy('name', 'asc')
        return await q.fetch()
    }
}

module.exports = new PermissionRole()