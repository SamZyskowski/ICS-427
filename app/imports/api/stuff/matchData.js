 class matchData {

   /**
    * Gets the match data from a passed match ID and sends a request to the OPEN DOTA api
    * @param x 
    */
     getMatchData(x){

        fetch("https://api.opendota.com/api/matches/" + x).subscribe((MD))
        .then(response => {
            if(response.ok){
            response = MD;
            console.log(MD.json());
            return MD.json();
            }
            else {
                throw new Error('Something went wrong');
            }
        })
        .then(data => {
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
        });
        return x;
    }
}
export default matchData
