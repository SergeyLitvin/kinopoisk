/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable prefer-promise-reject-errors */
/* ==================================================
Base constants
================================================== */
const searchForm = document.getElementById("search-form");
const movies = document.getElementById("movies");

const urlConfig = {
    baseUrl: "https://api.themoviedb.org",
    apiKey: "1b881d5b372353011a0eae96576a19ca",
    typeRequest: "search",
    typeSearch: "multi",
    lang: "ru-RU",
    trendingLink: {
        period: "day",
        mediaType: "all",
    },
};

/* ==================================================
Get user browser lang
================================================== */
function getBrowserLang() {
    urlConfig.lang = window.navigator ? window.navigator.language : "ru-Ru";
}

/* ==================================================
Link formation from input parameters
================================================== */
function buildingLink(event) {
    event.preventDefault();
    console.log(event);
    // if (event) {
    const searchText = document.querySelector(".form-control").value;

    const requestUrl = `${urlConfig.baseUrl}/3/${urlConfig.typeRequest}/${urlConfig.typeSearch}?api_key=${urlConfig.apiKey}&language=${urlConfig.lang}&query=${searchText}&include_adult=false`;
    console.log(requestUrl);
    return requestUrl;
    // }
}

/* ==================================================
Receiving data from server
================================================== */
function getServerData(url) {
    const makeRequest = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(xhr.response);
            } else {
                reject("Error");
            }
        };
        xhr.send();
    });
    return makeRequest;
}

/* ==================================================
Configurate link for get trendings films
================================================== */
function buildTrendingLink(period = "day", mediaType = "all") {
    const periodTrendings = document.querySelectorAll(".period li");
    const mediaTypeTrendings = document.querySelectorAll(".media-type li");

    periodTrendings.forEach((item) => {
        if (item.className === "selected") {
            urlConfig.trendingLink.period = item.attributes["data-time"].nodeValue;
        }
    });

    mediaTypeTrendings.forEach((item) => {
        if (item.className === "selected") {
            urlConfig.trendingLink.mediaType = item.attributes["data-media-type"].nodeValue;
        }
    });

    const trendingsRequestUrl = `${urlConfig.baseUrl}/3/trending/${urlConfig.trendingLink.mediaType}/${urlConfig.trendingLink.period}?api_key=${urlConfig.apiKey}`;
    console.log(trendingsRequestUrl);

    return trendingsRequestUrl;
}

/* ==================================================s
Generating html from the data array
================================================== */
function renderData(data) {
    let listMovies = "";

    data.forEach((el) => {
        const nameEl = el.name || el.title;
        const imgUrl = "https://image.tmdb.org/t/p/w500/";
        const releaseDate = el.release_date || "Неизвестен";
        const poster = el.poster_path != null ? imgUrl + el.poster_path : "./img/no_poster.jpg";
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
getBrowserLang();
buildTrendingLink();

searchForm.addEventListener("submit", (event) => {

    const url = buildingLink(event);

    if (typeof url === "string") {
        getServerData(url)
            .then((data) => {
                const searchingResultsData = JSON.parse(data).results;

                if (typeof searchingResultsData === "object") {
                    // console.log(searchingResultsData);
                    if (searchingResultsData.length === 0) {
                        movies.innerHTML = `
                          <div class="text-info">
                            <p>По вашему запросу ничего не найдено!!!</p>
                            <p>Попробуйте изменить поисковый запрос.</p>
                          </div>`;
                    } else {
                        renderData(searchingResultsData);
                    }
                }
            }, error => console.log(error));
    }
});
