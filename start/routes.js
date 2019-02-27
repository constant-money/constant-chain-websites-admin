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
// ROOT ROUTES
Route.get('/', ({ response }) => {
  response.redirect('admin')
})

// ADMIN PANEL ROUTES
Route.get("admin/", ({ view }) => {
  return view.render('admin.index')
})

// ADMIN PORTAL BORROW
Route.resource('admin/portalborrow', 'Admin/PortalborrowController')
// Route.group(() => {
//   Route.get('/', 'Admin/PortalborrowController.index').as('portalborrow.index')
//   Route.get('/:id', 'Admin/PortalborrowController.show').as('portalborrow.show')
//   Route.get('/:id/edit', 'Admin/PortalborrowController.edit').as('portalborrow.edit')
//   Route.post('/find', 'Admin/PortalborrowController.find')
//   Route.post('/', 'Admin/PortalborrowController.store')
//   Route.put('/:id', 'Admin/PortalborrowController.update')
//   Route.delete('/:id', 'Admin/PortalborrowController.destroy')
// }).prefix('admin/portalborrow')

// Home routes
Route
  .get('/admin/index', 'Admin/HomeController.index')
  .middleware('auth')

Route
  .get('/admin/dashboard', 'Admin/HomeController.dashboard')
  .middleware('auth')



// Auth routes
Route.group(() => {
  Route
    .any('login', 'Admin/AuthController.login')

  Route
    .any('logout', 'Admin/AuthController.logout')
}).prefix('admin/auth')

// User routes
Route.group(() => {
  Route
    .get('/', 'Admin/UserController.index')
  Route
    .get('/:id', 'Admin/UserController.detail')
})
  .middleware('auth')
  .prefix('admin/users')

Route.group(() => {
  Route
    .get('/', 'Admin/VotingBoardCandidateController.index')
  Route
    .get('/:id', 'Admin/VotingBoardCandidateController.detail')
})
  .middleware('auth')
  .prefix('admin/votingboardcandidate')


