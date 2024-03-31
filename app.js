require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToDatabase = require('./DB/Connection');

const app = express();
const PORT = process.env.PORT;

connectToDatabase(process.env.DB_URL);

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const userRoute = require('./routes/User');
app.use('/user', userRoute);

const postRoute = require('./routes/Posts');
app.use('/post', postRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
