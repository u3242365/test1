const express = require('express');
const adminrubricController = require('../controllers/adminrubricController');
const authController = require('../controllers/authController');
const router = express.Router();


router
    .route('/')
    .get(adminrubricController.getAllRubrics)
    .post(adminrubricController.createRubric)

router
    .route('/:id')
    .get(adminrubricController.getRubric)
    .patch(adminrubricController.updateRubric)
    .delete(adminrubricController.deleteRubric)

router
    .route('/search')
    .post(adminrubricController.getParticulerRubric);

module.exports = router;