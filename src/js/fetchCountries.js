function fetchCountries(searchQuery) {
    return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`).then(response => {
        if (response.status === 404) {
            return;
        }
        if (response.status === 200) {            
            return response.json();
        }    
    }     
    )
   }
export default {fetchCountries}