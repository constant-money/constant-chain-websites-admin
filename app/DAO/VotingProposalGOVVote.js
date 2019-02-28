'use strict'

const VotingProposalGOVVoteModel = use('VotingProposalGOVVoteModel')

class VotingProposalGOVVote {
    async first(id) {
        return await VotingProposalGOVVoteModel
            .query()
            .with('voter')
            .with('secondVoter')
            .with('thirdVoter')
            .whereNull('deleted_at')
            .where('id', id).first()
    }

    async find({ votingProposalGOVId, email, page, perPage }) {
        let q = VotingProposalGOVVoteModel
            .query()
            .with('voter')
            .whereNull('deleted_at')
            .where('voting_proposal_gov_id', '=', votingProposalGOVId)
        if (email != '') {
            q.whereExists(function () {
                this.from('users')
                    .whereRaw('`users`.`id` = `voting_proposal_gov_vote`.`voter_id`')
                    .where('users.email', 'like', '%' + email + '%')
            })
        }
        return await q.paginate(page, perPage)
    }
}

module.exports = new VotingProposalGOVVote()