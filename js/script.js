var weatherbool = false;

var what = {
  "weatherData": {
    "name": "San Francisco",
    "id": "5391959",
    "weather": [
      {
        "icon": "01n",
        "id": "800",
        "main": "Clear",
        "description": "clear sky"
      }
    ],
    "base": "cmc stations",
    "wind": {
      "speed": "1.5",
      "deg": "110"
    },
    "clouds": {
      "all": "1"
    },
    "dt": "1460886744",
    "cod": "200",
    "coord": {
      "lon": "-122.42",
      "lat": "37.77"
    },
    "main": {
      "humidity": "43",
      "temp": "284.69",
      "temp_max": "289.15",
      "temp_min": "281.15",
      "pressure": "1027"
    },
    "sys": {
      "sunset": "1460947691",
      "sunrise": "1460899823",
      "id": "226",
      "message": "0.0042",
      "country": "US",
      "type": "1"
    }
  }
};

$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});

$('#div1').click(function() {
    if(!weatherbool){
    console.log("Im in here");
    $('#weather').show();
    $('#weather').animateCss('fadeInRight');
    weatherbool = true;

    $.get('/weather', function(data) {
      console.log(what.weatherData);
        $('#temp').text(what.weatherData.main.temp + " F");
        $('#hum').text(what.weatherData.main.humidity);
        $('#wind').text(what.weatherData.wind.speed);
        $('#sunset').text(what.weatherData.sys.sunset);
    });
  }
});

$('#weather').click(function() {
  if(weatherbool) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#weather').addClass('animated ' + 'fadeOutLeft').one(animationEnd, function() {
            $('#weather').hide();
            $('#weather').removeClass('animated ' + 'fadeOutLeft');
            weatherbool = false;
        });
  }
})
