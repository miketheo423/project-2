$(function () {

		

/////////////////////////////////////
////// Disover Movies Section ///////
/////////////////////////////////////

let pageNumber = 1;
	// Only runs this function if on the discover-shows route
	console.log(pageNumber);
	if (top.location.pathname === '/discover-movies') {
		// Pull the discover movies api and make it into an object
		function discoverMovies() {
		$.get('https://api.themoviedb.org/3/discover/movie?api_key=868e357d0f927691ad60e3d98a0ecde4&page=' + pageNumber + '&language=en-US&sort_by=popularity.desc').done(function(data) {
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
		var discoverScroll = $(window).scroll(function() {   
			   if($(window).scrollTop() + $(window).height() == $(document).height()) {
			   			console.log(pageNumber);
				   		discoverMovies();
			   }
			});
	}

 
	// Prevents enter key from refreshing page
	$('#search-bar').submit(function() {
		event.preventDefault();
	});

	// Calls api to search when search form is submitted
	$('#search-bar-btn').on('click', function() {
		// Disables the discoverMovies function when search bar is clicked
		$(window).off('scroll');
		event.preventDefault();
		let searchQuery = $('#search-bar').val();
		// Make the get request for shows or movies depening on the search query
		$.get('https://api.themoviedb.org/3/search/movie?api_key=868e357d0f927691ad60e3d98a0ecde4&language=en-US&query=' + searchQuery).done(function(data) {
			console.log(data);
			$('.entertainment-list').empty();
			let mediaList = data.results;
			let mediaPoster = "https://image.tmdb.org/t/p/w370_and_h556_bestv2";

			// Iterate through the results array and display the results on the page.
			for (let i = 0; i < mediaList.length; i++) {
				let mediaId = mediaList[i].id;
				// Creates images and takes path from results to create the src
				if (mediaList[i].title !== undefined && mediaList[i].poster_path !==null) {
				$('.entertainment-list').append(('<a href="/movie-profile?id=' + mediaId + '">'+'<img src="' + mediaPoster + mediaList[i].poster_path + '">' + '</a>'));
				// Gives the imgs a bootstrap class to display four in a row.
				$("img").addClass('col-md-3').attr('id', 'api-entertainment');
				}
			}
		});
		//clear the search form
		$('#search-bar').val('');
	});


	

		// Change populated movies based on genre dropdown
		$('#genre-btn-movies').on('click', function() {
			pageNumber = 1;
			event.preventDefault();
			let genreId = $('.genres-form option:selected').val();
			// Make the get request for the movies depending on the genre
			$.get('https://api.themoviedb.org/3/genre/' + genreId + '/movies?api_key=868e357d0f927691ad60e3d98a0ecde4&language=en-US&include_adult=false&sort_by=created_at.asc').done(function(data) {
				$('.entertainment-list').empty();
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
		});


/////////////////////////////////////
////// Disover Shows Section ////////
/////////////////////////////////////


	// Only runs this function if on the discover-shows route
	if (top.location.pathname === '/discover-shows') {
		// Pull the discover movies api and make it into an object
		$.get('https://api.themoviedb.org/3/discover/tv?api_key=868e357d0f927691ad60e3d98a0ecde4&language=en-US&sort_by=popularity.desc&page=1').done(function(data) {
			let mediaList = data.results;
			let mediaPoster = "https://image.tmdb.org/t/p/w370_and_h556_bestv2";

			// Iterate through the results array and display the results on the page.
			for (let i = 0; i < mediaList.length; i++) {
				let mediaId = mediaList[i].id;
				if (mediaList[i].poster_path !==null) {
				// Creates images and takes path from results to create the src
				$('.entertainment-list').append(('<a href="/tv-profile?id=' + mediaId + '">'+'<img src="' + mediaPoster + mediaList[i].poster_path + '">' + '</a>'));
			}
			// Gives the imgs a bootstrap class to display four in a row.
			$("img").addClass('col-md-3').attr('id', 'api-entertainment');
		}
		});
	
	// Prevents enter key from refreshing page
	$('#search-bar').submit(function() {
		event.preventDefault();
	});

	// Calls api to search when search form is submitted
	$('#search-bar-btn').on('click', function() {
		event.preventDefault();
		let searchQuery = $('#search-bar').val();
		// Make the get request for shows or movies depening on the search query
		$.get('https://api.themoviedb.org/3/search/tv?api_key=868e357d0f927691ad60e3d98a0ecde4&language=en-US&query=' + searchQuery).done(function(data) {
			$('.entertainment-list').empty();
			let mediaList = data.results;
			let mediaPoster = "https://image.tmdb.org/t/p/w370_and_h556_bestv2";

			// Iterate through the results array and display the results on the page.
			for (let i = 0; i < mediaList.length; i++) {
				let mediaId = mediaList[i].id;
				// Creates images and takes path from results to create the src
				if (mediaList[i].poster_path !==null) {
				$('.entertainment-list').append(('<a href="/tv-profile?id=' + mediaId + '">'+'<img src="' + mediaPoster + mediaList[i].poster_path + '">' + '</a>'));
				// Gives the imgs a bootstrap class to display four in a row.
				$("img").addClass('col-md-3').attr('id', 'api-entertainment');
				}
			}
		});
		//clear the search form
		$('#search-var').val('');
	});

	
	// Gets tv shows based on genre
	$('#genre-btn-tv').on('click', function() {
		event.preventDefault();
		let genreId = $('.genres-form option:selected').val();
		//Make the get request for tv shows depending on the genre
		$.get('https://api.themoviedb.org/3/discover/tv?api_key=868e357d0f927691ad60e3d98a0ecde4&language=en-US&sort_by=popularity.desc&page=1&with_genres=' + genreId).done(function(data) {
		$('.entertainment-list').empty();
			let mediaList = data.results;
			let mediaPoster = "https://image.tmdb.org/t/p/w370_and_h556_bestv2";
			// Iterate through the results array and display the results on the page.
			for (let i = 0; i < mediaList.length; i++) {
				let mediaId = mediaList[i].id;
				if (mediaList[i].poster_path !==null) {
					// Creates images and takes path from results to create the src
					$('.entertainment-list').append(('<a href="/tv-profile?id=' + mediaId + '">'+'<img src="' + mediaPoster + mediaList[i].poster_path + '">' + '</a>'));
				}
				// Gives the imgs a bootstrap class to display four in a row.
				$("img").addClass('col-md-3').attr('id', 'api-entertainment');
			}
		});
	});
}


////////////////////////////////
// Media Profile Page Section //
////////////////////////////////

	$('#queue-btn').on('click', function() {
		$('.added').empty();
		$('.added').append('<p>' + 'Successfully Added');
	});

});