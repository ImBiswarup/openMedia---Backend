const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoute = require('./routes/User');
const postRoute = require('./routes/Post')

const connectToDatabase = require('./DB/Connection');

connectToDatabase('mongodb://127.0.0.1:27017/openMedia');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors()); 
app.use(express.json());

app.use('/api', userRoute);
app.use('/api', postRoute); 
app.use('/api', postRoute); 

app.get('/api/feed', (req, res) => {
  res.send('GET request to the homepage')
})


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



