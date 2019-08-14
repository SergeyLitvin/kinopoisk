"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}console.log("some.js");var searchForm=document.getElementById("search-form"),movies=document.getElementById("movies"),urlConfig={baseUrl:"https://api.themoviedb.org",apiKey:"1b881d5b372353011a0eae96576a19ca",typeRequest:"search",typeSearch:"multi",lang:""};function getBrowserLang(){urlConfig.lang=window.navigator?window.navigator.language:"ru-Ru"}function buildingLink(e){e.preventDefault();var n=document.querySelector(".form-control").value;return"".concat(urlConfig.baseUrl,"/3/").concat(urlConfig.typeRequest,"/").concat(urlConfig.typeSearch,"?api_key=").concat(urlConfig.apiKey,"&language=").concat(urlConfig.lang,"&query=").concat(n,"&include_adult=false")}function getServerData(e){return new Promise(function(n,t){var o=new XMLHttpRequest;o.open("GET",e,!0),o.onload=function(){200===o.status?n(o.response):t("Error")},o.send()})}function buildTrendingLink(){arguments.length>0&&void 0!==arguments[0]&&arguments[0],arguments.length>1&&void 0!==arguments[1]&&arguments[1];var e=document.querySelectorAll(".period li"),n=document.querySelectorAll(".media-type li");console.log(e),console.log(n)}function renderData(e){var n="";e.forEach(function(e){var t=e.name||e.title,o=e.release_date||"Неизвестен",r=null!=e.poster_path?"https://image.tmdb.org/t/p/w500/"+e.poster_path:"./img/no_poster.jpg";n+='\n        <article class="card-films">\n          <h1>'.concat(t,'</h1>\n          <img class="img-responsive" src="').concat(r,'">\n          <div class="descript">\n            <strong class="year">Год: ').concat(o,'</strong> \n            <strong class="rating">Рейтинг: ').concat(e.vote_average,"</strong>  \n          </div>\n        </article>\n      ")}),movies.innerHTML=n}getBrowserLang(),buildTrendingLink(),searchForm.addEventListener("submit",function(){var e=buildingLink(event);"string"==typeof e&&getServerData(e).then(function(e){var n=JSON.parse(e).results;"object"===_typeof(n)&&(0===n.length?movies.innerHTML='\n          <div class="text-info">\n            <p>По вашему запросу ничего не найдено!!!</p>\n            <p>Попробуйте изменить поисковый запрос.</p>\n          </div>':renderData(n))},function(e){return console.log(e)})});