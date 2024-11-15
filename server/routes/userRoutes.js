import express from "express";
const router = express.Router();
import { registerUser, loginUser } from "../controllers/userController.js";

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Register a new user
 *     description: This endpoint registers a new user.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Invalid input
 */
router.post("/signup", registerUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login a user
 *     description: This endpoint logs in an existing user.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User successfully logged in
 *       401:
 *         description: Unauthorized
 */
router.post("/login", loginUser);

export default router;
