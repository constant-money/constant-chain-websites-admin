'use strict'

class HomeController {
    async index({ auth, params }) {
        //
        if (auth.user.id !== Number(params.id)) {
            return 'You cannot see someone else\'s profile'
          }
          return auth.user
    }
}

module.exports = HomeController
