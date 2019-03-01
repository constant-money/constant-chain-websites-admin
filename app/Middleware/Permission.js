'use strict'

const UserDAO = use('UserDAO')

class Permission {
    async handle({ request, auth, session, view }, next, ...agrs) {
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
            if (! await UserDAO.permission(auth.user.id, request.method().toUpperCase(), agrs[0][0])) {
                throw new Error('Sorry, your access is refused due to security reasons of our server and also our sensitive data. Please go back to the previous page to continue browsing.');
            }
        }
        if (view && typeof (view.share) === 'function') {
            const permissions = session.get('PERMISSIONS')
            view.share({
                permissions: permissions
            })
        }
        await next()
    }
}

module.exports = Permission
