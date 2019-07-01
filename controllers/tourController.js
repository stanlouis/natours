const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// Tours Handlers
exports.deleteTour = (req, res) => {
  const id = parseInt(req.params.id);
  if (id > tours.length) {
    return res.status(404).send({ status: 'fail', message: 'invalid id' });
  }
  return res.status(204).json({
    status: 'success',
    data: null
  });
};

exports.updateTour = (req, res) => {
  const id = parseInt(req.params.id);
  if (id > tours.length) {
    return res.status(404).send({ status: 'fail', message: 'invalid id' });
  }
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
    `${__dirname}/dev-data/data/tours-simple.json`,
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
  const id = parseInt(req.params.id);
  const tour = tours.find(el => el.id === id);
  if (!tour) {
    return res.status(404).send({ status: 'fail', message: 'invalid id' });
  }
  res.status(200).json({
    status: 'success',
    data: { tour: tour }
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
