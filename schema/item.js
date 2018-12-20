let { Schema } = require('mongoose');
let { mongoClient } = require('../utils/mongo');

const itemSchema = new Schema(
    {
        name: String,
        description: { type: String, default: '' },
        created_by: { type: String, lowercase: true }, // lowercase needs setters
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
    itemSchema.plugin(plugin.createdAt);
    itemSchema.plugin(plugin.updatedAt);
};
plug()

/**
 * 参数一要求与 Model 名称一致
 * 参数二为 Schema
 * 参数三为映射到 MongoDB 的 Collection 名
 */
let Item = mongoClient.model('Item', itemSchema, 'item');

module.exports = Item;