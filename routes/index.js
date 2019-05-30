var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { page: 'Home', menuId: 'home' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
  res.render('helloworld', { page: 'Hello, World!', menuId: 'helloWorld' });
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
  var db = req.db;                            // extract db object passed to http request
  var collection = db.get('usercollection');  // use the collectioin 'usercollection'
  collection.find({},{},function(e,docs){     // do a find, return results as variable docs
      res.render('userlist', {                // render userlist (an ejs template) with data passed in docs
          "userlist" : docs,
          page: 'User List',
          menuId: 'userList'
      });
  });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
  res.render('newuser', { page: 'Add New User', menuId: 'adduser' });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

  // Set our internal DB variable
  var db = req.db;

  // Get our form values. These rely on the "name" attributes
  var userName = req.body.username;
  var userEmail = req.body.useremail;

  // Set our collection
  var collection = db.get('usercollection');

  // Submit to the DB
  collection.insert({
      "username" : userName,
      "email" : userEmail
  }, function (err, doc) {
      if (err) {
          // If it failed, return error
          res.send("There was a problem adding the information to the database.");
      }
      else {
          // And forward to success page
          res.redirect("userlist");
      }
  });

});

module.exports = router;