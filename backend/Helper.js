var AWS = require("aws-sdk");
AWS.config.update({region: "us-east-2"});
var docClient = new AWS.DynamoDB.DocumentClient();

//const rand = require('random-item');

function filter_equips_hitt(e) {
    return {
        TableName : "hitt",
        FilterExpression: "Equipment IN (:e1, :e2, :e3, :e4, :e5, :e6, :e7, :e8, :e9, :e10)", 
        ExpressionAttributeValues: {
            ":e1": e[0],
            ":e2": e[1],
            ":e3": e[2],
            ":e4": e[3],
            ":e5": e[4],
            ":e6": e[5],
            ":e7": e[6],
            ":e8": e[7],
            ":e9": e[8],
            ":e10": e[9],
        }
    };
}

function filter_equips1(e) {
    return {
        TableName : "legsbooty",
        FilterExpression: "Equip1 IN (:e1, :e2, :e3, :e4, :e5, :e6, :e7, :e8, :e9, :e10) AND " +
        "Equip2 IN (:e1, :e2, :e3, :e4, :e5, :e6, :e7, :e8, :e9, :e10)", 
        ExpressionAttributeValues: {
            ":e1": e[0],
            ":e2": e[1],
            ":e3": e[2],
            ":e4": e[3],
            ":e5": e[4],
            ":e6": e[5],
            ":e7": e[6],
            ":e8": e[7],
            ":e9": e[8],
            ":e10": e[9],
        }
    };
}


function gethitt(equips, callback){
    while (equips.length < 10){
        equips.push("na");
    }
    var arr = [];
    var params = filter_equips_hitt(equips);
    docClient.scan(params, (err, data) => {
        if (err) {
            console.log(err);
            callback(err, []);
        } else {
        console.log("Success");
        }

        var err = null;

        var temp = data.Items.filter(function(d){
            return(d.Difficulty == "HITT");
        });
        var x = myrand(temp);
        arr.push(x.Exercise);

        console.log("hitt arr:" + arr);

        var myJsonString = JSON.stringify(arr);
        callback(err, myJsonString);
    });

}

// format = number of exercises (user input), bodypart = specified body part (user input)
// NEED TO FILTER ON TWO EQUIPMENT LISTS
function getexercises(format, bodypart, equips1, callback){
    while (equips1.length < 10){
        equips1.push("na");
    }
    
    var arr = [];
    var err = null;

    var equiplist1 = filter_equips1(equips1);
    // NEED TO GO BACK AFTER IT'S WORKING AND ACCOUNT FOR TWO EQUIP LISTS... 
    
    console.log("input equipment1: " + equiplist1);
    console.log("selected bodypart: " + bodypart);
    console.log("selected workout format n: " + format);

    docClient.scan(equiplist1, (err, data) => {
        if (err) {
            console.log(err);
            callback(err, []);
        } else {
        console.log("Success");
        }

        var exlist1 = data.Items.filter(function(d){ // how does this work... 
            //console.log(d.Category)
            return(d.Part == bodypart);
        });

        // randomizes array of exercises 
        for (let i = exlist1.length-1; i > 0; i --){
            const j = Math.floor(Math.random() * i)
            const temp = exlist1[i];
            exlist1[i] = exlist1[j];
            exlist1[j] = temp;
        }
         
        // check to see if first three randomized exercises are of different categories
        var cats = {};
        var reps = 0;
        var reasy = myrand([20,25]);
        var rmed = myrand([15,20]);
        var rhard = myrand([10, 15]);
        var rxhard = 10;
        for (let i = 0; i < exlist1.length; i ++){
            // keep track of categories
            if (!(exlist1[i].Category in cats)){
                // add randomness later 
                if (exlist1[i].Difficulty == "Easy"){
                    reps = reasy;
                }
                else if (exlist1[i].Difficulty == "Medium"){
                    reps = rmed;
                }
                else if (exlist1[i].Difficulty == "Hard"){
                    reps = rhard;
                }
                else if (exlist1[i].Difficulty == "Xhard"){
                    reps = rxhard;
                }
                arr.push({"reps": reps, "exercise": exlist1[i].Exercise});
                //console.log(arr);
            }
            cats[exlist1[i].Category] = 1;
            if (arr.length >= format){
                break;
            }
        }

        console.log(arr);

        var myJsonString = JSON.stringify(arr);
        callback(err, myJsonString);
    });

}

function myrand(l){
    var i = Math.floor(Math.random() * l.length); // index
    return l[i]; 
}


module.exports = {
    filter_equips1, filter_equips_hitt, gethitt, getexercises
};