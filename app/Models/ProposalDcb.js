'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ProposalDcb extends Model {
  static get table () {
    return 'voting_proposal_dcb'
  }
  static get createdAtColumn () {
    return 'created_at'
  }
  static get updatedAtColumn () {
    return 'updated_at'
  }
}

module.exports = ProposalDcb
