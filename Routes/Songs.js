const express = require('express');
const mongoose = require('mongoose'); 
const router = express.Router();

//Songs Schema
const SongsSchema = new mongoose.Schema({
    name : String,
    singer : String,
    musicdirector : String,
    releasedate : Date,
    albumname : String
});
const Songs = mongoose.model('Songs' , SongsSchema);

//CRUD Operation 
//Post New Songs
router.post('/', async(req,res)=>{
    try{
        const song = new Songs(req.body);
        await song.save();
        res.send('Application Data Added Successfully');
    }catch(error){
        res.status(500).send(error);
    }
})

//Get all songs
router.get('/', async(req,res)=>{
    try{
        const songs = await Songs.find();
        res.send(songs);
    }catch(error){
        res.status(500).send(error);
    }
})

//Get Song by Id
router.get('/id/:id', async(req,res)=>{
    try{
        const songs = await Songs.findById(req.params.id);
        if(!songs){
            return res.status(404).send('Songs with given Id not found');
        }
        res.send(songs);
    }catch(error){
        res.status(500).send(error);
    }
})

//Update Songs based on id
router.put('/id/:id', async(req,res)=>{
    try{
        const song = await Songs.findByIdAndUpdate(req.params.id, req.body, {new : true});
        if(!song){
            return res.status(404).send('Data not found for this id');
        }
        res.send('Data Updated Successfully');
        }catch(error){
            res.status(500).send(error);
        }
})

//Delete Songs based on Id
router.delete('/id/:id', async(req,res)=>{
    try{
        const song = await Songs.findByIdAndDelete(req.params.id);
        if(!song){
        return res.status(404).send('Song not found for this Id');
        }
        res.send('Song Successfully deleted for the given id');
    }catch(error){
        res.status(500).send(error);
    }
})

module.exports = router;