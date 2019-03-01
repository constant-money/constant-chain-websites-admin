'use strict'

const UserModel = use('UserModel')

class User {
    async first(id) {
        return await UserModel
            .query()
            .whereNull('deleted_at')
            .where('id', id).first()
    }

    async find({ email, page, perPage }) {
        let q = UserModel
            .query()
            .whereNull('deleted_at')
        if (email != null && email != '') {
            q.where('email', 'like', '%' + email + '%')
        }
        return await q.paginate(page, perPage)
    }

    async permission(id, method, action) {
        let user = await UserModel.query()
            .whereNull('deleted_at')
            .whereExists(function () {
                this.from('permission_user_roles')
                    .whereRaw('`users`.`id` = `permission_user_roles`.`user_id`')
                    .whereExists(function () {
                        this.from('permission_role_permissions')
                            .whereRaw('`permission_user_roles`.`id` = `permission_role_permissions`.`role_id`')
                            .whereExists(function () {
                                this.from('permission_permissions')
                                    .whereRaw('`permission_permissions`.`id` = `permission_role_permissions`.`permission_id`')
                                    .where('method', method)
                                    .where('action', action)
                            })
                    })
            })
            .where('id', id)
            .first()
        if (user == null || user == undefined) {
            return false
        }
        return true
    }
}

module.exports = new User()