'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Portalborrowresponse extends Model {
  static get table () {
    return 'portal_borrows_response'
  }
  static get createdAtColumn () {
    return 'created_at'
  }
  static get updatedAtColumn () {
    return 'updated_at'
  }
}

module.exports = Portalborrowresponse
