
const apiKey = '1b881d5b372353011a0eae96576a19ca';
const searchForm = document.getElementById('search-form');

function apiSearch(event) {
  event.preventDefault();
  const searchText = document.querySelector('.form-control').value;

  const requestUrl = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=ru-RU&query=${searchText}&include_adult=false`;
 
  getServerData(requestUrl).then(function(data) {
    const searchingResultsData = JSON.parse(data).results;
    console.log(searchingResultsData);
  }, function(error) {console.error()});
  // console.log(requestUrl);
  
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