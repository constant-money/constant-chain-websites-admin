'use strict'

class HomeController {
    async index({ view }) {
        return view.render('admin.index')
    }
}

module.exports = HomeController
