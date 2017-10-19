$(function () {
	// Pull the discover movies api and make it into an object
	let getPopMovies = $.get('https://api.themoviedb.org/3/discover/movie?api_key=868e357d0f927691ad60e3d98a0ecde4&language=en-US&sort_by=popularity.desc').done(function(data) {
		let movieList = data.results;
		let moviePoster = "https://image.tmdb.org/t/p/w370_and_h556_bestv2";

		// Iterate through the results array and display the results on the page.
		for (let i = 0; i < movieList.length; i++) {
			// Creates images and takes path from results to create the src
			$('#movie-list').append(('<a href="http://google.com">'+'<img src="' + moviePoster + movieList[i].poster_path + '">' + '</a>'));
		}
		// Gives the imgs a bootstrap class to display four in a row.
		$("img").addClass('col-md-3').attr('id', 'api-movies');
	});


	$('#genre-btn').on('click', function() {
		event.preventDefault();
		let genreId = $('#genres option:selected').val();
		// Make the get request for the movies depending on the genre
		$.get('https://api.themoviedb.org/3/genre/' + genreId + '/movies?api_key=868e357d0f927691ad60e3d98a0ecde4&language=en-US&include_adult=false&sort_by=created_at.asc').done(function(data) {
			$('#movie-list').empty();
			let movieList = data.results;
			let moviePoster = "https://image.tmdb.org/t/p/w370_and_h556_bestv2";

		// Iterate through the results array and display the results on the page.
		for (let i = 0; i < movieList.length; i++) {
			// Creates images and takes path from results to create the src
			$('#movie-list').append(('<a href="http://google.com">'+'<img src="' + moviePoster + movieList[i].poster_path + '">' + '</a>'));
		}
		// Gives the imgs a bootstrap class to display four in a row.
		$("img").addClass('col-md-3').attr('id', 'api-movies');

		});
	});

	

});