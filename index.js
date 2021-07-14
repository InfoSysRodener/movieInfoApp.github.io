const myInput = document.querySelector('#myInput');
const myBtn = document.querySelector('#myBtn');
//const movie = document.querySelector('#movie');
//const series = document.querySelector('#series');
//const episode = document.querySelector('#episode');
const movieURL = 'https://www.omdbapi.com/?s=iron man&apikey=510257b1';
const movieGENRE ='https://www.omdbapi.com/?apikey=510257b1&s=';
// tt3896198
	fetch(`${movieURL}`)
		.then(res => res.json())
		.then(data => {
			console.log(data);
			renderDatas(data);
		})
		.catch(error => {
			console.log('Error:' + error);
		})
//GET DATA FROM OMDB MOVIE API SITE
function renderDatas(data) {
	let output = '';
		for(let i=0; i < data.Search.length; i++) {

			output += `
								<div class="col-md-2 p-3 m-3 text-dark bg-light" id="thumbnail">
										<h3 class="h5">${data.Search[i].Title}</h3>
										<img src="${data.Search[i].Poster}"/>
										<p>Year: ${data.Search[i].Year}</p>
										<p>Type: ${data.Search[i].Type}</p>
										<a onclick="movieSelected('${data.Search[i].imdbID}')" href="#" class="btn btn-success">movie details</a>
									</div>
								`
							}
		document.querySelector('#movies').innerHTML = output;
		console.log("totalResults found:",data.totalResults);
	};

//search MOVIE API
myInput.addEventListener('keyup', function(e){
	let searchInput = myInput.value;

		if (e.keyCode === 13) {
			e.preventDefault();
			console.log("you press enter");
		}
			getMovies(searchInput);
});
myBtn.addEventListener('click', function(e) {
		let searchInput = myInput.value;
		getMovies(searchInput);
});
// GENRE BUTTON
	/*series.addEventListener('click', function(e)
		 {
		//alert("series click");
		let series = "series";
		fetch(`${movieGENRE}` + series)
		 .then(res => res.json())
			.then(data => {
				console.log(data);
				getMovies(series);
			})
			.catch(error => {
						console.log('Error:' + error);
					})
	})
	//MOVIE BUTTON
	movie.addEventListener('click', function(e)
		 {
		//alert("movie click");
		let movie = "movie";
		fetch(`${movieGENRE}` + movie)
		 .then(res => res.json())
			.then(data => {
				console.log(data);
				getMovies(movie);
			})
			.catch(error => {
						console.log('Error:' + error);
					})
	})
	//EPISODE BUTTON
	episode.addEventListener('click', function(e)
		 {
		//alert("episode click");
		let episode = "episode";
		fetch(`${movieGENRE}` + episode)
		 .then(res => res.json())
			.then(data => {
				console.log(data);
				getMovies(episode);
			})
			.catch(error => {
						console.log('Error:' + error);
					})
	})*/
const navlink = document.querySelectorAll('.nav-link');
navlink.forEach(nav => {
	//console.log(nav);
	nav.addEventListener('click', function(e) {
				//console.log(nav);
				let genreclick = nav.innerHTML;
				fetch(`${movieGENRE}` + genreclick)
				 .then(res => res.json())
					.then(data => {
						console.log(data);
						getMovies(genreclick);
					})
					.catch(error => {
								console.log('Error:' + error);
							})
			})
})

function getMovies(searchInput) {
		//console.log(searchInput);
		fetch('https://www.omdbapi.com/?apikey=510257b1&s=' + searchInput)
			.then(res => res.json())
				.then(data => {
					let movies = data.Search;
					let output = '';
					movies.forEach(movie => {
					/*let type = movie.Type;
					let searchInput = myInput.value;
					if (searchInput === type)	{
					  console.log(type);
					}*/
						output += `
							<div class="col-md-2 p-3 m-2 bg-light text-dark" id="thumbnail">
							<div>
								<h3 class="h5">${movie.Title}</h3>
								<img src="${movie.Poster}"/>
								<p>Year: ${movie.Year}</p>
								<p>Type: ${movie.Type}</p>
								<a onclick="movieSelected('${movie.imdbID}')" href="#" class="btn btn-success">movie details</a>
								</div>
							</div>
											`
								})
					document.querySelector('#movies').innerHTML = output;
				})
				.catch(error => {
					console.log('Error:' + error);
				})
};

function movieSelected(id) {
	sessionStorage.setItem('movieId', id);
	window.location = 'view.html';
	return false;
};

function getMovie() {
	let movieId = sessionStorage.getItem('movieId');
	fetch('https://www.omdbapi.com/?apikey=510257b1&i=' + movieId)
		.then(res => res.json())
			.then(data => {
				let movieDetails = data;
				console.log(movieDetails);
				let output = '';

				output += `
			<div class="container bg-light text-dark text-center" id="thumbnail">
				<div class="row" id="thumbnail">
					<div class="col-md-4 m-3">
						<img src="${movieDetails.Poster}"/>
					</div>
					<div class="col-sm-7 m-3">
						<ul class="list-group">
							<h2>Title:${movieDetails.Title}</h2>
							<hr>
							<li class="list-group-item">Details:<p>${movieDetails.Plot}</p></li>
							<li>Genre: ${movieDetails.Genre}</li>
							<li>Release: ${movieDetails.Released}</li>
							<li>Rated: ${movieDetails.Rated}</li>
							<li>imdbRating: ${movieDetails.imdbRating}</li>
							<li>Director: ${movieDetails.Director}</li>
							<li>Writer: ${movieDetails.Writer}</li>
							<li>Actors: ${movieDetails.Actors}</li>
							<li>Production: ${movieDetails.Production}</li>
							<li>Year: ${movieDetails.Year}</li>
						</ul>
					</div>
				</div>

				<div class="container text-center">
					<h3>Plot</h3>
					<hr>
					<div>
					<a href="https://imdb.com/title/${movieDetails.imdbID}" target="_blank" class="btn btn-success">Watch Now</a>
					</div>
					<a href="index.html" class="btn btn-default text-dark">Back to Home</a>
				</div>

			</div>
				`
				document.querySelector('#movieDetails').innerHTML = output;
			})

			.catch(error => {
				console.log('Error:' + error);
			})
 }