'use strict'

const VotingBoardCandidateService = use('VotingBoardCandidateService')

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
        const { page = 1, perPage = 20 } = request.all()
        const votingBoardCandidatesQ = await VotingBoardCandidateService.getVotingBoardCandidates(page, perPage)
        return view.render('admin/candidate/index', {
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
    async detail({ response, view, params }) {
        const { id = 0 } = params
        const votingBoardCandidate = await VotingBoardCandidateService.getById(id)
        if (votingBoardCandidate == undefined) {
            return response.route('Admin/VotingBoardCandidateController.index')
        }
        return view.render('admin/candidate/detail', {
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
    async votings({ request, view, params }) {
        const { id = 0 } = params
        const { page = 1, perPage = 20 } = request.all()
        const votingBoardCandidatesQ = await VotingBoardCandidateService.getVotingBoardCandidates(page, perPage)
        return view.render('admin/candidate/votings', {
            page: votingBoardCandidatesQ.pages.page,
            perPage: votingBoardCandidatesQ.pages.perPage,
            lastPage: votingBoardCandidatesQ.pages.lastPage,
            votingBoardCandidates: votingBoardCandidatesQ.rows,
        })
    }
}

module.exports = CandidateController
