var expect  = require('chai').expect;
var request = require('request');

it('Login page content', function(done) {
    request('http://localhost:3001' , function(error, response, body) {
        expect(body).to.include('Chat Login');
        done();
    });
});