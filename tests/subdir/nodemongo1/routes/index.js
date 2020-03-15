const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

/* GET home page. */
router.get('/dat', function (req, res, next) {
    const url = 'mongodb://nodemongo1_mongo:27019';
    const dbName = 'myproject';
    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        const db = client.db(dbName);
        const col = db.collection('access_token');
        col.find().toArray(function (err, arr) {
            console.log(arr);
            client.close();
            res.json(arr);
            res.end();
        });
    });
});

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
    const url = 'mongodb://nodemongo1_mongo:27019';
    const dbName = 'myproject';
    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        const col = db.collection('access_token');
        col.count().then(count => {
            col.insert({
                id: `nodemongo_1_token${count + 1}`,
                access_token: `nodemongo_1_token${count + 1}`
            });
            client.close();
        }).catch(err => {
            console.log(err);
            client.close();
        });
    });
});

module.exports = router;
