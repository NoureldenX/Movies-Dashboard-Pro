const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const moviesGrid = document.getElementById("moviesGrid");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

const API_KEY = "a8fbac4bbe34833666977e45243cbdec";


function displayMovies(movies){

moviesGrid.innerHTML = "";
if (movies.length === 0) {
    moviesGrid.innerHTML = "<p style='color:#ff6b6b; grid-column:1/-1'>مش لاقي أفلام بالاسم ده</p>";
    return;
}

movies.forEach(movie => {
    const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750/333/fff?text=لا+توجد+صورة";

    const card = `
    <div class="movie-card">
    <img src="${poster}" alt="${movie.title}">
    <div class="movie-info">
    <h3>${movie.title}</h3>
    <p class="rating">★ ${movie.vote_average.toFixed(1)}</p>
    </div>
    </div>`;

    moviesGrid.innerHTML += card; });

}


function fetchTrending() {
    loading.classList.remove("hidden");
    error.classList.add("hidden");

fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&language=ar`)
    .then(res => res.json())
    .then(data => {
    loading.classList.add("hidden");
    displayMovies(data.results)}
)

.catch(() => {
    loading.classList.add("hidden");
    error.classList.remove("hidden");
    error.textContent = "في مشكلة في النت، جرب تاني"}

);
}


function searchMovies() {
const query = searchInput.value.trim();

if (query === "") {
    error.classList.remove("hidden");
    error.textContent = "اكتب اسم فيلم الأول";
    return;
}

error.classList.add("hidden");
loading.classList.remove("hidden");

fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&language=ar`)
.then(res => res.json())
.then(data => {
    loading.classList.add("hidden");
    displayMovies(data.results)}
)
.catch(() => {
    loading.classList.add("hidden");
    error.classList.remove("hidden");
    error.textContent = "خطأ في البحث، جرب تاني";}
)}


searchBtn.addEventListener("click", searchMovies);

searchInput.addEventListener("keypress", (e) => {
if (e.key === "Enter") {
    searchMovies()
}
})


window.addEventListener("load", fetchTrending);