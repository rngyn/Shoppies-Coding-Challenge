# Shopify Coding Challenge: The Shoppies
**Welcome to the Shoppies!**

This web application uses the Open Movie Database (OMDb) API to grab a list of movies based on the user's search input.
The user can click the nominate button when hovering over a movie poster to add it to the nominations list. Up to five
nominations can be made before an alert is shown preventing further nominations. The nominate button is disabled if the movie
is already in the nominations list. Removal of nominees can be made right from the nomination list if the user changes their mind.

## Important Files and Folders
* `index.html` ; main web app page

### JavaScript Files
* `app.js` ; main program code
* `jquery-3.6.0.min.js` ; jQuery library, mainly for sending AJAX request. Small number of jQuery functions used
* `dark-mode-switch.min.js` ; code that handles dark mode theme switching and local storage of theme **(See Attributions)**

### CSS Files
* `style.css` ; styling of page as well as dark mode theme handling

## Dependencies
No dependencies.

## The Shoppies Walkthrough
1. Type in the search bar and click Go or press enter to find a list of movies matching the input. Make sure you type correctly or it'll return no results!
<img src="https://github.com/rngyn/Shoppies-Coding-Challenge/blob/main/gifs/gif_searching.gif" width="500">

2. Hover over the movie poster to reveal the nominate button. Click to nominate the movie and add it to the nominations list.
<img src="https://github.com/rngyn/Shoppies-Coding-Challenge/blob/main/gifs/gif_nominating.gif" width="500">

3. When a movie is nominated, it cannot be re-nominated. Add/delete movies to create your dream team of movies!
<img src="https://github.com/rngyn/Shoppies-Coding-Challenge/blob/main/gifs/gif_nomineeslist.gif" width="500">

4. A maximum of five movies can be nominated. A banner will prevent you from nominating any more movies.
<img src="https://github.com/rngyn/Shoppies-Coding-Challenge/blob/main/gifs/gif_nomineeslist.gif" width="500">

5. The web application is fully responsive and features a dark mode.
<img src="https://github.com/rngyn/Shoppies-Coding-Challenge/blob/main/gifs/gif_extras.gif" width="500">

## Future Plans
1. Save nominations list to local storage. This probably requires rework of the logic.
2. Add more animations for a more fluid single-page experience.
3. New screen to show nominees together with more details from the API.
4. Links to share nomination list with others.

## Attributions
Several sources were used in this project:
1. [OMDb API](https://www.omdbapi.com/)
2. [jQuery Library](https://jquery.com/)
3. [Boostrap Framework](https://getbootstrap.com/)
4. [Dark Mode Switch](https://coliff.github.io/dark-mode-switch/index.html)

## Disclaimer
This application was written by Robert Nguyen for Shopify's Fall 2021 challenge.
