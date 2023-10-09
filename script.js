const API_LINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=fe2a9cacb42e717dc99045a657ff3c8e&page=1';
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=fe2a9cacb42e717dc99045a657ff3c8e&query=";

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

returnMovies(API_LINK);

function returnMovies(url){
    fetch(url).then(response => response.json()).then(function(data){
        console.log(data.results);
        data.results.forEach(element => {
            const div_card = document.createElement('div');
            div_card.setAttribute('class', 'card');

            const div_column = document.createElement('div');
            div_column.setAttribute('class', 'columns');

            const div_row = document.createElement('div');
            div_row.setAttribute('class', 'rows');

            const image = document.createElement('img');
            image.setAttribute('id', 'image');
            image.setAttribute('class', 'thumbnail');

            const name = document.createElement('h3');
            name.setAttribute('id', 'title');

            const center = document.createElement('center');

            name.innerHTML = `${element.title}<br><a href="movie.html?id=${element.id}&title=${element.title}">Reviews</a>`;
            image.src = IMG_PATH + element.poster_path;

            center.appendChild(image);
            div_card.appendChild(center);
            div_card.appendChild(name);
            div_column.appendChild(div_card);
            div_row.appendChild(div_column);

            main.appendChild(div_row);
        });
    });
}

// const back = document.querySelector('.active');
// back.addEventListener('clcik', () => {
//     returnMovies(API_LINK);
// });

form.addEventListener('submit', (e) => {
    e.preventDefault();
    main. innerHTML = '';

    const searchItem = search.value;

    if(searchItem){
        returnMovies(SEARCH_API + searchItem);
        search.value = '';
    }
});
