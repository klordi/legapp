var Helper = require('./Helper.js');

var AWS = require("aws-sdk");
AWS.config.update({region: "us-east-2"});
var docClient = new AWS.DynamoDB.DocumentClient();

const rand = require('random-item');

exports.handler = (event, context, callback) => {
    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res), 
        headers: {
            'Content-Type': 'application/json',
        },
    });

    console.log(event);


}




// create a GET route'
app.get('/hittyes', (req, res) => {
    var equips1 = req.query.equips1;
    console.log('hityes');
    Helper.gethitt(equips1, function(arr){res.send(arr);});
});

/* app.get('/2x5', (req, res) => {
    var equips1 = req.query.equips1;
    //var equips2 = req.query.equips2;
    Helper.getexercises(2, req.query.bodypart, equips1, function(arr){res.send(arr);});
}); */

app.get('/3x3', (req, res) => {
    var equips1 = req.query.equips1;
    //var equips2 = req.query.equips2;
    console.log("Selected bodypart: " + req.query.bodypart);
    Helper.getexercises(3, req.query.bodypart, equips1, function(arr){res.send(arr);});
});

app.get('/4x3', (req, res) => {
    var equips1 = req.query.equips1;
    //var equips2 = req.query.equips2;
    Helper.getexercises(4, req.query.bodypart, equips1, function(arr){res.send(arr);});
});

app.get('/5x2', (req, res) => {
    var equips1 = req.query.equips1;
    //var equips2 = req.query.equips2;
    console.log(req.query.bodypart);
    console.log(equips1);
    Helper.getexercises(5, req.query.bodypart, equips1, function(arr){res.send(arr);});
});
 

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));