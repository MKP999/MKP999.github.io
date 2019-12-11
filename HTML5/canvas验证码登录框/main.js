var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
for (var i = 65; i < 122; i++) {
    if (i > 90 && i < 97) {
        continue;
    } else {
        arr.push(String.fromCharCode(i));
    }
}

//创建画布内容
function createCanvas() {
    //显示字
    var str = "";
    var value = "";
    for (let i = 0; i < 6; i++) {
        var n = Math.floor(Math.random() * arr.length);
        str += arr[n] + " ";
        value += arr[n];
    }
    /**@type{HTMLCanvasElement}  */

    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    //画布背景

    var img = new Image();
    img.src = "./timg.jpg";
    img.onload = function() {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.font = "46px Roboto Slab";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.setTransform(1, -0.12, 0.3, 1, 0, 12);
        ctx.fillText(str, canvas.width / 2, 60);
    };

    //点击按钮 刷新
    $("button .fa-refresh").click(function(e) {
        e.preventDefault();
        createCanvas();
    });

    //点击按钮 提交
    $(".submit").click(function(e) {
        e.preventDefault();
        if ($(".inputbox input").val() == value) {
            $(".inputbox span").css("display", "inline-block");
            $(".inputbox span").removeClass('fa-close').addClass('fa-check');
            $('.wrapper p').css("display", "none");
            createCanvas();
        } else {
            $(".inputbox span").css("display", "inline-block");
            $(".inputbox span").removeClass('fa-check').addClass('fa-close');
            $('.wrapper p').css("display", "inline-block");
            createCanvas();
        }
    });
}

createCanvas();
