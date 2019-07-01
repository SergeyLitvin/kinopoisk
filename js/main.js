
const apiKey = '1b881d5b372353011a0eae96576a19ca';
const searchForm = document.getElementById('search-form');
const movies = document.getElementById('movies');

function apiSearch(event) {
  event.preventDefault();
  const searchText = document.querySelector('.form-control').value;

  const requestUrl = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=ru-RU&query=${searchText}&include_adult=false`;
  
  movies.innerHTML = 'Загрузка результатов поиска...';

  const serverData = getServerData(requestUrl).then(function(data) {
    const searchingResultsData = JSON.parse(data).results;

    let listMovies = '';
    searchingResultsData.forEach((el) => {
      let nameEl = el.name || el.title;
      let imgUrl = 'https://image.tmdb.org/t/p/w500/'
      listMovies += `
      <article class="col-xs-12 col-md-6">
        <h1>${nameEl}</h1>
        <img src="${imgUrl + el.poster_path}">
      </article>
    `;

      movies.innerHTML = listMovies;
    });
    
    console.log(searchingResultsData);
    // return searchingResultsData;

  }, function(error) {console.error()});
  // console.log(requestUrl);
  return serverData;
}


function getServerData(url) {
  const makeRequest = new Promise(function (resolve, reject) {

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function () {
      if (xhr.status === 200) {
        resolve(xhr.response);
      } else {
        reject('Error');
      }
    };
    xhr.send();
  });
  return makeRequest;
}

function renderData(data) {
  console.log(data);
}


searchForm.addEventListener('submit', apiSearch);