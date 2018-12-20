let { Schema } = require('mongoose');
let { mongoClient } = require('../utils/mongo');

const userSchema = new Schema(
    {
        name: {type: String},
        pwd: {type: String},
        email: {type: String, default: ''}
    },
    {
        runSettersOnQuery: true
    }
)

/**
 * add plugin
 */
function plug() {
    let plugin = require('../utils/plugin');
    userSchema.plugin(plugin.createdAt);
    userSchema.plugin(plugin.updatedAt);
};
plug()

/**
 * 参数一要求与 Model 名称一致
 * 参数二为 Schema
 * 参数三为映射到 MongoDB 的 Collection 名
 */
let User = mongoClient.model('User', userSchema, 'user');

module.exports = User;



// UserModel.prototype.save = function(callback) {
// var md5 = crypto.createHash('md5'),
//     email_MD5 = md5.update(this.email.toLowerCase()).digest('hex'),
//     head = "http://www.gravatar.com/avatar/" + email_MD5 + "?s=48";

// var user = {
//     name: this.name,
//     password: this.password,
//     email: this.email,
//     head: head
// };