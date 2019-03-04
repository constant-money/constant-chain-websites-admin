'use strict'

const ms = require('ms')
const Config = use('Config')
const Redis = use('Redis')
const Hash = use('Hash')
const ConstantApi = use('ConstantApi')
const PermissionModel = use('App/Models/PermissionPermission')

class AuthController {
    async login({ request, response, session, auth, view }) {
        try {
            await auth.check()
            return response.route('admin.home.index')
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

                        // const age = Config.get('session.age', '2 hrs')
                        // const ttl = (typeof (age) === 'number' ? age : ms(age)) / 1000 // in seconds
                        // Redis.setex(`${auth.user.id}_PERMISSIONS`, ttl, JSON.stringify(permissions))

                        return response.route('admin.home.index')
                    } else {
                        await auth.logout()
                    }
                }
            } catch (err) {
                console.log(err)
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
            console.log(error)
        }
        session.put('PERMISSIONS', null)
        return response.route('admin.auth.login')
    }
}

module.exports = AuthController
