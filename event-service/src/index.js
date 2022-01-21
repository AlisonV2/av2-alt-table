import app from './app';

const port = process.env.EVENT_SERVICE_PORT || 5004;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});