const { ServiceProvider } = require('@adonisjs/fold')
const moment = require("moment");

class ViewProvider extends ServiceProvider {
  register() {

  }

  boot() {
    const View = this.app.use('Adonis/Src/View')
    View.global('time', () => new Date().getTime())
    View.global('text', (s) => {
      if (s == null || s == undefined) {
        return ''
      }
      return s
    })
    View.global('moment', moment)
    // CREATE LIST PAGE FOR PAGINATION
    View.global('createPageList', (lastPage=1) => {
      let list = [];
      for (let i = 1;i<=lastPage;i++) {
        list.push(i)
      }
      return list;
    })
  }
}

module.exports = ViewProvider
