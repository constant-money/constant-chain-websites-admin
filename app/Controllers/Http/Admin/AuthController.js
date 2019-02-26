'use strict'

const Hash = use('Hash')
class AuthController {
    async login({ request, response, auth, view }) {
        if (auth.user != null) {
            return response.route('Admin/HomeController.dashboard')
        }
        if (request.method() == 'POST') {
            try {
                const { email, password } = request.all()
                let authCheck = await auth.attempt(email, password)
                if (authCheck) {
                    return response.route('Admin/HomeController.dashboard')
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
        if (auth.user != null) {
            await auth.logout()
        }
        return response.route('Admin/AuthController.login')
    }
}

module.exports = AuthController
