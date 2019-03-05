'use strict'

const VotingBoardCandidateModel = use('VotingBoardCandidateModel')

class VotingBoardCandidate {
    async first(id) {
        return await VotingBoardCandidateModel
            .query()
            .with('user')
            .whereNull('deleted_at')
            .where('id', id).first()
    }

    async find({ email, page, perPage, dcb="", cmb="",gov="" }) {
        let q = VotingBoardCandidateModel
            .query()
            .with('user')
            .whereNull('deleted_at')
        if (email != '') {
            q.whereExists(function () {
                this.from('users')
                    .whereRaw('`users`.`id` = `voting_board_candidate`.`user_id`')
                    .where('users.email', 'like', '%' + email + '%')
            })
        }
        if (dcb) {
            q.whereExists(function () {
              q.where('dcb', dcb)
            })
        }
        if (cmb) {
            q.whereExists(function () {
              q.where('dcb', cmb)
            })
        }
        if (gov) {
            q.whereExists(function () {
              q.where('dcb', gov)
            })
        }
        return await q.paginate(page, perPage)
    }
}

module.exports = new VotingBoardCandidate()
