'use strict'

const Hash = use('Hash')
class AuthController {
    async login({ request, response, auth, view }) {
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
                        return response.route('Admin/HomeController.dashboard')
                    } else {
                        await auth.logout()
                    }
                }
            } catch (err) {
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
