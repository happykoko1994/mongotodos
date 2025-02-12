import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./router.js";

const app = express();

// Настроим CORS
app.use(cors());

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Успешное подключение к MongoDB"))
  .catch((error) => console.error("❌ Ошибка подключения:", error));

app.use(router);

app.listen(3000, () => console.log("🚀 Сервер запущен на порту 3000"));
