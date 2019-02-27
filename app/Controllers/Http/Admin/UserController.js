'use strict'

const UserService = use('UserService')

class UserController {
    /**
     * Show a list of users.
     * GET /users
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({ request, view }) {
        const { email = '', page = 1, perPage = 20 } = request.all()
        const usersQ = await UserService.getUsers(
            { email: email, page: page, perPage: perPage }
        )
        return view.render('admin/users/index', {
            email: email,
            page: usersQ.pages.page,
            perPage: usersQ.pages.perPage,
            lastPage: usersQ.pages.lastPage,
            users: usersQ.rows,
        })
    }
    /**
     * Show a detail of user
     * GET /users/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async detail({ response, view, params }) {
        const { id = 0 } = params
        const user = await UserService.getById(id)
        if (user == undefined) {
            return response.route('Admin/UserController.index')
        }
        return view.render('admin/users/detail', {
            user: user,
        })
    }
}

module.exports = UserController
