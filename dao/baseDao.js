/**
 * author: jzhu
 * time  : 2018/12/19 10:40
 */

class BaseDao {
    constructor(Model) {
        this.Model = Model;
    }


    /**
     * @returns {Promise}
     */
    create(obj) {
        return new Promise((resolve, reject) => {
            let entity = new this.Model(obj);
            this.Model.create(entity, (error, result) => {
                if (error) {
                    console.log('create error--> ', error);
                    reject(error);
                } else {
                    console.log('create result--> ', result);
                    resolve(result)
                }
            });
        });
    }


    /**
     * @returns {Promise}
     */
    save(obj) {
        return new Promise((resolve, reject) => {
            let entity = new this.Model(obj);
            entity.save((error, result) => {
                if (error) {
                    console.log('save error--> ', error);
                    reject(error);
                } else {
                    console.log('save result--> ', result);
                    resolve(result)
                }
            });
        });
    }


    /**
     *
     * @param condition 
     * @param constraints
     * @returns {Promise}
     */
    findAll(condition, constraints) {
        return new Promise((resolve, reject) => {
            this.Model.find(condition, constraints ? constraints : null, (error, results) => {
                if (error) {
                    console.log('findAll error--> ', error);
                    reject(error);
                } else {
                    console.log('findAll results--> ', results);
                    resolve(results);
                }
            });
        })
    }

        /**
     *
     * @param condition 
     * @param constraints
     * @param options 
     * {
        skip:0, // Starting Row
        limit:10, // Ending Row
        sort:{
            dateAdded: -1 //Sort by Date Added DESC
        }
     * @returns {Promise}
     */
    findAll(condition, constraints, options) {
        return new Promise((resolve, reject) => {
            this.Model.find(condition, constraints ? constraints : null, options, (error, results) => {
                if (error) {
                    console.log('findAll error--> ', error);
                    reject(error);
                } else {
                    console.log('findAll results--> ', results);
                    resolve(results);
                }
            });
        })
    }

    /**
     *
     * @param condition 
     * @param constraints
     * @returns {Promise}
     */
    findAllAndPopulate(condition, constraints, populate_reference) {
        return new Promise((resolve, reject) => {
            this.Model.find(condition, constraints ? constraints : null)
            .populate(populate_reference)
            .exec(function (error, results) {
                if (error) {
                    console.log('findAll error--> ', error);
                    reject(error);
                } else {
                    console.log('findAll results--> ', results);
                    resolve(results);
                }
            });
        });
    }


    /**
     *
     * @param condition 
     * @param constraints
     * @returns {Promise}
     */
    findAllAndPopulate(condition, constraints, populate_reference, populate_reference2) {
        return new Promise((resolve, reject) => {
            this.Model.find(condition, constraints ? constraints : null)
            .populate(populate_reference)
            .populate(populate_reference2)
            .exec(function (error, results) {
                if (error) {
                    console.log('findAll error--> ', error);
                    reject(error);
                } else {
                    console.log('findAll results--> ', results);
                    resolve(results);
                }
            });
        });
    }



    /**
     * @param condition
     * @param constraints
     * @returns {Promise}
     */
    findOne(condition, constraints) {
        return new Promise((resolve, reject) => {
            this.Model.findOne(condition, constraints ? constraints : null, (error, results) => {
                if (error) {
                    console.log('findOne error--> ', error);
                    reject(error);
                } else {
                    console.log('findOne results--> ', results);
                    resolve(results);
                }
            });
        });
    }



    /**
     * @param condition
     * @param constraints
     * @returns {Promise}
     */
    findOneAndPopulate(condition, constraints, populate_reference) {
        return new Promise((resolve, reject) => {
            this.Model.findOne(condition, constraints ? constraints : null)
                .populate(populate_reference)
                .exec(function (error, result) {
                    if (error)
                    {
                        console.log('findOne error--> ', error);
                        reject(error);
                    } 
                    else 
                    {
                        console.log(result)
                        resolve(result);
                    }
                  });
        });
    }


    /**
     * @param condition
     * @param orderColumn
     * @param orderType
     * @returns {Promise}
     */
    findOneByOrder(condition, orderColumn, orderType) {
        return new Promise((resolve, reject) => {
            this.Model.findOne(condition)
                .sort({[orderColumn]: orderType})
                .exec(function (err, record) {
                    console.log(record);
                    if (err) {
                        reject(err);
                    } else {
                        resolve(record);
                    }
                });
        });
    }


    /**
     * @param condition 查找条件
     * @param updater 更新操作
     * @returns {Promise}
     */
    update(condition, updater) {
        return new Promise((resolve, reject) => {
            this.Model.update(condition, updater, (error, results) => {
                if (error) {
                    console.log('update error--> ', error);
                    reject(error);
                } else {
                    console.log('update results--> ', results);
                    resolve(results);
                }
            });
        });

        // this.model.findOneAndUpdate(condition, update, {new: true, upsert: true}, (err, record) => {
        //     if (err) {
        //         log.warn(`Failed updating database, condition: ${JSON.stringify(condition)}, update: ${JSON.stringify(update)}, error: ${err}`);
        //         reject(err);
        //     } else {
        //         log.info(`Database updated for ${JSON.stringify(condition)} with ${JSON.stringify(update)}`);
        //         resolve(record);
        //     }
        // });
    }


    /**
     * @param condition 查找条件
     * @returns {Promise}
     */
    remove(condition) {
        return new Promise((resolve, reject) => {
            this.Model.remove(condition, (error, result) => {
                if (error) {
                    console.log('remove error--> ', error);
                    reject(error);
                } else {
                    console.log('remove result--> ', result);
                    resolve(result);
                }
            });
        });
    }
}

module.exports = BaseDao;