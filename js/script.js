// console.log(window.location.pathname);

const global = {
   currentPage: window.location.pathname 
}


//get data 
async function fetchApiData(endpoint){

   const API_KEY = '226ef6cc048354b80d241b56c066843e';
   const Api_URL = 'https://api.themoviedb.org/3/';

   showSpinner();

   const res = await fetch(`${Api_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
   const data = res.json();

   hideSpinner();

   return data;
}



//display popularMovies 
async function displayPopularMovies (){
   const {results}  = await fetchApiData('movie/popular');
   console.log(results);

   results.forEach((movie)=>{
      const div = document.createElement('div');
      div.classList.add('card');
      div.innerHTML = `

          <a href="movie-details.html?id=${movie.id}">
           ${

            movie.poster_path
            ?
            ` <img
              src="https://image.tmdb.org/t/p/w400${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
            />`: `
                <a href="movie-details.html?id=${movie.id}">
            <img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${movie.title}"
            />
          </a>
            `
           }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release:${movie.release_date}</small>
            </p>
          </div>
        
      `

      document.querySelector(`#popular-movies`).appendChild(div);
   })
}

// displayPopularMovies();

// display the movie details 

async function getMovieDetails (){

   const movieId = window.location.search.split('=')[1]
   // console.log(movieId);
   const movie = await fetchApiData(`movie/${movieId}`);
   // console.log(movie);

   const div = document.createElement('div');
   div.innerHTML=`
   <div class="details-top">
          <div>
           ${

            movie.poster_path
            ?
            ` <img
              src="https://image.tmdb.org/t/p/w400${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
            />`: `
                <a href="movie-details.html?id=${movie.id}">
            <img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${movie.title}"
            />
          </a>
            `
           }
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date:${movie.release_date}</p>
            <p>
              ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
            ${movie.genres.map((genre)=> `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> ${addcommastoNumbers(movie.budget)}</li>
            <li><span class="text-secondary">Revenue:</span> ${addcommastoNumbers(movie.revenue)}</li>
            <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movie.production_companies.map((company)=>` <span>${company.name}</span>`).join('')}</div>
        </div>
   `
   document.querySelector('#movie-details').appendChild(div)
}





async function displayPopularShows (){
   const {results} = await fetchApiData('/tv/top_rated');
   // console.log(results);

   results.forEach((shows)=>{
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
   
          <a href="tv-details.html?id=${shows.id}">
           ${
            shows.poster_path 
            ?
            `
             <img
              src="https://image.tmdb.org/t/p/w400${shows.poster_path}"
              class="card-img-top"
              alt="Show Title"
            />
            
            `:
            `
             
             <img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${shows.title}"
            `
           }
          </a>
          <div class="card-body">
            <h5 class="card-title">${shows.name}</h5>
            <p class="card-text">
              <small class="text-muted"> Aired: ${shows.first_air_date}</small>
            </p>
          </div>
          `

          document.querySelector('#popular-shows').appendChild(div);

   });
   
}


async function getShowDetails (){

  const showID = window.location.search.split('=')[1]
  // console.log(showID);
  const show = await fetchApiData(`tv/${showID}`);

  const div = document.createElement('div');
  div.innerHTML = `
  
   <div class="details-top">
          <div>
          ${

            show.poster_path
            ?
            ` <img
              src="https://image.tmdb.org/t/p/w400${show.poster_path}"
              class="card-img-top"
              alt="${show.title}"
            />`: `
                <a href="movie-details.html?id=${show.id}">
            <img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${show.name}"
            />
          </a>
            `
           }
           
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${show.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date:${show.air_date}</p>
            <p>
              ${show.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
             ${show.genres.map((genre)=> ` <li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${show.homepage}" target="_blank" class="btn">Visit Show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episodes:</span> ${show.number_of_episodes}</li>
            <li>
              <span class="text-secondary">Last Episode To Air:</span> ${show.last_episode_to_air}
            </li>
            <li><span class="text-secondary">Status:</span>${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${show.production_companies.map((company)=>`<span>${company.name}</span>`).join('')}</div>
        </div>
  
  `

  document.querySelector('#show-details').appendChild(div)

}

const init = ()=>{
   switch(global.currentPage) {
      case '/':
      case '/index.html':
         displayPopularMovies();
      break;

      case '/movie-details.html':
      getMovieDetails();
      break;
      case '/shows.html':
         displayPopularShows();
      break;
      case '/tv-details.html':
         getShowDetails();
      break;
      case '/search.html':
         console.log('search');
  
   }

   highlightLink();
}


//highlight active link 

const highlightLink = ()=>{

   const links = document.querySelectorAll('.nav-link');

   links.forEach((link)=>{
      if(link.getAttribute('href') === global.currentPage){
         link.classList.add('active')
      }
   })

  
}


//spinner 

function showSpinner (){
   document.querySelector('.spinner').classList.add('show')
}

function hideSpinner (){
   document.querySelector('.spinner').classList.remove('show')
}


function addcommastoNumbers(x){
   x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

// console.log(addcommastoNumbers(300000000000000000));

document.addEventListener('DOMContentLoaded', init);