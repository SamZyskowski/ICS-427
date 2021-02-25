import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import validator from 'validator';
import matchData from '../../api/stuff/matchData';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {

  /*
    Binds handleinputchange and handlesubmit so they may be called down below
    Also sets matchID to an empty string
  */
  constructor(props) {
    super(props);
    this.state = {
      matchID: '',
    };
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

      if (validator.isInt(matchID)) {
        this.setState({ matchID });
        console.log(matchID);
        alert(`${this.state.matchID} is your match ID`);
        this.matchData.getMatchData(parseInt(matchID));
      } else {
        alert('Please enter an integer');
      }

  }

  /*
    Sets the state whenever matchID is changed
  */
  handleInputChange = (event) => {
    this.setState({
       matchID: event.target.value,

      });

  }

  /*
    The last grid column calls for a numeric input,
    so that it may be passed to the handle submit function

  */
  render() {
    const matchID = this.state;
    return (
        <Grid id='landing-page' verticalAlign='middle' textAlign='center' divided='vertically' container>

            <Grid.Row>

              <Grid.Column width={7}>
                <h1>Welcome to PROSTATS</h1>
                <p>Your next solution to becoming a smarter player</p>
                <p>Sign-up to begin</p>
              </Grid.Column>

              <Grid.Column width={3}>
              </Grid.Column>

              <Grid.Column width={5}>
                <Image size='small' circular src="/images/dota.jpg"/>
              </Grid.Column>

            </Grid.Row>

            <Grid.Row>

              <Grid.Column width={7}>
                  <div className = "ui form">
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

            </Grid.Row>

          <Grid.Row width={10}>
            <h1>Match Records Displayed here</h1>

          </Grid.Row>

        </Grid>
    );
  }

}

export default Landing;
