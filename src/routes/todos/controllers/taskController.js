import Task from "../models/Task.js";

// Создать задачу
export const createTask = async (req, res) => {
  try {
    const { title, subtitle } = req.body;
    const task = await Task.create({ title, subtitle, completed: false });

    if (req.headers["accept"] && req.headers["accept"].includes("application/json")) {
      res.status(201).json(task);
    } else {
      res.redirect("/");
    }
  } catch (error) {
    res.status(500).json({ message: "Ошибка при создании задачи" });
  }
};

// Получить все задачи
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    if (req.headers["accept"] && req.headers["accept"].includes("application/json")) {
      res.json(tasks);
    } else {
      res.render("index", { tasks });
    }
  } catch (error) {
    res.status(500).json({ message: "Ошибка при получении задач" });
  }
};

// Обновить задачу по ID
export const updateTask = async (req, res) => {
  try {
    const { title, subtitle } = req.body;
    const completed = req.body.completed === "true";
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, subtitle, completed },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Задача не найдена" });
    }

    if (req.headers["accept"] && req.headers["accept"].includes("application/json")) {
      res.json(task);
    } else {
      res.redirect("/");
    }
  } catch (error) {
    res.status(500).json({ message: "Ошибка при обновлении задачи" });
  }
};

// Удалить задачу по ID
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Задача не найдена" });
    }

    if (req.headers["accept"] && req.headers["accept"].includes("application/json")) {
      res.json({ message: "Задача удалена", task });
    } else {
      res.redirect("/");
    }
  } catch (error) {
    res.status(500).json({ message: "Ошибка при удалении задачи" });
  }
};
