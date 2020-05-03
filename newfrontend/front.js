// Data and States *****************************************************************
const DATA = {
  "line1":
    [
      {'name': 'K.'},
    ],
    "line2":
    [
      {'name': 'LORDI'},
    ],
    "line3":
    [
      {'name': 'HAVE MERCY'},
    ],
    "line4":
    [
      {'name': 'Home Workout Generator'},
    ],
  "changemode":
  [
    {'name': 'Change Theme'},
  ],
  "bpcheckheader":
  [
    {'name': 'What are you working?'},
  ],
  "hiitcheckheader":
  [
    {'name': 'Want added H.I.I.T.?'},
  ],
  "equipcheckheader":
    [
      {'name': 'Available Equipment?'},
    ],
  "formatcheckheader":
  [
    {'name': 'What Circuit Format?'},
  ],
  "formatcheckheader2":
  [
    {'name': '(# exercises by # rounds)'},
  ],
  "bodypart": 
    [
      {'name': 'Legs'},
      {'name': 'Boootay'}
    ],
  "hitt": 
    [
      {'name': 'Yeah'},
      {'name': 'No'}
    ],
  "equipment": 
    [  
      {'name': 'Jump Rope'},
      {'name': 'Bench'},
      {'name': 'Step'},
      {'name': '10lb weights'},
      {'name': '15lb weights'},
      {'name': 'Medicine Ball'},
      {'name': 'Kettlebell'},
      {'name': 'Booty Band'},
      {'name': 'Ankle Weights'},
      {'name': 'Weight 20+lbs'}
    ],
  "format":
    [
      {'name': '3x3'},
      {'name': '4x3'},
      {'name': '5x2'},
      {'name': 'Pick for me'}
    ],
    "button":
    [
      {'name': "K. Let's Get It."},
    ],
    "testoutput":
    [
      {'name': "75 Mountain Climbers"},
      {'name': "20 Alternating Jumping Lunges"},
      {'name': "20 Jump Squats"},
      {'name': "15 Bulgarian Split Squats with 10lb weights on each leg"},
    ]
  }

  // States & Initializations 
  var mode = "Lite Mode"; // change to dark 
  var statemode = {"modelist": [false, true]}
  var statebp = { "bplist" : 0}
  var statehiit = { "hiitlist" : 1}
  var stateequip = {"equiplist": [false, false, false, false, false, false, false, false, false, false] }
  var stateformat = { "formatlist" : 0}
  var statebutton = "false";
  var statelogo1 = {"logolist1" : [false]}
  var statelogo2 = {"logolist2" : [false]}
  var statelogo3 = {"logolist3" : [false]}
  var statelogo4 = {"logolist4" : [false]}
  var output = {"outputlist" : [false]}
  

  // Helper Function to move groups 
  function tranxy(x, y) {
    return "translate(" + x + "," + y + ")";
  }

  // GLOBAL SVG
  var svg;


  // RUN FUNCTION DO EVERYTHING IN HERE BUT KEEP IT ORGANIZED 
  function run() { 
    
    // Main SVG Container & size defined 
    var width = 960;
    var height = 3340;
    svg = d3.select("#svgcontainer")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // SVG for log 


  //******************* MODE GROUP *************************

    // Mode Choices 
    var modelist = svg.append("g")
      .attr("transform", tranxy(300,690));
    
    var modetable = modelist.selectAll("g")
      .data(DATA.changemode)
      .enter()
      .append("g")
          .attr("transform", function(d,i) { return tranxy(i*270, 0);});

    modetable.append("rect")
      .attr("class", "modetoggle")
      .attr('ld', 0)
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 350)
      .attr("height", 90)
      .attr("fill", "rgb(169, 168, 248)")
  
    modetable.append("text")
      .attr("class", "modetoggle modetext")
      .attr('ld', 0)
      .style("fill", "#1e2122")
      .text(function(d) { return d.name; })
      .attr("x", 32)
      .attr("y", 60); 

  //****************** BODY PART GROUP *********************

    // BP Header
    var bpheadlist = svg.append("g")
    .attr("transform", tranxy(40,900));

    var bpcheckhead = bpheadlist.selectAll("g")
      .data(DATA.bpcheckheader)
      .enter()

    bpcheckhead.append("text")
    .attr("class", "modetoggle checkhead")
    .attr('ld', 0)
    .style("fill", "rgb(169, 168, 248)")
    .text(function(d) { return d.name; })
    .attr("x", 85)
    .attr("y", 30)

    // BP Checkboxes 
    var bplist = svg.append("g")
      .attr("transform", tranxy(195,1000));
    
    var bptable = bplist.selectAll("g")
      .data(DATA.bodypart)
      .enter()
      .append("g")
          .attr("transform", function(d,i) { return tranxy(i*270, 0);})

    // Appending logo 
    bptable.append("g")
      .attr("class", "modetoggle buttonpicbp")
      .attr('ld', 0)
      .attr("transform", tranxy(0,6))
      .append("use")
        .attr("id", function(d,i){
          return "bpid" + i;
        })
        .attr("transform", "scale(0.092)")
        .attr("class", "buttonpicbp")
        .attr("xlink:href", "#logo")
        .style("fill", "white")
        .style("visibility", function(d,i){
          return (statebp.bplist == i)?"visible":"hidden";
        });
      
    
      bptable.append("text")
        .attr("class", "modetoggle choicestext")
        .attr('ld', 0)
        .style("fill", "white")
        .text(function(d) { return d.name; })
        .attr("x", 75)
        .attr("y", 50)
        .on("click", function(d,i) {
          statebp.bplist = i;
          d3.selectAll(".buttonpicbp").style("visibility", "hidden");
          d3.select("#bpid" + i.toString()).style("visibility", "visible");
      });
        

  //********************** HITT ****************************

  // HIIT Header
  var hiitheadlist = svg.append("g")
        .attr("transform", tranxy(75,1175));

  var hiitcheckhead = hiitheadlist.selectAll("g")
      .data(DATA.hiitcheckheader)
      .enter()
    
  hiitcheckhead.append("text")
    .attr("class", "modetoggle checkhead")
    .attr('ld', 0)
    .style("fill", "rgb(169, 168, 248)")
    .text(function(d) { return d.name; })
    .attr("x", 85)
    .attr("y", 30)

  // HIIT Checkboxes
  var hiitlist = svg.append("g")
      .attr("transform", tranxy(220,1175));
    
    var hiittable = hiitlist.selectAll("g")
      .data(DATA.hitt)
      .enter()
      .append("g")
          .attr("transform", function(d,i) { return tranxy(i*275, 90);});

   // Appending logo 
   hiittable.append("g")
   .attr("transform", tranxy(0,6))
   .append("use")
     .attr("id", function(d,i){
       return "hiitid" + i;
     })
     .attr("transform", "scale(0.092)")
     .attr("xlink:href", "#logo")
     .attr("class", "buttonpichiit")
     .style("fill", "white")
     .style("visibility", function(d,i){
      return (statehiit.hiitlist == i)?"visible":"hidden";
    });
  
  
    hiittable.append("text")
      .attr("class", "modetoggle choicestext")
      .attr('ld', 0)
      .style("fill", "white")
      .text(function(d) { return d.name; })
      .attr("x", 75)
      .attr("y", 50)
      .on("click", function(d,i) {
        statehiit.hiitlist = i;
        d3.selectAll(".buttonpichiit").style("visibility", "hidden");
        d3.select("#hiitid" + i.toString()).style("visibility", "visible");
    });
      

  //****************** EQUIPMENT GROUP *********************
  
    // Equip Header
    var equipheadlist = svg.append("g")
        .attr("transform", tranxy(70,1430));

    var equipcheckhead = equipheadlist.selectAll("g")
       .data(DATA.equipcheckheader)
       .enter()
    
     equipcheckhead.append("text")
      .attr("class", "modetoggle checkhead")
      .attr('ld', 0)
      .style("fill", "rgb(169, 168, 248)")
      .text(function(d) { return d.name; })
      .attr("x", 85)
      .attr("y", 30)
  
    // Equipment and Checkboxes 
    var equiplist = svg.append("g")
        .attr("transform", tranxy(230,1530));

    var equiptable = equiplist.selectAll("g")
        .data(DATA.equipment)
        .enter()
        .append("g")
          .attr("transform", function(d,i) { return tranxy(30, i*100);});

    // Appending logo 
    equiptable.append("g")
      .attr("class", "modetoggle")
      .attr('ld', 0)
      .attr("transform", tranxy(0,6))
      .append("use")
        .attr("id", function(d,i){
          return "equipid" + i;
        })
        .attr("transform", "scale(0.092)")
        .attr("xlink:href", "#logo")
        .attr("class", "buttonpicequip modetoggle")
        .attr('ld', 0)
        .style("fill", "white")
        .style("visibility", "hidden")
  
    equiptable.append("text")
      .attr("class", "modetoggle choicestext")
      .attr('ld', 0)
      .style("fill", "white")
      .text(function(d) { return d.name; })
      .attr("x", 75)
      .attr("y", 48)
      .on("click", function(d,i) {
        stateequip.equiplist[i] = !stateequip.equiplist[i];
        var vis = (stateequip.equiplist[i]) ? "visible":"hidden";
        d3.select("#equipid" + i.toString()).style("visibility", vis);
    });


  // Format ***************************************************************************

  // Format Header
  var formatheadlist = svg.append("g")
  .attr("transform", tranxy(70,2600));

  var formatcheckhead = formatheadlist.selectAll("g")
    .data(DATA.formatcheckheader)
    .enter()

  formatcheckhead.append("text")
  .attr("class", "modetoggle checkhead")
  .attr('ld', 0)
  .style("fill", "rgb(169, 168, 248)")
  .text(function(d) { return d.name; })
  .attr("x", 85)
  .attr("y", 30)

  var formatheadlist2 = svg.append("g")
  .attr("transform", tranxy(70,2675));

  var formatcheckhead2 = formatheadlist2.selectAll("g")
    .data(DATA.formatcheckheader2)
    .enter()

  formatcheckhead2.append("text")
  .attr("class", "modetoggle checkhead2")
  .attr('ld', 0)
  .style("fill", "rgb(169, 168, 248)")
  .text(function(d) { return d.name; })
  .attr("x", 85)
  .attr("y", 30)

  // Format Checkboxes 
  var formatlist = svg.append("g")
    .attr("transform", tranxy(165,2770));
  
  var formattable = formatlist.selectAll("g")
    .data(DATA.format)
    .enter()
    .append("g")
        .attr("transform", function(d,i) { 
          var y = (i < 2) ? 0 : 1;
          return tranxy((i%2)*250, y*100);
        });

  // Appending logo 
  formattable.append("g")
  .attr("transform", tranxy(0,6))
  .append("use")
    .attr("id", function(d,i){
      return "formatid" + i;
    })
    .attr("transform", "scale(0.092)")
    .attr("xlink:href", "#logo")
    .attr("class", "buttonpicformat modetoggle")
    .attr('ld', 0)
    .style("fill", "white")
    .style("visibility", function(d,i){
      return (stateformat.formatlist == i)?"visible":"hidden";
    });


  formattable.append("text")
    .attr("class", "modetoggle choicestext")
    .attr('ld', 0)
    .style("fill", "white")
    .text(function(d) { return d.name; })
    .attr("x", 75)
    .attr("y", 50)
    .on("click", function(d,i) {
      stateformat.formatlist = i;
      d3.selectAll(".buttonpicformat").style("visibility", "hidden");
      d3.select("#formatid" + i.toString()).style("visibility", "visible");
  });



  // Generate Workout Button **********************************************************

  var buttonlist = svg.append("g")
  .attr("transform", tranxy(108,3040));

  var buttontable = buttonlist.selectAll("g")
  .attr("class", "generate")
  .data(DATA.button)
  .enter()
  .append("g")
      .attr("transform", function(d,i) { return tranxy(i*100, 0);});

  buttontable.append("rect")
  .attr("class", "modetoggle generate")
  .attr('ld', 0)
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", 750)
  .attr("height", 200)
  .attr("fill", "#1e2122")
  .attr("stroke-width", "15")
  .attr("stroke", "rgb(169, 168, 248)")
  .on("click", function(d,i){
    generateWorkouts();
  });
 

buttontable.append("text")
  .attr("class", "modetoggle generatetext")
  .attr('ld', 0)
  .style("fill", "rgb(169, 168, 248)")
  .text(function(d) { return d.name; })
  .attr("x", 50)
  .attr("y", 130); 


  //******************* LOGO GROUP *************************

  var logolist1 = svg.append("g")
    .attr("transform", tranxy(40,50));
  var logolist2 = svg.append("g")
    .attr("transform", tranxy(65,20));
  var logolist3 = svg.append("g")
    .attr("transform", tranxy(65,30));
  var logolist4 = svg.append("g")
    .attr("transform", tranxy(50,40));


  var logotable1 = logolist1.selectAll("g")
  .data(DATA.line1)
  .enter()
  .append("g")
      .attr("transform", function(d,i) { return tranxy(10, i*90);});
  var logotable2 = logolist2.selectAll("g")
  .data(DATA.line2)
  .enter()
  .append("g")
      .attr("transform", function(d,i) { return tranxy(12, i*110);});
  var logotable3 = logolist3.selectAll("g")
  .data(DATA.line3)
  .enter()
  .append("g")
      .attr("transform", function(d,i) { return tranxy(19, i*100);});
  var logotable4 = logolist4.selectAll("g")
  .data(DATA.line4)
  .enter()
  .append("g")
      .attr("transform", function(d,i) { return tranxy(31, i*100);});
  
  logotable1.append("rect")
    .attr("class", "modetoggle generatecolor")
    .attr('ld', 0)
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 863)
    .attr("height", 520)
    .attr("fill", "#1e2122")
    .attr("stroke-width", "15")
    .attr("stroke", "rgb(169, 168, 248)")
    .attr("x",0)
    .attr("y", 10);

  logotable1.append("g")
    .attr("transform", tranxy(520,9))
    .append("use")
      .attr("transform", "scale(0.55)")
      .attr("xlink:href", "#logo")
      .attr("class", "logopic")
      .style("fill", "rgb(169, 168, 248)");
  

logotable1.append("text")
  .attr("class", "modetoggle logoline1")
  .attr('ld', 0)
  .style("fill", "rgb(169, 168, 248)")
  .text(function(d) { return d.name; })
  .attr("x", 30)
  .attr("y", 175);

logotable2.append("text")
  .attr("class", "modetoggle logoline2")
  .attr('ld', 0)
  .style("fill", "rgb(169, 168, 248)")
  .text(function(d) { return d.name; })
  .attr("x", 7)
  .attr("y", 330);

logotable3.append("text")
  .attr("class", "modetoggle logoline3")
  .attr('ld', 0)
  .style("fill", "rgb(169, 168, 248)")
  .text(function(d) { return d.name; })
  .attr("x", 0)
  .attr("y", 436);

logotable4.append("text")
  .attr("class", "modetoggle logoline4")
  .attr('ld', 0)
  .style("fill", "rgb(169, 168, 248)")
  .text(function(d) { return d.name; })
  .attr("x", 7)
  .attr("y", 499);
  
  // Output workout *******************************************************************
  
  }


  