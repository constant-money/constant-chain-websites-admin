'use strict'

const moment = require("moment")

const ProposalDcb = use('App/Models/ProposalDcb')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with proposaldcbs
 */
class ProposalDcbController {
  /**
   * Show a list of ProposalDcb by given condition.
   * GET ProposalDcb
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async find ({ request, response, view }) {
    const {body, _qs} = request;
    const {page=1, perPage=20} = _qs;
    const {name} = body;
    let query = ProposalDcb.query().whereNull("deleted_at");
    if (name) {
      query = query.where("name", name)
    }

    const result = await query.paginate(page,perPage)
    return view.render('admin.proposal_dcb.index', result.toJSON());
  }
  /**
   * Show a list of all proposaldcbs.
   * GET proposaldcbs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const {_qs} = request;
    const {page=1, perPage=20} = _qs;

    const result = await ProposalDcb.query().where("deleted_at",null).paginate(page,perPage);

    return view.render('admin.proposal_dcb.index', result.toJSON());
  }

  /**
   * Render a form to be used for creating a new proposaldcb.
   * GET proposaldcbs/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new proposaldcb.
   * POST proposaldcbs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single proposaldcb.
   * GET proposaldcbs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const {id} = params;

    const result = await ProposalDcb.query().whereNull("deleted_at").where('id',id).first();
    if (!result || result === null) {
      return view.render('admin.proposal_dcb.form');
    }
    return view.render('admin.proposal_dcb.form', result.toJSON() );
  }

  /**
   * Render a form to update an existing proposaldcb.
   * GET proposaldcbs/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update proposaldcb details.
   * PUT or PATCH proposaldcbs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a proposaldcb with id.
   * DELETE proposaldcbs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ProposalDcbController
