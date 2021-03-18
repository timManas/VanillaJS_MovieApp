// API & Image location
const API_Key = '3fd2be6f0c70a2a598f084ddfb75487c'

const API_URL = `https://api.themoviedb.org/4/discover/movie?sort_by=popularity.desc&api_key=${API_Key}&page=1`
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = `https://api.themoviedb.org/4/search/movie?api_key=${API_Key}&query="`

// Fetch elements from index
const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

// Fetch initial movies
getMovies(API_URL)

async function getMovies(url) {
  const results = await fetch(url)
  const data = await results.json()
  //   console.log('Data: ' + JSON.stringify(data, null, 4))

  showMovies(data.results)
}

function showMovies(movies) {
  main.innerHTML = ''

  // Traverse each movie one by one
  movies.forEach((movie) => {
    console.log('Data: ' + JSON.stringify(movie, null, 4))

    const { title, poster_path, overview } = movie
    const movieElement = document.createElement('div')
    movieElement.classList.add('movie')

    movieElement.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            ${overview}
        </div>
    `
    main.appendChild(movieElement)
  })
}

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const searchTerm = search.value
  if (searchTerm && searchTerm !== '') {
    getMovies(SEARCH_API + searchTerm)
    search.value = ''
  } else {
    window.location.reload()
  }
})
