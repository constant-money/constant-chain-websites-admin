'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class VotingBoardCandidate extends Model {
    static get table() {
        return 'voting_board_candidate'
    }
    user() {
        return this.belongsTo('App/Models/User', 'user_id', 'id')
    }
    votes() {
      return this.hasMany('App/Models/VotingBoardVote','id','voting_board_candidate_id')
    }
}

module.exports = VotingBoardCandidate
