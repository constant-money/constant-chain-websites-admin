'use strict'

const UserDAO = use('UserDAO')

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
        const usersQ = await UserDAO.find(
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
    async show({ response, view, params }) {
        const { id = 0 } = params
        const user = await UserDAO.first(id)
        if (user == undefined) {
            return response.route('admin.user.index')
        }
        return view.render('admin/users/form', {
            id: id,
            user: user,
        })
    }
}

module.exports = UserController
