'use strict'

const Database = use('Database')

class UserController {
    _getTotalPage(total, limit) {
        if (total % limit == 0) {
            return total / limit
        } else {
            return Math.floor(total / limit) + 1
        }
        return 0
    }
    async _getUsers(email, page, limit) {
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

    async _getCountUsers(email) {
        let q = Database
            .table('users')
        if (email != null && email != '') {
            q = q
                .where('email', 'like', '%' + email + '%')
        }
        return await q
            .count()
    }

    async index({ request, response, auth, view, params }) {
        let { email, page, limit } = request.all()
        if (email == undefined) {
            email = ''
        }
        if (page == undefined || page <= 0) {
            page = 1
        }
        if (limit == undefined || limit <= 0) {
            limit = 10
        }
        const users = await this._getUsers(email, page, limit)
        const countUsers = (await this._getCountUsers(email, page, limit))[0]['count(*)']
        console.log(countUsers)
        return view.render('admin/users/index', {
            email: email,
            page: page,
            limit: limit,
            totalPage: this._getTotalPage(countUsers, limit),
            users: users,
        })
    }
}

module.exports = UserController
