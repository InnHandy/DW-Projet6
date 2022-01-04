//requetes sans middleware express
/*Si vous essayez d'effectuer une requête à votre serveur, vous devez récupérer un objet JSON contenant le message que nous avons spécifié.

Maintenant que notre serveur Node gère correctement notre application Express, voyons comment nous pouvons ajouter des fonctionnalités à l'application.

Ajoutez des middlewares
Une application Express est fondamentalement une série de fonctions appelées middleware. Chaque élément de middleware reçoit les objets request et response , peut les lire, les analyser et les manipuler, le cas échéant. Le middleware Express reçoit également la méthode next , qui permet à chaque middleware de passer l'exécution au middleware suivant. Voyons comment tout cela fonctionne.*/
/*
const express = require('express');

const app = express();

app.use((req, res) => {
   res.json({ message: 'Votre requête a bien été reçue !' }); 
});

module.exports = app;
*/

//code avec middlware express

const mongoose = require('mongoose');



const express = require('express');

const app = express();

mongoose.connect('mongodb+srv://InnHandy:Nnocent87@cluster0.8leu6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
  console.log('Requête reçue !');
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.json({ message: 'Votre requête a bien été reçue !' });
  next();
});

app.use((req, res, next) => {
  console.log('Réponse envoyée avec succès !');
});

module.exports = app;



/* ancien code donnant l'erreur 404

const express = require('express');

const app = express();



module.exports = app;*/