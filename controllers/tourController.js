const Tour = require('./../models/tourModel');

// Tours Handlers
exports.deleteTour = (req, res) => {
  return res.status(204).json({
    status: 'success',
    data: null
  });
};

exports.updateTour = (req, res) => {
  return res.status(200).json({
    status: 'success',
    data: { tour: '<Updated tour here...>' }
  });
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: { tour: newTour }
    });
  } catch (e) {
    res.status(400).json({ status: 'fail', message: e.message });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id); // Tour.findOne({_id: req.params.id})
    res.status(200).json({
      status: 'success',
      data: { tour }
    });
  } catch (e) {
    res.status(400).json({ status: 'fail', message: e.message });
  }
};

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: 'success',
      results: tours.length,
      requestedAt: req.requestTime,
      data: {
        tours: tours
      }
    });
  } catch (e) {
    res.status(400).json({ status: 'fail', message: e.message });
  }
};
