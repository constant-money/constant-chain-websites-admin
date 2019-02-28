'use strict'

const VotingProposalDCBVoteModel = use('VotingProposalDCBVoteModel')

class VotingProposalDCBVote {
    async first(id) {
        return await VotingProposalDCBVoteModel
            .query()
            .with('voter')
            .with('secondVoter')
            .with('thirdVoter')
            .whereNull('deleted_at')
            .where('id', id).first()
    }

    async find({ votingProposalDCBId, email, page, perPage }) {
        let q = VotingProposalDCBVoteModel
            .query()
            .with('voter')
            .whereNull('deleted_at')
            .where('voting_proposal_dcb_id', '=', votingProposalDCBId)
        if (email != '') {
            q.whereExists(function () {
                this.from('users')
                    .whereRaw('`users`.`id` = `voting_proposal_dcb_vote`.`voter_id`')
                    .where('users.email', 'like', '%' + email + '%')
            })
        }
        return await q.paginate(page, perPage)
    }
}

module.exports = new VotingProposalDCBVote()