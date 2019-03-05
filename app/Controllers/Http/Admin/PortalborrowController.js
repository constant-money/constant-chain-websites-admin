'use strict'

const moment = require("moment")

const Portalborrow = use('App/Models/Portalborrow')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with portalborrows
 */
class PortalborrowController {
  /**
   * Show a list of portalborrows by given condition.
   * GET portalborrows
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async find ({ request, response, view }) {
    const {body, _qs} = request;
    const {page=1, perPage=20} = _qs;
    const {loan_amount_from, loan_amount_to, loan_id="", key_digest="", tx_id, email=""} = body;
    console.log(body);
    let query = Portalborrow.query().whereNull("deleted_at");
    if (loan_amount_from) {
      query = query.whereRaw("loan_amount >= ?", loan_amount_from)
    }
    if (loan_amount_to) {
      query = query.whereRaw("loan_amount <= ? ", loan_amount_to)
    }
    if (loan_id) {
      query = query.where("loan_id", loan_id)
    }
    if (key_digest) {
      query = query.where("key_digest", key_digest)
    }
    if (tx_id) {
      query = query.where("tx_id", tx_id)
    }
    if (email) {
      query.whereExists(function () {
        this.from('users')
            .whereRaw('`users`.`id` = `portal_borrows`.`user_id`')
            .where('users.email', 'like', '%' + email + '%')
      })
    }
    const result = await query.paginate(page,perPage)
    return view.render('admin.portal_borrows.index', result.toJSON());
  }
  /**
   * Show a list of all portalborrows.
   * GET portalborrows
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const {_qs} = request;
    const {page=1, perPage=20} = _qs;

    const result = await Portalborrow.query().where("deleted_at",null).paginate(page,perPage);

    return view.render('admin.portal_borrows.index', result.toJSON());
  }

  /**
   * Render a form to be used for creating a new portalborrow.
   * GET portalborrows/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    return view.render('admin.portal_borrows.form')
  }

  /**
   * Create/save a new portalborrow.
   * POST portalborrows
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const {body} = request;
    const {start_date="", end_date=""} = body;
    if (start_date) {
      body.start_date = moment(start_date).format("YYYY-MM-DD HH:mm:ss")
    }
    if (end_date) {
      body.end_date = moment(end_date).format("YYYY-MM-DD HH:mm:ss")
    }
    const pb = new Portalborrow()
    pb.fill(body);

    await pb.save()
    // return {data: "success"}
    response.redirect("/admin/portalborrow")
  }

  /**
   * Display a single portalborrow.
   * GET portalborrows/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const {id} = params;
    const {_qs} = request;
    const {page=1, perPage=20} = _qs;

    const pb = await Portalborrow.query().whereNull("deleted_at").where('id',id).first();
    if (!pb || pb === null) {
      return view.render('admin.portal_borrows.form' );
    }
    const borrow_responses = await pb.borrowresponses().paginate(page,perPage);
    if (borrow_responses && borrow_responses.rows.length > 0) {
      pb.borrow_responses = borrow_responses.toJSON()
    }
    // return {data:pb, borrow_responses}
    return view.render('admin.portal_borrows.form', pb.toJSON() );
  }

  /**
   * Render a form to update an existing portalborrow.
   * GET portalborrows/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
    const {id} = params;
    return await Portalborrow.findOrFail(id);
  }

  /**
   * Update portalborrow details.
   * PUT or PATCH portalborrows/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const {id}= params;
    const {body} = request;
    const {start_date="", end_date=""} = body;
    // console.log(body);
    if (start_date) {
      body.start_date = moment(start_date).format("YYYY-MM-DD HH:mm:ss")
    }
    if (end_date) {
      body.end_date = moment(end_date).format("YYYY-MM-DD HH:mm:ss")
    }

    const pb = await Portalborrow.find(id);
    if (pb === null) {
      return {error: "object given by id not found"}
    }

    pb.fill(body)
    pb.id = id;
    pb.updated_at = moment();

    await pb.save()

    // return {data: "success"}
    response.redirect(`/admin/portalborrow/${id}`)
  }

  /**
   * Delete a portalborrow with id.
   * DELETE portalborrows/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const {id}= params;
    const pb = await Portalborrow.find(id);

    if (pb === null) {
      return {error: "object given by id not found"}
    }
    const now = moment().format("YYYY-MM-DD HH:mm:ss");
    // console.log(now)
    pb.deleted_at = now;

    await pb.save()

    return {data: "success"}
  }
}

module.exports = PortalborrowController
