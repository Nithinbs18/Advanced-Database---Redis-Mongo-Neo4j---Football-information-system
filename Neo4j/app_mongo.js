var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/AIS';

MongoClient.connect(url, function(err, db) {

    var cursor = db.collection('match').find({match_id:"mat3"});

    cursor.each(function(err, doc) {

        console.log(doc);

    });
});