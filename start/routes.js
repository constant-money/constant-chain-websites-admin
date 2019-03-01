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
Route.get('admin/', 'Admin/HomeController.index')

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
// Route.group(() => {
//   Route
//     .any('login', 'Admin/AuthController.login')

//   Route
//     .any('logout', 'Admin/AuthController.logout')
// }).prefix('admin/auth')

// User routes
// Route.group(() => {
//   Route
//     .get('/', 'Admin/UserController.index')
//   Route
//     .get('/:id', 'Admin/UserController.show')
// })
//   .middleware('auth')
//   .prefix('admin/users')

// Route.group(() => {
//   Route
//     .get('/', 'Admin/CandidateController.index')
//   Route
//     .get('/:id', 'Admin/CandidateController.show')
//   Route
//     .get('/:id/voters', 'Admin/CandidateController.voters')
// })
//   .middleware('auth')
//   .prefix('admin/candidate')

const groupRoutes = [
  {
    'prefix': 'admin/auth',
    'middleware': [],
    'routes': [
      {
        'method': 'ANY',
        'route': '/login',
        'controller': 'Admin/AuthController.login',
      },
      {
        'method': 'ANY',
        'route': '/logout',
        'controller': 'Admin/AuthController.logout',
      },
    ]
  },
  {
    'prefix': 'admin/users',
    'middleware': ['auth'],
    'routes': [
      {
        'method': 'GET',
        'route': '/',
        'controller': 'Admin/UserController.index',
      },
      {
        'method': 'GET',
        'route': '/:id',
        'controller': 'Admin/UserController.show',
      },
    ]
  },
  {
    'prefix': 'admin/candidate',
    'middleware': ['auth'],
    'routes': [
      {
        'method': 'GET',
        'route': '/',
        'controller': 'Admin/CandidateController.index',
      },
      {
        'method': 'GET',
        'route': '/:id',
        'controller': 'Admin/CandidateController.show',
      },
      {
        'method': 'GET',
        'route': '/:id/voters',
        'controller': 'Admin/CandidateController.voterIndex',
      },
    ]
  },
  {
    'prefix': 'admin/proposal',
    'middleware': ['auth'],
    'routes': [
      {
        'method': 'GET',
        'route': '/dcb',
        'controller': 'Admin/ProposalController.dcbIndex',
      },
      {
        'method': 'GET',
        'route': '/dcb/:id',
        'controller': 'Admin/ProposalController.dcbShow',
      },
      {
        'method': 'GET',
        'route': '/gov',
        'controller': 'Admin/ProposalController.govIndex',
      },
      {
        'method': 'GET',
        'route': '/gov/:id',
        'controller': 'Admin/ProposalController.govShow',
      },
      {
        'method': 'GET',
        'route': '/dcb/:id/voters',
        'controller': 'Admin/ProposalController.dcbVoterIndex',
      },
      {
        'method': 'GET',
        'route': '/dcb/:parentId/voters/:id',
        'controller': 'Admin/ProposalController.dcbVoterShow',
      },
      {
        'method': 'GET',
        'route': '/gov/:id/voters',
        'controller': 'Admin/ProposalController.govVoterIndex',
      },
      {
        'method': 'GET',
        'route': '/gov/:parentId/voters/:id',
        'controller': 'Admin/ProposalController.govVoterShow',
      },
    ]
  }
]

groupRoutes.forEach(function (groupRoute) {
  let gr = Route.group(() => {
    groupRoute['routes'].forEach(function (route) {
      let r = Route
      if (route['method'] == 'GET') {
        r = r
          .get(route['route'], route['controller'])
      }
      if (route['method'] == 'POST') {
        r = r
          .post(route['route'], route['controller'])
      }
      if (route['method'] == 'PUT') {
        r = r
          .put(route['route'], route['controller'])
      }
      if (route['method'] == 'DELETE') {
        r = r
          .delete(route['route'], route['controller'])
      }
      if (route['method'] == 'ANY') {
        r = r
          .any(route['route'], route['controller'])
      }
      const asStr = route['controller'].toLowerCase().replace('controller', '').replace('/', '.')
      r = r.as(asStr)
      if (route['middleware'] != undefined) {
        r = r.middleware(route['middleware'])
      }
      r = r.middleware('logger:' + asStr)
    })
  })
  if (groupRoute['middleware'] != undefined) {
    gr = gr.middleware(groupRoute['middleware'])
  }
  gr = gr.prefix(groupRoute['prefix'])
});

// Route.group(() => {
//   Route
//     .get('/dcb', 'Admin/ProposalController.dcbIndex')
//   Route
//     .get('/dcb/:id', 'Admin/ProposalController.dcbShow')
//   Route
//     .get('/gov', 'Admin/ProposalController.govIndex')
//   Route
//     .get('/gov/:id', 'Admin/ProposalController.govShow')
//   Route
//     .get('/dcb/:id/voters', 'Admin/ProposalController.dcbVoterIndex')
//   Route
//     .get('/dcb/:parentId/voters/:id', 'Admin/ProposalController.dcbVoterShow')
//   Route
//     .get('/gov/:id/voters', 'Admin/ProposalController.govVoterIndex')
//   Route
//     .get('/gov/:parentId/voters/:id', 'Admin/ProposalController.govVoterShow')
// })
//   .middleware('auth')
//   .prefix('admin/proposal')


