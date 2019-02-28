
const constantConf = require('../../config/constant')
const request = require('request')

class ConstantApi {
    doPostJson(url, json) {
        return new Promise(function (resolve, reject) {
            request.post(url, {
                json: json
            }, (error, res, body) => {
                if (error) {
                    reject(error)
                    return
                }
                resolve(body)
            })
        })
    }
    login(email, password) {
        const url = `${constantConf.constantApiUrl}/auth/login`
        return this.doPostJson(url, {
            email: email,
            password: password
        })
    }
}

module.exports = new ConstantApi()