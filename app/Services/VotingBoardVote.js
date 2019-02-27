'use strict'

const VotingBoardVoteModel = use('VotingBoardVoteModel')

class VotingBoardVote {
    async getById(id) {
        return await VotingBoardVoteModel
            .query()
            .with('voter')
            .whereNull('deleted_at')
            .where('id', id).first()
    }

    async getVotingBoardVotes(votingBoardCandidateId, page, perPage) {
        let q = VotingBoardVoteModel
            .query()
            .with('voter')
            .whereNull('deleted_at')
        return await q.paginate(page, perPage)
    }
}

module.exports = new VotingBoardVote()