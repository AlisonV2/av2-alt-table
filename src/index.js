import app from './app';

const port = process.env.ALT_TABLE_PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});