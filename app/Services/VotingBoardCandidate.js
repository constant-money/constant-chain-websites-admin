'use strict'

const VotingBoardCandidateModel = use('VotingBoardCandidateModel')

class VotingBoardCandidate {
    async getById(id) {
        return await VotingBoardCandidateModel
            .query()
            .with('user')
            .whereNull('deleted_at')
            .where('id', id).first()
    }

    async getVotingBoardCandidates(email, page, perPage) {
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
        return await q.paginate(page, perPage)
    }
}

module.exports = new VotingBoardCandidate()