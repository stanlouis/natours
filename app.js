const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const app = express();

// Middleware
app.use(helmet());
app.use(morgan('short'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours
    }
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const tour = tours.find(el => el.id === id);
  if (!tour) {
    return res.status(404).send({ status: 'fail', message: 'invalid id' });
  }

  res.status(200).json({
    status: 'success',
    data: { tour: tour }
  });
});

app.post('/api/v1/tours', (req, res) => {
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
});

const PORT = 3000;

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
