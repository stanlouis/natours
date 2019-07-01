var dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

// 3) START SERVER
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
