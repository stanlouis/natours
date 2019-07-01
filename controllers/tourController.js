const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// callback function to validate Id through param middleware
exports.checkID = (req, res, next, id) => {
  if (id * 1 > tours.length) {
    return res.status(404).send({ status: 'fail', message: 'invalid id' });
  }
  next();
};

// middleware to validate create tour route
exports.checkBody = (req, res, next) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res
      .status(400)
      .json({ status: 'fail', message: 'Missing name or price' });
  }
  next();
};

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

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = { ...req.body, id: newId };
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err, data) => {
      if (err) console.log(err);
      res.status(201).json({
        status: 'success',
        data: { tour: newTour }
      });
    }
  );
};

exports.getTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: { tour: 'On the todo list' }
  });
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    requestedAt: req.requestTime,
    data: {
      tours: tours
    }
  });
};
