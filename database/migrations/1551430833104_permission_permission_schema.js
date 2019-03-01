'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PermissionSchema extends Schema {
  up () {
    this.create('permission_permissions', (table) => {
      table.increments()
      table.timestamps()
      table.string('method', 10).notNullable()
      table.string('action', 50).notNullable()
    })
  }

  down () {
    this.drop('permissions')
  }
}

module.exports = PermissionSchema
