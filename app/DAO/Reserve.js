'use strict'

const ReserveModel = use('ReserveModel')
const moment = require('moment')

class Reserve {
  async first (id) {
    return await ReserveModel.query()
      .whereNull('deleted_at')
      .where('id', id)
      .first()
  }

  async find ({
    id,
    email,
    page,
    perPage,
    status,
    txId = '',
    fromDate = '',
    toDate = '',
    type = 'purchase'
  }) {
    let q = ReserveModel.query()
      .with('user')
      .whereNull('deleted_at')

    if (type == 'purchase') {
      q = q.where('reserve_type', '=', 0)
    } else {
      q = q.where('reserve_type', '=', 1)
    }

    if (id) {
      q = q.where('id', '=', id)
    }
    if (txId) {
      q = q.where('tx_id', 'like', `${txId}%`)
    }
    if (fromDate) {
      from_date = moment(from_date, 'DD-MM-YYYY').format('YYYY-MM-DD HH:mm:ss')
      q = q.whereRaw('created_at >= ?', from_date)
    }
    if (toDate) {
      to_date = moment(to_date, 'DD-MM-YYYY').format('YYYY-MM-DD HH:mm:ss')
      q = q.whereRaw('created_at <= ?', to_date)
    }
    if (email != '') {
      q.whereExists(function () {
        this.from('users')
          .whereRaw('users.id = reserves.user_id')
          .where('users.email', 'like', '%' + email + '%')
      })
    }
    if (status) {
      q = q.where('status', '=', status)
    }
    return await q.paginate(page, perPage)
  }
}

module.exports = new Reserve()
