class CommonUtils {
    getTotalPage(total, limit) {
        if (total % limit == 0) {
            return total / limit
        } else {
            return Math.floor(total / limit) + 1
        }
        return 0
    }
}

module.exports = new CommonUtils()