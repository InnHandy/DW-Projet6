const Sauces = require('../models/sauces');
const fs = require('fs');
const Like = require('../models/Like');
const sauces = require('../models/sauces');

let saucePourLike = {};


exports.createSauce = (req, res, next) => {
  delete req.body._id;
  const sauce = new Sauces({
       ...JSON.parse(req.body.sauce),
          likes: 0,
          dislikes: 0,
          usersLiked: [],
          usersDisliked: [],
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};


exports.getOneSauce = (req, res, next) => {
  Sauces.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      res.status(200).json(sauce);
      saucePourLike= sauce;
      console.log(saucePourLike);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.likeSauce = (req, res, next) => {
  delete req.body._id;
  const liker = new Like({ ...req.body,});
  console.log(liker)
  Sauces.findOne({_id: req.params.id })
  .then(
          (sauce) => {
            res.status(200).json(sauce);
            if (!sauce.usersLiked.includes(req.body.userId) && liker.like==1)
            {
              Sauces.updateOne(
                {_id: req.params.id},
                {
                  $inc : {likes : 1},
                  $push : {usersLiked : req.body.userId}
                },
              )
              .then(()=> res.status(201).json({message : "Sauce like +1"}))
              .catch((error)=> res.status(400).json({error}))
            }

            if (sauce.usersLiked.includes(req.body.userId) && liker.like==0)
            {
              Sauces.updateOne(
                {_id: req.params.id},
                {
                  $inc : {likes : -1},
                  $pull : {usersLiked : req.body.userId}
                },
              )
              .then(()=> res.status(201).json({message : "Sauce like +1"}))
              .catch((error)=> res.status(400).json({error}))
              }

              if (!sauce.usersDisliked.includes(req.body.userId) && liker.like==-1)
              {
                Sauces.updateOne(
                  {_id: req.params.id},
                  {
                    $inc : {dislikes : 1},
                    $push : {usersDisliked : req.body.userId}
                  },
                )
                .then(()=> res.status(201).json({message : "Sauce dislike +1"}))
                .catch((error)=> res.status(400).json({error}))
              }
  
              if (sauce.usersDisliked.includes(req.body.userId) && liker.like==0)
              {
                Sauces.updateOne(
                  {_id: req.params.id},
                  {
                    $inc : {dislikes : -1},
                    $pull : {usersDisliked : req.body.userId}
                  },
                )
                .then(()=> res.status(201).json({message : "Sauce like +1"}))
                .catch((error)=> res.status(400).json({error}))
                }
          })
    .catch((error) => {res.status(404).json({error: error})})

  };


exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  sauces.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  Sauces.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        sauces.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
  Sauces.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};