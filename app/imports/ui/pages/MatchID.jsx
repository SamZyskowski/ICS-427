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
      matchID: ''
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
            alert(this.state.matchID + " is your match ID");
            this.matchData.getMatchData(parseInt(matchID));
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

        </Grid>
      );
  }
}
export default MatchID;