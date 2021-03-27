import React from "react";

class playerData extends React.Component{

  constructor(props){
    super(props);

    // this.wins = 0;
    // this.losses = 0;

    this.state = {
      playerResult: '',
      playerWins: '',
      isOK: false,
      error: null
    };
    this.getPlayerData = this.getPlayerData.bind(this);
    this.getWinLoss = this.getWinLoss.bind(this);

  }

  /**
   * Gets the player data from a passed player ID and sends a GET request to the OPEN DOTA api
   * @param x   This is the accountID being passed in 
   */
  getPlayerData(x){
    fetch("https://api.opendota.com/api/players/" + x)
        .then(res => res.json())
        .then((result) => {
              this.setState({
                isOK: true,
                playerResult: result.data
              });
              console.log(result);
              //matches = result;
              //console.log(matches[0].player_slot)
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
   * Returns the player's win/loss stats
   * @param x   This is the accountID being passed in 
   */
  getWinLoss(x, props){
    fetch("https://api.opendota.com/api/players/" + x + "/wl")
        .then(res => res.json())
        .then((result) => {
              this.setState({
                isOK: true,
                playerWins: result.win
              });
              console.log(result);
              return result.win;
            },
            (error) => {
              this.setState({
                isOK: true,
                error
              });

            }

        )
        
  }
  
}
export default playerData