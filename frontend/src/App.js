import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"; 
import { FormCheckbox } from "shards-react";
import { Button, ButtonGroup } from "shards-react";
import {FormRadio} from "shards-react";
import { Container, Row, Col } from "shards-react";
import axios from 'axios'
import randomItem from 'random-item';
import Img from './logo7.png';
import Img from './1.png';
import Img from './2.png';
import Img from './3.png';


function Hitt(props) {
  const begin = props.begin;
  const type = props.type; 
  const hitts = props.hitts;
  const hittcond = props.hittyes;
  if (begin) {
    if (hittcond == true){
      return <Container className="hittcontainer">
      <Row>
        <Col> &bull; {hitts[0]} </Col>
      </Row>
    </Container>
    }
    else {
      return <div></div>
    }
  }
  return null;
}

function Workouts(props) {
  //console.log(props);
  const begin = props.begin;
  const type = props.typeformat;
  const bodypart = props.typebodypart;
  //console.log(type);
  const works = props.works;
  console.log(works);
  if (begin && works.length > 0) {
    if (type === "3x3"){ 
      return <Container className="bigcontainer">
                <div> 
                <center>
                  <img ClassName="pic3x3" src= {Img} alt="pic" height="368.146" width="380" margin-top="50"/>
                  <br/> <b> </b>
                </center>
              </div>
                <Row>
                  <Col> &bull; {works[0].reps} {works[0].exercise} </Col>
                </Row>
                <Row>
                  <Col> &bull; {works[1].reps} {works[1].exercise} </Col>
                </Row>
                <Row>
                  <Col> &bull; {works[2].reps} {works[2].exercise} </Col>
                </Row>
                <Row>
                  <Col> Repeat 3 Times </Col>
                </Row>
            </Container>
    }
    else if (type === "4x3"){ 
      return <Container className="bigcontainer">
                <Row>
                  <Col> &bull; {works[0].reps} {works[0].exercise} </Col>
                </Row>
                <Row>
                  <Col> &bull; {works[1].reps} {works[1].exercise} </Col>
                </Row>
                <Row>
                  <Col> &bull; {works[2].reps} {works[2].exercise} </Col>  
                </Row>
                <Row>
                  <Col> &bull; {works[3].reps} {works[3].exercise} </Col>
                </Row>
                <Row>
                  <Col> Repeat 3 Times </Col>
                </Row>
            </Container>
    }
    else if (type === "5x2"){ 
      return <Container className="bigcontainer"> 
                <Row>
                  <Col> &bull; {works[0].reps} {works[0].exercise} </Col>
                </Row>
                <Row>
                  <Col> &bull; {works[1].reps} {works[1].exercise} </Col>
                </Row>
                <Row>
                  <Col> &bull; {works[2].reps} {works[2].exercise} </Col>
                </Row>
                <Row>
                  <Col> &bull; {works[3].reps} {works[3].exercise} </Col>
                </Row>
                <Row>
                  <Col> &bull; {works[4].reps} {works[4].exercise} </Col>
                </Row>
                <Row>
                  <Col> Repeat 2 Times </Col>
                </Row>
            </Container>
    }
    else {
      return <p>Please select a workout format above (# Exercises by # Rounds)</p>
    }
  }
 return <div></div>;
} 

class App extends React.Component {
  state = {
    data: null
  };

  constructor(props) {
    super(props);
    this.handleChangePart = this.handleChangePart.bind(this);
    this.handleChangeHitt = this.handleChangeHitt.bind(this);
    this.handleChangeEquip = this.handleChangeEquip.bind(this);
    this.handleChangeFormat = this.handleChangeFormat.bind(this);
    this.generateWorkouts = this.generateWorkouts.bind(this);
    this.callBackend = this.callBackend.bind(this);
    this.state = {
      // Body Part 
      legs: true,
      booty: false,
      both: false,

      // HITT?
      hittyes: false,

      // Equipment 
      jumprope: false,
      bench: false,
      step: false,
      weights10: false,
      weights15: false,
      ball: false,
      kettle: false,
      bootyband: false,
      ankleweights:false,
      hweight: false,

      // Workout Format 
      //w2x5: false,
      w3x3: true,
      w4x3: false,
      w5x2: false,
      pickforme: false,
      started: false,

      // Default Settings & Initializations: Bodypart, hitt, format, equipts array, output workout arrays 
      typebodypart: "",
      typehitt: false,
      typeformat: "3x3",
      equips1: [],
      works: [],
      hitts: [],

      // Theme settings 
      theme: "blue"
    };
  }

  async generateWorkouts() {
    console.log(this.state);
    var arr = ["na"];
    this.setState({started: true});
    
    if (this.state.jumprope) {
      arr.push("Jump Rope");
    }
    if (this.state.step) {
      arr.push("Step");
    }
    if (this.state.weights10) {
      arr.push("10lb weights");
    }
    if (this.state.weights15) {
      arr.push("15lb weights");
    }
    if (this.state.ball) {
      arr.push("Medicine Ball");
    }
    if (this.state.kettle) {
      arr.push("Kettlebell");
    }
    if (this.state.bench) {
      arr.push("Bench");
    }
    if (this.state.bootyband) {
      arr.push("Booty Band");
    }
    if (this.state.ankleweights) {
      arr.push("Ankle Weights");
    }
    if (this.state.hweight) {
      arr.push("Weight 10+lbs");
    }
  
    var bp;

    if (this.state.legs){
      bp = "Legs";
    }
    else if (this.state.booty){
      bp = "Booty";
    } 

    console.log(arr);

    /* if (this.state.w2x5){
      // this.setState({typeformat: "2x5"});
      await this.callBackend("2x5", arr, bp, this.state.typehitt);
    } */
    if (this.state.w3x3){
      //this.setState({typeformat: "3x3"});
      await this.callBackend("3x3", arr, bp, this.state.typehitt);
    }
    else if (this.state.w4x3){
      //this.setState({typeformat: "4x3"});
      await this.callBackend("4x3", arr, bp, this.state.typehitt);
    }
    else if (this.state.w5x2){
      //this.setState({typeformat: "5x2"});
      await this.callBackend("5x2", arr, bp, this.state.typehitt);
    }
    else if (this.state.pickforme){
      var r = randomItem(["3x3", "4x3", "5x2"]);
      //this.setState({typeformat: r});
      await this.callBackend(r, arr, bp, this.state.typehitt);
    }  
    if (this.state.hittyes){
      await this.callBackend("hitts", arr, bp, "hittyes");
      //this.setState({typehitt: "hittyes"});
    } 
    
  }

  async callBackend(format, equips1, bodypart, hittyes){
    const url = "https://oswf2esjki.execute-api.us-east-2.amazonaws.com/legsapp/";
    await axios
          .get(url + format, {
            params: {
              equips1: equips1.join(","),
              format: format,
              bodypart: bodypart,
              hittyes: hittyes
            }
          })
          .then(response => {
            const newState = {};
            newState["typebodypart"] = bodypart;
            if (format == "hitts"){
              newState["hitts"] = JSON.parse(response.data);
            }
            else {
              newState["works"] = JSON.parse(response.data);
              newState["typeformat"] = format;
            }
            this.setState({...this.state, ...newState });
            console.log(response.data);
            console.log(this.state.works);
          })
  }

  handleChangeEquip(e, equip) {
    const newState = {};
    newState[equip] = !this.state[equip];
    this.setState({...this.state, ...newState });
  }

  handleChangeHitt(e, work) {
    const newState = {};
    newState[work] = !this.state[work];
    if (this.state["hittyes"]) {
      newState["hittyes"] = false;
    }
    else {
      newState["hittyes"] = true;
    }
    this.setState({...this.state, ...newState });
  }

  handleChangePart(e, work) {
    const newState = {};
    newState[work] = !this.state[work];
    if (this.state["booty"] && work !== "booty") {
      newState["booty"] = false;
    }
    if (this.state["legs"] && work !== "legs") {
      newState["legs"] = false;
    }
   /*  if (this.state["both"] && work !== "both") {
      //newState["both"] = false;
      // how to get both to actually get both?
      newState["legs"] = false;
      newState["booty"] = false;
    } */
    this.setState({...this.state, ...newState });
  }
  
  handleChangeFormat(e, work) {
    const newState = {};
    newState[work] = !this.state[work];
    /* if (this.state["w2x5"] && work !== "w2x5") {
      newState["w2x5"] = false;
    } */
    if (this.state["w3x3"] && work !== "w3x3") {
      newState["w3x3"] = false;
    }
    if (this.state["w4x3"] && work !== "w4x3") {
      newState["w4x3"] = false;
    }
    if (this.state["w5x2"] && work !== "w5x2") {
      newState["w5x2"] = false;
    }
   if (this.state["pickforme"] && work !== "pickforme") {
      newState["pickforme"] = false;
    } 
    this.setState({...this.state, ...newState });
  }


  render() {
    return (
      <div className="App">
        
      <div> 
				<center>
          <img ClassName="logo" src= {Img} alt="pic" height="368.146" width="380" margin-top="50"/>
					<br/> <b> </b>
				</center>
			</div>

        <p className="checkhead"> This or that?</p>
        <div id="main">
          <div id="bodypart">
            <FormRadio name="bodypart"
              inline
              checked={this.state.legs}
              onChange={e => this.handleChangePart(e, "legs")}
            >
            Legs 
            </FormRadio>
            <FormRadio name="bodypart"
              inline
              checked={this.state.booty}
              onChange={e => this.handleChangePart(e, "booty")}
            >
            Boootay
            </FormRadio>
          </div>
        
            <p className="checkhead"> Want added HIIT? </p>
          <div id="hittchecks">
           <FormCheckbox 
              inline
              checked={this.state.hittyes}
              onChange={e => this.handleChangeHitt(e, "hittyes")}
            >
            Yeah Baby
            </FormCheckbox>
          </div>
          <div id="equipchecks">
            <p className="checkhead"> What equipment? </p>
            <FormCheckbox
              checked={this.state.jumprope}
              onChange={e => this.handleChangeEquip(e, "jumprope")} 
            >
            Jump Rope
            </FormCheckbox>
            <FormCheckbox
              checked={this.state.bench}
              onChange={e => this.handleChangeEquip(e, "bench")}
            >
           Bench
            </FormCheckbox>
            <FormCheckbox
              checked={this.state.step}
              onChange={e => this.handleChangeEquip(e, "step")} 
            >
            Step
            </FormCheckbox>
            <FormCheckbox
              checked={this.state.weights10}
              onChange={e => this.handleChangeEquip(e, "weights10")} 
            >
            10lb weights
            </FormCheckbox>
            <FormCheckbox 
              checked={this.state.weights15}
              onChange={e => this.handleChangeEquip(e, "weights15")}
            >
            15lb weights
            </FormCheckbox>
            <FormCheckbox
              checked={this.state.ball10}
              onChange={e => this.handleChangeEquip(e, "ball")}
            >
            Medicine Ball
            </FormCheckbox>
            <FormCheckbox
              checked={this.state.kettle}
              onChange={e => this.handleChangeEquip(e, "kettle")}
            >
            Kettlebell
            </FormCheckbox>
            <FormCheckbox
              checked={this.state.bootyband}
              onChange={e => this.handleChangeEquip(e, "bootyband")}
            >
            Booty Band
            </FormCheckbox>
            <FormCheckbox
              checked={this.state.ankleweights}
              onChange={e => this.handleChangeEquip(e, "ankleweights")}
            >
            Ankle Weights
            </FormCheckbox>
            <FormCheckbox
              checked={this.state.hweight}
              onChange={e => this.handleChangeEquip(e, "hweight")}
            >
            Weight 20+lbs
           </FormCheckbox>
          </div>
        </div>
        <div id="workouts">
        <p className="checkhead"> Circuit format?</p>
        <p className="checkhead2"> (# exercises by # rounds)</p>
          <FormRadio name="formatradio"
            inline
            checked={this.state.w3x3}
            onChange={e => this.handleChangeFormat(e, "w3x3")}
          >
          3 x 3 
          </FormRadio>
          <FormRadio name="formatradio"
            inline
            checked={this.state.w4x3}
            onChange={e => this.handleChangeFormat(e, "w4x3")}
          >
          4 x 3 
          </FormRadio>
          <FormRadio name="formatradio"
            inline
            checked={this.state.w5x2}
            onChange={e => this.handleChangeFormat(e, "w5x2")}
          >
          5 x 2
          </FormRadio>
          <FormRadio name="formatradio"
            inline
            checked={this.state.pickforme}
            onChange={e => this.handleChangeFormat(e, "pickforme")}
          >
          Pick for me
          </FormRadio>
        </div>
        <div id="button">
          <Button block outline theme="white" buttonStyle="Tahoma" size="lg" onClick={this.generateWorkouts} >
           Generate Workout!
          </Button>
        <div id="spacers">
          <li></li>
        </div>
      </div>
      <Hitt begin={this.state.started} typehitt={this.state.typehitt} hittyes={this.state.hittyes} hitts={this.state.hitts}/>
      <Workouts begin={this.state.started} typeformat={this.state.typeformat} typebodypart={this.state.typebodypart} works={this.state.works}/>
      </div>
    );
  }
}

export default App;
