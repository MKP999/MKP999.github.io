
var change = 0;
var id = setInterval(function () {
    $('.pageLoading .loading  .bar').css('width',change + '%');
    change ++;
    if(change > 100){
        clearInterval(id);
        $('.pageLoading').addClass('complete');
        setTimeout(function () {
            $('.monsterText').html('<h2>And This Is <br> My World!</h2><h3>Everyone Look here!</h3>')
          },3000)
    }
  },30)