access = require ( "../AccesLayer/MongoAcces.js")
exports.UserRepository = function (dataBaseAcces) {

    this.GetListUser = function (fctSuccess, fctfailure) {
        dataBaseAcces.ExecCommand(new access.Command({}, access.Command.Select), fctSuccess, fctfailure);
    }

    this.GetUser = function (id, fctSuccess, fctfailure) {
        dataBaseAcces.ExecCommand(new access.Command({ 'id': id }, access.Command.SelectOne), fctSuccess, fctfailure);
    }

    this.AddUser = function (user, fctSuccess, fctfailure)
    { dataBaseAcces.ExecCommand(new access.Command(user, access.Command.Insert), fctSuccess, fctfailure); }

    this.UpdateUser = function (user, fctSuccess, fctfailure)
    { dataBaseAcces.ExecCommand(new access.Command({ Condition: user.id, NewValue: user }, access.Command.Update), fctSuccess, fctfailure); }

    this.RemoveUser = function (id, fctSuccess, fctfailure) {
        dataBaseAcces.ExecCommand(new access.Command({ 'id': id }, access.Command.Delete), fctSuccess, fctfailure);
    }

}