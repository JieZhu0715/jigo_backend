let { Schema } = require('mongoose');
let { mongoClient } = require('../utils/mongo');
let crypto = require('crypto');
let autoIncrement = require('mongoose-auto-increment');
let plugin = require('../utils/plugin');

const userSchema = new Schema(
    {
        name: {type: String, required: true, default: ''},
        email: { type: String, required: true, validate: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/ },
        img_url: { type: String, default: '' },
        introduce: { type: String, default: '' },
        avatar: { type: String, default: 'user' },
        password: {
            type: String,
            required: true,
            default: crypto
                .createHash('md5')
                .update('root')
                .digest('hex'),
        },
        // use_type => 0 normal / 1 admin / -1 deleted / -2 blocked
        user_type: { type: Number, default: 0}
    },
    {
        runSettersOnQuery: true
    }
)

/**
 * add plugin
 */
userSchema.plugin(plugin.createdAt);
userSchema.plugin(plugin.updatedAt);

let User = mongoClient.model('User', userSchema);
module.exports = User;