const express = require('express');
const{ placeInfo, updatePlace, deletePlace, getAllPlacesVisited, getAllPlacesToExplore, getAllPlaces, getPlaceById } = require('./../controllers/placeController');

const router = express.Router();

router.post('/places', placeInfo);
router.put('/update', updatePlace);
router.delete('/delete', deletePlace);
router.get('/visited', getAllPlacesVisited);
router.get('/explore', getAllPlacesToExplore);
router.get('/places', getAllPlaces);
router.get('/:placeId', getPlaceById);

module.exports = router;
