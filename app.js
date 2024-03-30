require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToDatabase = require('./DB/Connection');

const app = express();
const PORT = process.env.PORT;

// Connect to MongoDB
connectToDatabase(process.env.DB_URL);

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
const userRoute = require('./routes/User');
app.use('/user', userRoute);

// Error Handling Middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: 'Internal Server Error' });
// });

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
