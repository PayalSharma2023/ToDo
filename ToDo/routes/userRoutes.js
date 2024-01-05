const express = require('express');
const jwt = require('jsonwebtoken');
const { createUser, loginUser, deleteUser, getAllUser, verifyToken } = require('./../controllers/userController');

const router = express.Router()

router.get('/', verifyToken);
router.post('/signup', createUser);
router.post('/login', loginUser);
router.delete('/delete', deleteUser);
router.get('/getAllUser', getAllUser);

module.exports = router;