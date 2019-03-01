'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RoleSchema extends Schema {
  up () {
    this.create('permission_roles', (table) => {
      table.increments()
      table.timestamps()
      table.string('name', 50).notNullable().unique()
    })
  }

  down () {
    this.drop('roles')
  }
}

module.exports = RoleSchema
