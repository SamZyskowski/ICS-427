import React from 'react';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import playerData from '../../api/stuff/playerData'
import validator from 'validator';


class PlayerID extends React.Component {
   
    /*
    Binds handleinputchange and handlesubmit so they may be called down below
    Also sets playerID to an empty string
  */
  constructor(props){
    super(props)
    this.state = {
      playerID: ''
     
    }
    this.playerData = new playerData(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async ComponentDidMount(){
    const pd = new playerData(props);
    const information = await pd.getWinLoss(105248644);
    console.log(information);
  }
    

   /*
    Shows user what they are inputting before calling 
     imported methods getPlayerData and getWinLoss on the results
  */
    handleSubmit = (event) => {
        event.preventDefault();
        const playerID = this.state.playerID;
    
          if(validator.isInt(this.state.playerID))
          {
            this.setState({playerID});
            //console.log(playerID);
            alert(this.state.playerID + " is your player ID");

            //use these to display to console
            
            this.playerData.getPlayerData(parseInt(playerID));
            this.playerData.getWinLoss(parseInt(playerID));
            //console.log(this.playerData.result.win);
          } 
          else
          {
            alert("Please enter an integer");
          }
        //   let jsonData;
        //   this.playerData.getWinLoss(parseInt(playerID)).then((data) => {
        //       jsonData = data;
        //   });
          
      }

/*
    Sets the state whenever playerID is changed 
  */
  handleInputChange = (event) => {
    this.setState({
        playerID: event.target.value
      })

  }

  render(){
      const playerID = this.state
      return (
        <Grid id='landing-page' verticalAlign='middle' textAlign='center' container>
            <Grid.Column width = {4}>
              <div class = "ui form">
                <h1>Input PlayerID Here</h1>
                <form onSubmit = {this.handleSubmit}>
                  <input
                   type = "text" 
                   placeholder = "playerID"
                   value = {this.state.playerID}
                   onChange = {this.handleInputChange}
                   />
                <button>Search</button>
                </form>
              </div>
          </Grid.Column>

          <Grid.Column width = {4}>
              <div class = "ui cards">
                  <div class = "card">
                      <div class = "content">
                          <img class = "right floated ui image" src = ""/>
                          <div class = "header">
                          </div>
                      </div>
                  </div>
              </div>
          </Grid.Column>
        </Grid>
      );
  }
}
export default PlayerID;