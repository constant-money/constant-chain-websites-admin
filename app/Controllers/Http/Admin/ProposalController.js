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
  async dcbIndex ({ request, view }) {
    const {
      email = '',
      page = 1,
      perPage = 20,
      data = '',
      from_date = '',
      to_date = '',
      txId = ''
    } = request.all()
    const votingProposalDCBs = await VotingProposalDCBDAO.find({
      email: email,
      page: page,
      perPage: perPage,
      data,
      from_date,
      to_date,
      txId
    })
    votingProposalDCBs.rows.forEach(function (v) {
      v.beautifulData = JSON.stringify(JSON.parse(v.data), undefined, 2)
    })
    return view.render('admin/proposal/dcb/index', {
      email,
      from_date,
      to_date,
      data,
      txId,
      page: votingProposalDCBs.pages.page,
      perPage: votingProposalDCBs.pages.perPage,
      lastPage: votingProposalDCBs.pages.lastPage,
      votingProposalDCBs: votingProposalDCBs.rows
    })
  }

  async govIndex ({ request, view }) {
    const {
      email = '',
      page = 1,
      perPage = 20,
      data = '',
      from_date = '',
      to_date = '',
      txId = ''
    } = request.all()
    const votingProposalGOVs = await VotingProposalGOVDAO.find({
      email,
      page,
      perPage,
      data,
      from_date,
      to_date,
      txId
    })
    votingProposalGOVs.rows.forEach(function (v) {
      v.beautifulData = JSON.stringify(JSON.parse(v.data), undefined, 2)
    })
    return view.render('admin/proposal/gov/index', {
      email,
      from_date,
      to_date,
      data,
      txId,
      page: votingProposalGOVs.pages.page,
      perPage: votingProposalGOVs.pages.perPage,
      lastPage: votingProposalGOVs.pages.lastPage,
      votingProposalGOVs: votingProposalGOVs.rows
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
  async dcbShow ({ response, view, params }) {
    const { id = 0 } = params
    const votingProposalDCB = await VotingProposalDCBDAO.first(id)
    if (votingProposalDCB == undefined) {
      return response.route('admin.proposal.dcbindex')
    }
    return view.render('admin/proposal/dcb/form', {
      id: id,
      votingProposalDCB: votingProposalDCB
    })
  }

  async govShow ({ response, view, params }) {
    const { id = 0 } = params
    const votingProposalGOV = await VotingProposalGOVDAO.first(id)
    if (votingProposalGOV == undefined) {
      return response.route('admin.proposal.govindex')
    }
    return view.render('admin/proposal/gov/form', {
      id: id,
      votingProposalGOV: votingProposalGOV
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
  async dcbVoterIndex ({ request, view, params }) {
    const { id = 0 } = params
    const {
      email = '',
      page = 1,
      perPage = 20,
      voteAmountFrom,
      voteAmountTo,
      txId = '',
      from_date = '',
      to_date = ''
    } = request.all()
    const votingProposalDCBVotes = await VotingProposalDCBVoteDAO.find({
      votingProposalDCBId: id,
      email: email,
      page: page,
      perPage: perPage,
      voteAmountFrom,
      voteAmountTo,
      txId,
      from_date,
      to_date
    })
    return view.render('admin/proposal/dcb/voter_index', {
      id: id,
      email: email,
      voteAmountFrom,
      voteAmountTo,
      txId,
      from_date,
      to_date,
      page: votingProposalDCBVotes.pages.page,
      perPage: votingProposalDCBVotes.pages.perPage,
      lastPage: votingProposalDCBVotes.pages.lastPage,
      votingProposalDCBVotes: votingProposalDCBVotes.rows
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
  async govVoterIndex ({ request, view, params }) {
    const { id = 0 } = params
    const {
      email = '',
      page = 1,
      perPage = 20,
      voteAmountFrom,
      voteAmountTo,
      txId = '',
      from_date = '',
      to_date = ''
    } = request.all()
    const votingProposalGOVVotes = await VotingProposalGOVVoteDAO.find({
      votingProposalGOVId: id,
      email: email,
      page: page,
      perPage: perPage,
      voteAmountFrom,
      voteAmountTo,
      txId,
      from_date,
      to_date
    })
    return view.render('admin/proposal/gov/voter_index', {
      id: id,
      email: email,
      voteAmountFrom,
      voteAmountTo,
      txId,
      from_date,
      to_date,
      page: votingProposalGOVVotes.pages.page,
      perPage: votingProposalGOVVotes.pages.perPage,
      lastPage: votingProposalGOVVotes.pages.lastPage,
      votingProposalGOVVotes: votingProposalGOVVotes.rows
    })
  }

  async dcbVoterShow ({ response, view, params }) {
    const { parentId = 0, id = 0 } = params
    const votingProposalDCBVote = await VotingProposalDCBVoteDAO.first(id)
    if (
      votingProposalDCBVote == undefined ||
      votingProposalDCBVote.voting_proposal_dcb_id != parentId
    ) {
      return response.route('admin.proposal.dcbvoterindex', { id: parentId })
    }
    return view.render('admin/proposal/dcb/voter_form', {
      id: id,
      votingProposalDCBVote: votingProposalDCBVote
    })
  }

  async govVoterShow ({ response, view, params }) {
    const { parentId = 0, id = 0 } = params
    const votingProposalGOVVote = await VotingProposalGOVVoteDAO.first(id)
    if (
      votingProposalGOVVote == undefined ||
      votingProposalGOVVote.voting_proposal_gov_id != parentId
    ) {
      return response.route('admin.proposal.govvoterindex', { id: parentId })
    }
    return view.render('admin/proposal/gov/voter_form', {
      id: id,
      votingProposalGOVVote: votingProposalGOVVote
    })
  }
}

module.exports = ProposalController
