

Command = function( param , type ){
    this.Param;
    this.Type;

    this.Init = function () {
        this.Param = param;
        this.Type = type; 
    }

    this.Init(); 
}

Command.Insert = 1;
Command.Update = 2;
Command.Delete = 3;
Command.Select = 4;
Command.SelectOne = 5;

exports.Command = Command ;



exports.MongoAcces = function (mongoDataBase) {




    this.MongoDataBase;
    var Me = this;

    function execSelect(command, fctSuccess, fctfailure) {
        //console.log ("Me --> "+ Me)
        // console.log("Me.MongoDataBase --- > "+Me.MongoDataBase); 
        if (Me.MongoDataBase.InstanceDb) {
            Me.MongoDataBase.InstanceDb.collection('Users', function (err, rescollection) {
                if (!err) {
                    rescollection.find().toArray(function (err, myusers) {
                        // console.log("gu gu gu");
                        if (!err)
                        { fctSuccess(myusers) }
                        else
                        { fctfailure(err); }
                    });
                }
                else {
                    // console.log("gu gu gu");
                    fctfailure(err);
                }
            })
        }
        else {
            fctfailure("pas d'instance ");
        }
    }

    function execInsert(command, fctSuccess, fctfailure) {
        if (Me.MongoDataBase.InstanceDb) {
            Me.MongoDataBase.InstanceDb.collection('Users', function (err, rescollection) {
                if (!err) {
                    rescollection.insert(command.Param, { safe: true }, function (err, result) {
                        if (!err)
                        { fctSuccess(result) }
                        else
                        { fctfailure(err) }
                    })
                }
                else {
                    fctfailure(err);
                }
            })
        }
        else {
            fctfailure("pas d'instance ");
        }
    }

    function execSelectOne(command, fctSuccess, fctfailure) {
        if (Me.MongoDataBase.InstanceDb) {
            Me.MongoDataBase.InstanceDb.collection('Users', function (err, rescollection) {
                if (!err) {
                    rescollection.findOne(command.Param, function (err, result) {
                        if (!err)
                        { fctSuccess(result) }
                        else
                        { fctfailure(err) }
                    })
                }
                else {
                    fctfailure(err);
                }
            })
        }
        else {
            fctfailure("pas d'instance ");
        }
    }

    function execUpdate(command, fctSuccess, fctfailure) {


        if (Me.MongoDataBase.InstanceDb) {
            Me.MongoDataBase.InstanceDb.collection('Users', function (err, rescollection) {
                if (!err) {
                    console.log(command.Param.Condition + "         " + command.Param.NewValue);
                    rescollection.update(command.Param.Condition, { $set: command.Param.NewValue }, { safe: true }, function (err, result) {
                        if (!err)
                        { fctSuccess(result) }
                        else
                        { fctfailure(err) }
                    })
                }
                else {
                    fctfailure(err);
                }
            })
        }
        else {
            fctfailure("pas d'instance ");
        }



    }

    function execDelete(command, fctSuccess, fctfailure){
        
         if (Me.MongoDataBase.InstanceDb) {
            Me.MongoDataBase.InstanceDb.collection('Users', function (err, rescollection) {
                if (!err) {
                    rescollection.remove( command.Param,  {safe:true}, function(err, result) {
                        if (!err)
                        { fctSuccess(result) }
                        else
                        { fctfailure(err) }
                    })
                }
                else {
                    fctfailure(err);
                }
            })
        }
        else {
            fctfailure("pas d'instance ");
        }
        
        
         }


    this.ExecCommand = function (command, fctSuccess, fctfailure) {
        console.log("Command ---> " + Command.SelectOne + " ----->  " + command.Type)
        switch (command.Type) {
            case Command.Insert: execInsert(command, fctSuccess, fctfailure); break;
            case Command.Update: execUpdate(command, fctSuccess, fctfailure); break;
            case Command.Delete: execDelete(command, fctSuccess, fctfailure); break;
            case Command.Select: execSelect(command, fctSuccess, fctfailure); break;
            case Command.SelectOne: execSelectOne(command, fctSuccess, fctfailure); break;
            //default: execSelect(command, fctSuccess, fctfailure); break;   
        }

    }

    this.CreateCommd = function (param, type) { return new Command(param, type); }


    this.Init = function () {
        this.MongoDataBase = mongoDataBase;
    }

    this.Init();




}


exports.MongoDataBase = function (adress, port, baseName) {

    var server;
    var db;
    this.InstanceDb;
    var Me = this;


    this.Close = function () {
        if (Me.InstanceDb) {
            Me.InstanceDb.close();
        }
    }

    this.Open = function (faildFct, succesFct) {
        db.open(
        function (err, db) {
            if (!err) {
                Me.InstanceDb = db;
               // console.log("base ---> ", Me); 
                succesFct(Me)
            }
            else { faildFct(err); }
        }
        );
    }

    this.Init = function () {
        var mongo = require('mongodb');
        Server = mongo.Server,
        Db = mongo.Db;
        // this.server = new Server('localhost', 27017, { auto_reconnect: true });
        // this.db = new Db('mydb', server, { safe: true  });
        server = new Server(adress, port, { auto_reconnect: true });
        db = new Db(baseName, server, { safe: true });
        //baseName
    }
    this.Init();
}