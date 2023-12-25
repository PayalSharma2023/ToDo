const express = require('express');
const{ placeInfo} = require('./../controllers/placeController');

const router = express.Router();

const addPlace = router.post('/add', placeInfo)

module.exports = router;
