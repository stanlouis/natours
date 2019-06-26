const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.json({ name: 'Stanley Louis', app: 'Natours' });
});

const PORT = 3000;

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
