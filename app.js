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
app.use('/api/posts', postRoute);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  });
  
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// Register route
// app.post('/api/register', async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         let user = await User.findOne({ email });
//         if (user) {
//             return res.status(400).json({ message: 'User already exists' });
//         }
//         user = await User.create({ email, password });
//         return res.status(201).json({ message: 'User created successfully', user });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// });

// signup route

// Multer storage configuration
// const storage = multer.diskStorage({
//     destination: './uploads/',
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

// // Multer upload configuration
// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 5000000 } 
// }).single('image');

// // Upload photo route
// app.post('/upload', (req, res) => {
//     upload(req, res, (err) => {
//         if (err) {
//             console.error(err);
//             res.status(500).json({ error: 'Error uploading file' });
//         } else {
//             const newPost = new Post({
//                 username: req.body.username,
//                 desc: req.body.desc,
//                 image: req.file.filename,
//                 time: new Date()
//             });
//             newPost.save()
//                 .then(() => res.status(201).json({ message: 'Post created successfully' }))
//                 .catch(err => res.status(500).json({ error: 'Error saving post to database' }));
//         }
//     });
// });

