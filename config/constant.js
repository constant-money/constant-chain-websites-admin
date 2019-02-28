
/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env')

module.exports = {
    constantApiUrl: Env.get('CONSTANT_API_URL', 'http://localhost:8888')
}