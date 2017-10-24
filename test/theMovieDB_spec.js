const expect = require('chai').expect;
const request = require('request');
const URL = 'https://api.themoviedb.org/3/discover/movie?page=2&with_genres=18&api_key=868e357d0f927691ad60e3d98a0ecde4';

describe('MovieDB', function() {
	var apiError,apiResponse,apiBody;
	before(function(done) {
		request(URL, function (error, response, body) {
			apiError = error;
			apiResponse = response;
			apiBody = body;
			done();
		});
	});
		it('should receive a 200/OK HTTP status code', function() {
			expect(apiResponse.statusCode).to.equal(200);
		});
		it('should return json data', function() {
			expect(typeof(apiBody)).to.equal('string');
		});
		it('should have an array of results in the body', function () {
			if(typeof(apiBody) == "string") {
				apiBody = JSON.parse(apiBody);
			}
			expect(apiBody.results).to.not.be.empty;
		});
		it('should have an object as the first result', function () {
			if(typeof(apiBody) == "string") {
				apiBody = JSON.parse(apiBody);
			}
			expect(typeof(apiBody.results[0])).to.equal('object');
		});
		it('should have an title property', function () {
			if(typeof(apiBody) == "string") {
				apiBody = JSON.parse(apiBody);
			}
			expect((apiBody.results[0].title)).to.not.be.empty;
		});
});