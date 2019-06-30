const searchForm = document.getElementById('search-form');
console.log(searchForm);

function apiSearch(event) {
  event.preventDefault();
  const searchText = document.querySelector('.form-control');

  const server = 'https://www.themoviedb.org/';

  console.log(searchText);  
}

searchForm.addEventListener('submit', apiSearch);

function requestApi(url) {
  return url;
}
