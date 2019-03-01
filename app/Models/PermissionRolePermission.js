'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PermissionRolePermission extends Model {
    static get table() {
        return 'permission_role_permissions'
    }
}

module.exports = PermissionRolePermission
