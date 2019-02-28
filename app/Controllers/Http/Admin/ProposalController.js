'use strict'

const VotingProposalDCBDAO = use('VotingProposalDCBDAO')
const VotingProposalGOVDAO = use('VotingProposalGOVDAO')
const VotingProposalDCBVoteDAO = use('VotingProposalDCBVoteDAO')
const VotingProposalGOVVoteDAO = use('VotingProposalGOVVoteDAO')

class ProposalController {
    /**
     * Show a list of voting board candidates
     * GET /votingboardcandidate
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async dcbIndex({ request, view }) {
        const { email = '', page = 1, perPage = 20 } = request.all()
        const votingProposalDCBs = await VotingProposalDCBDAO.find(
            { email: email, page: page, perPage: perPage }
        )
        return view.render('admin/proposal/dcb/index', {
            email: email,
            page: votingProposalDCBs.pages.page,
            perPage: votingProposalDCBs.pages.perPage,
            lastPage: votingProposalDCBs.pages.lastPage,
            votingProposalDCBs: votingProposalDCBs.rows,
        })
    }

    async govIndex({ request, view }) {
        const { email = '', page = 1, perPage = 20 } = request.all()
        const votingProposalGOVBs = await VotingProposalGOVDAO.find(
            { email: email, page: page, perPage: perPage }
        )
        return view.render('admin/proposal/gov/index', {
            email: email,
            page: votingProposalGOVBs.pages.page,
            perPage: votingProposalGOVBs.pages.perPage,
            lastPage: votingProposalGOVBs.pages.lastPage,
            votingProposalGOVBs: votingProposalGOVBs.rows,
        })
    }

    /**
     * Show a detail of voting board candidate
     * GET /votingboardcandidate/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    // async detail({ response, view, params }) {
    //     const { id = 0 } = params
    //     const votingBoardCandidate = await VotingBoardCandidateDAO.getById(id)
    //     if (votingBoardCandidate == undefined) {
    //         return response.route('Admin/VotingBoardCandidateController.index')
    //     }
    //     return view.render('admin/candidate/detail', {
    //         votingBoardCandidate: votingBoardCandidate,
    //     })
    // }
    /**
     * Show a list of voting board candidates
     * GET /votingboardcandidate
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async dcbVoterIndex({ request, view, params }) {
        const { id = 0 } = params
        const { email = '', page = 1, perPage = 20 } = request.all()
        const votingProposalDCBVotes = await VotingProposalDCBVoteDAO.find(
            { votingProposalDCBId: id, email: email, page: page, perPage: perPage }
        )
        return view.render('admin/proposal/dcb/voter_index', {
            id: id,
            email: email,
            page: votingProposalDCBVotes.pages.page,
            perPage: votingProposalDCBVotes.pages.perPage,
            lastPage: votingProposalDCBVotes.pages.lastPage,
            votingProposalDCBVotes: votingProposalDCBVotes.rows,
        })
    }

    /**
     * Show a list of voting board candidates
     * GET /votingboardcandidate
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async govVoterIndex({ request, view, params }) {
        const { id = 0 } = params
        const { email = '', page = 1, perPage = 20 } = request.all()
        const votingProposalGOVVotes = await VotingProposalGOVVoteDAO.find(
            { votingProposalGOVId: id, email: email, page: page, perPage: perPage }
        )
        return view.render('admin/proposal/gov/voter_index', {
            id: id,
            email: email,
            page: votingProposalGOVVotes.pages.page,
            perPage: votingProposalGOVVotes.pages.perPage,
            lastPage: votingProposalGOVVotes.pages.lastPage,
            votingProposalGOVVotes: votingProposalGOVVotes.rows,
        })
    }
}

module.exports = ProposalController
