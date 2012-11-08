
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , user = require('./routes/user'); 

var app = express();




var access  =  require ( "./AccesLayer/MongoAcces.js"); 
var repository = require ("./Repository/UserRepostory.js") ; 

var dataBaseAcces = new access.MongoDataBase ('localhost', 27017 , 'mydb')


dataBaseAcces.Open(function (err) { console.log(err); }, function (db) {

    console.log("Base ok"); 


    //var mongoAcces =  
   var  userRepository = new repository.UserRepository(new access.MongoAcces (db ));
   

  
    var User = new user.User (userRepository);

    app.get('/users', User.list);
    app.get('/users/details/:id', User.details);
    app.get('/users/update/:id', User.update); 
    app.get('/users/add', User.add); 
    app.get('/users/remove/:id', User.remove); 
    app.post('/users/add', User.doAdd );
    app.post('/users/update/:id', User.doUpdate );
    app.post('/users/remove/:id', User.doRemove );

});






app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

console.log("dddd"); 




    app.get('/', routes.index);


/* 









*/

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});