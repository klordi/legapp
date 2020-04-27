var Helper = require('./Helper.js');


exports.handler = (event, context, callback) => {
    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res), 
        headers: {
            'Content-Type': 'application/json',
        },
    });

    
    // dictionary that stores path + function 
    const pathdict = {
        "/legsapp/hitts": hittyes,
        "/legsapp/3x3" : w3x3,
        "/legsapp/4x3" : w4x3,
        "/legsapp/5x2" : w5x2
    };

    console.log(event);
    var equips1 = event.queryStringParameters["equips1"].split(",");
    var bodypart = event.queryStringParameters["bodypart"];

    var path = event.requestContext.http.path;

    if (path in pathdict){
        var f = pathdict[event.path];
        f(equips1, bodypart);
    }

// create a GET route'
//app.get('/hittyes', (req, res) => {
function hittyes(equips1, bodypart){
    console.log('hittyes');
    Helper.gethitt(equips1, done);
}

//app.get('/3x3', (req, res) => {
function w3x3(equips1, bodypart){
    console.log("Selected bodypart: " + bodypart);
    Helper.getexercises(3, bodypart, equips1, done);
}

//app.get('/4x3', (req, res) => {
function w4x3(equips1, bodypart) {   
    console.log("Selected bodypart: " + bodypart);
    Helper.getexercises(4, bodypart, equips1, done);
}

//app.get('/5x2', (req, res) => {
function w5x2(equips1, bodypart){
    console.log(bodypart);
    console.log(equips1);
    Helper.getexercises(5, bodypart, equips1, done);
}

}
 
