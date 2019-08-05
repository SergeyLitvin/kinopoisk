"use strict";

/* ==================================================
Base constants
================================================== */
const searchForm = document.getElementById('search-form');
const movies = document.getElementById('movies');

const urlConfig = {
  baseUrl: 'https://api.themoviedb.org',
  apiKey: '1b881d5b372353011a0eae96576a19ca',
  typeRequest: 'search',
  typeSearch: 'multi'
}

/* ==================================================
Link formation from input parameters
================================================== */
function buildingLink(event) {
  event.preventDefault();
  const searchText = document.querySelector('.form-control').value;

  const requestUrl = `${urlConfig.baseUrl}/3/${urlConfig.typeRequest}/${urlConfig.typeSearch}?api_key=${urlConfig.apiKey}&language=ru-RU&query=${searchText}&include_adult=false`;

  return requestUrl;
}

/* ==================================================
Receiving data from server
================================================== */
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


/* ==================================================
Generating html from the data array
================================================== */
function renderData(data) {
  let listMovies = '';

  data.forEach((el) => {
    let nameEl = el.name || el.title;
    let imgUrl = 'https://image.tmdb.org/t/p/w500/';
    let releaseDate = el.release_date || 'Неизвестен';
    let poster = el.poster_path != null ? imgUrl + el.poster_path : './img/no_poster.jpg';
    listMovies += `
        <article class="card-films">
          <h1>${nameEl}</h1>
          <img class="img-responsive" src="${poster}">
          <div class="descript">
            <strong class="year">Год: ${releaseDate}</strong> 
            <strong class="rating">Рейтинг: ${el.vote_average}</strong>  
          </div>
        </article>
      `;
  });

  movies.innerHTML = listMovies;
}


/* ==================================================
Start program
================================================== */
searchForm.addEventListener('submit', function() {

  const url = buildingLink(event);

  if (typeof url === 'string') {
    const listVideo = getServerData(url)
    .then(function(data) {
      const searchingResultsData = JSON.parse(data).results;

      if(typeof searchingResultsData === 'object') {
        // console.log(searchingResultsData);
        if(searchingResultsData.length === 0) {
          movies.innerHTML = `
          <div class="text-info">
            По вашему запросу ничего не найдено!!! Попробуйте изменить поисковый запрос.
          </div>`;
        } else {
          renderData(searchingResultsData);
        }

      }
    }, (error) => console.log(error));
    
  }

});