import app from './app';

const port = process.env.TABLE_SERVICE_PORT || 5003;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});