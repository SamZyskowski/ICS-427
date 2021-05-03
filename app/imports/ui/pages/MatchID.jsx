import React from 'react';
import {Container, Form, Grid, Header, Message, Segment} from 'semantic-ui-react';
import matchData from '../../api/stuff/matchData'
import validator from 'validator';
import styled from 'styled-components';

const BackgroundStyle = styled.div`
  background: url('https://cdn1.dotesports.com/wp-content/uploads/2018/08/11142025/ba87965c-382e-403d-b764-98f9baae54ac.png');
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

class MatchID extends React.Component {

    /*
    Binds handleinputchange and handlesubmit so they may be called down below
    Also sets matchID to an empty string
  */
    constructor(props) {
        super(props)
        this.state = {
            matchID: '',
            victoryC: '',
            duration: '',
            skillInt: '',
            skillString: '',
            victoryOut: '',
            victorImage: ''
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

        if (validator.isInt(matchID)) {
            this.setState({matchID});

            console.log(matchID);
            //alert(this.state.matchID + " is your match ID");
            this.getMatchWinner(parseInt(matchID));
            this.getMatchSkill(parseInt(matchID));
            this.getMatchDuration(parseInt(matchID));

        } else {
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
    async getMatchWinner(x) {
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
    async getMatchDuration(x) {
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
    async getMatchSkill(x) {
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
            this.victorImage = "https://cdn-images.win.gg/resize/w/800/h/600/format/jpg/type/progressive/fit/cover/path/news/b9b852ac7bd1776bc5ac5ce3b41d8af7/c0b830593397c256dc8269556c5512f8/original.jpg"
            // this.victorImage = '"/images/RadiantClip.png';
            //console.log(this.victoryOut);
            //return "Radiant Victory!";
        } else {
            this.victoryOut = "Dire Victory!";
            this.victorImage = "https://www.vpesports.com/wp-content/uploads/2020/03/dire-cover.png"
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
        } else if (skillLevel == 1) {
            this.skillString = "Average!"
        } else if (skillLevel == 2) {
            this.skillString = "Above Average skill!"
        } else if (skillLevel == 3) {
            this.skillString = "High skill!"
        } else {
            this.skillString = "???";
        }
    }

    render() {
        const matchID = this.state
        // return (
        //     <Grid id='landing-page' verticalAlign='middle' textAlign='center' container style={{height: '100vh' }}>
        //         <Grid.Row style={{height: '5%'}}>
        //             <div className="ui form">
        //                 <h1>Input MatchID Here</h1>
        //                 <form onSubmit={this.handleSubmit}>
        //                     <input
        //                         type="text"
        //                         placeholder="MatchID"
        //                         value={this.state.matchID}
        //                         onChange={this.handleInputChange}
        //                     />
        //                     <button>Search</button>
        //                 </form>
        //             </div>
        //         </Grid.Row>
        //         <Grid.Row style={{height: '20%'}}>
        //             <Grid.Column width={10}>
        //                 <b>
        //                     <div className="header" className="victor">
        //                         Winner: {this.victoryOut}
        //                     </div>
        //                 </b>
        //             </Grid.Column>
        //             <Grid.Column width={6}>
        //                 <img src={this.victorImage}/>
        //             </Grid.Column>
        //         </Grid.Row>
        //         <Grid.Row style={{height: '10%'}}>
        //             <div className="header" className="victor">
        //                 Duration of Match: {(this.state.duration / 60).toFixed(0)} minutes
        //             </div>
        //         </Grid.Row>
        //         <Grid.Row style={{height: '30%'}}>
        //             <div className="header"className="victor">
        //                 Skill level: {this.skillString}
        //             </div>
        //         </Grid.Row>
        //     </Grid>
        // );
         return (
            <BackgroundStyle>
            <Grid id='landing-page' verticalAlign='middle' textAlign='center' container style={{height: '70vh'}}>
                <Grid.Row /*style={{height: '15%'}}*/>
                    <div className="ui form">
                        <h1>Input MatchID Here</h1>
                        <form onSubmit={this.handleSubmit}>
                            <input
                                type="text"
                                placeholder="matchID"
                                value={this.state.matchID}
                                onChange={this.handleInputChangeID}
                            />
                            <button>Search</button>
                        </form>
                    </div>
                </Grid.Row>
                <Grid.Row style={{height: '15%'}}>
                    <div className="ui cards">
                        <div className="card">
                            <div className="content">
                                <div className="header" className="victor2">
                                    Winner: {this.victoryOut}
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid.Row>
                <Grid.Row style={{height: '25%'}}>
                    <div className="ui cards">
                        <div className="card">
                            <div className="content">
                                <div className="header" className="victor2">Duration: </div>
                            <div className = "description">
                            {(this.state.duration / 60).toFixed(0)} minutes
                            </div>
                            </div>
                        </div>
                    </div>
                </Grid.Row>
                <Grid.Row style={{height: '15%'}}>
                    <div className="ui cards">
                        <div className="card">
                            <div className="content">

                                <div className="header" className="victor2">
                                   Skill Level: {this.skillString}
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

export default MatchID;