'use strict'

const { Command } = require('@adonisjs/ace')

class Permission extends Command {
  static get signature() {
    return 'permission'
  }

  static get description() {
    return 'Tell something helpful about this command'
  }

  async handle(args, options) {
    // this.info('Dummy implementation for permission command')
    const Permission = use('App/Models/PermissionPermission')
    const Role = use('App/Models/PermissionRole')
    const RolePermission = use('App/Models/PermissionRolePermission')
    let role = await Role
      .query()
      .where('name', 'admin')
      .first()
    if (role == undefined || role == null) {
      console.log('add admin role')
      role = new Role()
      role.name = 'admin'
      role.save()
    }
    use('Route').list().forEach(r => {
      if (typeof (r.handler) == typeof ('')) {
        r.verbs.forEach(async (method) => {
          if (method != 'HEAD') {
            let p = await Permission
              .query()
              .where('method', method.toUpperCase())
              .where('action', r.name)
              .first()
            if (p == undefined || p == null) {
              console.log(`add permission ${method} ${r.name}`)
              p = new Permission()
              p.method = method.toUpperCase()
              p.action = r.name
              await p.save()
            }
            let rp = await RolePermission
              .query()
              .where('role_id', role.id)
              .where('permission_id', p.id)
              .first()
            if (rp == undefined || rp == null) {
              console.log(`add role admin permission ${method} ${r.name}`)
              rp = new RolePermission()
              rp.role_id = role.id
              rp.permission_id = p.id
              await rp.save()
            }
          }
        })
      }
    });
  }
}

module.exports = Permission
