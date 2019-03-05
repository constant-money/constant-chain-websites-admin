'use strict'

const VotingBoardCandidateDAO = use('VotingBoardCandidateDAO')
const VotingBoardVoteDAO = use('VotingBoardVoteDAO')

class CandidateController {
    /**
     * Show a list of voting board candidates
     * GET /votingboardcandidate
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({ request, view }) {
        const { email = '', dcb='', cmb = "", gov="", page = 1, perPage = 20 } = request.all()
        const votingBoardCandidatesQ = await VotingBoardCandidateDAO.find(
            { email: email, page: page, perPage: perPage, dcb, cmb, gov }
        )
        return view.render('admin/candidate/index', {
            email: email,
            dcb,
            cmb,
            gov,
            page: votingBoardCandidatesQ.pages.page,
            perPage: votingBoardCandidatesQ.pages.perPage,
            lastPage: votingBoardCandidatesQ.pages.lastPage,
            votingBoardCandidates: votingBoardCandidatesQ.rows,
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
    async show({ response, view, params }) {
        const { id = 0 } = params
        const votingBoardCandidate = await VotingBoardCandidateDAO.first(id)
        if (votingBoardCandidate == undefined) {
            return response.route('admin.candidate.index')
        }
        return view.render('admin/candidate/form', {
            id: id,
            votingBoardCandidate: votingBoardCandidate,
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
    async voterIndex({ request, view, params }) {
        const { id = 0 } = params
        const { page = 1, perPage = 20, email="", tx_id="",board_type="" } = request.all()
        const votingBoardVotesQ = await VotingBoardVoteDAO.find(
            { votingBoardCandidateId: id, page: page, perPage: perPage, email, tx_id, board_type }
        )
        return view.render('admin/candidate/voter_index', {
            id: id,
            page: votingBoardVotesQ.pages.page,
            perPage: votingBoardVotesQ.pages.perPage,
            lastPage: votingBoardVotesQ.pages.lastPage,
            votingBoardVotes: votingBoardVotesQ.rows,
            email,
            tx_id,
            board_type,
        })
    }
}

module.exports = CandidateController
