'use strict'

const Database = use('Database')
const VotingBoardCandidateModel = use('VotingBoardCandidateModel')

class VotingBoardCandidate {
  async first (id) {
    return await VotingBoardCandidateModel.query()
      .with('user')
      .whereNull('deleted_at')
      .where('id', id)
      .first()
  }

  async find ({ email, page, perPage, candidateType = '', candidateAddress }) {
    let q = VotingBoardCandidateModel.query()
      .with('user')
      .withCount('votes as vote_count')
      .whereNull('deleted_at')
    if (email != '') {
      q.whereExists(function () {
        this.from('users')
          .whereRaw('`users`.`id` = `voting_board_candidate`.`user_id`')
          .where('users.email', 'like', '%' + email + '%')
      })
    }
    if (candidateType == 'dcb') {
      if (candidateAddress) {
        q.whereExists(function () {
          q.where('dcb', 'like', `${candidateAddress}%`)
        })
      } else {
        q.whereExists(function () {
          q.where('dcb', '!=', '')
        })
      }
    }
    if (candidateType == 'cmb') {
      if (candidateAddress) {
        q.whereExists(function () {
          q.where('cmb', 'like', `${candidateAddress}%`)
        })
      } else {
        q.whereExists(function () {
          q.where('cmb', '!=', '')
        })
      }
    }
    if (candidateType == 'gov') {
      if (candidateAddress) {
        q.whereExists(function () {
          q.where('gov', 'like', `${candidateAddress}%`)
        })
      } else {
        q.whereExists(function () {
          q.where('gov', '!=', '')
        })
      }
    }

    q.orderBy('vote_count', 'desc')
    return await q.paginate(page, perPage)
  }

  async totalCandidates () {
    try {
      const data = await Database.raw(
        `
        select sub1.total as total_dcb, sub2.total as total_gov from
        (
          select count(*) as total from voting_board_candidate
          where dcb != ''
        ) sub1
        join
        (
          select count(*) as total from voting_board_candidate
          where gov != ''
        ) sub2
        `
      )
      return data[0]
    } catch (e) {
      console.log(e)
      return []
    }
  }
}

module.exports = new VotingBoardCandidate()
