/**
 * author: Jie Zhu
 * time  : 2018/12/19 10:03
 * desc  : mongoose plugin
 */


/**
 * db record created time plugin。
 *
 * @param schema
 * @param options
 */
function createdAt(schema, options) {
    schema.add({createdAt: Date});
    schema.add({updatedAt: Date});

    schema.pre('save', function (next) {
        let now = Date.now();
        this.createdAt = now;
        this.updatedAt = now;
        next();
    });

    if (options && options.index) {
        schema.path('created_at').index(options.index);
        schema.path('updated_at').index(options.index);
    }
}


/**
 * db record updated time plugin
 *
 * @param schema
 * @param options
 */
function updatedAt(schema, options) {
    schema.pre('update', function (next) {
        this.update({}, {$set: {updatedAt: new Date()}});
        next();
    });

    if (options && options.index) {
        schema.path('updated_at').index(options.index);
    }
}


module.exports = {
    createdAt: createdAt,
    updatedAt: updatedAt,
};