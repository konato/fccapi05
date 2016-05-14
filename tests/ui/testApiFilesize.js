'use strict';
 
var test = require('tape');
var request = require('supertest');
 
var app = require('../../server.js');

test('GET /', function (assert) {
  request(app)
    .get('/')
    .expect(200)
    .expect('Content-Type', /html/)
    .end(function (err, res) {
      assert.error(err, 'No error')
      assert.end();
    });
});

test('Upload file', function (assert) {
  request(app)
  .post('/api/filesize')
  .attach('fileName', './tests/fixtures/test.txt')
  .expect(200)
  .expect('Content-Type', /json/)
  .end(function (err, res) {
      assert.error(err, 'No error')
      assert.equal(res.body[0].file, 'test.txt', "file property should be 'test.txt'")
      assert.equal(res.body[0].size, 1025, "file size property should be 1025 bytes")
      assert.end();
    });
});

