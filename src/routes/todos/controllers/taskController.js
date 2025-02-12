import Task from "../models/Task.js";

// Создать задачу
export const createTask = async (req, res) => {
  try {
    const { title, subtitle } = req.body;
    const task = await Task.create({ title, subtitle, completed: false });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при создании задачи" });
  }
};

// Получить все задачи
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при получении задач" });
  }
};

// Обновить задачу по ID
export const updateTask = async (req, res) => {
  try {
    const { title, subtitle, completed } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, subtitle, completed },
      { new: true }
    );
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при обновлении задачи" });
  }
};

// Удалить задачу по ID
export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Задача удалена" });
  } catch (error) {
    res.status(500).json({ message: "Ошибка при удалении задачи" });
  }
};
