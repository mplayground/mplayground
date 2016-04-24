var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("we're connected!");
});

// 스키마 설정
var testSchema = mongoose.Schema({
    name: String,
    memo: String
});

// 메모 테이블?
var Memo = mongoose.model('memo', testSchema);

// 저장
router.get('/db_save_get', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  //var user_id = req.body.id; //post

  var name = req.param('name');
  var memo = req.param('memo');

  var new_memo = new Memo({ name: name, memo: memo });

  new_memo.save(function (err, new_memo) {
    if (err) {
      return console.error(err);
    } else {
      console.log(new_memo.name);
    }

    res.send('db insert');

  });
});

router.get('/db_find_get', function(req, res, next) {

  Memo.find(function (err, memos) {
    if (err) return console.error(err);
    console.log(memos);
    res.send(memos);
  })

});

module.exports = router;
