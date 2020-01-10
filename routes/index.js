var express = require('express');
var router = express.Router();

const ObjectId = require('mongodb').ObjectId;
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'contacts';



/* GET home page. */

//READ avec connexion à la db 
router.get('/', function(req, res, next) {

  //CONNECTER NODEJS A LA DB
  MongoClient.connect(url, function(err, client) {
    if(err){
      return
    }
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    //DEFINIR LA FONCTION
    const findUsers = function(db, callback) {

      const collection = db.collection('users');

      collection.find({}).toArray(function(err, users) {
        if(err){
          return
        }
        console.log("J'ai trouvéééééé");

        //RECUPERER LES USERS
        console.log(users)
        callback(users);

        //AFFICHER LES USERS
        res.render('index', { title: 'Liste des Contacts',list:users });
      });
    }
    //APPELER LA FONCTION
    findUsers(db, function(users) {
      client.close();
    });   
  }); 
});

//CREATE avec connexion à la db
router.post('/', function(request, response, next) {

  console.log(request.body.messageAjoute)

  //CONNECTER NODEJS A LA DB
  MongoClient.connect(url, function(err, client) {
    if(err){
      return
    }
    console.log("on est connectééééé");

    const db = client.db(dbName);

    //DEFINIR LA FONCTION
    db.collection('users').insertOne({
      name:request.body.name,
      firstname:request.body.firstname,
      avatar:request.body.avatar,
      mobile:request.body.mobile,
      phone:request.body.phone,
      email:request.body.email,
      date:new Date(),
    });
    client.close();
  }); 
});


//UPDATE partie 1 ==> edit 
router.get('/:id', function(req, res, next){

  console.log(req.params.id)

  MongoClient.connect(url, function(err, client) {
    if(err){
      return
    }
    console.log("on est connecté");

    const db = client.db(dbName);

    //DEFINIR LA FONCTION
      db.collection('users').findOne({_id:new ObjectId(req.params.id)},null,function(err, editUser){
          if(err){
              return
          }
          console.log(editUser) 
          res.render('user', {theUser:editUser}); 
      })
      client.close();

  })
})

//UPDATE partie 2 ==> update
router.put('/:id', function(req, res, next){

  console.log(req.params.id)

  MongoClient.connect(url, function(err, client) {
    if(err){
      return
    }
    console.log("on est connectééééé");
    console.log(req.body);
    const db = client.db(dbName);

    //DEFINIR LA FONCTION
      db.collection('users').updateOne(
        
        {_id:new ObjectId(req.params.id)},
        
        { $set:{name:req.body.name,
                firstname:req.body.firstname,
                avatar:req.body.avatar,
                mobile:req.body.mobile,
                phone:req.body.phone,
                email:req.body.email}       
        }),
        res.end()     
        client.close();
  })
})

module.exports = router;
