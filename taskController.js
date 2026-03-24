import Task from "../models/task.model.js";

// CREATE TASK
export const createTask = async (req, res) => {
  try {

    const task = new Task({
      ...req.body,
      user: req.user.id
    });

    await task.save();

    res.status(201).json(task);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};


// GET TASKS
export const getTasks = async (req, res) => {

  try {

    const tasks = await Task.find({ user: req.user.id });

    res.json(tasks);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};


// UPDATE TASK
export const updateTask = async (req, res) => {

  try {

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(task);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};


// DELETE TASK
export const deleteTask = async (req, res) => {

  try {

    await Task.findByIdAndDelete(req.params.id);

    res.json({ message: "Task deleted" });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};