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
    const {body} = request;
    const {hash="", page=1} = body;
    const result = Portalborrow.query().whereNull("deleted_at");
    if (hash) {
      result.where("hash", hash)
    }

    return await result.paginate(page)
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
    const {page} = _qs;
    if (page === undefined || page === "") {
      const data = await Portalborrow.query().where("deleted_at",null).fetch() || [];
      return {data};
    }
    return await Portalborrow.query().where("deleted_at",null).paginate(page)
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
    const {hash, tx_id} = body;
    const pb = new Portalborrow()
    pb.hash = hash;
    pb.tx_id = tx_id;

    await pb.save()

    return {data: "success"}
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
    const {id,page=1} = params;
    // try {
    //   const result = await Portalborrow.findOrFail(id);
    //   return {data: result}
    // } catch (error) {
    //   return {data: {}};
    // }
    // return await Portalborrow.findOrFail(id);
    const pb = await Portalborrow.query().whereNull("deleted_at").where('id',id).first();
    const borrow_responses = await pb.borrowresponses().paginate(page);

    return {data:pb, borrow_responses}
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
    const pb = await Portalborrow.find(id);
    if (pb === null) {
      return {error: "object given by id not found"}
    }

    pb.fill(body)
    pb.id = id;
    pb.updated_at = moment();

    await pb.save()

    return {data: "success"}
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
    console.log(now)
    pb.deleted_at = now;

    await pb.save()

    return {data: "success"}
  }
}

module.exports = PortalborrowController
