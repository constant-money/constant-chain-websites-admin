'use strict'

const VotingProposalGOVModel = use('VotingProposalGOVModel')

class VotingProposalGOV {
    async first(id) {
        return await VotingProposalGOVModel
            .query()
            .with('user')
            .whereNull('deleted_at')
            .where('id', id).first()
    }

    async find({ email, page, perPage }) {
        let q = VotingProposalGOVModel
            .query()
            .with('user')
            .whereNull('deleted_at')
        if (email != '') {
            q.whereExists(function () {
                this.from('users')
                    .whereRaw('`users`.`id` = `voting_proposal_gov`.`user_id`')
                    .where('users.email', 'like', '%' + email + '%')
            })
        }
        return await q.paginate(page, perPage)
    }
}

module.exports = new VotingProposalGOV()