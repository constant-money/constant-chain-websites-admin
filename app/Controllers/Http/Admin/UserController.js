'use strict'

const UserService = use('UserService')
const CommonUtils = use('CommonUtils')

class UserController {
    _getTotalPage(total, limit) {
        if (total % limit == 0) {
            return total / limit
        } else {
            return Math.floor(total / limit) + 1
        }
        return 0
    }

    async index({ request, view }) {
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
        const users = await UserService.getUsers(email, page, limit)
        const countUsers = (await UserService.getCountUsers(email, page, limit))[0]['count(*)']
        return view.render('admin/users/index', {
            email: email,
            page: page,
            limit: limit,
            totalPage: CommonUtils.getTotalPage(countUsers, limit),
            users: users,
        })
    }

    async detail({ request, response, view, params }) {
        const user = await UserService.getUser(params.id)
        if (user == undefined) {
            return response.route('Admin/UserController.index')
        }
        return view.render('admin/users/detail', {
            user: user,
        })
    }
}

module.exports = UserController
