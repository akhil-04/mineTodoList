//mongoose required here
const mongoose = require('mongoose');
//creating the schema
const todoSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
    required: true
    }
});

//table name or model name
const Todo = mongoose.model('todo ', todoSchema);

//exports this data to server file
module.exports = Todo;