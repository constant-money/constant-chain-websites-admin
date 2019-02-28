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
Route.post('admin/portalborrow/find', 'Admin/PortalborrowController.find')
Route.get('admin/portalborrow/find', ({ response }) => {
  response.redirect("/admin/portalborrow");
})
Route.resource('admin/portalborrow', 'Admin/PortalborrowController')
// Route.group(() => {
//   Route.get('/', 'Admin/PortalborrowController.index').as('portalborrow.index')
//   Route.get('/:id', 'Admin/PortalborrowController.show').as('portalborrow.show')
//   Route.get('/:id/edit', 'Admin/PortalborrowController.edit').as('portalborrow.edit')
//   Route.post('/', 'Admin/PortalborrowController.store')
//   Route.put('/:id', 'Admin/PortalborrowController.update')
//   Route.delete('/:id', 'Admin/PortalborrowController.destroy')
// }).prefix('admin/portalborrow')

// ADMIN PORTAL BORROW RESPONSE
Route.group(() => {
  Route.get('/', 'Admin/PortalborrowresponseController.index').as('portalborrowresponse.index')
  Route.post('/find', 'Admin/PortalborrowresponseController.find')
  Route.get('/find', ({ response }) => {
    response.redirect("/admin/portalborrowresponse");
  })
  Route.get('/:id', 'Admin/PortalborrowresponseController.show').as('portalborrowresponse.show')

}).prefix('admin/portalborrowresponse')

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
    .get('/:id', 'Admin/UserController.show')
})
  .middleware('auth')
  .prefix('admin/users')

Route.group(() => {
  Route
    .get('/', 'Admin/CandidateController.index')
  Route
    .get('/:id', 'Admin/CandidateController.show')
  Route
    .get('/:id/voters', 'Admin/CandidateController.voters')
})
  .middleware('auth')
  .prefix('admin/candidate')

Route.group(() => {
  Route
    .get('/dcb', 'Admin/ProposalController.dcbIndex')
  Route
    .get('/dcb/:id', 'Admin/ProposalController.dcbShow')
  Route
    .get('/gov', 'Admin/ProposalController.govIndex')
  Route
    .get('/gov/:id', 'Admin/ProposalController.govShow')
  Route
    .get('/dcb/:id/voters', 'Admin/ProposalController.dcbVoterIndex')
  Route
    .get('/dcb/:parentId/voters/:id', 'Admin/ProposalController.dcbVoterShow')
  Route
    .get('/gov/:id/voters', 'Admin/ProposalController.govVoterIndex')
  Route
    .get('/gov/:parentId/voters/:id', 'Admin/ProposalController.govVoterShow')
})
  .middleware('auth')
  .prefix('admin/proposal')


