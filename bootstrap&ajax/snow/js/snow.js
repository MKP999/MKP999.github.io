//header
// window.onscroll = function (e) {
//     $('nav.navbar-default').css({'background-color': 'white'});
//     $('a.navbar-brand img').attr('src','./images/logo.svg') ;
//     $('ul.navbar-nav li a').css({color : 'black'});
//   }
window.onscroll = function(e) {
    if (window.pageYOffset == 0) {
        $("nav.navbar-default").css({ "background-color": "transparent" });
        $("a.navbar-brand img").attr("src", "./images/logo-light.svg");
        $("ul.navbar-nav li a").css({ color: "white" });
    } else {
        $("nav.navbar-default").css({ "background-color": "white" });
        $("a.navbar-brand img").attr("src", "./images/logo.svg");
        $("ul.navbar-nav li a").css({ color: "black" });
    }
};

if (window.innerWidth >= 992) {
    $("header .bg-mask span").click(function() {
        // console.log('xxx');
        var y = 0;
        var id = setInterval(function() {
            if (y < 600) {
                y += 20;
            }
            window.scrollTo(0, y);
            if (y >= 600) {
                clearInterval(id);
            }
        }, 10);
    });
}

if (window.innerWidth >= 768 && window.innerWidth < 992) {
    $("header .bg-mask span").click(function() {
        // console.log('xxx');
        var y = 0;
        var id = setInterval(function() {
            if (y < 500) {
                y += 20;
            }
            window.scrollTo(0, y);
            if (y >= 500) {
                clearInterval(id);
            }
        }, 10);
    });
}

if (window.innerWidth >= 578 && window.innerWidth < 768) {
    $("header .bg-mask span").click(function() {
        // console.log('xxx');
        var y = 0;
        var id = setInterval(function() {
            if (y < 500) {
                y += 20;
            }
            window.scrollTo(0, y);
            if (y >= 500) {
                clearInterval(id);
            }
        }, 10);
    });
}

if (window.innerWidth < 578) {
    $("header .bg-mask span").click(function() {
        // console.log('xxx');
        var y = 0;
        var id = setInterval(function() {
            if (y < 400) {
                y += 20;
            }
            window.scrollTo(0, y);
            if (y >= 400) {
                clearInterval(id);
            }
        }, 10);
    });
}

// Projects
$("section.projects li.scenery").mouseenter(function() {
    $(".scen-mask")
        .eq($(this).index())
        .find("h3")
        .slideDown();
    $(".scen-mask")
        .eq($(this).index())
        .find("h5")
        .slideDown();
});
$("section.projects li.scenery").mouseleave(function() {
    // $('.scen-mask').each(function (con) {
    //     con.find('h3').css('display','none');
    //     con.find('h5').css('display','none');
    //   });
    $(".scen-mask")
        .eq($(this).index())
        .find("h3")
        .css("display", "none");
    $(".scen-mask")
        .eq($(this).index())
        .find("h5")
        .css("display", "none");
});

//滚动图
// $("section.rolling ul.picture li").mousedown(function () {

//     $(document).mousemove(function (e) {
//         // values: e.clientX, e.clientY, e.pageX, e.pageY
//         e.preventDefault();

//     });
// });

// $("section.rolling ul.picture li").mousedown(function(e){
//     e.pageX
//     var positionDiv = $(this).offset();
//     var distenceX = e.pageX - positionDiv.left;
//     var distenceY = e.pageY - positionDiv.top;
//     alert(distenceX)
//     alert(positionDiv.left);
//     $("section.rolling ul.picture li").mousemove(function(e){
//       var x = e.pageX - distenceX;
//     //   var y = e.pageY - distenceY;
//       if(x<0){
//         x=0;
//       }else if(x>$(document).width()-$("section.rolling ul.picture li").outerWidth(true)){
//         x = $(document).width()-$("section.rolling ul.picture li").outerWidth(true);
//       }
//       if(y<0){
//         y=0;
//       }else if(y>$(document).height()-$("section.rolling ul.picture li").outerHeight(true)){
//         y = $(document).height()-$("section.rolling ul.picture li").outerHeight(true);
//       }
//       $("section.rolling ul.picture li").eq($(this).index()).css({
//         'left':x+'px',
//         'top':y+'px'
//       });
//     });
//     $("section.rolling ul.picture li").mouseup(function(){
//         $("section.rolling ul.picture li").off('mousemove');
//     });
//   });

var piclis = document.querySelectorAll("section.rolling ul.picture>li");
var pic = document.querySelector("section.rolling ul.picture");

function picmove(e) {
    e.preventDefault();
    var x = e.clientX - this.offsetLeft - this.offsetWidth/2;
    // var y = e.clientY - this.offsetTop - this.offsetHeight /2 ;
    // console.log(x);
    // var ComputedStyleml = getComputedStyle(pic);
    var oriValue = parseInt(pic.style.marginLeft);
    // console.log(oriValue,x);
    
    pic.style.marginLeft =x + "px";
}
pic.onmousedown = function(event) {
    event.preventDefault();
    // console.log(this);
    document.body.addEventListener("mousemove", picmove);

};
document.body.onmouseup = function (event) {
    event.preventDefault();
    document.body.removeEventListener("mousemove", picmove);
  }



// Blog 缩略图
if (window.innerWidth >= 1200) {
    $("section.blog .dots span").each(function(index, dot) {
        $(dot).click(function(e) {
            e.preventDefault();
            console.log($(this).index());
            $("section.blog ul.row").animate({ "margin-left": $(this).index() * -380 + "px" });
            $("section.blog .dots span")
                .eq($(this).index())
                .addClass("active")
                .siblings()
                .removeClass("active");
        });
    });
}

if (window.innerWidth >= 992 && window.innerWidth < 1200) {
    $("section.blog .dots span").each(function(index, dot) {
        $(dot).click(function(e) {
            e.preventDefault();
            console.log($(this).index());
            $("section.blog ul.row").animate({ "margin-left": $(this).index() * -313 + "px" });
            $("section.blog .dots span")
                .eq($(this).index())
                .addClass("active")
                .siblings()
                .removeClass("active");
        });
    });
}

if (window.innerWidth >= 768 && window.innerWidth < 992) {
    $("section.blog .dots span").each(function(index, dot) {
        $(dot).click(function(e) {
            e.preventDefault();
            console.log($(this).index());
            $("section.blog ul.row").animate({ "margin-left": $(this).index() * -240 + "px" });
            $("section.blog .dots span")
                .eq($(this).index())
                .addClass("active")
                .siblings()
                .removeClass("active");
        });
    });
}

if (window.innerWidth < 768) {
    $("section.blog .dots span").each(function(index, dot) {
        $(dot).click(function(e) {
            e.preventDefault();
            console.log($(this).index());
            $("section.blog ul.row").animate({ "margin-left": $(this).index() * -330 + "px" });
            $("section.blog .dots span")
                .eq($(this).index())
                .addClass("active")
                .siblings()
                .removeClass("active");
        });
    });
}
