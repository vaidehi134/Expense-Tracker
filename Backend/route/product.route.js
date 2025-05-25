import express from "express";
import {
  addProduct,
  deleteById,
  editById,
  getById,
  getProduct,
  deleteAll,
} from "../controller/product.controller.js";

import { protect } from "../authMiddleware.js";

const router = express.Router();

// router.get('/' , getProduct);
// router.get('/:id' , getById);
// router.post('/' , addProduct);
// router.patch('/:id' , editById);
// router.delete('/:id' , deleteById);
// router.delete('/' , deleteAll);

//to protect all routes
router.get("/", protect, getProduct);
router.get("/:id", protect, getById);
router.post("/", protect, addProduct);
router.patch("/:id", protect, editById);
router.delete("/:id", protect, deleteById);
router.delete("/", protect, deleteAll);

export default router;
