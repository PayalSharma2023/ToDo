const PlaceModel = require('./../model/place');

const placeInfo = async (req, res) => {
    const place = req.body

    if (!place.name || !place.date || !place.description || !place.placeVisited || !place.placeExplore || !place.visitedBy) {
        res.status(400).json({
            message : "please provide name , date, description, placeVisited, placeExplore, visitedBy"
        })
        return
    }

    try { 
        const newPlace = await PlaceModel.json({
            name : place.name,
            date : place.date,
            description : place.description,
            placeVisited : place.placeVisited,
            placeExplore : place.placeExplore,
            visitedBy : place.visitedBy
        })

        newPlace.save()

        res.status(200).json({
            message : "place added successfully",
            placeId : newPlace._id
        })

        return

    } catch(err) {
        res.status(500).json({
            message : "internal server error"
        })
    }
}

module.exports = {placeInfo}