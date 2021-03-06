'use strict'

const moment = require("moment")

const Portalborrowresponse = use('App/Models/Portalborrowresponse')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with portalborrowresponses
 */
class PortalborrowresponseController {
  /**
   * Show a list of portal borrows response by given condition.
   * GET portalborrowresponse
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async find ({ request, response, view }) {
    const {body, _qs} = request;
    const {page=1, perPage=20} = _qs;
    let {action="", constant_loan_response_tx_id="", email="", from_date="", to_date=""} = body;
    let query = Portalborrowresponse.query().whereNull("deleted_at");
    if (constant_loan_response_tx_id) {
      query = query.where("constant_loan_response_tx_id", constant_loan_response_tx_id)
    }
    if (action) {
      query = query.where("action", action)
    }
    if (email) {
      query.whereExists(function () {
        this.from('users')
            .whereRaw('`users`.`id` = `portal_borrows_response`.`user_id`')
            .where('users.email', 'like', '%' + email + '%')
      })
    }

    if (from_date) {
      from_date = moment(from_date,"DD-MM-YYYY").format("YYYY-MM-DD HH:mm:ss")
      query = query.whereRaw("created_at >= ?", from_date)
    }
    if (to_date) {
      to_date = moment(to_date,"DD-MM-YYYY").format("YYYY-MM-DD HH:mm:ss")
      query = query.whereRaw("created_at <= ?", to_date)
    }

    const result = await query.paginate(page,perPage);
    if (!result || result === null) {
      return view.render('admin.portal_borrow_response.index');
    }
    return view.render('admin.portal_borrow_response.index', result.toJSON());
  }
  /**
   * Show a list of all portalborrowresponses.
   * GET portalborrowresponses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const {_qs} = request;
    const {page=1, perPage=20} = _qs;

    const result = await Portalborrowresponse.query().where("deleted_at",null).paginate(page,perPage);

    return view.render('admin.portal_borrow_response.index', result.toJSON());
  }

  /**
   * Render a form to be used for creating a new portalborrowresponse.
   * GET portalborrowresponses/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {

  }

  /**
   * Create/save a new portalborrowresponse.
   * POST portalborrowresponses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single portalborrowresponse.
   * GET portalborrowresponses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const {id} = params;

    const result = await Portalborrowresponse.query().whereNull("deleted_at").where('id',id).first();
    if (!result || result === null) {
      return view.render('admin.portal_borrow_response.form');
    }
    return view.render('admin.portal_borrow_response.form', result.toJSON() );
  }

  /**
   * Render a form to update an existing portalborrowresponse.
   * GET portalborrowresponses/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update portalborrowresponse details.
   * PUT or PATCH portalborrowresponses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a portalborrowresponse with id.
   * DELETE portalborrowresponses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = PortalborrowresponseController
