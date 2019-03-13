'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserKycs extends Model {
    static get table() {
        return 'user_kycs'
    }
    user() {
        return this.belongsTo('App/Models/User', 'user_id', 'id')
    }
}

module.exports = UserKycs
