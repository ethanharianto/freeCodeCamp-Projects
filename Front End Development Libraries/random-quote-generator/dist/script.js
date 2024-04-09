var url = 'https://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=jsonp&lang=en&jsonp=?';

var getQuote = function (data) {
  $('#text').text('"' + data.quoteText + '"');
  var quote = '';
  if (data.quoteAuthor === '') {
    data.quoteAuthor = 'Unknown';
  }
  $('#author').text('- ' + data.quoteAuthor);

  // Generate random background color
  var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  $('.container-fluid, #new-quote').css('background-color', randomColor);
  $('#quote-box').css('background-color', 'white');
  $('#text, #author').css('color', randomColor);
};

$(document).ready(function () {
  $.getJSON(url, getQuote, 'jsonp');
});

$('#new-quote').click(function () {
  $.getJSON(url, getQuote, 'jsonp');
});