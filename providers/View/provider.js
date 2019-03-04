const { ServiceProvider } = require('@adonisjs/fold')
const moment = require("moment");

class ViewProvider extends ServiceProvider {
  register() {

  }

  boot() {
    const UserModel = this.app.use('App/Models/User')
    const View = this.app.use('Adonis/Src/View')
    View.global('time', () => new Date().getTime())
    View.global('toText', (s) => {
      if (s == null || s == undefined) {
        return ''
      }
      return String(s).trim()
    })
    View.global('toInt', (s) => {
      if (s == null || s == undefined) {
        return 0
      }
      try {
        return parseInt(s)
      } catch (e) {
        return 0
      }
    })
    View.global('pageNumbers', (page, lastPage) => {
      let pageNumbers = []
      let pageTmps = []
      for (let i = 1; i <= lastPage; i++) {
        if (i == 1 || i == 2 || i == lastPage - 1 || i == lastPage) {
          pageTmps.push(i)
        } else if ((i - page) >= -2 && (i - page) <= 2) {
          pageTmps.push(i)
        } else if (page <= 3 && i <= 5) {
          pageTmps.push(i)
        } else if (page >= lastPage - 2 && i >= lastPage - 4) {
          pageTmps.push(i)
        }
      }
      for (let i = 0; i < pageTmps.length; i++) {
        pageNumbers.push(pageTmps[i])
        if (i < (pageTmps.length - 1) && pageTmps[i] != (pageTmps[i + 1] - 1)) {
          pageNumbers.push(-1)
        }
      }
      return pageNumbers
    })
    View.global('currency', (amount, symbol) => {
      return String(`${amount} ${symbol}`).trim()
    })
    View.global('statusText', (statusInts, statusTexts, status) => {
      if (statusTexts.length != statusInts.length) {
        return ''
      }
      for (let i = 0; i < statusInts.length; i++) {
        if (statusInts[i] == status) {
          return statusTexts[i]
        }
      }
      return ''
    })
    View.global('permission', (vPermissions, method, action) => {
      console.log(vPermissions)
      if(vPermissions == null || vPermissions == undefined) {
        return true
      }
      if (vPermissions.includes(`${method}_${action}`)) {
        return true
      }
      return false
    })
    View.global('constant', require('../../const'))
    View.global('moment', moment)

    View.global('formatJSON', (jsonString) => {
      try {
        const obj = JSON.parse(jsonString)
        const jsonStrFormat = JSON.stringify(obj, null, '\t');
        return jsonStrFormat;
      } catch (error) {
        return jsonString
      }
    })
  }
}

module.exports = ViewProvider
