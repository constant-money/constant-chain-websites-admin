'use strict'

const VotingProposalGOVVoteModel = use('VotingProposalGOVVoteModel')
const moment = require('moment')

class VotingProposalGOVVote {
  async first (id) {
    return await VotingProposalGOVVoteModel.query()
      .with('voter')
      .with('secondVoter')
      .with('thirdVoter')
      .whereNull('deleted_at')
      .where('id', id)
      .first()
  }

  async find ({
    votingProposalGOVId,
    email,
    page,
    perPage,
    voteAmountFrom,
    voteAmountTo,
    txId = '',
    from_date = '',
    to_date = ''
  }) {
    let q = VotingProposalGOVVoteModel.query()
      .with('voter')
      .whereNull('deleted_at')
      .where('voting_proposal_gov_id', '=', votingProposalGOVId)

    if (voteAmountFrom) {
      q = q.whereRaw('vote_amount >= ?', voteAmountFrom)
    }
    if (voteAmountTo) {
      q = q.whereRaw('vote_amount <= ? ', voteAmountTo)
    }
    if (txId) {
      q = q.where('tx_id', txId)
    }
    if (from_date) {
      from_date = moment(from_date, 'DD-MM-YYYY').format('YYYY-MM-DD HH:mm:ss')
      q = q.whereRaw('created_at >= ?', from_date)
    }
    if (to_date) {
      to_date = moment(to_date, 'DD-MM-YYYY').format('YYYY-MM-DD HH:mm:ss')
      q = q.whereRaw('created_at <= ?', to_date)
    }
    if (email != '') {
      q.whereExists(function () {
        this.from('users')
          .whereRaw('users.id = voting_proposal_gov_vote.voter_id')
          .where('users.email', 'like', '%' + email + '%')
      })
    }
    return await q.paginate(page, perPage)
  }
}

module.exports = new VotingProposalGOVVote()
