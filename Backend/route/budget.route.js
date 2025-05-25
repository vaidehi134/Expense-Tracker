import express from "express";
import {
  addAmount,
  addBudget,
  getAllBudgets,
} from "../controller/budget.controller.js";
import { protect } from "../authMiddleware.js";

const router = express.Router();

// router.post("/", addBudget);
// router.get("/", getAllBudgets);
// router.put("/add", addAmount);

//protected routes
router.post("/",protect, addBudget);
router.get("/",protect, getAllBudgets);
router.put("/add",protect, addAmount);

export default router;
