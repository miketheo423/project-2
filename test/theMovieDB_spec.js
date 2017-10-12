const expect = require('chai').expect;
const request = require('request');
const apiKey = require('../env.js');
const URL = 'https://api.themoviedb.org/3/discover/movie?page=2&with_genres=18&api_key=';

describe('MovieDB', function() {
	var apiError,apiResponse,apiBody;
	before(function(done) {
		request(URL + apiKey, function (error, response, body) {
			apiError = error;
			apiResponse = response;
			apiBody = body;
			done();
		});
	});
		it('should receive a 200/OK HTTP status code', function() {
			expect(apiResponse.statusCode).to.equal(200);
		});
		it('should have an array of results in the body', function () {
			if(typeof(apiBody) == "string") {
				apiBody = JSON.parse(apiBody);
			}
			expect(apiBody.results).to.not.be.empty;
		});
});