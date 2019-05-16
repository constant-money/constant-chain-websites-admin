'use strict'

const UserDAO = use('UserDAO')
const VotingBoardCandidateDAO = use('VotingBoardCandidateDAO')
const VotingProposalDCBDAO = use('VotingProposalDCBDAO')
const VotingProposalGOVDAO = use('VotingProposalGOVDAO')
const moment = require('moment')

class HomeController {
  async index ({ request, view }) {
    let { dateRange } = request.all()
    const ranges = dateRange ? dateRange.split('-') : []
    const fromDate =
      ranges.length > 0
        ? moment.utc(ranges[0].trim(), 'DD/MM/YYYY').format('YYYY-MM-DD')
        : moment
          .utc()
          .subtract(7, 'days')
          .format('YYYY-MM-DD')
    const toDate =
      ranges.length > 0
        ? moment.utc(ranges[1].trim(), 'DD/MM/YYYY').format('YYYY-MM-DD')
        : moment.utc().format('YYYY-MM-DD')
    const totalUsers = UserDAO.totalUsers()
    const totalCandidates = VotingBoardCandidateDAO.totalCandidates()
    const totalDCBProposals = VotingProposalDCBDAO.totalDCBProposals()
    const totalGOVProposals = VotingProposalGOVDAO.totalGOVProposals()

    const data = await Promise.all([
      totalUsers,
      totalCandidates,
      totalDCBProposals,
      totalGOVProposals
    ])

    if (!dateRange) {
      dateRange =
        moment.utc(fromDate).format('DD/MM/YYYY') +
        ' - ' +
        moment.utc(toDate).format('DD/MM/YYYY')
    }

    return view.render('admin.index', {
      dateRange,
      totalUsers: data[0][0].total,
      totalDCB: data[1][0].total_dcb,
      totalGOV: data[1][0].total_gov,
      totalDCBProposals: data[2][0].total,
      totalGOVProposals: data[3][0].total
    })
  }
}

module.exports = HomeController
