var current = 0;
var audio = document.querySelector("audio");

//歌曲进度条
//拖动进度条 更新时间
$('input[type="range"]').on("input", function(event) {
    event.preventDefault();
    console.log($(this).val());
    $(".progress").css({ width: $(this).val() + "%" });
    $(".progress::after").css({ left: 100 + "px" });
    audio.currentTime = $(this).val()*0.01 *audio.duration;
});

//生成对应时间函数
function songTime(time) {
    var minute = parseInt(time / 60);
    minute = minute.toString().length === 1 ? "0" + minute : minute;
    var second = parseInt(time % 60);
    second = second.toString().length === 1 ? "0" + second : second;
    return minute + ":" + second;
}



//讲对应的时间打印
// $(".ui .time span.start").text(songTime(audio.currentTime));
// $(".ui .time span.end").text(songTime(audio.duration));

//歌曲对象
var playlist = [
    {
        file: "./华晨宇 - 山海 (2018歌手第二季第9期现场).mp3",
        thumb: "./img/山海.jpg",
        trackName: "山海",
        trackArtist: "华晨宇"
    },
    {
        file: "./许嵩 - 幻听.mp3",
        thumb: "./img/幻听.jpg",
        trackName: "幻听",
        trackArtist: "许嵩"
    },
    {
        file: "./薛之谦 - 火星人来过.mp3",
        thumb: "./img/火星人.jpg",
        trackName: "火星人来过",
        trackArtist: "薛之谦"
    },
    {
        file: "./许嵩 - 幻听.mp3",
        thumb: "./img/幻听.jpg",
        trackName: "幻听",
        trackArtist: "许嵩"
    }
];

//遍历全部歌单 打印
$.each(playlist, function(index, e) {
    $(".playlist ul").append('<li class="item"><div class="card"><img src="' + e.thumb + '" alt=""><h3>' + e.trackName + "</h3><p>" + e.trackArtist + "</p></div></li>");
});

var lis = document.querySelectorAll(".playlist ul li.item");

//初始化
function init() {
    $("audio").attr("src", playlist[0].file);
    $(".playlist ul li.item")
        .eq(0)
        .addClass("playing");
    $(".ui").css({ "background-image": "url(" + playlist[0].thumb + ")" });
    $(".ui>h3").text(playlist[0].trackName);
    $(".ui>p").text(playlist[0].trackArtist);
}
init();

//开始播放函数
function play() {
    $("audio")[0].play();
    $(".fa-play").fadeOut();
    $(".fa-pause").fadeIn();
    for (let i = 0; i < lis.length - 1; i++) {
        $(".playlist ul li.item")
            .eq(i)
            .removeClass("paused");
    }
}

//暂停播放函数
function pause() {
    audio.pause();
    $(".fa-play").fadeIn();
    $(".fa-pause").fadeOut();
    $(".playlist ul li.item")
        .eq(current)
        .addClass("paused");
}

//高亮卡片
function highlightCard() {
    $(".playlist ul li.item")
        .eq(current)
        .addClass("playing")
        .siblings()
        .removeClass("playing");
}

//切换ui
function changeUi() {
    $(".ui").css({ "background-image": "url(" + playlist[current].thumb + ")" });
    $(".ui>h3").text(playlist[current].trackName);
    $(".ui>p").text(playlist[current].trackArtist);
}

//对每首歌 添加点击事件 并且设置歌曲链接
$.each($(".playlist ul li.item"), function(index, li) {
    $(li).click(function(e) {
        e.preventDefault();
        //    console.log($(this).index());
        current = $(this).index();
        $("audio").attr("src", playlist[$(this).index()].file);
        play();
        $(".playlist ul li.item")
            .eq($(this).index())
            .addClass("playing")
            .siblings()
            .removeClass("playing");
        highlightCard();
        changeUi();
    });
});

//点击暂停 开始事件
$(".fa-play").click(function(e) {
    e.preventDefault();
    play();
});

$(".fa-pause")
    .click(function(e) {
        e.preventDefault();
        pause();
    })
    .fadeOut();

//下一首
$(".fa-forward").click(function() {
    current++;
    current = current > lis.length - 1 ? 0 : current;
    $("audio").attr("src", playlist[current].file);
    play();
    highlightCard();
    changeUi();
});

//上一首
$(".fa-backward").click(function() {
    current--;
    current = current < 0 ? lis.length - 1 : current;
    $("audio").attr("src", playlist[current].file);
    play();
    highlightCard();
    changeUi();
});

setInterval(function() {
    //讲对应的时间打印
    $(".ui .time span.start").text(songTime(audio.currentTime));
    $(".ui .time span.end").text(songTime(audio.duration));

    //调节进度条
    $(".ui label .progress").css({ width: (audio.currentTime / audio.duration) * 100 + "%" });

    //自动播放下一首
    if (audio.ended) {
        current++;
        current = current > lis.length - 1 ? 0 : current;
        $("audio").attr("src", playlist[current].file);
        play();
        highlightCard();
        changeUi();
    }
}, 1000);
