'use strict'

const knex = require('knex')
const ReserveModel = use('ReserveModel')
const Database = use('Database')
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
      fromDate = moment(fromDate, 'DD-MM-YYYY').format('YYYY-MM-DD HH:mm:ss')
      q = q.whereRaw('created_at >= ?', fromDate)
    }
    if (toDate) {
      toDate = moment(toDate, 'DD-MM-YYYY').format('YYYY-MM-DD HH:mm:ss')
      q = q.whereRaw('created_at <= ?', toDate)
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
    q.orderBy('created_at', 'desc')
    return await q.paginate(page, perPage)
  }

  async stats (fromDate, toDate) {
    try {
      const data = await Database.raw(
        `select reserve_type, count(reserve_type) as total_reserves, sum(amount) / 100 as total_reserves_amount
         from reserves
         where created_at between ? and ?
         group by reserve_type
        `,
        [fromDate, toDate]
      )
      return data[0]
    } catch (e) {
      console.log(e)
      return []
    }
  }

  async statsByDate (fromDate, toDate) {
    try {
      const data = await Database.raw(
        `
        select sub1.date, coalesce(r1.total, 0) as total_purchase, coalesce(r1.amount / 100, 0) as total_purchase_amount, coalesce(r2.total, 0) as total_redeem, coalesce(r2.amount / 100,0) as total_redeem_amount
from (
select * from
(select adddate("1970-01-01",t4.i*10000 + t3.i*1000 + t2.i*100 + t1.i*10 + t0.i) date from
 (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t0,
 (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t1,
 (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t2,
 (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t3,
 (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t4) v
where date between ? and ?
) sub1
left outer join (
	select count(*) as total, sum(amount) as amount, date(created_at) as d
	from reserves
	where reserve_type = 0
	group by date(created_at)
) r1
on sub1.date = r1.d
left outer join (
	select count(*) as total, sum(amount) as amount, date(created_at) as d
	from reserves
	where reserve_type = 1
	group by date(created_at)
) r2
on sub1.date = r2.d
order by sub1.date asc
        `,
        [fromDate, toDate]
      )
      return data[0]
    } catch (e) {
      console.log(e)
      return []
    }
  }
}

module.exports = new Reserve()
