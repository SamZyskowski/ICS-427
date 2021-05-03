import React from 'react';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import playerData from '../../api/stuff/playerData'
import validator from 'validator';
import { Progress } from 'semantic-ui-react'

class PlayerStatsWithHero extends React.Component {

    /*
    Binds handleinputchange and handlesubmit so they may be called down below
    Also sets playerID to an empty string
  */
    constructor(props){
        super(props)
        this.state = {
            playerID: '',
            playerWins:'',
            hero:'40'
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

    increment = () =>
        this.setState((prevState) => ({
            playerWins: prevState.playerWins >= 100 ? 0 : prevState.playerWins,
        }))


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
            alert(this.state.playerID + " is your player ID");

            //use these to display to console

            this.playerData.getPlayerData(parseInt(playerID));
            this.getkda(parseInt(playerID));
        }
        else
        {
            alert("Please enter an integer");
        }
    }

    /*
        Sets the state whenever playerID is changed
      */
    handleInputChange = (event) => {
        this.setState({
            playerID: event.target.value
        })

    }


    /**
     * Returns the player's win/loss stats
     * @param x   This is the accountID being passed in
     */

  async getkda(x){
      await fetch("https://api.opendota.com/api/players/"+ x +"/matches")
          .then(res => res.json())
          .then((result) => {
                  this.setState({
                      isOK: true,
                      playerWins: ((result.win)/((result.win)+(result.lose)))
                  })
                  console.log(result);
                  let kda = [];
                  let i = 0;
                  let length = result.length;
                  for (i = 0; i < length; i++) {
                      if (result[i].hero_id == parseInt(this.state.hero)){
                          if(result[i].deaths == 0){
                              kda.push((result[i].kills) + (result[i].assists));
                          } else {
                              kda.push(((result[i].kills) + (result[i].assists))/ (result[i].deaths));
                          }
                      }
                  }
                  return ((kda.reduce((a, b) => a + b))/kda.length);
              },
              (error) => {
                  this.setState({
                      isOK: true,
                      error
                  });

              }

          )
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
                                    {this.state.playerWins}
                                    <Progress percent={this.state.playerWins} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid.Column>
            </Grid>
        );
    }
}
export default PlayerStatsWithHero;