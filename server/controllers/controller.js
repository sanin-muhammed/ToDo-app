const express = require("express");
const Todo = require("../model/todo");

exports.get_all_tasks = async (req, res) => {
    try {
        const tasks = await Todo.find();
        console.log("tasks = ", tasks);

        res.status(200).json({ error: false, status: true, message: "find all tasks successfully", data: tasks });
        console.log("find all tasks successfully".bold.yellow);
    } catch (error) {
        console.log("server error".bold.red);
        res.status(500).json({ error: true, status: false, message: "server error" });
    }
};
exports.add_task = async (req, res) => {
    console.log(req.body);
    try {
        const { taskname, description } = req.body;
        const task = new Todo({ taskname, description });
        await task.save();
        console.log("new task = ", task);
        
        res.status(200).json({ error: false, status: true, message: "task added successfully" });
        console.log("task added successfully".bold.yellow);
    } catch (error) {
        console.log("server error".bold.red);
        res.status(500).json({ error: true, status: false, message: "server error" });
    }
};
exports.update_task = async (req, res) => {
    console.log(req.params);
    console.log(req.body);
    try {
        const {id} = req.params
        const { taskname, description } = req.body;
        const task = await Todo.findByIdAndUpdate(id,{taskname,description});
        console.log("updated task = ", task);

        res.status(200).json({ error: false, status: true, message: "task updated successfully" });
        console.log("task updated successfully".bold.yellow);
    } catch (error) {
        console.log("server error".bold.red);
        res.status(500).json({ error: true, status: false, message: "server error" });
    }
};
exports.delete_task = async (req, res) => {
    console.log(req.params);
    try {
        const {id} = req.params
        const task = await Todo.findByIdAndDelete(id);
        console.log("deleted task = ", task);

        res.status(200).json({ error: false, status: true, message: "task deleted successfully" });
        console.log("task deleted successfully".bold.yellow);
    } catch (error) {
        console.log("server error".bold.red);
        res.status(500).json({ error: true, status: false, message: "server error" });
    }
};
