const express = require('express');

const router = express.Router();

const {
  getTour,
  getAllTours,
  createTour,
  updateTour,
  deleteTour
} = require('../controllers/tourController');

router
  .route('/')
  .get(getAllTours)
  .post(createTour);

router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

module.exports = router;
