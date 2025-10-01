import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodo,
  updateTodo,
} from "../controllers/todo.controller.js";
import { adminAuth } from "../middleware/auth.js";

const router = express.Router();

router.use(adminAuth);

router.post("/create", createTodo);
router.get("/", getTodo);
router.patch("/update/:id", updateTodo);
router.delete("/delete/:id", deleteTodo);

export default router;
