const {PlaceModel} = require('../model/place');

const placeInfo = async (req, res) => {
    const place = req.body

    if (!place.name || !place.date || !place.description || !place.placeVisited || !place.placeExplore || !place.visitedBy) {
        res.status(400).json({
            message : "please provide name , date, description, placeVisited, placeExplore, visitedBy"
        })
        return
    }

    try { 
        const newPlace = new PlaceModel({
            name : place.name,
            date : place.date,
            description : place.description,
            placeVisited : place.placeVisited,
            placeExplore : place.placeExplore,
            visitedBy : place.visitedBy
        })

        await newPlace.save();

        res.status(200).json({
            message : "place added successfully",
            placeId : newPlace._id
        })
        return

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message : "internal server error"
        })
    }
}

const updatePlace = async (req, res) => {
    
    const updatedPlaceData = req.body
    if (!updatedPlaceData.placeId || !updatedPlaceData.updatedFields) {
        res.status(400).json({
            message : "please provide placeId and updatedFields"
        })
        return
    }
    try{
        const updatedPlace = await PlaceModel.findByIdAndUpdate(
            updatedPlaceData.placeId,
            {$set : updatedPlaceData.updatedFields},
            {new : true}
        )
        if (!updatedPlace) {
            res.status(404).json({
                message : "place not found"
            })
            return
        }
        res.status(200).json({
            message : "place updated successfully",
            updatedPlace
        })

    } catch (err) {
        res.status(500).json({
            message : "intrenal server error"
        })

    }
}

module.exports = {placeInfo, updatePlace};