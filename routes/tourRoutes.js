const express = require('express');

const router = express.Router();

const {
  checkID,
  checkBody,
  getTour,
  getAllTours,
  createTour,
  updateTour,
  deleteTour
} = require('../controllers/tourController');

// Param middleware
router.param('id', checkID);

router
  .route('/')
  .get(getAllTours)
  .post(checkBody, createTour);

router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

module.exports = router;
