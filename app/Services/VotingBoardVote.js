'use strict'

const VotingBoardVoteModel = use('VotingBoardVoteModel')

class VotingBoardVote {
    async first(id) {
        return await VotingBoardVoteModel
            .query()
            .with('voter')
            .whereNull('deleted_at')
            .where('id', id).first()
    }

    async find({ votingBoardCandidateId, page, perPage }) {
        let q = VotingBoardVoteModel
            .query()
            .with('voter')
            .whereNull('deleted_at')
            .where('voting_board_candidate_id', '=', votingBoardCandidateId)
        return await q.paginate(page, perPage)
    }
}

module.exports = new VotingBoardVote()