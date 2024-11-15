import express from "express";
import {
  addCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
} from "../controllers/carController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload, { uploadMultiple } from "../middleware/upload.js";

const router = express.Router();

router.post("/", uploadMultiple("images", 10), authMiddleware, addCar); // POST /api/cars
router.get("/", authMiddleware, getCars); // GET /api/cars
router.get("/:id", authMiddleware, getCarById); // GET /api/cars/:id
router.put("/:id", authMiddleware, updateCar); // PUT /api/cars/:id
router.delete("/:id", authMiddleware, deleteCar); // DELETE /api/cars/:id

export default router;
