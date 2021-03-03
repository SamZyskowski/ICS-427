import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import playerData from '../../api/stuff/playerData'
import validator from 'validator';

/** A simple static component to render some text for the landing page. */
class LandingTest extends React.Component {

  /*
    Binds handleinputchange and handlesubmit so they may be called down below
    Also sets matchID to an empty string
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

  /*
    Shows user what they are inputting before calling
    an imported method getMatchData on the results
  */
  handleSubmit = (event) => {
    event.preventDefault();
    const playerID = this.state.playerID;

    if(validator.isInt(playerID))
    {
      this.setState({playerID});
      console.log(playerID);
      alert(this.state.playerID + " is your player ID");
      let matches = this.playerData.getPlayerData(parseInt(playerID));
      console.log(matches);
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
      playerID: event.target.value

    })

  }

  /*
    The last grid column calls for a numeric input,
    so that it may be passed to the handle submit function

  */
  render() {
    const playerID = this.state
    return (
        <Grid id='landing-page' verticalAlign='middle' textAlign='center' container>

          <Grid.Column width={10}>
            <Image size='small' circular src="/images/dota.jpg"/>
          </Grid.Column>

          <Grid.Column width={4}>
            <h1>Welcome to PROSTATS</h1>
            <p>Your next solution to becoming a smarter player</p>
            <p>Sign-up to begin</p>
          </Grid.Column>

          <Grid.Column width = {4}>
            <div class = "ui form">
              <h1>Input PlayerID Here</h1>
              <form onSubmit = {this.handleSubmit}>
                <input
                    type = "text"
                    placeholder = "MatchID"
                    value = {this.state.playerID}
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

export default LandingTest;