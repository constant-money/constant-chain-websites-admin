'use strict'

class Logger {
  async handle({ request, auth }, next, ...agrs) {
    try {
      await auth.check()
      const parameters = JSON.stringify(request.all())
      console.log(`user ${auth.user.email} || ${request.method()} || ${agrs[0][0]} || ${parameters}`)
    } catch (e) {
    }
    await next()
  }
}

module.exports = Logger
