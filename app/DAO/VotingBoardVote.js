'use strict'

const VotingBoardVoteModel = use('VotingBoardVoteModel')

class VotingBoardVote {
  async first (id) {
    return await VotingBoardVoteModel.query()
      .with('voter')
      .whereNull('deleted_at')
      .where('id', id)
      .first()
  }

  async find ({ votingBoardCandidateId, page, perPage, email = '', txId = '' }) {
    let q = VotingBoardVoteModel.query()
      .with('voter')
      .whereNull('deleted_at')
      .where('voting_board_candidate_id', '=', votingBoardCandidateId)
    if (email) {
      q.whereExists(function () {
        this.from('users')
          .whereRaw('`users`.`id` = `voting_board_vote`.`voter_id`')
          .where('users.email', 'like', '%' + email + '%')
      })
    }
    if (txId) {
      q.whereExists(function () {
        q.where('tx_id', 'LIKE', `${txId}%`)
      })
    }
    return await q.paginate(page, perPage)
  }
}

module.exports = new VotingBoardVote()
