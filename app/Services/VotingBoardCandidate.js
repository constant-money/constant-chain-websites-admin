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

    async getVotingBoardCandidates(page, perPage) {
        let q = VotingBoardCandidateModel
            .query()
            .with('user')
            .whereNull('deleted_at')
        return await q.paginate(page, perPage)
    }
}

module.exports = new VotingBoardCandidate()