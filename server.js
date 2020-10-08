const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = '*****************';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  let url = `http://api.weatherstack.com/current?access_key=469718299ab25a6e9db514de0c3c4cc1&query=lagos`;

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.current == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = weather.current.temperature;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
});

app.post('/', function (req, res) {
  
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
