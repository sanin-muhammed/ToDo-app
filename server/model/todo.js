const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    taskname: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

const Todo = mongoose.model("tasks", todoSchema);
module.exports = Todo;
