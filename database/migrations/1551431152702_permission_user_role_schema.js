'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserRoleSchema extends Schema {
  up () {
    this.create('permission_user_roles', (table) => {
      table.increments()
      table.timestamps()
      table.integer('user_id', 10).notNullable()
      table.integer('role_id', 10).notNullable()
    })
  }

  down () {
    this.drop('user_roles')
  }
}

module.exports = UserRoleSchema
