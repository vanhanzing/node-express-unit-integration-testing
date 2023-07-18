const express = require('express');
const path = require('path');
const todoRoutes = require('./routes/todo.routes');
const mongodb = require('./mongodb/mongodb.connect');

const app = express();

mongodb.connect();

app.use(express.json());

app.use('/todos', todoRoutes);

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

app.get('/', (req, res) => {
  res.json('hello world');
});
app.get('/test-report', (req, res) => {
  const reportPath = path.join(__dirname, './report.html'); // Specify the path to your generated HTML report

  res.sendFile(reportPath, (err) => {
    if (err) {
      console.error('Error sending HTML file:', err);
    } else {
      console.log('HTML file sent successfully');
    }
  });
});

module.exports = app;
