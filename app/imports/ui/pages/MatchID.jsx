import React from 'react';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import matchData from '../../api/stuff/matchData'
import validator from 'validator';


class MatchID extends React.Component {
   
    /*
    Binds handleinputchange and handlesubmit so they may be called down below
    Also sets matchID to an empty string
  */
  constructor(props){
    super(props)
    this.state = {
      matchID: '', 
      victoryC: '',
      duration:'',
      skillInt: '', 
      skillString: '',
      victoryOut: ''
    }
    this.matchData = new matchData(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
    

   /*
    Shows user what they are inputting before calling 
    an imported method getMatchData on the results
  */
    handleSubmit = (event) => {
        event.preventDefault();
        const matchID = this.state.matchID;
    
          if(validator.isInt(matchID))
          {
            this.setState({matchID});

            console.log(matchID);
            //alert(this.state.matchID + " is your match ID");
            this.getMatchWinner(parseInt(matchID));
            this.getMatchSkill(parseInt(matchID));
            this.getMatchDuration(parseInt(matchID));

          } 
          else
          {
            alert("Please enter an integer");
          }
        
      }

      /*
    Sets the state whenever matchID is changed 
  */
  handleInputChange = (event) => {
    this.setState({
       matchID: event.target.value
      
      })

  }

  /**
    * Gets the match data from a passed match ID and sends a GET request to the OPEN DOTA api
    * In this case, the duration of the game is found, as well as the winner and the skill group
    * @param x 
    */
   async getMatchWinner(x){
    await fetch("https://api.opendota.com/api/matches/" + x)
    .then(res => res.json())
    .then((result) => {
        this.setState({
            isOK: true,
            matchResult: result.data,
            victoryC: result.radiant_win,

        });
        
        //console.log(result.radiant_win);
        this.victoryFind(result.radiant_win);
    },
        //if(response.ok){
       // }
       // else {
        //    throw new Error('Something went wrong');
       // }
    (error) => {
        this.setState({
            isOK: true,
            error
        });

    })
}

/**
    * Gets the match data from a passed match ID and sends a GET request to the OPEN DOTA api
    * In this case, the duration of the game is found, as well as the winner and the skill group
    * @param x 
    */
 async getMatchDuration(x){
  await fetch("https://api.opendota.com/api/matches/" + x)
  .then(res => res.json())
  .then((result) => {
      this.setState({
          isOK: true,
          matchResult: result.data,
          duration: result.duration,
      });
  },
      //if(response.ok){
     // }
     // else {
      //    throw new Error('Something went wrong');
     // }
  (error) => {
      this.setState({
          isOK: true,
          error
      });

  }
  
  )
}
/**
    * Gets the match data from a passed match ID and sends a GET request to the OPEN DOTA api
    * In this case, the duration of the game is found, as well as the winner and the skill group
    * @param x 
    */
 async getMatchSkill(x){
  await fetch("https://api.opendota.com/api/matches/" + x)
  .then(res => res.json())
  .then((result) => {
      this.setState({
          isOK: true,
          matchResult: result.data,
          skillInt: result.skill

      });

      this.skillFind(result.skill);
      
  },
      //if(response.ok){
     // }
     // else {
      //    throw new Error('Something went wrong');
     // }
  (error) => {
      this.setState({
          isOK: true,
          error
      });

  }
  
  )
}

    /**
    * Function to see which side won the game 
    * @param {bool} radiantWin 
    */
       victoryFind(radiantWin) {
        if (radiantWin == true) {
         this.victoryOut = "Radiant Victory!";
         //console.log(this.victoryOut);
         //return "Radiant Victory!";
        }
        else {
          this.victoryOut = "Dire Victory!";
          //return "Dire Victory!";
  }
}


      /**
      * Function to see what the skill level of the game was
      * @param {int} skillLevel 
      */
        skillFind(skillLevel) {
           if (skillLevel == 0) {
              this.skillString = "Below Average!"
          }
          else if (skillLevel == 1) {
            this.skillString = "Average!"
          }
          else if (skillLevel == 2) {
            this.skillString = "Above Average skill!"
          }
          else if (skillLevel == 3) {
            this.skillString = "High skill!"
          }
          else {
            this.skillString = "???";
  }
}

  render(){
      const matchID = this.state
      return (
        <Grid id='landing-page' verticalAlign='middle' textAlign='center' container>
            <Grid.Column width = {4}>
              <div class = "ui form">
                <h1>Input MatchID Here</h1>
                <form onSubmit = {this.handleSubmit}>
                  <input
                   type = "text" 
                   placeholder = "MatchID"
                   value = {this.state.matchID}
                   onChange = {this.handleInputChange}
                   />
                <button>Search</button>
                </form>
              </div>
          </Grid.Column>

          <Grid.Column width = {12}>
              <div class = "ui cards">
                  <div class = "card">
                      <div class = "content">
                          <img class = "right floated ui image" src = ""/>
                          <div class = "header">
                                Winner: {this.victoryOut}
                          </div>
                          <div class = "header">
                                Duration of Match: {(this.state.duration/60).toFixed(3)} minutes and {(this.state.duration % 60).toFixed(3)} seconds
                          </div>
                          <div className="header">
                                Skill level: {this.skillString}
                          </div>
                          {/* <div className="header">
                              Hero KDA: {this.state.heroKDA}
                          </div> */}
                      </div>
                  </div>
              </div>
          </Grid.Column>

        </Grid>
      );
  }
}
export default MatchID;