'use strict'

class AuthController {
    async login({ view }) {
        return view.render('auth/login')
    }
    async logout({ view }) {
        
        return view.render('auth/login')
    }
}

module.exports = AuthController
