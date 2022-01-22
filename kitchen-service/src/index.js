import app from './app';

const port = process.env.MENU_SERVICE_PORT || 5001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});