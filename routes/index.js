
/*
* GET home page.
*/

exports.index = function (req, res) {
    res.render('index', { title: 'Express' });
};

exports.helloworld = function (req, res) {
    res.render('helloworld', { title: 'Hello World!' });
};

exports.userlist = function (db) {
    return function (req, res) {
        var collection = db.get('usercollection');
        collection.find({}, {}, function (e, docs) {
            res.render('userlist', { title: 'User List', 'userlist': docs });
        });
    };
};

exports.newuser = function (req, res) {
    res.render('newuser', { title: 'Add New User' });
};

exports.adduser = function (db) {
    return function (req, res) {

        // Get form values. These rely on the "name" attributes
        var userName = req.body.username;
        var userEmail = req.body.useremail;

        // Set our collection
        var collection = db.get('usercollection');

        // Submit data to the db
        collection.insert({
            "username": userName,
            "email": userEmail
        }, function (err, doc) {
            if (err) {
                // If it fails, return error
                res.send("There was a problem adding data to the database.");
            }
            else {
                // If it worked, set the header so the address bar does not still say /adduser
                res.location('userlist');
                // Forward to the success page
                res.redirect('userlist');
            }
        });
    }

}