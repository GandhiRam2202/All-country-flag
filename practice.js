
document.addEventListener('DOMContentLoaded', function () {
    // Replace 'your_api_endpoint' with the actual endpoint of the Restcountries API
    var apiEndpoint = 'https://restcountries.com/v3.1/all';

    // Make the API request
    fetch(apiEndpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Get an array of flag URLs and country details from the API response
            var countries = data.map(country => ({
                flagUrl: country.flags.svg,
                name: country.name.common,
                region: country.region,
                subregion: country.subregion,
                population: country.population,
            }));

            // Create image elements for each flag and append them to the flagsContainer
            var flagsContainer = document.getElementById('flagsContainer');
            countries.forEach(country => {
                var flagImage = document.createElement('img');
                flagImage.src = country.flagUrl;
                flagImage.width = 100;
                flagImage.height = 40;
                flagImage.setAttribute('data-name', country.name);
                flagImage.setAttribute('data-region', country.region);
                flagImage.setAttribute('data-subregion', country.subregion);
                flagImage.setAttribute('data-population', country.population);

                // Add click event listener to each flag
                flagImage.addEventListener('click', displayCountryDetails);

                flagsContainer.appendChild(flagImage);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error fetching country data. Please try again later.');
        });
});

function displayCountryDetails(event) {
    // Access the data attributes of the clicked flag
    var name = event.target.getAttribute('data-name');
    var region = event.target.getAttribute('data-region');
    var subregion = event.target.getAttribute('data-subregion');
    var population = event.target.getAttribute('data-population');

    // Display country details in the countryDetails div
    var countryDetailsContainer = document.getElementById('countryDetails');
    countryDetailsContainer.innerHTML = `
        <h2>${name}</h2>
        <p><strong>Region:</strong> ${region}</p>
        <p><strong>Subregion:</strong> ${subregion}</p>
        <p><strong>Population:</strong> ${population}</p>
    `;
}
