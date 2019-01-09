let BaseDao = require('./baseDao');
let Item = require('../schema/item')

class ItemDao extends BaseDao {
    constructor() {
        super(Item);
    }
}

module.exports = ItemDao;