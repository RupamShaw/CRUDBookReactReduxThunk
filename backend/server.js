import express from 'express'
import bodyParser from 'body-parser';
var mongoose = require('mongoose')
import mongodb from 'mongodb';

const app = express()
app.use(bodyParser.json());

function validate(data) {
    let errors = {};
    if (data.title === '') errors.title = "Can't be empty";
    if (data.cover === '') errors.cover = "Can't be empty";
    const isValid = Object.keys(errors).length === 0
    return { errors, isValid };
  }

mongoose.connect("mongodb://gameuser:gameUser@ds115768.mlab.com:15768/games", { useMongoClient: true }, (err, db) => {
    console.log('connected to mongodb fora new game')
    var Schema = mongoose.Schema

    //create game schema and model
    var gameSchema = new Schema({
        title: {
            type: String,
            required: [true, 'Name field is required']
        },
        cover: {
            type: String    
        }

    })

    var Game = mongoose.model('game', gameSchema)
    // new Game({
    //     title : "Nemo"
    //   }).save((err, res) => {
    //     if (err) {
    //       console.log('in errrrrrrrrrrrrrr', err);
    //       throw err;
    //     } else {
    //       console.log("data created ");
    //     }
    //   }).then((res) => {
    //     console.log('in result', res)
    //   });
    app.get('/api/games', (req, res) => {
        console.log('its came in server before find game ')
        Game.find(function (err, games) {
            console.log(' before sending response json', res.json( {games}))
        })

    })
    app.get('/api/games/:_id', (req, res) => {
        console.log('params',req.params._id)
        db.collection('games').findOne({ _id: new mongodb.ObjectId(req.params._id) }, (err, game) => {
          res.json({ game });
        })
      });
    app.put('/api/games/:_id', (req, res) => {
           const { errors, isValid } = validate(req.body);
       
           if (isValid) {
             const { title, cover } = req.body;
             db.collection('games').findOneAndUpdate(
               { _id: new mongodb.ObjectId(req.params._id) },
               { $set: { title, cover } },
               { returnOriginal: false },
               (err, result) => {
                 if (err) { res.status(500).json({ errors: { global: err }}); return; }
       
                 res.json({ game: result.value });
               }
             );
           } else {
             res.status(400).json({ errors });
           }
         });
       
    app.post('/api/games', (req, res) => {
        console.log('its came in server post ')
        const { errors, isValid } = validate(req.body);
        if (isValid) {
            console.log('in isvalid',req.body)
          const { title, cover } = req.body;
          db.collection('games').insert({ title, cover }, (err, result) => {
            if (err) {
              res.status(500).json({ errors: { global: "Something went wrong" }});
            } else {
               console.log('result ops',result.ops[0]) 
              res.json({ game: result.ops[0] });
            }
          });
        } else {
            console.log('notvalid')
          res.status(400).json({ errors });
        }
    });

    app.use((req, res) => {
        res.status(404).json({
          errors: {
            global: "Still working on it. Please try again later when we implement it"
          }
        });
      })
    app.listen(8082, () => console.log('server runs on port 8082'))
})
