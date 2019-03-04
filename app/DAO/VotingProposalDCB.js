'use strict'

const VotingProposalDCBModel = use('VotingProposalDCBModel')

class VotingProposalDCB {
    async first(id) {
        return await VotingProposalDCBModel
            .query()
            .with('user')
            .whereNull('deleted_at')
            .where('id', id).first()
    }

    async find({ email, page, perPage }) {
        let q = VotingProposalDCBModel
            .query()
            .with('user')
            .whereNull('deleted_at')
        if (email != '') {
            q.whereExists(function () {
                this.from('users')
                    .whereRaw('users.id = voting_proposal_dcb.user_id')
                    .where('users.email', 'like', '%' + email + '%')
            })
        }
        return await q.paginate(page, perPage)
    }
}

module.exports = new VotingProposalDCB()