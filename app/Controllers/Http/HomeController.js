'use strict'

class HomeController {
    async index({ response, auth, params }) {
        if (auth.user.id !== Number(params.id)) {
            return response.route('AuthController.login')
        }
        return response.route('HomeController.dashboard')
    }

    async dashboard({ response, auth, params }) {
        return 'Darhboard'
    }
}

module.exports = HomeController
