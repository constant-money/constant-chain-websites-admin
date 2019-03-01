'use strict'

class Permission {
  async handle({ request, auth }, next, ...agrs) {
    // try {
    //   await auth.check()
    //   const parameters = JSON.stringify(request.all())
    //   console.log(`user ${auth.user.email} || ${request.method()} || ${agrs[0][0]} || ${parameters}`)
    // } catch (e) {
    // }
    // TODO check user permission for this request
    await next()
  }
}

module.exports = Permission
