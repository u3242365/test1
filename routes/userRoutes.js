const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const router = express.Router();

router.post('/signup',authController.signup)
router.post('/login',authController.login)


router
    .route('/')
    .post(userController.createUser)
    .get(userController.getAllUsers)

router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)

// router.get('/me',authController.protect);

module.exports = router;