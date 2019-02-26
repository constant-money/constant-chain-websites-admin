'use strict'

const Hash = use('Hash')
class AuthController {
    async login({ request, response, auth, view }) {
        if (auth.user != null) {
            return response.route('HomeController.dashboard')
        }
        if (request.method() == 'POST') {
            try {
                const { email, password } = request.all()
                let authCheck = await auth.attempt(email, password)
                if (authCheck) {
                    return response.route('HomeController.dashboard')
                }
            } catch (err) {
                console.log(err)
                return err
            }
        }
        return view.render('auth/login')
    }
    async logout({ auth, view }) {
        await auth.logout()
        return view.render('auth/login')
    }
}

module.exports = AuthController
