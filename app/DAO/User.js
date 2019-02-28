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
}

module.exports = new User()