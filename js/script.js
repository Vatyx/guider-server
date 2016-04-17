var weatherbool = false;
var trafficbool = false;

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
        $('#temp').text(data.weatherData.temp);
        $('#hum').text(data.weatherData.humidity);
        $('#wind').text(data.weatherData.wind);
        $('#sunset').text(data.weatherData.sunset);
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
var counter = 0;
var interval = null;
var trafficarray = ["hi", "two", "three", "four"];
$('#div2').click(function() {
    if(!trafficbool) {
    console.log("Im in here");
    $('#traffic').show();
    $('#traffic').css("display", "flex");
    $('#traffic').animateCss('fadeInRight');
    trafficbool = true;

    $.get('/traffic', function(data) {
      trafficarray = data.trafficData;

      $(".news").each(function(index) {
          $(this).text(trafficarray[counter]);
          counter = (counter + 1) % trafficarray.length;
      })

      interval = setInterval(function() { $(".news").each(function(index) {
          $(this).text(trafficarray[counter]);
          counter = (counter + 1) % trafficarray.length;
      })}, 3000);
    });
  }
});

$('#traffic').click(function() {
  if(trafficbool) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#traffic').addClass('animated ' + 'fadeOutLeft').one(animationEnd, function() {
            $('#traffic').hide();
            $('#traffic').removeClass('animated ' + 'fadeOutLeft');
            trafficbool = false;
        });
        clearInterval(interval);
        counter = 0;
  }
})
