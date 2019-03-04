'use strict'

const PermissionRolePermissionModel = use('App/Models/PermissionRolePermission')

class PermissionRole {
    async first(id) {
        console.log(`App/DAO/PermissionRolePermission first ${id}`)
        return await PermissionRolePermissionModel.find(id)
    }

    async insert(rp) {
        console.log(`App/DAO/PermissionRolePermission insert ${JSON.stringify(rp)}`)
        const model = new PermissionRolePermissionModel()
        model.fill(rp)
        await model.save()
    }

    async delete(id) {
        console.log(`App/DAO/PermissionRolePermission delete ${id}`)
        await PermissionRolePermissionModel
            .query()
            .find(id).delete()
    }

    async deleteWhr(whr) {
        console.log(`App/DAO/PermissionRolePermission deleteWhr ${JSON.stringify(whr)}`)
        await PermissionRolePermissionModel
            .query()
            .where(whr)
            .delete()
    }

    async find({ roleId = 0 }) {
        let q = PermissionRolePermissionModel
            .query()
            .where('role_id', roleId)
        return await q.fetch()
    }
}

module.exports = new PermissionRole()