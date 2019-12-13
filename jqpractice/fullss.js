var y = 0;
var current = 0;
var canwheel = true;
//滚轮事件
$("ul.gird").on("wheel", function(e) {
    console.log(e.originalEvent.deltaY);
    //防止手抖 节流
    y += e.originalEvent.deltaY;
    setTimeout(function() {
        if (canwheel) {
            canwheel = false;
            if (y > 0) {
                nextPic();
            } else {
                prevPic();
            }

            //防抖动事件
            setTimeout(function() {
                canwheel = true;
            }, 500);
            y = 0;
        }
    }, 300);
});
createDots();

//创建圈圈
function createDots() {
    $("ul.gird>li").each(function(index, element) {
        $(".Category").append("<span></span>");
        $(".Category span")
            .eq(0)
            .addClass("active");
    });
    $(".Category span").click(function() {
        current = $(this).index();
        showPic();
    });
}

//展示图片
function showPic() {
    $("ul.gird>li")
        .eq(0)
        .animate({ "margin-top": -100 * current + "vh" })
        .end()
        .eq(current)
        .addClass("active")
        .siblings()
        .removeClass("active");
    $(".Category span")
        .eq(current)
        .addClass("active")
        .siblings()
        .removeClass("active");
    $("header .menu ul.submenu li")
        .eq(current)
        .addClass("active")
        .siblings()
        .removeClass("active");
}

//下一张图片
function nextPic() {
    current = current >= $("ul.gird>li").length - 1 ? current : ++current;
    showPic();
}

//上一张图片
function prevPic() {
    current = current <= 0 ? 0 : --current;
    showPic();
}

// -------header----------
//创建闪光按钮鼠标经过事件
$("header .menu ul.submenu>li").mouseover(function(e) {
    $("header .menu ul.submenu>li")
        .eq($(this).index() - 1)
        .children(".before")
        .css({ left: 100 + "%" });
    $("header .menu ul.submenu>li")
        .eq($(this).index() - 1)
        .css({ color: "white" });
});

$("header .menu ul.submenu>li").mouseleave(function(e) {
    $("header .menu ul.submenu>li")
        .eq($(this).index() - 1)
        .children(".before")
        .css({ left: -100 + "%" });
});

//创建导航栏点击跳转事件
$("header .menu ul.submenu>li").click(function() {
    current = $(this).index() - 1;
    showPic();
});

//首页向下小图标
//实现循环向下移动
function nextButton() {
    $("ul.gird li .downbutton .nextarrows").animate({ top: 90 + "px" }, 3000);
    $("ul.gird li .downbutton .nextarrows").animate({ top: -32 + "px" }, 0, nextButton);
}
$(document).ready(function() {
    nextButton();
});

//点击下一页
$("ul.gird li .downbutton").click(function() {
    nextPic();
});

//第二页
$("ul.gird li a.vplay").click(function() {
    nextPic();
});
//图一
$("ul.gird>li .fourin1 ul.graph").mouseover(function() {
    $("ul.gird>li .fourin1 ul.graph li.one").css({ top: 0 });
    $("ul.gird>li .fourin1 ul.graph li.two").css({ right: 0 });
    $("ul.gird>li .fourin1 ul.graph li.three").css({ left: 0 });
    $("ul.gird>li .fourin1 ul.graph li.four").css({ bottom: 0 });
});
$("ul.gird>li .fourin1 ul.graph").mouseleave(function() {
    $("ul.gird>li .fourin1 ul.graph li.one").css({ top: -50 + "%" });
    $("ul.gird>li .fourin1 ul.graph li.two").css({ right: -50 + "%" });
    $("ul.gird>li .fourin1 ul.graph li.three").css({ left: -50 + "%" });
    $("ul.gird>li .fourin1 ul.graph li.four").css({ bottom: -50 + "%" });
});

//图二
$("ul.gird>li .fourin2 ul.graph").mouseover(function() {
    $("ul.gird>li .fourin2 ul.graph li.one").css({ top: 0 });
    $("ul.gird>li .fourin2 ul.graph li.two").css({ right: 0 });
    $("ul.gird>li .fourin2 ul.graph li.three").css({ left: 0 });
    $("ul.gird>li .fourin2 ul.graph li.four").css({ bottom: 0 });
});
$("ul.gird>li .fourin2 ul.graph").mouseleave(function() {
    $("ul.gird>li .fourin2 ul.graph li.one").css({ top: -50 + "%" });
    $("ul.gird>li .fourin2 ul.graph li.two").css({ right: -50 + "%" });
    $("ul.gird>li .fourin2 ul.graph li.three").css({ left: -50 + "%" });
    $("ul.gird>li .fourin2 ul.graph li.four").css({ bottom: -50 + "%" });
});

//第三页

// 第四页
$("ul.gird>li .worksmark ul.markfour li").mousemove(function() {
    // console.log($(this).index());
    $("ul.gird>li .worksmark ul.markfour li")
        .eq($(this).index())
        .children("span")
        .css({ opacity: 1 });
    $("ul.gird>li .worksmark ul.markfour li")
        .eq($(this).index())
        .addClass("change")
        .siblings()
        .removeClass("change");
    $("ul.gird>li .worksmark ul.markfour li")
        .find("div")
        .mouseover(function() {
            $(this).css({ "background-position-y": -34 + "px" });
        });
    $("ul.gird>li .worksmark ul.markfour li")
        .find("div")
        .mouseleave(function() {
            $(this).css({ "background-position-y": 0 });
        });
});

$("ul.gird>li .worksmark ul.markfour li").mouseleave(function() {
    $("ul.gird>li .worksmark ul.markfour li")
        .eq($(this).index())
        .children("span")
        .css({ opacity: 0 });
    $("ul.gird>li .worksmark ul.markfour li")
        .eq($(this).index())
        .removeClass("change");
});

//第五页
function liMouseover() {
    $("ul.gird>li ul.content li")
        .eq($(this).index())
        .addClass("mouseon")
        .siblings()
        .removeClass("mouseon");
    $("ul.gird>li ul.content li")
        .eq($(this).index())
        .removeClass("mask")
        .siblings()
        .addClass("mask");
}

function contentMouseout() {
    $("ul.gird>li ul.content li")
        .removeClass("mouseon")
        .addClass("mask");
}

function liClick() {
    var showAt = $(this).index();
    $("ul.gird>li:nth-child(5) .mask-lg").css({ display: "block" });
    $("ul.gird>li ul.content li").off();
    if (showAt <= 3) {
        $("ul.gird>li:nth-child(5) span").css({
            "background-position-x": showAt * -455 + "px",
            "background-position-y": 0,
            display: "block"
        });
    } else {
        $("ul.gird>li:nth-child(5) span").css({
            "background-position-x": (showAt - 4) * -455 + "px",
            "background-position-y": -670 + "px",
            display: "block"
        });
    }
    $("ul.gird>li:nth-child(5) span").on("click", spanClick);
    $("ul.gird>li ul.content").on("mouseout", contentMouseout);
}

function spanClick() {
    $("ul.gird>li:nth-child(5) .mask-lg").css({ display: "none" });
    $("ul.gird>li:nth-child(5) span").css({ display: "none" });
    $("ul.gird>li ul.content li").on("mouseover", liMouseover);
    $("ul.gird>li ul.content li").on("click", liClick);
}

//鼠标进去高光图片
$("ul.gird>li ul.content li").on("mouseover", liMouseover);

//鼠标出来 取消全部高光
$("ul.gird>li ul.content").on("mouseout", contentMouseout);

//弹出个人悬赏令
// 当current <=3  x= (current * -300)px         y =0
// 当current >3   x= ((current -4) * -300)px    y =-430px
$("ul.gird>li:nth-child(5) ul.content li").on("click", liClick);
