'use strict'

const Database = use('Database')

class UserService {
    async getUser(id) {
        return await Database
            .table('users')
            .where('id', id)
            .first()
    }

    async getUsers(email, page, limit) {
        let q = Database
            .table('users')
        if (email != null && email != '') {
            q = q
                .where('email', 'like', '%' + email + '%')
        }
        if (page != undefined && limit != undefined) {
            q = q
                .offset((page - 1) * limit)
                .limit(limit)
        }
        return await q
            .select('*')
    }

    async getCountUsers(email) {
        let q = Database
            .table('users')
        if (email != null && email != '') {
            q = q
                .where('email', 'like', '%' + email + '%')
        }
        return await q
            .count()
    }
}

module.exports = new UserService()