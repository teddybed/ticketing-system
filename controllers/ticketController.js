const Ticket = require('../models/Ticket');

const createTicket = async (req, res) => {
  const { title, description } = req.body;
  const newTicket = new Ticket({
    title,
    description,
    user: req.user._id,
  });

  try {
    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getTickets = async (req, res) => {
  try {
    if (req.user.role === 'admin') {
      const tickets = await Ticket.find();
      return res.status(200).json(tickets);
    }

    const tickets = await Ticket.find({ user: req.user._id });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateTicketStatus = async (req, res) => {
  const { status } = req.body;

  try {
    console.log("Request received with ID:", req.params.id);
    console.log("Request body:", req.body);
    
    const ticket = await Ticket.findById(req.params.id);
    
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    ticket.status = status;
    await ticket.save();

    res.status(200).json(ticket);
  } catch (error) {
    console.error("Error updating ticket status:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const getTicketById = async (req, res) => {
  try {
    console.log("Request received with ID:", req.params.id);

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json(ticket);
  } catch (error) {
    console.error("Error fetching ticket:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = { createTicket, getTickets, updateTicketStatus ,getTicketById};
