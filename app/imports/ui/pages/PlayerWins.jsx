import React from 'react';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import playerData from '../../api/stuff/playerData'
import validator from 'validator';
import { Progress } from 'semantic-ui-react'

class PlayerWins extends React.Component {
   
    /*
    Binds handleinputchange and handlesubmit so they may be called down below
    Also sets playerID to an empty string
  */
  constructor(props){
    super(props)
      this.state = {
          playerID: '',
          playerWins:'',
          hero:'',
          heroKDA:'',
          heroWL:''
      }
    this.playerData = new playerData(props);
    this.handleInputChangeID = this.handleInputChangeID.bind(this);
      this.handleInputChangeHero = this.handleInputChangeHero.bind(this);
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
              this.getkda(parseInt(playerID));
            this.getWinLoss(parseInt(playerID));
              this.getHeroWinLoss(parseInt(playerID));

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
  handleInputChangeID = (event) => {
    this.setState({
        playerID: event.target.value
      })

  }
    handleInputChangeHero = (event) => {
        this.setState({
            hero: event.target.value
        })

    }


  /**
   * Returns the player's win/loss stats
   * @param x   This is the accountID being passed in 
   */
 async getWinLoss(x){
     await fetch("https://api.opendota.com/api/players/" + x + "/wl")
         .then(res => res.json())
         .then((result) => {
               this.setState({
                 isOK: true,
                 playerWins: ((result.win)/((result.win)+(result.lose)))
               })
               console.log((result.win)/((result.win)+(result.lose)));
               return ((result.win)/((result.win)+(result.lose)));
             },
             (error) => {
               this.setState({
                 isOK: true,
                 error
               });
 
             }
 
         )
   }

    async getHeroWinLoss(x){
        await fetch("https://api.opendota.com/api/players/"+ x +"/matches")
            .then(res => res.json())
            .then((result) => {
                    console.log(result);
                    let heroWins = 0;
                    let heroLoses = 0;
                    let i = 0;
                    let length = result.length;
                    for (i = 0; i < length; i++) {
                        if (result[i].hero_id == parseInt(this.state.hero)){
                            if((result[i].player_slot == 0,1,2,3,4 ) && (result[i].radiant_win == true)) {
                                heroWins++;
                            } else if ((result[i].player_slot > 4) && (result[i].radiant_win == false)) {
                                heroWins++;
                            } else {
                                heroLoses++;
                            }
                        }
                    }
                    this.setState({
                        isOK: true,
                        heroWL: (heroWins/(heroWins + heroLoses))
                    })
                console.log(heroWins);
                    console.log(heroLoses);
                    console.log(heroWins/(heroWins + heroLoses));
                    return (heroWins/(heroWins + heroLoses));
                },
                (error) => {
                    this.setState({
                        isOK: true,
                        error
                    });

                }

            )
    }

    async getkda(x){
        await fetch("https://api.opendota.com/api/players/"+ x +"/matches")
            .then(res => res.json())
            .then((result) => {
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
                    this.setState({
                        isOK: true,
                        heroKDA: ((kda.reduce((a, b) => a + b))/kda.length)
                    })
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
                   onChange = {this.handleInputChangeID}
                   />
                    <input
                        type = "text"
                        placeholder = "HeroID"
                        value = {this.state.hero}
                        onChange = {this.handleInputChangeHero}
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
                                Player W/L: {this.state.playerWins}
                          </div>
                          <div className="header">
                              Hero W/L: {this.state.heroWL}
                          </div>
                          <div className="header">
                              Hero KDA: {this.state.heroKDA}
                          </div>
                      </div>
                  </div>
              </div>
          </Grid.Column>
        </Grid>
      );
  }
}
export default PlayerWins;