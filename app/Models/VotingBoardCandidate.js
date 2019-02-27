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
}

module.exports = VotingBoardCandidate
