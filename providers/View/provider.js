const { ServiceProvider } = require('@adonisjs/fold')

class ViewProvider extends ServiceProvider {
  register() {

  }

  boot() {
    const View = this.app.use('Adonis/Src/View')
    View.global('time', () => new Date().getTime())
  }
}

module.exports = ViewProvider