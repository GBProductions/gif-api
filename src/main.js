// import $, { data } from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function() {
  $('#famousName').click(function() {
    let input = $('#name').val();
    $('#name').val("");

    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${input}&limit=5&offset=0&rating=g&lang=en`
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      }
      request.open("GET", url, true);
      request.send();
    });

    data[0].images.original.url

    promise.then(function(response) {
      const body = JSON.parse(response);
      $('.showName).text(`A Gif for ${input}`);
      $('.showGif').append(``);
      $('.showErrors').text("");
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error}`);
      $('.showName').text("");
      $('.showGif').text("");
    });
  });
});