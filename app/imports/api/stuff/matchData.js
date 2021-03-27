import React from "react";

 class matchData extends React.Component{
     
   constructor(props){
        super(props);
        this.state = {
            matchResult: '',
            isOK: false,
            error: null
        };
        this.getMatchData = this.getMatchData.bind(this);
    }

   /**
    * Gets the match data from a passed match ID and sends a GET request to the OPEN DOTA api
    * @param x 
    */
     getMatchData(x){

        fetch("https://api.opendota.com/api/matches/" + x)
        .then(res => res.json())
        .then((result) => {
            this.setState({
                isOK: true,
                matchResult: result.data
            });
            console.log(result);
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
export default matchData
