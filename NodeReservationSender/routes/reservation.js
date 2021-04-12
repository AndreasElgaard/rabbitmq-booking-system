const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservation/reservationController");

/**
 * @swagger
 * tags:
 *   name: Room Reservation
 *   description: Make a reservation here. 
 */

/**
 * @swagger
 * /reservations:
 *   post:
 *     summary: Send a reservation to rabbitmq. 
 *     tags: [Reservation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               guest:
 *                 type: string
 *                 required: true
 *               roomnumber:
 *                 type: integer
 *                 required: true
 *               comments:
 *                 type: string
 *                 required: false
 *     responses:
 *       200:
 *         description: Your reservation has been sent
 */
router.post("/", reservationController.reserve);

module.exports = router;