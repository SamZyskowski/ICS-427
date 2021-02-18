
class matchData {

    /*
    Gets the match data based off an inputted matchID
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
    }
}

export default matchData;
    