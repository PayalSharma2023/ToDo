const mongoose = require('mongoose');

const placeSchema = PlaceModel.Schema({
    name : String,
    date : String,
    description : String,
    placeVisited : Boolean,
    placeExplore : Boolean,
    visitedBy : String
})

const PlaceModel = mongoose.model('/place' , placeSchema );


module.exports = { PlaceModel }