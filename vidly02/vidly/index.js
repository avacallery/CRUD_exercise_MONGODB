const config = require('config'); 
const mongoose = require('mongoose');
const Joi = require('joi'); 
//Joi.objectId = require('joi-objectid')(Joi); 
const genres = require('./routes/genres');
const movies = require('./routes/movies')
const customers = require('./routes/customers');
const users = require('./routes/users'); 
//const rentals = require('./routes/rentals');
const auth = require('./routes/auth'); 
const express = require('express');
const app = express();

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.'); 
  process.exit(1); //exit the process in case of an error
}

mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies)
app.use('/api/users', users); 
app.use('/api/auth', auth); 
//app.use('api/rentals', rentals); 

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));