'use strict'

const VotingProposalDCBVoteModel = use('VotingProposalDCBVoteModel')

const moment = require('moment')
class VotingProposalDCBVote {
  async first (id) {
    return await VotingProposalDCBVoteModel.query()
      .with('voter')
      .with('secondVoter')
      .with('thirdVoter')
      .whereNull('deleted_at')
      .where('id', id)
      .first()
  }

  async find ({
    votingProposalDCBId,
    email,
    page,
    perPage,
    voteAmountFrom,
    voteAmountTo,
    txId = '',
    from_date = '',
    to_date = ''
  }) {
    let q = VotingProposalDCBVoteModel.query()
      .with('voter')
      .whereNull('deleted_at')
      .where('voting_proposal_dcb_id', '=', votingProposalDCBId)

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
          .whereRaw('users.id = voting_proposal_dcb_vote.voter_id')
          .where('users.email', 'like', '%' + email + '%')
      })
    }
    return await q.paginate(page, perPage)
  }
}

module.exports = new VotingProposalDCBVote()
