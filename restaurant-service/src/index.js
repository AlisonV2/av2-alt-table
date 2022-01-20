import app from './app';

const port = process.env.RESTAURANT_SERVICE_PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});