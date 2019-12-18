//点击滚动
$("a").click(function() {
    //根据a标签的href转换为id选择器，获取id元素所处的位置，并高度减50px（这里根据需要自由设置）
    $("html,body").animate(
        {
            scrollTop: $($(this).attr("path")).offset().top-100
        },
        1000
    );
});

$(document).scroll(function() {
    windowScroll();
});

function windowScroll() {
    if ($(document).scrollTop() <= 50) {
        $("nav.navbar-default").css({ "background-color": "transparent", transition: "all .8s" });
        $("nav.navbar-default .collapse li.dropdown>a").css("color", "#fff");
        $("nav.navbar-default .navbar-header a img")[0].src = "./images/logo-light.png";
        $('nav.navbar-default ul.navbar-nav li img')[0].src = './images/search-light.png';
    } else {
        $("nav.navbar-default").css({ "background-color": "#fff", transition: "all .8s" });
        $("nav.navbar-default .collapse li.dropdown>a").css("color", "#333333");
        $("nav.navbar-default .navbar-header a img")[0].src = "./images/logo.png";
        $('nav.navbar-default ul.navbar-nav li img')[0].src = './images/search.png';
    }
}

// 轮播图
var mySwiper = new Swiper(".swiper-container", {
    direction: "horizontal", // 垂直切换选项
    loop: true, // 循环模式选项
    effect: "fade",
    fadeEffect: {
        crossFade: true
    },
    speed: 1500,
    autoplay: {
        delay: 5000
    },
    preventClicksPropagation: false
});

$("nav.navbar-default  ul.dropdown-menu li a").mousemove(function(e) {
    // values: e.clientX, e.clientY, e.pageX, e.pageY
    $("nav.navbar-default li.dropdown > a").css({ background: "transparent" });
});

setInterval(() => {
    $(".swiper-container h2").text("WE ARE STYLE");
    setInterval(() => {
        $(".swiper-container h2").text("WE ARE POWER");
    }, 3000);
}, 3000);

//box点击

$("section.box .container ul.row li").click(function(e) {
    e.preventDefault();
    $("section.box .container ul.row li")
        .eq($(this).index())
        .addClass("active")
        .siblings()
        .removeClass("active");
    $("section.box .container p")
        .eq($(this).index())
        .addClass("active")
        .siblings()
        .removeClass("active");
});

// CLIENT REVIEWS
var mySwiper = new Swiper(".myswiper", {
    direction: "horizontal", // 垂直切换选项
    loop: true, // 循环模式选项

    speed: 1000,
    autoplay: {
        delay: 2000
    }
});

// RECENT WORKS

$("section.works ul.content").mouseenter(function() {
    $("section.works ul.content li").mousemove(function(e) {
        $("section.works ul.content li")
            .eq($(this).index())
            .addClass("active")
            .siblings()
            .removeClass("active");
    });
});
$("section.works ul.content").mouseleave(function() {
    $("section.works ul.content li").removeClass("active");
});

//team
var mySwiper = new Swiper(".teamswiper", {
    direction: "horizontal" // 垂直切换选项
});
