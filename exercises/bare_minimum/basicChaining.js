/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var pluckFirstLineFromFileAsync = require('./promiseConstructor').pluckFirstLineFromFileAsync;
var getGitHubProfileAsync = require('./promisification').getGitHubProfileAsync;
var readFileAndMakeItFunnyAsync = require('./promisification').readFileAndMakeItFunnyAsync;

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO
  return new Promise(function(resolve, reject) {
    return pluckFirstLineFromFileAsync(readFilePath)
      .then(function(name) {
        return getGitHubProfileAsync(name);
      })
      .then(function(profile) {
        fs.writeFile(writeFilePath, JSON.stringify(profile), function(error, data) {
          if (error) {
            return reject(error);
          } else {
            return resolve(writeFilePath, profile);
          }
        });
      });
  });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
