const express = require('express');
const connectDB = require('./config/dbConfig');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/', authRoutes);
app.use('/', ticketRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
