const express = require('express');
const { createUser, loginUser, deleteUser, getAllUser } = require('./../controllers/userController');

const router = express.Router()

router.post('/signup', createUser);
router.post('/login', loginUser);
router.delete('/delete', deleteUser);
router.get('/', getAllUser);

module.exports = router;