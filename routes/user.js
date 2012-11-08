
var User = function (reposotoryUser) {
    this.ReposotoryUser = reposotoryUser;

    this.list = function (req, res) {
        reposotoryUser.GetListUser(function (myusers) { res.render('user/users', { title: 'Express', Users: myusers }); }, function (err) { writeUserErreur(res, err); })
    }

    this.add = function (req, res) { res.render('user/add', { title: 'Add user' }); }

    this.details = function (req, res) {
        reposotoryUser.GetUser(parseInt(req.params.id), function (myuser) { res.render('user/details', { title: 'Detail user', User: myuser }); }, function (err) { writeUserErreur(res, err); })
    }

    this.update = function (req, res) {
        reposotoryUser.GetUser(parseInt(req.params.id), function (myuser) { res.render('user/update', { title: 'Detail user', User: myuser }); }, function (err) { writeUserErreur(res, err); })

    }

    this.remove = function (req, res) {
        reposotoryUser.GetUser(parseInt(req.params.id), function (myuser) { res.render('user/remove', { title: 'Detail user', User: myuser }); }, function (err) { writeUserErreur(res, err); })
    }


    this.doAdd = function (req, res) {
        reposotoryUser.AddUser({ 'id': parseInt(req.body.id), 'name': req.body.name }, function () { res.redirect('/users') }, function (err) { writeUserErreur(res, err); })

    }

    this.doUpdate = function (req, res) {
        reposotoryUser.UpdateUser({ 'id': parseInt(req.body.id), 'name': req.body.name }, function () { res.redirect('/users') }, function (err) { writeUserErreur(res, err); })
    }


    this.doRemove = function (req, res)
    {  reposotoryUser.RemoveUser(parseInt(req.params.id), function () { res.redirect('/users') }, function (err) { writeUserErreur(res, err); })}

    var writeUserErreur = function (res, err) {
        res.send(500, { error: err });
    }
}

exports.User= User;




/*
  exports.list = function ( req, res) {
     
      db.open(function (err, resdb) {
          if (!err) {
              resdb.collection('Users', function (err, rescollection) {
                  rescollection.find().toArray(function(err, myusers) {
                    res.render('user/users', { title: 'Express', Users: myusers });
                     db.close();
      });



              })
          }
          else {
              console.log(err)
          }

      });
  }






 

  exports.doAdd = function (req, res) {
      db.open(function (err, resdb) {
          if (!err) {
              resdb.collection('Users', function (err, rescollection) {
                  var a = { 'id': parseInt ( req.body.id), 'name': req.body.name };
                  console.log('id --- >' + req.body.id); 
                  rescollection.insert(a, { safe: true }, function (err, result) {
                      db.close();
                     

                  })
              })
          }
          else {
              console.log(err)
          }

      });
  }


  

  exports.update = function (req, res) {
        db.open(function (err, resdb) {
          if (!err) {
              resdb.collection('Users', function (err, rescollection) {
                  var a = { 'id':parseInt( req.params.id)};
                
                  rescollection.findOne(a, function (err, result) {
                      db.close();
                       res.render('user/update', { title: 'Detail user', User: result });
                  })
              })
          }
          else {
              console.log(err)
          }

      });
  }

  exports.doUpdate = function (req, res) {
        db.open(function (err, resdb) {
          if (!err) {
              resdb.collection('Users', function (err, rescollection) {
                  var a = { 'id':parseInt( req.params.id)};
                 var b = { 'id': parseInt ( req.body.id), 'name': req.body.name };
                  rescollection.update( a, {$set:b}, {safe:true}, function(err, result) {
                        db.close();
                        res.redirect('/users')
                  });
              })
          }
          else {
              console.log(err)
          }

      });
  }

  exports.remove = function (req, res) {
        db.open(function (err, resdb) {
          if (!err) {
              resdb.collection('Users', function (err, rescollection) {
                  var a = { 'id':parseInt( req.params.id)};
                
                  rescollection.findOne(a, function (err, result) {
                      db.close();
                       res.render('user/remove', { title: 'Detail user', User: result });
                  })
              })
          }
          else {
              console.log(err)
          }

      });
  }

  exports.doRemove = function (req, res) {
        db.open(function (err, resdb) {
          if (!err) {
              resdb.collection('Users', function (err, rescollection) {
                  var a = { 'id':parseInt( req.params.id)};
                  rescollection.remove( a,  {safe:true}, function(err, result) {
                        db.close();
                        res.redirect('/users')
                  });
              })
          }
          else {
              console.log(err)
          }

      });
  }

  */