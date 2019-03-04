'use strict'

const PermissionUserRoleModel = use('App/Models/PermissionUserRole')

class PermissionRole {
    async first(id) {
        console.log(`App/DAO/PermissionUserRole first ${id}`)
        return await PermissionUserRoleModel.find(id)
    }

    async insert(rp) {
        console.log(`App/DAO/PermissionUserRole insert ${JSON.stringify(rp)}`)
        const model = new PermissionUserRoleModel()
        model.fill(rp)
        await model.save()
    }

    async delete(id) {
        console.log(`App/DAO/PermissionUserRole delete ${id}`)
        await PermissionUserRoleModel
            .query()
            .find(id).delete()
    }

    async deleteWhr(whr) {
        console.log(`App/DAO/PermissionUserRole deleteWhr ${JSON.stringify(whr)}`)
        await PermissionUserRoleModel
            .query()
            .where(whr)
            .delete()
    }

    async find({ roleId = 0 }) {
        let q = PermissionUserRoleModel
            .query()
            .where('role_id', roleId)
        return await q.fetch()
    }
}

module.exports = new PermissionRole()