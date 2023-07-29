(()=>{
// html elements
const favBtn=document.getElementById('show-favourites');
const favourites=document.getElementById('favourites');
const favMovieContainer=document.getElementById('fav-movies-container');
const emptyText=document.getElementById('empty-text');
const emptyFavText=document.getElementById('empty-fav-text');
const searchKeyword=document.getElementById('search');
const suggestionsContainer=document.getElementById('suggestions-container');

const suggestionList=[];
let favMovieList=[];
renderFavContainer();
// event listener on search
searchKeyword.addEventListener('keyup',(event)=>{
    let search=searchKeyword.value;
    if(search=='')
    {
        emptyText.style.display='flex';
        suggestionsContainer.innerHTML="";
        suggestionList.splice(0,suggestionList.length-1);
    }
    else{
        emptyText.style.display='none';
        emptyText.style.position='absolute';
        (async ()=>{
            let data= await fetchData(search);
            addToSuggestionsContainer(data);
        })();
    }
})

// add movies to DOM(suggestions-container) 
let addToSuggestionsContainer=(data)=>{
    let isPresent=false;

    // check if movie is already present in the suggestion-container
    suggestionList.forEach((movie)=>{
        if(movie.Title==data.Title)
        {
            isPresent=true;
            return;
        }
    })
    if(!isPresent && data.Title!=undefined)
    {
        if(data.Poster=='N/A')
        {
            data.Poster='././images/image-not-available-300x300.jpg';
        }
        suggestionList.push(data);
        const movieContainer=document.createElement('div');
        movieContainer.setAttribute('class',"animate__animated animate__zoomIn ");
        movieContainer.setAttribute('id',"card-container");
        movieContainer.innerHTML=`
        <div class="card my-2" data-id=" ${data.Title} " style="color:#121515;">
        <a href="movie.html">
          <img src=" ${data.Poster} " class="card-img-top" alt="..." data-id="${data.Title} ">
        </a>
        <div class="card-body" style="background-color: #121515;">
          <a href="movie.html"></a>
          <h5 class="card-title">
            <a href="movie.html" data-id="${data.Title} "> ${data.Title}  </a>
          </h5>

          <p class="card-text d-flex space-between w-100">
              
            <i class='fa fa-star' style="color:#FDCE23">
              <span id="rating" style="color:white">&nbsp;${data.imdbRating}</span>
            </i>

            <button class="fav-btn" style="background-color: inherit;">
              <i class="fa fa-heart add-fav" data-id="${data.Title}"></i>
            </button>
          </p>
        </div>            
      </div>
        `
        suggestionsContainer.prepend(movieContainer);

    }
}

// fetch the movies
let fetchData= async (search)=>{
    const url=`https://www.omdbapi.com/?t=${search}&apikey=d19cd846`;
    try{
        const response=await fetch(url);
        const data=await response.json();
        return data;
    }catch(err){
        console.log(err);
    }
}


// Render Favourites Movie Container
function renderFavContainer(){
    favList=JSON.parse(localStorage.getItem('favMovieList'));

    if(favList.length!=0)
    {
        console.log(favList.length);
        emptyFavText.style.display='none';
        favList.forEach((movie)=>{
            favMovieList.push(movie);
            addToFavouritesContainer(movie)
        })
    }
    else{
        console.log(emptyFavText);
        emptyFavText.style.display='block';
    }
}

// add movie to favMovieList and to fav-movie-container
function addToFavouritesContainer(movie){
    const div=document.createElement('div');
    div.setAttribute('class','fav-movie-card d-flex justify-content-between align-content-center my-2');
    if(movie.Poster=='N/A')
    {
        movie.Poster='././images/image-not-available-300x300.jpg';
    }
    div.innerHTML=`<img src="${movie.Poster}" alt="..." class="fav-movie-poster">
    <div class="movie-card-details ps-2">
      <p class="movie-name mt-3 mb-0">
      <a href="movie.html" class="fav-movie-name" data-id="${movie.Title}">${movie.Title}</a><a> 
      </a></p><a>
      <small class="text-muted">${movie.Year}</small>
    </a></div>
    <a>
    <div class="delete-btn my-4">
        <i class="fa fa-trash" data-id="${movie.Title}"></i>
    </div>
    </a>`
    favMovieContainer.prepend(div);
}

// delete the movie from favourites
let deleteFavMovie=(movie)=>{
    let movieList=JSON.parse(localStorage.getItem('favMovieList'));
    let updatedList= movieList.filter((Movie)=>{
        return Movie.Title!=movie;
    })
    localStorage.setItem('favMovieList',JSON.stringify(updatedList));
    favMovieList=[];
    favMovieContainer.innerHTML='';
    renderFavContainer();
}

let handleClickEvent=async (event)=>{
    let target=event.target;

    // control the display of favourites
    if(target.classList.contains('fa-bars'))
    {
        favourites.classList.toggle('visible');
    }
    else if(target.classList.contains('add-fav'))
    {
        let movie= await fetchData(target.dataset.id);
        let isPresent=false;
        console.log(favMovieList);
        //check if the movie is already in favourite list
        favMovieList.forEach((data)=>{
            if(data.Title==movie.Title)
            {
                isPresent=true;
            }
        })
            if(!isPresent)
            {
                emptyFavText.style.display='none';
                favMovieList.push(movie);
                localStorage.setItem('favMovieList',JSON.stringify(favMovieList));
                addToFavouritesContainer(movie);
            }
    }
    else if(target.classList.contains('fa-trash'))
    {
        console.log(target.dataset.id);
        deleteFavMovie(target.dataset.id);
    }
    localStorage.setItem('MovieName',target.dataset.id);
}

document.addEventListener('click',handleClickEvent)
})();