$(function () {
	// Pull the discover movies api and make it into an object
	let getPopMovies = $.get('https://api.themoviedb.org/3/discover/movie?api_key=868e357d0f927691ad60e3d98a0ecde4&language=en-US&sort_by=popularity.desc').done(function(data) {
		var movieList = data.results;

		// Iterate through the results array and display the results on the page.
		for (let i = 0; i < movieList.length; i++) {
			$('#discover-list').append('<li>' + movieList[i].title + '</li>');
			console.log(movieList[i].title);
		}

	});
});