//codes importés
const mongoose = require('mongoose');
const express = require('express');
const Thing = require('./models/thing');
const app = express();

//Connexion API et MongoDB
mongoose.connect('mongodb+srv://InnHandy:Nnocent87@cluster0.8leu6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Erreur CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

const saucesRoutes = require('./routes/sauces');

app.use('/api/sauces', stuffRoutes);







module.exports = app;

