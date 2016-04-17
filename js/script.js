console.log("I loaded");
var weatherbool = false;
var trafficbool = false;
var answerbool = false;

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
    if(!answerbool) {
    $('#answer').show();
    $('#answer').css("display", "flex");
    $('#answer').animateCss('fadeInRight');
    setTimeout(function () {
      $('.bogo').text("Waiting on your answer");
    }, 5000);

  $.get('/answer', function(data) {
    console.log(data);
    $('.bogo').text(data.answer);
    answerbool = true;
  });
}
});

$('#answer').click(function() {
  if(answerbool) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#answer').addClass('animated ' + 'fadeOutLeft').one(animationEnd, function() {
            $('#answer').hide();
            $('#answer').removeClass('animated ' + 'fadeOutLeft');
            $('.bogo').text("Speak your question into the mic!");
            answerbool = false;
        });
  }
})


var textbool = true;
$('#div4').click(function() {
  var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
  $.get('/text', function(data) {
        if(textbool) {
          textbool = false;
        $('park').addClass('animated ' + 'flipOutX').one(animationEnd, function() {
            $('park').hide()
            $('park').text("Text sent!");
            $('park').removeClass('animated ' + 'flipOutX');
            $('park').show();
            $('park').addClass('animated ' + 'flipInX').one(animationEnd, function() {
              setTimeout(function() {
                $('park').removeClass('animated ' + 'flipInX');
                $('park').addClass('animated ' + 'flipOutX').one(animationEnd, function() {
                    $('park').hide()
                    $('park').text("Park!");
                    $('park').removeClass('animated ' + 'flipOutX');
                    $('park').show();
                    $('park').addClass('animated ' + 'flipInX').one(animationEnd, function() {
                      textbool = true;
                    });
                });
              }, 2000);
            });
        });
      }
  });
});
