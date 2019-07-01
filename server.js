const app = require('./app');
// 3) START SERVER
const PORT = 3000;

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
