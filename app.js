require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToDatabase = require('./DB/Connection');
const userRoute = require('./routes/User');
const postRoute = require('./routes/Posts');

const app = express();
const PORT = process.env.PORT;

connectToDatabase(process.env.DB_URL);

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/user', userRoute);
app.use('/post', postRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
