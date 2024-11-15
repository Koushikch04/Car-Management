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

/**
 * @swagger
 * /cars:
 *   post:
 *     summary: Add a new car
 *     description: This endpoint adds a new car to the system.
 *     tags:
 *       - Cars
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - title
 *               - description
 *               - tags
 *     responses:
 *       200:
 *         description: Car added successfully
 *       400:
 *         description: Bad request
 */
router.post("/", uploadMultiple("images", 10), authMiddleware, addCar);

/**
 * @swagger
 * /cars:
 *   get:
 *     summary: Get all cars
 *     description: This endpoint retrieves all the cars.
 *     tags:
 *       - Cars
 *     responses:
 *       200:
 *         description: List of cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 */
router.get("/", authMiddleware, getCars);

/**
 * @swagger
 * /cars/{id}:
 *   get:
 *     summary: Get car by ID
 *     description: This endpoint retrieves a car by its ID.
 *     tags:
 *       - Cars
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the car to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Car details
 *       404:
 *         description: Car not found
 */
router.get("/:id", authMiddleware, getCarById);

/**
 * @swagger
 * /cars/{id}:
 *   put:
 *     summary: Update a car's information
 *     description: This endpoint updates a car by its ID.
 *     tags:
 *       - Cars
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the car to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - title
 *               - description
 *               - tags
 *     responses:
 *       200:
 *         description: Car updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Car not found
 */
router.put("/:id", authMiddleware, updateCar);

/**
 * @swagger
 * /cars/{id}:
 *   delete:
 *     summary: Delete a car
 *     description: This endpoint deletes a car by its ID.
 *     tags:
 *       - Cars
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the car to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Car deleted successfully
 *       404:
 *         description: Car not found
 */
router.delete("/:id", authMiddleware, deleteCar);

export default router;
