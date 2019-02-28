'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class VotingProposalGOVVote extends Model {
    static get table() {
        return 'voting_proposal_gov_vote'
    }
    voter() {
        return this.belongsTo('App/Models/User', 'voter_id', 'id')
    }
    secondVoter() {
        return this.belongsTo('App/Models/User', 'second_voter_id', 'id')
    }
    thirdVoter() {
        return this.belongsTo('App/Models/User', 'third_voter_id', 'id')
    }
}

module.exports = VotingProposalGOVVote
