const express = require('express');
const{ placeInfo} = require('./../controllers/placeController');

const router = express.Router();

router.post('/places', placeInfo);
router.put('/places/update', updatePlace);

module.exports = router;
