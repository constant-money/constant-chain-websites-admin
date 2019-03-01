'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RolePermisionSchema extends Schema {
  up () {
    this.create('permission_role_permissions', (table) => {
      table.increments()
      table.timestamps()
      table.integer('role_id', 10).notNullable()
      table.integer('permission_id', 10).notNullable()
    })
  }

  down () {
    this.drop('role_permisions')
  }
}

module.exports = RolePermisionSchema
