'use strict'

// const UserDAO = use('UserDAO')

class Permission {
    async handle({ request, response, auth, session, view }, next, ...agrs) {
        // try {
        //   await auth.check()
        //   const parameters = JSON.stringify(request.all())
        //   console.log(`user ${auth.user.email} || ${request.method()} || ${agrs[0][0]} || ${parameters}`)
        // } catch (e) {
        // }
        // TODO check user permission for this request
        // users , roles (name), permissions (method, function), role_permissions (role_id, permission_id), user_roles (user_id, role_id)
        if (agrs[0][0] == 'admin.auth.login' || agrs[0][0] == 'admin.auth.logout') {
            await next()
            return
        }
        let authorized = false
        try {
            await auth.check()
            authorized = true
        } catch (e) {
        }
        const permissions = session.get('PERMISSIONS')
        if (authorized) {
            // if (! await UserDAO.permission(auth.user.id, request.method().toUpperCase(), agrs[0][0])) {
            //     throw new Error('Sorry, your access is refused due to security reasons of our server and also our sensitive data. Please go back to the previous page to continue browsing.');
            // }
            if (permissions == null || permissions == undefined) {
                return response.route('admin.auth.logout')
            }
            if (!permissions.includes(`${request.method()}_${agrs[0][0]}`)) {
                throw new Error('Sorry, your access is refused due to security reasons of our server and also our sensitive data. Please go back to the previous page to continue browsing.');
            }
        }
        if (view && typeof (view.share) === 'function') {
            view.share({
                permissions: permissions
            })
        }
        await next()
    }
}

module.exports = Permission
