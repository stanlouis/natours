const Tour = require('./../models/tourModel');

// Tours Handlers (CRUD)
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

exports.getAllTours = async (req, res) => {
  console.log(req.query);
  try {
    // Build Query
    // Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    // Advance Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    console.log(JSON.parse(queryStr));

    const query = await Tour.find(JSON.parse(queryStr));

    // Execute query
    const tours = await query;

    // Send Response
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

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: { tour }
    });
  } catch (e) {
    res.status(400).json({ status: 'fail', message: e.message });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    return res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (e) {
    res.status(400).json({ status: 'fail', message: e.message });
  }
};
