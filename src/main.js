import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$('#submitButton').click(function(event) {
  event.preventDefault();
  let input = $('form#famousName #name').val();
  $('#name').val("");

  console.log(input);

  let promise = new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${input}&limit=5&offset=0&rating=g&lang=en`;
    request.onload = function() {
      if (this.status === 200) {
        resolve(request.response);
      } else {
        reject(request.response);
      }
    };
    request.open("GET", url, true);
    request.send();
  });

  promise.then(function(response) {
    const ipaResponse = JSON.parse(response);
    $('.showName').text(`A Gif for ${input}`);
    $('#showGif').append(`<img src="${ipaResponse.data[0].images.original.url}">`);
    $('.showErrors').text("");
  }, function(error) {
    $('.showErrors').text(`There was an error processing your request: ${error}`);
    $('.showName').text("");
    $('#showGif').text("");
  });
});