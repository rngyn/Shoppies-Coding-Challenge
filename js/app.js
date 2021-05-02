// Separate arrays for movies and nominees
var movies = [];
var nominees = [];

// Omdb API url building
const apiKey = '48c64415';
var url = 'https://www.omdbapi.com/?apikey=' + apiKey + '&type=movie';

// These functions will load when the DOM is ready
$(document).ready(function() {

    // Clicking the search button will trigger movie searching function
    document.getElementById('searchButton').addEventListener('click', displaySearchResults);

    // Enable enter key to trigger the same function for searching
    document.getElementById('searchMovie').addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            displaySearchResults();
        }
    });

    // This function calls to the API and loads HTML to display the response results
    function displaySearchResults() {
        document.getElementById('searchResults').innerHTML = '';
        movies = [];
        var searchInput = document.getElementById('searchTitle').value;

        // AJAX request to the API
        $.ajax({
            method: 'GET',
            async: false,
            url: url + "&s=" + searchInput,
            dataType: 'json',
            success: function(data) {
                document.getElementById('searchTitle').value = '';
                if (data.Response == 'False') {

                    // Display no results if there is no data from API based on the search input
                    document.getElementById('searchResults').innerHTML = `
                    <div class="mt-5 text-center">
                        <h1 class="display-6">No movies found</h><br>&#127916;
                    </div>`;
                    return;
                } else {

                    // If response is successful, take JSON data and display in HTML
                    movies.push(data.Search);
                    movies = data.Search;
                    movies.forEach(displayMovie);
                    function displayMovie(movies) {
                        if (movies.Poster !== 'N/A' && nominees.indexOf(movies.imdbID) == -1) {

                            // Apostrophes in movie titles break the program. Removing apostrophes in completely.
                            movies.Title = movies.Title.replace("'", "");

                            // Only show movies that have posters. If not yet nominated, show enabled nominate button
                            document.getElementById('searchResults').innerHTML += `
                            <div class="col mt-3 text-center">
                                <div class="movie-poster">
                                    <img src="${movies.Poster}" class="img-thumbnail">
                                    <div class="poster-overlay">
                                        <button onclick="addMovieToNominees('${movies.Title}', '${movies.imdbID}', '${movies.Year}')" type="button" class="btn btn-danger" id="${movies.imdbID}">Nominate</button>
                                    </div>
                                </div>
                                <h5 class="movie-title">${movies.Title}</h5>
                                <h6 class="movie-year">${movies.Year}</h6>
                            </div>`; 
                        } else if (movies.Poster !== 'N/A' && nominees.indexOf(movies.imdbID) !== -1) {

                            // If movie is already nominated, show disabled nominated button 
                            document.getElementById('searchResults').innerHTML += `
                            <div class="col mt-3 text-center">
                                <div class="movie-poster">
                                    <img src="${movies.Poster}" class="img-thumbnail">
                                    <div class="poster-overlay">
                                        <button onclick="addMovieToNominees('${movies.Title}', '${movies.imdbID}', '${movies.Year}')" type="button" class="btn btn-danger disabled" id="${movies.imdbID}">Nominated</button>
                                    </div>
                                </div>
                                <h5 class="movie-title">${movies.Title}</h5>
                                <h6 class="movie-year">${movies.Year}</h6>
                            </div>`;
                        }
                    }
                }
            },

            // API error handling
            error: function(xhr, status, error) {
                var errorMessage = xhr.status + ': ' + xhr.statusText;
                alert('Error - ' + errorMessage);
            }
        });
    }
});

// When nominate button is clicked and there is less than 5 nominees, add to the nomination list and update the nominees array
function addMovieToNominees(title, imdbID, year) {
    if (nominees.length < 5) {
        nominees.push(imdbID);

        // Add to nomination list by adding a new li element to the HTML
        var nomineeRow = document.createElement('li');
        nomineeRow.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        var nomineeItems = document.getElementById('nomination-list');
        var nomineeRowContents = `
            ${title} (${year})
            <span class="badge"><button onclick="deleteFromNominees('${imdbID}')" type="button" class="btn-close btn-remove" aria-label="Close"></button></span>
            `;
        nomineeRow.innerHTML = nomineeRowContents;
        nomineeItems.append(nomineeRow);

        // Call function to update nominees array
        updateNomineeCount();

        // When nominate button is clicked, disable it to prevent a re-nomination
        document.getElementById(imdbID).innerHTML = 'Nominated';
        document.getElementById(imdbID).disabled = true;

        // Makes sure newly nominated movies can still trigger the remove nominee function when the delete button is clicked
        nomineeRow.getElementsByClassName('btn-remove')[0].addEventListener('click', removeNominee);
        } else {

            // If there are already 5 nominees, display alert and prevent from further nominations
            $("#maxNominees").modal('show');
        }
}

// For all remove buttons, allow trigger of remove nominee function when clicked
var removeNomination = document.getElementsByClassName('btn-remove');
for (var i=0; i< removeNomination.length; i++) {
    var button = removeNomination[i];
    button.addEventListener('click', removeNominee);
}

// This function deleted the parent li element, effectively removing it from the list. Also updates the nominees array
function removeNominee(e) {
    var removeNominee = e.target;
    removeNominee.parentElement.parentElement.remove();
    updateNomineeCount();
}

// Prevent dropdown menu from closing when clicked inside
// When there is one nominee left, deleting it will close the dropdown anyways
$('.dropdown-menu').on({
	"click":function(e){
        if (nominees.length !== 0) {
            e.stopPropagation();
        }
    }
});

// When remove button is clicked for a specific nominee, uniquely identified by its imdbID, remove the entry from the nominees array
function deleteFromNominees(imdbID){
    const index = nominees.indexOf(imdbID);
    if (index > -1) {
        nominees.splice(index, 1);
    }

    // When the specific nominee is removed from the nomination list, enable the nominate button for the movie
    document.getElementById(imdbID).innerHTML = 'Nominate';
    document.getElementById(imdbID).disabled = false;
    document.getElementById(imdbID).classList.remove('disabled');
}

// Update dynamic nominee count on the page depending on the length of the nominees array
function updateNomineeCount() {
    if (nominees.length == 5) {

        // Show alert that the maximum number of nominees have been reached when nominating the 5th movie
        $("#maxNominees").modal('show');
    }

    // Update HTML to show the current number of nominees
    var count = document.getElementsByClassName('nominee-count');
    count[0].innerHTML = nominees.length;
    count[1].innerHTML = nominees.length + '/5 movies nominated';
}
