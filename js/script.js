// console.log(window.location.pathname);

const global = {
   currentPage: window.location.pathname,

   search:{
    term: '',
    type:'',
    page:'',
    totalPages:''

   },

   api:{
    apikey:'',
    apiUrl:'https://api.themoviedb.org/3/'
   }

   
}


//get data 
async function fetchApiData(endpoint){

   const API_KEY = global.api.apikey;
   const Api_URL = global.api.apiUrl;

   showSpinner();

   const res = await fetch(`${Api_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
   const data = res.json();

   hideSpinner();

   return data;
}


//make request to search 
async function searchApiData(endpoint){

   const API_KEY = global.api.apikey;
   const Api_URL = global.api.apiUrl;

   showSpinner();

   const res = await fetch(`${Api_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}`);
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

  displayBackDropImage('movie', movie.backdrop_path);

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

  displayBackDropImage('show', show.backdrop_path);

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
            <p class="text-muted">Last Air Date:${show.last_air_date}</p>
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
              <span class="text-secondary">Last Episode To Air:</span> ${show.last_episode_to_air.name}
            </li>
            <li><span class="text-secondary">Status:</span>${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${show.production_companies.map((company)=>`<span>${company.name}</span>`).join('')}</div>
        </div>
  
  `

  document.querySelector('#show-details').appendChild(div)

}

//search functionality 

async function search (){

  const queryString = window.location.search;
  const urlparam = new URLSearchParams(queryString);
  global.search.type = urlparam.get('type');
  global.search.term = urlparam.get('search-term');

  if(global.search.term !== '' && global.search.term !== null ){

    const {results, total_pages, page} = await searchApiData();
    // console.log(result);

    if(results.length === 0){
      showAlert('no results found');
      return;
    }

    displaysearchResults(results);




  }else{

    showAlert('please enter a term')

  }


}

function displaysearchResults(results){
  results.forEach((result)=>{

      const div = document.createElement('div');
      div.classList.add('card');
      div.innerHTML = `

          <a href="${global.search.type}-details.html?id=${result.id}">
           ${

            result.poster_path
            ?
            ` <img
              src="https://image.tmdb.org/t/p/w400${result.poster_path}"
              class="card-img-top"
              alt="${global.search.type === 'movie' ? result.title:result.name}"
            />`: `
                <a href="movie-details.html?id=${movie.id}">
            <img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${global.search.type === 'movie' ? result.title:result.name}"
            />
          </a>
            `
           }
          </a>
          <div class="card-body">
            <h5 class="card-title">${global.search.type === 'movie' ? result.title:result.name}</h5>
            <p class="card-text">
              <small class="text-muted">Release:${global.search.type === 'movie' ? result.release_date : result.first_air_date}</small>
            </p>
          </div>
        
      `

      document.querySelector(`#search-results`).appendChild(div);
   });''
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
         search();  
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


//function that display the image backdrop
const displayBackDropImage = (type, path)=>{
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${path})`;
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.3';


  if(type === 'movie'){
    document.querySelector('#movie-details').appendChild(overlayDiv);
  }else{
    document.querySelector('#show-details').appendChild(overlayDiv);

  }
}


const showAlert = (message, className)=>{
  const alertEl = document.createElement('div');
  alertEl.classList.add('alert', className);
  alertEl.appendChild(document.createTextNode(message))
  document.querySelector('#alert').appendChild(alertEl)

  setTimeout(()=> alertEl.remove(), 5000)
}



// console.log(addcommastoNumbers(300000000000000000));

document.addEventListener('DOMContentLoaded', init);