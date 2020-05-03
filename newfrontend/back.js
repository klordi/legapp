// for backend
function generateWorkouts() {
    //console.log(this.state);
    var arr = ["na"];

    for (i = 0; i < DATA.equipment.length; i++){
        if (stateequip.equiplist[i] == true){
            arr.push(DATA.equipment[i].name);
        }
    }
    var bp;
    if (statebp.bplist == 0){
        bp = "Legs";
    }
    else {
        bp = "Booty";
    }

    var format = DATA.format[stateformat.formatlist].name;

    if (stateformat.formatlist == 3){
        var formats = ["3x3", "4x3", "5x2"];
        format = formats[Math.floor(Math.random() * formats.length)];
    }

    console.log(format, arr, bp);

    callBackend(format, arr, bp, "hittyes");

    if (statehiit.hiitlist == 0){
        callBackend("hittyes", arr, bp, "hittyes");
    } 
    else {
        d3.select("#output2").remove();
    }
   
    /* if (this.state.hittyes){
      await this.callBackend("hitts", arr, bp, "hittyes");
    }  */
}

function callBackend(format, equips1, bodypart, hittyes){
    const url = "https://oswf2esjki.execute-api.us-east-2.amazonaws.com/legsapp/";

    var uri = format + "?format=" + format + "&equips1=" + equips1.join(",") 
    + "&bodypart=" + bodypart + "&hitts=" + hittyes;

    console.log(uri);

    d3.json(url + encodeURI(uri))
        .then(function(data){
            outputexercises(data,format);
     });
    }

  function outputexercises(data, format){   
      console.log(data);

    var div;
    var out_id = "";

    if (format =="hittyes"){
        div = d3.select("#hittoutput");
        out_id = "output2"
        data = [{reps: "", exercise:data[0]}];
        
    }
    else {
        div = d3.select("#circuitoutput");
        out_id = "output1"
    }

    d3.select("#" + out_id).remove();
    
      // Output:
    var output = div.append("div")
    .attr("id",  out_id);
    

    var outputtable = output.selectAll("p")
    .data(data)
    .enter()
    .append("p")
    .attr("class", "outputtext")
    .text(function(d) { return d.reps + " " + d.exercise; });
}
  