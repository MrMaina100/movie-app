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

const init = ()=>{
   switch(global.currentPage) {
      case '/':
      case '/index.html':
         displayPopularMovies();
      break;

      case '/movie-details.html':
      console.log('movie-details');
      break;
      case '/shows.html':
         displayPopularShows();
      break;
      case '/tv-details.html':
         console.log('tv details');
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

document.addEventListener('DOMContentLoaded', init);