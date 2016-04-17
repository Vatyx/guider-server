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
        $('#temp').text(data.temp);
        $('#hum').text(data.humidity);
        $('#wind').text(data.wind);
        $('#sunset').text(data.sunset);
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

$('#div3').click(function() {
  //$.get('/location' function(data) {
  //});
  $.get('localhost:3000', function(data) {
    console.log("Got something!");
    console.log(data);
});

});

$('#div4').click(function() {
  //$.get('/location' function(data) {
      data = {};
      var lat = data.lat;
      var long = data.long;
      lat = 10;
      long = 10;
      $.get('http://whateverorigin.org/get?url=' + encodeURIComponent('https://api.tropo.com/1.0/sessions?action=create&token=4f734e706f77724b664c474f7241614a476c507764744d4f765a70426a446670435a61767049476e6856614c&lat='+ lat + '&long='+ long) + '&callback=?', function(data){
      	alert("Yay!");
      });
  //});
});
