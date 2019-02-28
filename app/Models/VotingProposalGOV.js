'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class VotingProposalGOV extends Model {
    static get table() {
        return 'voting_proposal_gov'
    }
    user() {
        return this.belongsTo('App/Models/User', 'user_id', 'id')
    }
}

module.exports = VotingProposalGOV
