'use strict'

const Hash = use('Hash')
const ConstantApi = use('ConstantApi')
class AuthController {
    async login({ request, response, session, auth, view }) {
        try {
            await auth.check()
            return response.route('Admin/HomeController.dashboard')
        } catch (error) {
        }
        if (request.method() == 'POST') {
            try {
                const { email, password } = request.all()
                let authCheck = await auth
                    .remember(true)
                    .attempt(email, password)
                if (authCheck) {
                    if (auth.user.is_admin != undefined && auth.user.is_admin == true) {
                        const res = await ConstantApi.login(email, password)
                        if (res.Error != undefined) {
                            throw new Error(res.Error.Message);
                        }
                        if (res.Result != undefined && res.Result.Token != '') {
                            session.put('TOKEN', res.Result.Token)
                        } else {
                            throw new Error('token is invalid');
                        }
                        const PermissionModel = use('App/Models/PermissionPermission')
                        let allPer = await PermissionModel.query()
                            .whereExists(function () {
                                this.from('permission_role_permissions')
                                    .whereRaw('`permission_permissions`.`id` = `permission_role_permissions`.`permission_id`')
                                    .whereExists(function () {
                                        this.from('permission_user_roles')
                                            .whereRaw('`permission_user_roles`.`id` = `permission_role_permissions`.`role_id`')
                                            .whereExists(function () {
                                                this.from('users')
                                                    .whereRaw('`users`.`id` = `permission_user_roles`.`user_id`')
                                            })
                                    })
                            })
                            .fetch()
                        let permissions = []
                        allPer.rows.forEach(per => {
                            permissions.push(`${per.method}_${per.action}`)
                        });
                        session.put('PERMISSIONS', permissions)
                        return response.route('admin.home.index')
                    } else {
                        await auth.logout()
                    }
                }
            } catch (err) {
                try {
                    await auth.check()
                    await auth.logout()
                } catch (error) {
                }
                return view.render('admin/auth/login', {
                    errMessage: 'Cannot verify user password',
                })
            }
        }
        return view.render('admin/auth/login')
    }
    async logout({ response, session, auth }) {
        try {
            await auth.check()
            await auth.logout()
        } catch (error) {
        }
        session.put('PERMISSIONS', [])
        return response.route('Admin/AuthController.login')
    }
}

module.exports = AuthController
