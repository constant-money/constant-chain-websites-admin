'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Portalborrow extends Model {
  static get table () {
    return 'portal_borrows'
  }
  static get createdAtColumn () {
    return 'created_at'
  }
  static get updatedAtColumn () {
    return 'updated_at'
  }
  // static formatDates (field, value) {
  //   if (field === 'start_date' || field === 'end_date' || field === 'deleted_at') {
  //     return value.format('YYYY-MM-DD HH:mm:ss')
  //   }
  //   return super.formatDates(field, value)
  // }
  borrowresponses () {
    return this.hasMany('App/Models/Portalborrowresponse','id', 'borrow_id')
  }
}

module.exports = Portalborrow
