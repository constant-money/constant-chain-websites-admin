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
  return response.redirect('admin')
})

// ADMIN PANEL ROUTES
Route.get('admin/', 'Admin/HomeController.index').middleware('auth')

// ADMIN PORTAL BORROW
Route.post('admin/portalborrow/find', 'Admin/PortalborrowController.find')
Route.get('admin/portalborrow/find', ({ response }) => {
  return response.redirect('/admin/portalborrow')
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
  Route.get('/', 'Admin/PortalborrowresponseController.index')
  Route.post('/find', 'Admin/PortalborrowresponseController.find')
  Route.get('/find', ({ response }) => {
    return response.redirect('/admin/portalborrowresponse')
  })
  Route.get('/:id', 'Admin/PortalborrowresponseController.show')
}).prefix('admin/portalborrowresponse')

// Home routes
// Route
//   .get('/admin/index', 'Admin/HomeController.index')
//   .middleware('auth')

Route.get('/admin/dashboard', 'Admin/HomeController.dashboard').middleware(
  'auth'
)

// Auth routes
Route.group(() => {
  Route.any('login', 'Admin/AuthController.login')

  Route.any('logout', 'Admin/AuthController.logout')
}).prefix('admin/auth')

// User routes
Route.group(() => {
  Route.get('/', 'Admin/UserController.index')
  Route.get('/new', 'Admin/UserController.newUser')
  Route.post('/new', 'Admin/UserController.createNewUser')
  Route.get('/:id', 'Admin/UserController.show')
  Route.post('/deactive', 'Admin/UserController.deactive')
  Route.post('/active', 'Admin/UserController.active')
  Route.post('/:id', 'Admin/UserController.show')
  Route.post('/:id/roles', 'Admin/UserController.roleIndex')
  Route.post('/:id/kyc', 'Admin/UserController.kyc')
})
  .middleware('auth')
  .prefix('admin/users')

Route.group(() => {
  Route.get('/', 'Admin/CandidateController.index')
  Route.get('/:id', 'Admin/CandidateController.show')
  Route.get('/:id/voters', 'Admin/CandidateController.voterIndex')
})
  .middleware('auth')
  .prefix('admin/candidate')

Route.group(() => {
  Route.get('/dcb', 'Admin/ProposalController.dcbIndex')
  Route.get('/dcb/:id', 'Admin/ProposalController.dcbShow')
  Route.get('/gov', 'Admin/ProposalController.govIndex')
  Route.get('/gov/:id', 'Admin/ProposalController.govShow')
  Route.get('/dcb/:id/voters', 'Admin/ProposalController.dcbVoterIndex')
  Route.get(
    '/dcb/:parentId/voters/:id',
    'Admin/ProposalController.dcbVoterShow'
  )
  Route.get('/gov/:id/voters', 'Admin/ProposalController.govVoterIndex')
  Route.get(
    '/gov/:parentId/voters/:id',
    'Admin/ProposalController.govVoterShow'
  )
})
  .middleware('auth')
  .prefix('admin/proposal')

Route.group(() => {
  Route.get('/', 'Admin/ReserveController.index')
  Route.get('/dashboard', 'Admin/ReserveController.dashboard')
  Route.get('/:id', 'Admin/ReserveController.show')
})
  .middleware('auth')
  .prefix('admin/reserve')

Route.group(() => {
  Route.get('/roles', 'Admin/AclController.roleIndex')
  Route.get('/roles/:id', 'Admin/AclController.roleShow')
  Route.post('/roles/:id', 'Admin/AclController.roleShow')
})
  .middleware('auth')
  .prefix('admin/acl')

// update name for route
Route.list().forEach(r => {
  if (typeof r.handler === typeof '') {
    r.as(
      r.handler
        .toLowerCase()
        .replace('/', '.')
        .replace('controller', '')
    )
    r.middleware(`logger:${r.name}`)
    r.middleware(`permission:${r.name}`)
  }
})
