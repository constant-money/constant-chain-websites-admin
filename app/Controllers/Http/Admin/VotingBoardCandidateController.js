'use strict'

const VotingBoardCandidateService = use('VotingBoardCandidateService')

class VotingBoardCandidateController {
    async index({ request, view }) {
        let { page, perPage } = request.all()
        if (page == undefined || page <= 0) {
            page = 1
        }
        if (perPage == undefined || perPage <= 0) {
            perPage = 20
        }
        const votingBoardCandidatesQ = await VotingBoardCandidateService.getVotingBoardCandidates(page, perPage)
        return view.render('admin/votingboardcandidate/index', {
            page: votingBoardCandidatesQ.pages.page,
            perPage: votingBoardCandidatesQ.pages.perPage,
            lastPage: votingBoardCandidatesQ.pages.lastPage,
            votingBoardCandidates: votingBoardCandidatesQ.rows,
        })
    }

    async detail({ response, view, params }) {
        const votingBoardCandidate = await VotingBoardCandidateService.getById(params.id)
        if (votingBoardCandidate == undefined) {
            return response.route('Admin/VotingBoardCandidateController.index')
        }
        return view.render('admin/votingboardcandidate/detail', {
            votingBoardCandidate: votingBoardCandidate,
        })
    }
}

module.exports = VotingBoardCandidateController
