'use strict'

const UserModel = use('UserModel')

class User {
    async getById(id) {
        return await UserModel
            .query()
            .whereNull('deleted_at')
            .where('id', id).first()
    }

    async getUsers(email, page, perPage) {
        let q = UserModel
            .query()
            .whereNull('deleted_at')
        if (email != null && email != '') {
            q.where('email', 'like', '%' + email + '%')
        }
        return await q.paginate(page, perPage)
    }
}

module.exports = new User()