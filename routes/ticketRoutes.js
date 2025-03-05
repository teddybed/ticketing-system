const express = require('express');
const { createTicket, getTickets, updateTicketStatus ,getTicketById} = require('../controllers/ticketController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/tickets', authMiddleware, createTicket);
router.get('/tickets', authMiddleware, getTickets);
router.put('/tickets/:id', [authMiddleware, adminMiddleware], updateTicketStatus);
router.get('/tickets/:id', [authMiddleware, adminMiddleware], getTicketById);


module.exports = router;
