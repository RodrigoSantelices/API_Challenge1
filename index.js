// This app wil take in a user query and use the youtube api to find videos that match that query.
// the app will display the videos that fall under the correct query under the results page

const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';


// function retrieves data from api

function getDataFromApi(searchTerm, callback){
  const query = {
    part: 'snippet',
    key: 'AIzaSyAcQZoB0aRBwDFCoFdxsQ7V7UacB37xV2Y',
    q: `${searchTerm}`,
    resultsPerPage: 6,
  }
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback)
  console.log(query)
};

// renders what the query returns
function renderResults(result){
  console.log(result);
  return `

  <div>
       <h2>
       <a class="js-result-name" href='https://youtu.be/${result.id.videoId}' target="_blank">${result.snippet.title}</a> by <a class="js-channel" href="https://www.youtube.com/channel/${result.snippet.channelId}" target="_blank">${result.snippet.channelTitle}</a>
       </h2>
       <a href='https://youtu.be/${result.id.videoId}' class="js-thumbnail" target='_blank'><img src= '${result.snippet.thumbnails.medium.url}' alt='${result.snippet.description}'></a>
     </div>
   `
 }

// displays items
function displayYoutubeData(data) {
  const results = data.items.map((item, index) =>
renderResults(item));
$(`.js-search-results`).html(results);
$(`.results`).remove();
$(`.js-results-num`).append(`<p class='results'>${data.pageInfo.totalResults}</p>`)
  console.log('data displays')
}

// listens for submit and runs other functions
function watchSubmit(){
$(`.js-search`).submit(event =>{
  event.preventDefault();
  const queryTarget = $(event.currentTarget).find(`.js-query`);
  const query = queryTarget.val();
  //clears input
  queryTarget.val("");
  getDataFromApi(query, displayYoutubeData);

// currently can keep spawning new next buttons
/*
  $(`.js-nav`).append(`
    <button type="button" class="hide previous">Prev</button>
    <button type="button" class="next">Next</button>`); */
});


}

$(watchSubmit);
