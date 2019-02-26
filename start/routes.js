'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route
  .get('/', 'HomeController.index')
  .middleware('auth')

// Users routes

Route.get("users", (params) => {
  console.log("testing route", Object.keys(params));
  return { users: ["user 1", "user 2"] };
}).formats(['json'])

// Auth routes
Route
  .get('/auth/login', 'AuthController.login')
  .middleware('guest')