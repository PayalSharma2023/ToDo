const express = require('express');
const{ placeInfo, updatePlace, deletePlace, getAllPlacesVisited, getAllPlacesToExplore } = require('./../controllers/placeController');

const router = express.Router();

router.post('/places', placeInfo);
router.put('/update', updatePlace);
router.delete('/delete', deletePlace);
router.get('/visited', getAllPlacesVisited);
router.get('/explore', getAllPlacesToExplore);

module.exports = router;
