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
                        return response.route('Admin/HomeController.index')
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
    async logout({ response, auth }) {
        try {
            await auth.check()
            await auth.logout()
        } catch (error) {
        }
        return response.route('Admin/AuthController.login')
    }
}

module.exports = AuthController
