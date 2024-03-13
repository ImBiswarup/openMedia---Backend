const mongoose = require('mongoose');

const connectToDatabase = (url) => {
    mongoose.connect(url)
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.error(err));
}

module.exports = connectToDatabase;