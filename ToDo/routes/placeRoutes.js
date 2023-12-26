const express = require('express');
const{ placeInfo, updatePlace, deletePlace} = require('./../controllers/placeController');

const router = express.Router();

router.post('/places', placeInfo);
router.put('/update', updatePlace);
router.delete('/delete', deletePlace);

module.exports = router;
