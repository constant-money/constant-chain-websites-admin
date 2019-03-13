
const constantConf = require('../../config/constant')
const request = require('request')

class ConstantApi {
    makeRequest(options) {
        return new Promise(function (resolve, reject) {
            request(options, (error, res, body) => {
                if (error) {
                    reject(error)
                    return
                }
                resolve(body)
            })
        })
    }
    login(email, password) {
        const options = {
            url: `${constantConf.constantApiUrl}/auth/login`,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            json: {
                email: email,
                password: password
            }
        };
        return this.makeRequest(options)
    }
    kyc(token, userId) {
        const options = {
            url: `${constantConf.constantApiUrl}/admin/primetrust/kyc`,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            json: {
                UserID: parseInt(userId, 0),
            }
        };
        return this.makeRequest(options)
    }
}

module.exports = new ConstantApi()