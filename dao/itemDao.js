let BaseDao = require('./baseDao');
let Item = require('../schema/item')

class ItemDao extends BaseDao {
    constructor() {
        super(Item);
    }
}

function test() {
    let itemDao = new ItemDao();
    // let bookEntity = new Item({title: '三国', author: '罗贯中'});
    // let bookEntity1 = new Item({title: '蓄势待发1', author: '麻花'});
    // let bookEntity2 = new Item({title: '蓄势待发2', author: '麻花'});
    itemDao.create({name: '三国', created_by: '罗贯中'}).then((result) => console.log('create dao-->', result));
    itemDao.save({name: '三国', created_by: '罗贯中中'}).then((result) => console.log('save dao --> ', result));
    itemDao.update({name: '蓄势待发'}, {$set: {author: '开心'}}).then((result) => console.log('update dao--> ', result));
    itemDao.findOne({name: '蓄势待发'}).then((results) => console.log('findOne dao --> ', results));
    // itemDao.findAll({title: '基督山伯爵'}).then((results) => console.log('findOne dao --> ', results));
    // itemDao.remove({title: '蓄势待发'}).then((results) => console.log('remove dal --> ', results));
}

// test()

module.exports = ItemDao;