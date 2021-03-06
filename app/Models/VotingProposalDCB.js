'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class VotingProposalDCB extends Model {
    static get table() {
        return 'voting_proposal_dcb'
    }
    user() {
        return this.belongsTo('App/Models/User', 'user_id', 'id')
    }
    votes(){
      return this.hasMany('App/Models/VotingProposalDCBVote','id', 'voting_proposal_dcb_id')
    }
}

module.exports = VotingProposalDCB
