const express = require('express');
const{ placeInfo} = require('./../controllers/placeController');

const router = express.Router();

router.post('/places', placeInfo);

module.exports = router;
