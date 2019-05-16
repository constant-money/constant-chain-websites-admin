'use strict'

const moment = require('moment')
const ReserveDAO = use('ReserveDAO')

class ReserveController {
  status (statusCode) {
    let statusStr
    switch (statusCode) {
      case 0:
        statusStr = 'Pending'
        break
      case 1:
        statusStr = 'Purchasing'
        break
      case 2:
        statusStr = 'Token is minting'
        break
      case 3:
        statusStr = 'Token is burning'
        break
      case 4:
        statusStr = 'Token is burned'
        break
      case 5:
        statusStr = 'Token is transferring'
        break
      case 6:
        statusStr = 'Redeeming'
        break
      case 7:
        statusStr = 'Cancelled'
        break
      case 8:
        statusStr = 'Done'
        break
      case 9:
        statusStr = 'Holding'
        break
      case 10:
        statusStr = 'Failed to burn token'
        break
      case 11:
        statusStr = 'Failed to mint token'
        break
    }
    return statusStr
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
  async index ({ request, view }) {
    const {
      email = '',
      txId = '',
      type = 'purchase',
      page = 1,
      perPage = 20
    } = request.all()
    try {
      const reserveQ = await ReserveDAO.find({
        email,
        txId,
        type,
        page,
        perPage
      })
      reserveQ.rows.forEach(reserve => {
        reserve.statusStr = this.status(reserve.status)
      })
      return view.render('admin/reserve/reserve', {
        email,
        txId,
        page: reserveQ.pages.page,
        perPage: reserveQ.pages.perPage,
        lastPage: reserveQ.pages.lastPage,
        reserves: reserveQ.rows,
        type
      })
    } catch (e) {
      console.log(e.stack)
    }
  }

  async show ({ response, view, params }) {
    const { id } = params
    const reserve = await ReserveDAO.first(id)
    if (!reserve) {
      return response.route('admin.reserve.index')
    }
    if (reserve.reserve_type == 0) {
      reserve.reserveTypeStr = 'Purchase'
    } else {
      reserve.reserveTypeStr = 'Redeem'
    }
    reserve.beautifulExtRequest = JSON.stringify(
      JSON.parse(reserve.ext_request),
      null,
      '\t'
    )
    reserve.beautifulExtResponse = JSON.stringify(
      JSON.parse(reserve.ext_response),
      null,
      '\t'
    )
    reserve.statusStr = this.status(reserve.status)
    return view.render('admin/reserve/show', {
      id: id,
      reserve
    })
  }

  async dashboard ({ request, view }) {
    let { dateRange, userId } = request.all()
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

    const stats = ReserveDAO.stats({ userId, fromDate, toDate })
    const statsByDate = ReserveDAO.statsByDate({ userId, fromDate, toDate })
    const data = await Promise.all([stats, statsByDate])

    if (!dateRange) {
      dateRange =
        moment.utc(fromDate).format('DD/MM/YYYY') +
        ' - ' +
        moment.utc(toDate).format('DD/MM/YYYY')
    }
    return view.render('admin/reserve/dashboard', {
      dateRange,
      userId,
      stats: data[0],
      statsByDate: data[1]
    })
  }
}

module.exports = ReserveController
