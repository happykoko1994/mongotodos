import { body, validationResult } from 'express-validator';
import Task from "../models/Task.js";

// Создать задачу
export const createTask = [
  body('title')
  .notEmpty().withMessage('Название задачи обязательно')
  .isLength({ min: 3, max: 50 }).withMessage('Название должно содержать от 3 до 50 символов')
  .trim(),
body('subtitle')
  .optional()
  .isLength({ max: 100 }).withMessage('Описание не должно превышать 100 символов')
  .trim(),  
  async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      const tasks = await Task.find();
      return res.render('index', {
        tasks,
        errors: errors.array()
      });
    }

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
  }
];

// Получить все задачи
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    if (req.headers["accept"] && req.headers["accept"].includes("application/json")) {
      res.json(tasks);
    } else {
      res.render("index", { tasks, errors: [] });
    }
  } catch (error) {
    res.status(500).json({ message: "Ошибка при получении задач" });
  }
};

// Обновить задачу по ID
export const updateTask = [
  // Валидация полей
 body('title')
    .notEmpty().withMessage('Название задачи обязательно')
    .isLength({ min: 3, max: 50 }).withMessage('Название должно содержать от 3 до 50 символов')
    .trim(),
  body('subtitle')
    .optional()
    .isLength({ max: 100 }).withMessage('Описание не должно превышать 100 символов')
    .trim(),  
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const tasks = await Task.find();
      return res.render('index', {
        tasks,
        errors: errors.array()
      });
    }

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
  }
];

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
