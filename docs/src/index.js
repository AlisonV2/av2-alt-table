import app from './app';

const port = process.env.DOCS_PORT || 8001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});