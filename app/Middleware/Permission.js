'use strict'

const PermissionModel = use('App/Models/PermissionPermission')
const UserModel = use('App/Models/User')

class Permission {
    async handle({ request, auth }, next, ...agrs) {
        // try {
        //   await auth.check()
        //   const parameters = JSON.stringify(request.all())
        //   console.log(`user ${auth.user.email} || ${request.method()} || ${agrs[0][0]} || ${parameters}`)
        // } catch (e) {
        // }
        // TODO check user permission for this request
        // users , roles (name), permissions (method, function), role_permissions (role_id, permission_id), user_roles (user_id, role_id)
        let authorized = false
        try {
            await auth.check()
            authorized = true
        } catch (e) {
        }
        if (authorized) {
            let p = await PermissionModel
                .query()
                .where('method', request.method())
                .where('action', agrs[0][0])
                .first()
            let user = await UserModel
                .query()
                .whereNull('deleted_at')
                .whereExists(function () {
                    this.from('permission_user_roles')
                        .whereRaw('`users`.`id` = `permission_user_roles`.`user_id`')
                        .whereExists(function () {
                            this.from('permission_role_permissions')
                                .whereRaw('`permission_user_roles`.`id` = `permission_role_permissions`.`role_id`')
                                .where('permission_id', p.id)
                        })
                })
                .where('id', auth.user.id)
                .first()
            if (user == null || user == undefined) {
                throw new Error('Accessed is denied');
            }
        }
        await next()
    }
}

module.exports = Permission
