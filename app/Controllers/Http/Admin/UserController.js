'use strict'

const UserService = use('UserService')
const CommonUtils = use('CommonUtils')

class UserController {

    async index({ request, view }) {
        let { email, page, perPage } = request.all()
        if (email == undefined) {
            email = ''
        }
        if (page == undefined || page <= 0) {
            page = 1
        }
        if (perPage == undefined || perPage <= 0) {
            perPage = 10
        }
        const usersQ = await UserService.getUsers(email, page, perPage)
        return view.render('admin/users/index', {
            email: email,
            page: usersQ.pages.page,
            perPage: usersQ.pages.perPage,
            lastPage: usersQ.pages.lastPage,
            users: usersQ.rows,
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
