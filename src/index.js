import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import methodOverride from "method-override";
import { fileURLToPath } from "url";
import router from "./router.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());

app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "../public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Успешное подключение к MongoDB"))
  .catch((error) => console.error("❌ Ошибка подключения:", error));

app.use(router);

app.listen(3000, () => console.log("🚀 Сервер запущен на порту 3000"));
