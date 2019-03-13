'use strict'

const UserDAO = use('UserDAO')
const PermissionRoleDAO = use('App/DAO/PermissionRole')
const PermissionUserRoleDAO = use('App/DAO/PermissionUserRole')
const UserKycsModel = use('App/Models/UserKycs')
const ConstantApi = use('ConstantApi')

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
    async show({ request, response, session, auth, view, params }) {
        const { id = 0 } = params
        const user = await UserDAO.first(id)
        if (user == undefined) {
            return response.route('admin.user.index')
        }
        const userRoles = (await PermissionRoleDAO.find({ userId: id })).rows
        if (request.method() == 'POST') {
            if (UserDAO.permission(auth.user.id, 'POST', 'admin.user.roleindex')) {
                const { roles = [] } = request.all()
                let reqRoles = []
                Object.keys(roles).forEach(e => {
                    reqRoles.push(roles[e])
                })
                // delete roles
                for (let i = 0; i < userRoles.length; i++) {
                    let userRole = userRoles[i]
                    if (!roles.includes(userRole.id.toString())) {
                        await PermissionUserRoleDAO.deleteWhr({
                            role_id: userRole.id,
                            user_id: id,
                        })
                    }
                }
                // add new roles
                for (let i = 0; i < reqRoles.length; i++) {
                    let rId = reqRoles[i]
                    if (rId > 0) {
                        let existed = false
                        for (let i = 0; i < userRoles.length; i++) {
                            let ur = userRoles[i]
                            if (ur.id == rId) {
                                existed = true
                            }
                        }
                        if (!existed) {
                            await PermissionUserRoleDAO.insert({
                                role_id: rId,
                                user_id: id,
                            })
                        }
                    }
                };
            }
            const { role = 0 } = request.all()
            user.role = role
            await user.save()
            session.flash({ success: 'Update User successful!' })
            return response.route('admin.user.show', { id: id })
        }
        const allRoles = (await PermissionRoleDAO.find({})).rows
        let checkRoles = {}
        userRoles.forEach(r => {
            checkRoles[r.id] = true
        });
        const userKycs = await UserKycsModel.query().whereNull('deleted_at').where('user_id', user.id).first()
        return view.render('admin/users/form', {
            id: id,
            user: user,
            allRoles: allRoles,
            checkRoles: checkRoles,
            userKycs: userKycs,
        })
    }

    async roleindex({ response }) {
        response.json({
            status: 1,
            message: 'OK',
        })
    }

    async kyc({ request, response, session, params }) {
        const { id = 0 } = params
        const { approved, rejected } = request.all()
        if (approved) {
            try {
                const res = await ConstantApi.kyc(session.get('TOKEN'), id)
                if (res.Error != undefined) {
                    session.flash({ error: `Approve KYC failed "${res.Error.Message}"` })
                } else {
                    session.flash({ success: 'Approve KYC successful' })
                }
            } catch (e) {
                session.flash({ error: `Approve KYC failed "${e}"` })
            }
        }
        if (rejected) {
            session.flash({ success: 'Reject KYC successful' })
        }
        return response.route('admin.user.show', { id: id })
    }
}

module.exports = UserController
