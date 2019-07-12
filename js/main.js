/* ==================================================
Base constants
================================================== */
const apiKey = '1b881d5b372353011a0eae96576a19ca';
const searchForm = document.getElementById('search-form');
const movies = document.getElementById('movies');

/* ==================================================
Link formation from input parameters
================================================== */
function buildingLink(event) {
  event.preventDefault();
  const searchText = document.querySelector('.form-control').value.trim();
  // console.log(searchText);
  
  if(typeof searchText === undefined) {
    movies.innerHTML = 'Вы ввели пустой или некорректный поисковый запрос.';
  } else {
    const requestUrl = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=ru-RU&query=${searchText}&include_adult=false`;
    return requestUrl;
  }
 
}
searchForm.addEventListener('submit', function () {

  const url = buildingLink(event);
  console.log(url);
});

// /* ==================================================
// Receiving data from server
// ================================================== */
// function getServerData(url) {
//   const makeRequest = new Promise(function (resolve, reject) {

//     const xhr = new XMLHttpRequest();
//     xhr.open('GET', url, true);
//     xhr.onload = function () {
//       if (xhr.status === 200) {
//         resolve(xhr.response);
//       } else {
//         reject('Error');
//       }
//     };
//     xhr.send();

//   });
//   return makeRequest;
// }

// /* ==================================================
// Generating html from the data array
// ================================================== */
// function renderData(data) {

//   let listMovies = '';
//   const preloader = document.querySelector('.gooey');
//   // console.log(preloader);
//   console.log(data);

//   if (data.length == 0) {
//     movies.innerHTML = 'По вашему запросу ничего не найдено!';
//   } else if(data.length > 0) {
//     preloader.style = "display: none;";
//   }
//     data.forEach((el) => {
//       let nameEl = el.name || el.title;
//       let imgUrl = 'https://image.tmdb.org/t/p/w500/';
//       let releaseDate = el.release_date || 'Неизвестен';
//       let poster = el.poster_path != null ? imgUrl + el.poster_path : './img/no_poster.jpg';
//       listMovies += `
//         <article class="col-xs-12 col-sm-6 col-md-4 col-lg-3 card-films">
//           <h1>${nameEl}</h1>
//           <img class="img-responsive" src="${poster}">
//           <div class="descript d-flex justify-content-between">
//             <strong class="year">Год: ${releaseDate}</strong> 
//             <strong class="rating">Рейтинг: ${el.vote_average}</strong>  
//           </div>
//         </article>
//       `;
//     });

//   // console.log(listMovies.length);
//   movies.innerHTML = listMovies;
// }

// /* ==================================================
// Start program
// ================================================== */
// searchForm.addEventListener('submit', function () {

//   const url = buildingLink(event);

//   if (typeof url === 'string') {
//     const listVideo = getServerData(url)
//       .then(function (data) {
//         const searchingResultsData = JSON.parse(data).results;
//         if (typeof searchingResultsData === 'object') {
//           renderData(searchingResultsData);
//         }
//       }, (error) => console.log(error));

//   }

// });