'use strict'

const VotingProposalGOVModel = use('VotingProposalGOVModel')

const moment = require('moment')

class VotingProposalGOV {
  async first (id) {
    return await VotingProposalGOVModel.query()
      .with('user')
      .whereNull('deleted_at')
      .where('id', id)
      .first()
  }

  async find ({ email, page, perPage, data, from_date, to_date, txId }) {
    let q = VotingProposalGOVModel.query()
      .with('user')
      .withCount('votes as vote_count')
      .whereNull('deleted_at')
    if (data) {
      q = q.where('data', 'like', '%' + data + '%')
    }
    if (txId) {
      q = q.where('tx_id', 'like', `${txId}%`)
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
          .whereRaw('users.id = voting_proposal_gov.user_id')
          .where('users.email', 'like', '%' + email + '%')
      })
    }
    return await q.paginate(page, perPage)
  }

  async totalGOVProposals () {
    return await VotingProposalGOVModel.query().count('id as total')
  }
}

module.exports = new VotingProposalGOV()
