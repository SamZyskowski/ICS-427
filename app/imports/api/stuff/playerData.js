import React from "react";

class playerData extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      playerID: '',
      isOK: false,
      error: null
    };
    this.getPlayerData = this.getPlayerData.bind(this);
  }

  /**
   * Gets the match data from a passed match ID and sends a request to the OPEN DOTA api
   * @param x
   */
  getPlayerData(x){
    let matches = [];
    fetch("https://api.opendota.com/api/players/" + x + "/matches")
        .then(res => res.json())
        .then((result) => {
              this.setState({
                isOK: true,
                playerID: result.data
              });
              console.log(result);
              matches = result;
              console.log(matches[0].player_slot)
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
}
export default playerData