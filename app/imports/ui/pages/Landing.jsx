import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import matchData from '../../api/stuff/matchData';


/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      matchID: null
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.matchData.getMatchData(event.target.value)
  }

  handleInputChange = (event) => {
    console.log(event)
    console.log(event.target.name)
    console.log(event.target.value)
    this.setState({
       [event.target.name]: event.target.value
      
      })

  }
  
  render() {
    const matchID = this.state
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
                <h1>Input MatchID Here</h1>
                <form onSubmit = {this.handleSubmit}>
                  <p><input type = "text" pattern = "[0-9]*" placeholder = "MatchID" name = "matchID"/></p>
                  <p><button>Search</button></p>
                </form>
              </div>
          </Grid.Column>

        </Grid>
    );
  }


}

export default Landing;
