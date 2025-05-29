import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { ParkingZoneController } from "../controllers/ParkingZoneController";
import { TicketController } from "../controllers/TicketController";
import { PaymentController } from "../controllers/PaymentController";
import { RoleController } from "../controllers/RoleController";
import { RegistrationPlateController } from "../controllers/RegistrationPlateController";
import { ParkingSpotController } from "../controllers/ParkingSpotContoller";
import { authMiddleware } from "../middleware/authMiddleware";
import { AuthController } from "../controllers/AuthController";

const router = Router();

const authController = new AuthController();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication endpoints
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login a user
 *     description: Authenticates a user and returns an access token and a refresh token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 format: password
 *                 example: strongPassword123
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 refreshToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid email or password
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     description: Creates a new user with roles. Password is hashed before saving.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - username
 *               - password
 *               - roles
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 format: password
 *                 example: strongPassword123
 *               roles:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2]
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *       400:
 *         description: Email or username already in use, or invalid roles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email or username already in use
 *
 *
 * /api/auth/refresh:
 *   post:
 *     tags: [Auth]
 *     summary: Refresh access token
 *     description: Generate a new access token by providing a valid refresh token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: New access token issued
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid refresh token
 */

router.use("/auth", authController.router);

// Protect everything below with authMiddleware
router.use(authMiddleware);

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: List of users
 *   post:
 *     tags: [Users]
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created
 *
 * /api/users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not found
 *   put:
 *     tags: [Users]
 *     summary: Update user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated
 *       404:
 *         description: User not found
 *   delete:
 *     tags: [Users]
 *     summary: Delete user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: User deleted
 */
const registerRoutes = (path: string, controller: any) => {
  router.get(`/${path}`, controller.all.bind(controller));
  router.get(`/${path}/:id`, controller.one.bind(controller));
  router.post(`/${path}`, controller.save.bind(controller));
  router.put(`/${path}/:id`, controller.update.bind(controller));
  router.delete(`/${path}/:id`, controller.delete.bind(controller));
};

registerRoutes("users", new UserController());

/**
 * @swagger
 * /api/roles:
 *   get:
 *     tags: [Roles]
 *     summary: Get all roles
 *     responses:
 *       200:
 *         description: List of roles
 *   post:
 *     tags: [Roles]
 *     summary: Create a new role
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Role'
 *     responses:
 *       201:
 *         description: Role created
 *
 * /api/roles/{id}:
 *   get:
 *     tags: [Roles]
 *     summary: Get role by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Role details
 *       404:
 *         description: Role not found
 *   put:
 *     tags: [Roles]
 *     summary: Update role by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Role'
 *     responses:
 *       200:
 *         description: Role updated
 *       404:
 *         description: Role not found
 *   delete:
 *     tags: [Roles]
 *     summary: Delete role by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Role deleted
 */
registerRoutes("roles", new RoleController());

registerRoutes("plates", new RegistrationPlateController());

/**
 * @swagger
 * /api/zones:
 *   get:
 *     tags: [Zones]
 *     summary: Get all parking zones
 *     responses:
 *       200:
 *         description: List of zones
 *   post:
 *     tags: [Zones]
 *     summary: Create a new parking zone
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ParkingZone'
 *     responses:
 *       201:
 *         description: Zone created
 *
 * /api/zones/{id}:
 *   get:
 *     tags: [Zones]
 *     summary: Get parking zone by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Zone details
 *       404:
 *         description: Zone not found
 *   put:
 *     tags: [Zones]
 *     summary: Update parking zone by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ParkingZone'
 *     responses:
 *       200:
 *         description: Zone updated
 *       404:
 *         description: Zone not found
 *   delete:
 *     tags: [Zones]
 *     summary: Delete parking zone by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Zone deleted
 */
registerRoutes("zones", new ParkingZoneController());

/**
 * @swagger
 * /api/spots:
 *   get:
 *     tags: [Spots]
 *     summary: Get all parking spots
 *     responses:
 *       200:
 *         description: List of spots
 *   post:
 *     tags: [Spots]
 *     summary: Create a new parking spot
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ParkingSpot'
 *     responses:
 *       201:
 *         description: Spot created
 *
 * /api/spots/{id}:
 *   get:
 *     tags: [Spots]
 *     summary: Get parking spot by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Spot details
 *       404:
 *         description: Spot not found
 *   put:
 *     tags: [Spots]
 *     summary: Update parking spot by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ParkingSpot'
 *     responses:
 *       200:
 *         description: Spot updated
 *       404:
 *         description: Spot not found
 *   delete:
 *     tags: [Spots]
 *     summary: Delete parking spot by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Spot deleted
 */
registerRoutes("spots", new ParkingSpotController());

/**
 * @swagger
 * /api/tickets:
 *   get:
 *     tags: [Tickets]
 *     summary: Get all tickets
 *     responses:
 *       200:
 *         description: List of tickets
 *   post:
 *     tags: [Tickets]
 *     summary: Create a new ticket
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ticket'
 *     responses:
 *       201:
 *         description: Ticket created
 *
 * /api/tickets/{id}:
 *   get:
 *     tags: [Tickets]
 *     summary: Get ticket by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ticket details
 *       404:
 *         description: Ticket not found
 *   put:
 *     tags: [Tickets]
 *     summary: Update ticket by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ticket'
 *     responses:
 *       200:
 *         description: Ticket updated
 *       404:
 *         description: Ticket not found
 *   delete:
 *     tags: [Tickets]
 *     summary: Delete ticket by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Ticket deleted
 */
registerRoutes("tickets", new TicketController());

/**
 * @swagger
 * /api/payments:
 *   get:
 *     tags: [Payments]
 *     summary: Get all payments
 *     responses:
 *       200:
 *         description: List of payments
 *   post:
 *     tags: [Payments]
 *     summary: Create a new payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       201:
 *         description: Payment created
 *
 * /api/payments/{id}:
 *   get:
 *     tags: [Payments]
 *     summary: Get payment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Payment details
 *       404:
 *         description: Payment not found
 *   put:
 *     tags: [Payments]
 *     summary: Update payment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       200:
 *         description: Payment updated
 *       404:
 *         description: Payment not found
 *   delete:
 *     tags: [Payments]
 *     summary: Delete payment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Payment deleted
 */
registerRoutes("payments", new PaymentController());

export default router;
