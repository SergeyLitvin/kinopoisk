
const apiKey = '1b881d5b372353011a0eae96576a19ca';
const searchForm = document.getElementById('search-form');

function apiSearch(event) {
  event.preventDefault();
  const searchText = document.querySelector('.form-control');

  const requestUrl = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=ru-RU&query=${searchText}&include_adult=false`;

  console.log(searchText);  
  const responseServer = Promise.resolve(getServerData(requestUrl));
  console.log(responseServer);
}

searchForm.addEventListener('submit', apiSearch);

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
