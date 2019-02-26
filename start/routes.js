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
// Root routes
Route.get('/', ({response}) => {
  response.redirect('admin')
})

// Admin panel routes
Route.group(() => {
  Route.get('/', 'Admin/PortalborrowController.index')
  Route.get('/:id', 'Admin/PortalborrowController.show')
  Route.get('/:id/edit', 'Admin/PortalborrowController.edit')
  Route.post('/find', 'Admin/PortalborrowController.find')
  Route.post('/', 'Admin/PortalborrowController.store')
  Route.put('/:id', 'Admin/PortalborrowController.update')
  Route.delete('/:id', 'Admin/PortalborrowController.destroy')
}).prefix('admin/portalborrow')

// Home routes
Route
  .get('/admin/index', 'Admin/HomeController.index')
  .middleware('auth')

Route
  .get('/admin/dashboard', 'Admin/HomeController.dashboard')
  .middleware('auth')

// Auth routes
Route
  .any('/admin/auth/login', 'Admin/AuthController.login')

Route
  .any('/admin/auth/logout', 'Admin/AuthController.logout')

Route.get("admin/", ({view}) => {
  return view.render('admin.index')
})
