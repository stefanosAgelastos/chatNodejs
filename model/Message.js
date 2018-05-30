const Model = require('objection').Model;

class Message extends Model {
    static get tableName() {
        return 'messages';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            require: ['message'],

            properties: {
                id: {type: "string"},
                username: {type: "string", minLength: 1},
                message: {type: "string", minLength: 1},
                created_at: {type: "string" },
            }
        }        
    }
}

module.exports = Message;