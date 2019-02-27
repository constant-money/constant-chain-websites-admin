'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class VotingBoardVote extends Model {
    static get table() {
        return 'voting_board_vote'
    }
    voter() {
        return this.belongsTo('App/Models/User', 'voter_id', 'id')
    }
}

module.exports = VotingBoardVote
