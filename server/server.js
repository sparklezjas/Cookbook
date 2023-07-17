require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const cookbookRoutes = require('./routes/cookbookRoutes');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: '*',
  methods: 'GET, POST, PUT, PATCH, DELETE',
  allowedHeaders: '*',
}));

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use('/api/user', userRoutes);
cookbookRoutes(app);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Connected to the database and listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
