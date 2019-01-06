let BaseDao = require('./baseDao');
let Request = require('../schema/request')

class RequestDao extends BaseDao {
    constructor() {
        super(Request);
    }
}

module.exports = RequestDao;