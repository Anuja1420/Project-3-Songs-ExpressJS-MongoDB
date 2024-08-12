//I should be able to see the list of songs available in the library. I should be able to select a song from the list and see 
//the details of the song, including the name of the song, singer, music director, release date, and album name. 
//I should be able to perform CRUD (Create, Read, Update, Delete) operations on the song list in the library.

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const song = require('./Routes/Songs');

mongoose.connect('mongodb+srv://test:test@cluster0.vkjnqsh.mongodb.net/database?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const PORT = 4002;
app.listen(PORT , ()=>{
    console.log(`Server Connected to PORT ${PORT}`);
})

app.use(bodyParser.json());
app.use(cors());
app.use('/songs',song);


