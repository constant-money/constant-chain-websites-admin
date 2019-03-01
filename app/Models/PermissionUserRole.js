'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PermissionUserRole extends Model {
    static get table() {
        return 'permission_user_roles'
    }
}

module.exports = PermissionUserRole
