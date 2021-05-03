import React from 'react';
import {Container, Form, Grid, Header, Message, Segment} from 'semantic-ui-react';
import playerData from '../../api/stuff/playerData'
import validator from 'validator';
import {Progress} from 'semantic-ui-react'
import styled from 'styled-components';





const BackgroundStyle = styled.div`
  background: url('https://estnn.com/wp-content/uploads/2020/04/wraith-king-dota-2.png');
  background-size: cover;
  position: fixed;
  top: 58px;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  font-size: 2em;
`;




class PlayerWins extends React.Component {

    /*
    Binds handleinputchange and handlesubmit so they may be called down below
    Also sets playerID to an empty string
  */
    constructor(props) {
        super(props)
        this.state = {
            playerID: '',
            playerWins: '',
            hero: '',
            heroKDA: '',
            heroWL: '',
            playerTotalWins: ''
        }
        this.playerData = new playerData(props);
        this.handleInputChangeID = this.handleInputChangeID.bind(this);
        this.handleInputChangeHero = this.handleInputChangeHero.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    /*
     Shows user what they are inputting before calling
      imported methods getPlayerData and getWinLoss on the results
   */
    handleSubmit = (event) => {
        event.preventDefault();
        const playerID = this.state.playerID;

        if (validator.isInt(this.state.playerID)) {
            this.setState({playerID});
            this.getkda(parseInt(playerID));
            this.getWinLoss(parseInt(playerID));
            this.getHeroWinLoss(parseInt(playerID));

        } else {
            alert("Please enter an integer");
        }
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
    async getWinLoss(x) {
        await fetch("https://api.opendota.com/api/players/" + x + "/wl")
            .then(res => res.json())
            .then((result) => {
                    this.setState({
                        isOK: true,
                        playerWins: ((result.win) / ((result.win) + (result.lose))).toFixed(3),
                        playerTotalWins: result.win
                    })
                    console.log((result.win) / ((result.win) + (result.lose)));
                    return ((result.win) / ((result.win) + (result.lose)));
                },
                (error) => {
                    this.setState({
                        isOK: true,
                        error
                    });

                }
            )
    }

    /**
     * Function to get a specific Heros Win Loss ratio average
     * Makes use of the state to store the Win loss ratio of the specific hero in the param heroWL
     * @param x = PlayerID used to retrieve matches
     */
    async getHeroWinLoss(x) {
        await fetch("https://api.opendota.com/api/players/" + x + "/matches")
            .then(res => res.json())
            .then((result) => {
                    console.log(result);
                    let heroWins = 0;
                    let heroLoses = 0;
                    let i = 0;
                    let length = result.length;
                    for (i = 0; i < length; i++) {
                        if (result[i].hero_id == parseInt(this.state.hero)) {
                            if ((result[i].player_slot == 0, 1, 2, 3, 4) && (result[i].radiant_win == true)) {
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
                        heroWL: (heroWins / (heroWins + heroLoses)).toFixed(3)
                    })
                    console.log(heroWins);
                    console.log(heroLoses);
                    console.log(heroWins / (heroWins + heroLoses));
                    return (heroWins / (heroWins + heroLoses));
                },
                (error) => {
                    this.setState({
                        isOK: true,
                        error
                    });

                }
            )
    }

    /**
     * Function to get a specific Heros Kill/Death/Assist average
     * Makes use of the state to store the Kill/Death/Assist average in the param heroKDA
     * @param x = PlayerID used to retrieve matches
     */
    async getkda(x) {
        await fetch("https://api.opendota.com/api/players/" + x + "/matches")
            .then(res => res.json())
            .then((result) => {
                    console.log(result);
                    let kda = [];
                    let i = 0;
                    let length = result.length;
                    for (i = 0; i < length; i++) {
                        if (result[i].hero_id == parseInt(this.state.hero)) {
                            if (result[i].deaths == 0) {
                                kda.push((result[i].kills) + (result[i].assists));
                            } else {
                                kda.push(((result[i].kills) + (result[i].assists)) / (result[i].deaths));
                            }
                        }
                    }
                    this.setState({
                        isOK: true,
                        heroKDA: ((kda.reduce((a, b) => a + b)) / kda.length).toFixed(3)
                    })
                    return ((kda.reduce((a, b) => a + b)) / kda.length);
                },
                (error) => {
                    this.setState({
                        isOK: true,
                        error
                    });

                }
            )
    }

    render() {
        const playerID = this.state
        return (
            <BackgroundStyle>
            <Grid id='landing-page' verticalAlign='middle' textAlign='center' container style={{height: '70vh'}}>
                <Grid.Row /*style={{height: '15%'}}*/>
                    <div class="ui form">
                        <h1>Input PlayerID Here</h1>
                        <form onSubmit={this.handleSubmit}>
                            <input
                                type="text"
                                placeholder="playerID"
                                value={this.state.playerID}
                                onChange={this.handleInputChangeID}
                            />
                            <input
                                type="text"
                                placeholder="HeroID"
                                value={this.state.hero}
                                onChange={this.handleInputChangeHero}/>
                            <button>Search</button>
                        </form>
                    </div>
                </Grid.Row>
                <Grid.Row style={{height: '15%'}}>
                    <div className="ui cards">
                        <div className="card">
                            <div className="content">
                                <div className="header" className="victor">
                                    Total Wins: {this.state.playerTotalWins}
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid.Row>
                <Grid.Row style={{height: '15%'}}>
                    <div className="ui cards">
                        <div className="card">
                            <div className="content">
                                <div className="header" className="victor">
                                    Player W/L: {this.state.playerWins}
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid.Row>
                <Grid.Row style={{height: '15%'}}>
                    <div className="ui cards">
                        <div className="card">
                            <div className="content">

                                <div className="header" className="victor">
                                    Hero W/L: {this.state.heroWL}
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid.Row>
                <Grid.Row style={{height: '15%'}}>
                    <div className="ui cards">
                        <div className="card">
                            <div className="content">
                                <div className="header" className="victor">
                                    Hero KDA: {this.state.heroKDA}
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid.Row>
            </Grid>
            </BackgroundStyle>
        );
    }
}

var itemstyle1 =
    {
        fontFamily: 'Helvetica', fontSize
:
'20px', color
:
'black', textAlign
:
'center'
}
;

export default PlayerWins;