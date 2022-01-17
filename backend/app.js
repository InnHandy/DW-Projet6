//codes importés
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config({path:'./.env'});
const login = process.env.login;
const Password = process.env.Password;


const saucesRoutes = require('./routes/sauces');
const usersRoutes = require('./routes/User');

//Erreur CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// pour acceder au body lors des requetes POST
app.use(express.json());

//Connexion API et MongoDB
mongoose.connect('mongodb+srv://'+'${login}'+':'+'${Password}'+'@cluster0.8leu6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', saucesRoutes); 
app.use('/api/auth', usersRoutes);

module.exports = app;