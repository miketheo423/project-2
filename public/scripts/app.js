$(function () {

let pageNumber = 1;
const apiKey = "868e357d0f927691ad60e3d98a0ecde4";

/////////////////////////////////////
////// Disover Movies Section ///////
/////////////////////////////////////

	////////////////////////////
	////// Movies Discover /////
	////////////////////////////

	// Only runs this function if on the discover-shows route
	if (top.location.pathname === '/discover-movies') {
		// Pull the discover movies api and make it into an object
		function discoverMovies() {
			$.get('https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey + '&page=' + pageNumber + '&language=en-US&sort_by=popularity.desc')
			.done(function(data) {
				let mediaList = data.results;
				let mediaPoster = "https://image.tmdb.org/t/p/w370_and_h556_bestv2";
				// Iterate through the results array and display the results on the page.
				for (let i = 0; i < mediaList.length; i++) {
					let mediaId = mediaList[i].id;
					if (mediaList[i].poster_path !==null) {
						// Creates images and takes path from results to create the src
						$('.entertainment-list').append(('<a href="/movie-profile?id=' + mediaId + '">'+'<img src="' + mediaPoster + mediaList[i].poster_path + '">' + '</a>'));
					}
					// Gives the imgs a bootstrap class to display four in a row.
					$("img").addClass('col-md-3').attr('id', 'api-entertainment');
				}
			});
			pageNumber++;
		}
		discoverMovies();
		// Loads more content when page hits bottom
		var discoverMovieScroll = $(window).scroll(function() {   
			if($(window).scrollTop() + $(window).height() == $(document).height()) {
			  console.log(pageNumber);
				discoverMovies();
			}
		});
	

	//////////////////////////
	////// Movies Search /////
	//////////////////////////
 
	// Prevents enter key from refreshing page
	$('#search-bar').submit(function() {
		event.preventDefault();
	});

	// Calls api to search when search form is submitted
	$('#search-bar-btn').on('click', function() {
		// Disables the discoverMovies function when search bar is clicked
		$(discoverMovieScroll).off('scroll');
		event.preventDefault();
		let searchQuery = $('#search-bar').val();
		// Make the get request for shows or movies depening on the search query
		$.get('https://api.themoviedb.org/3/search/movie?api_key=' + apiKey + '&language=en-US&query=' + searchQuery)
		.done(function(data) {
			$('.entertainment-list').empty();
			let mediaList = data.results;
			let mediaPoster = "https://image.tmdb.org/t/p/w370_and_h556_bestv2";
			for (let i = 0; i < mediaList.length; i++) {
				let mediaId = mediaList[i].id;
				if (mediaList[i].title !== undefined && mediaList[i].poster_path !==null) {
					$('.entertainment-list').append(('<a href="/movie-profile?id=' + mediaId + '">'+'<img src="' + mediaPoster + mediaList[i].poster_path + '">' + '</a>'));
				}
				$("img").addClass('col-md-3').attr('id', 'api-entertainment');
			}
		});
	});


	/////////////////////////
	////// Movies Genre /////
	/////////////////////////

		// Calls the api based on the value of the genre dropdown
		$('#genre-btn-movies').on('click', function() {
			pageNumber = 1;
			$(discoverMovieScroll).off('scroll');
			$('.entertainment-list').empty();
			movieGenre();
			$(window).scroll(function() {   
			if($(window).scrollTop() + $(window).height() == $(document).height()) {
			   console.log(pageNumber);
				  movieGenre();
			   }
			 });
			event.preventDefault();

			// Function for calling the api based on movie genre
			function movieGenre() {
				let genreId = $('.genres-form option:selected').val();
				$.get('https://api.themoviedb.org/3/genre/' + genreId + '/movies?api_key=' + apiKey + '&page='+ pageNumber +'&language=en-US&include_adult=false&sort_by=created_at.asc')
				.done(function(data) {
					let mediaList = data.results;
					let mediaPoster = "https://image.tmdb.org/t/p/w370_and_h556_bestv2";
					for (let i = 0; i < mediaList.length; i++) {
						let mediaId = mediaList[i].id;
						if (mediaList[i].poster_path !==null) {
					$('.entertainment-list').append(('<a href="/movie-profile?id=' + mediaId + '">'+'<img src="' + mediaPoster + mediaList[i].poster_path + '">' + '</a>'));
				}
				$("img").addClass('col-md-3').attr('id', 'api-entertainment');
			}
				});
				pageNumber++;
		}

		});
}


/////////////////////////////////////
////// Disover Shows Section ////////
/////////////////////////////////////



	////////////////////////////
	////// Shows Discover //////
	////////////////////////////

	// Only runs this function if on the discover-shows route
	if (top.location.pathname === '/discover-shows') {
		function discoverShows() {
			$.get('https://api.themoviedb.org/3/discover/tv?api_key=' + apiKey + '&language=en-US&sort_by=popularity.desc&page='+ pageNumber +'')
			.done(function(data) {
				let mediaList = data.results;
				let mediaPoster = "https://image.tmdb.org/t/p/w370_and_h556_bestv2";
				for (let i = 0; i < mediaList.length; i++) {
					let mediaId = mediaList[i].id;
					if (mediaList[i].poster_path !==null) {
						$('.entertainment-list').append(('<a href="/tv-profile?id=' + mediaId + '">'+'<img src="' + mediaPoster + mediaList[i].poster_path + '">' + '</a>'));
					}
					$("img").addClass('col-md-3').attr('id', 'api-entertainment');
				}
			});
				pageNumber++;
		}
		discoverShows();
		// Loads more content when page hits bottom
		var discoverShowScroll = $(window).scroll(function() {   
			if($(window).scrollTop() + $(window).height() == $(document).height()) {
			  console.log(pageNumber);
				discoverShows();
			}
		});

	////////////////////////////
	////// Shows Search ////////
	////////////////////////////

	// Prevents the enter key from refreshing the page
	$('#search-bar').submit(function() {
		event.preventDefault();
	});

	// Calls the api when search bar is filled out and entered
	$('#search-bar-btn').on('click', function() {
		$(discoverShowScroll).off('scroll');
		searchShows();
		event.preventDefault();

		// Gets results from api based on search parameters
		function searchShows() {
			let searchQuery = $('#search-bar').val();
			$.get('https://api.themoviedb.org/3/search/tv?api_key=' + apiKey + '&language=en-US&query=' + searchQuery)
			.done(function(data) {
				$('.entertainment-list').empty();
				let mediaList = data.results;
				let mediaPoster = "https://image.tmdb.org/t/p/w370_and_h556_bestv2";
				for (let i = 0; i < mediaList.length; i++) {
					let mediaId = mediaList[i].id;
					if (mediaList[i].poster_path !==null) {
						$('.entertainment-list').append(('<a href="/tv-profile?id=' + mediaId + '">'+'<img src="' + mediaPoster + mediaList[i].poster_path + '">' + '</a>'));
					}
					$("img").addClass('col-md-3').attr('id', 'api-entertainment');
				}
			});
		}
	});

	
	///////////////////////////
	////// Shows Genre ////////
	///////////////////////////

	// Calls the api based on the value of the genre dropdown
	$('#genre-btn-tv').on('click', function() {
		pageNumber = 1;
		$(discoverShowScroll).off('scroll');
		$('.entertainment-list').empty();
		showGenre();
		$(window).scroll(function() {   
			if($(window).scrollTop() + $(window).height() == $(document).height()) {
			  console.log(pageNumber);
				 showGenre();
			}
	  });
		event.preventDefault();
		
		// Function to call the api based on show genre
		function showGenre() {
			let genreId = $('.genres-form option:selected').val();
			$.get('https://api.themoviedb.org/3/discover/tv?api_key=' + apiKey + '&page='+ pageNumber +'&language=en-US&sort_by=popularity.desc&with_genres=' + genreId)
			.done(function(data) {
				let mediaList = data.results;
				let mediaPoster = "https://image.tmdb.org/t/p/w370_and_h556_bestv2";
				for (let i = 0; i < mediaList.length; i++) {
					let mediaId = mediaList[i].id;
					if (mediaList[i].poster_path !==null) {
						$('.entertainment-list').append(('<a href="/tv-profile?id=' + mediaId + '">'+'<img src="' + mediaPoster + mediaList[i].poster_path + '">' + '</a>'));
					}
						$("img").addClass('col-md-3').attr('id', 'api-entertainment');
				}
			});
				pageNumber++;
		}
	});
}


////////////////////////////////
// Media Profile Page Section //
////////////////////////////////

	$('#queue-btn').on('click', function() {
		console.log('clicked');
		$('.added').empty();
		$('.added').append('<p>' + 'Successfully Added');
		});


//////////////////////////
// Queued Media Section //
//////////////////////////

		// Adds movie to the watched list
		$('.watched-movie').on('click', function() {
		console.log('clicked');
		let buttonVal = $(this).val();
		console.log(buttonVal);
		$.ajax({
    url: '/queued-movies?id=' + buttonVal + '',
    type: 'POST',
		})
		.done(function() {
			window.location.replace('/queued-movies');
		});
	});

		// Adds show to the watched list
		$('.watched-show').on('click', function() {
		console.log('clicked');
		let buttonVal = $(this).val();
		console.log(buttonVal);
		$.ajax({
    url: '/queued-shows?id=' + buttonVal + '',
    type: 'POST',
		})
		.done(function() {
			window.location.replace('/queued-shows');
		});
	});

		// Removes movie form queued list
	$('.remove-movie-queue').on('click', function() {
		console.log('clicked');
		let buttonVal = $(this).val();
		console.log(buttonVal);
		$.ajax({
    url: '/queued-movies?id=' + buttonVal + '',
    type: 'DELETE',
		})
		.done(function() {
			window.location.replace('/queued-movies');
		});
	});

	// Removes show form queued list
	$('.remove-show-queue').on('click', function() {
		console.log('clicked');
		let buttonVal = $(this).val();
		console.log(buttonVal);
		$.ajax({
    url: '/queued-shows?id=' + buttonVal + '',
    type: 'DELETE',
		})
		.done(function() {
			window.location.replace('/queued-shows');
		});
	});

///////////////////////////
// Watched Media Section //
///////////////////////////


	// Removes movie from watched section
	$('.remove-movie-watched').on('click', function() {
		console.log('clicked');
		let buttonVal = $(this).val();
		console.log(buttonVal);
		$.ajax({
    url: '/watched-movies?id=' + buttonVal + '',
    type: 'DELETE',
		})
		.done(function() {
			window.location.replace('/watched-movies');
		});
	});

	// Removes show from watched section
	$('.remove-show-watched').on('click', function() {
		console.log('clicked');
		let buttonVal = $(this).val();
		console.log(buttonVal);
		$.ajax({
    url: '/watched-shows?id=' + buttonVal + '',
    type: 'DELETE',
		})
		.done(function() {
			window.location.replace('/watched-shows');
		});
	});

	////////////////////////////
	////// Comment Buttons /////
	////////////////////////////


	// Handles comments for movies
	$('.comment-movie').on('submit', function() {
		let id = $(this).attr('id');
		let commentMovie = $(this).children().val();
		event.preventDefault();
		let formData = {
			comment: commentMovie
		};
		$.ajax({
    url: '/watched-movies?id=' + id + '',
    type: 'PUT',
    data: {'comment': commentMovie},
		})
		.done(function() {
			window.location.replace('/watched-movies');
		});
	});

	// Handles comments for shows
	$('.comment-show').on('submit', function() {
		let id = $(this).attr('id');
		let commentShow = $(this).children().val();
		event.preventDefault();
		let formData = {
			comment: commentShow
		};
		$.ajax({
    url: '/watched-shows?id=' + id + '',
    type: 'PUT',
    data: {'comment': commentShow},
		})
		.done(function() {
			window.location.replace('/watched-shows');
		});
	});


});
