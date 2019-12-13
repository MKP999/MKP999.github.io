var kico = {};

// 寮规
kico.notice_list = document.createElement("div");
kico.notice_list.classList.add("bk-notice-list");

function bk_notice(content, attr) {
    var notice_item = document.createElement("div");
    notice_item.className = "bk-notice";
    notice_item.innerHTML += "<span class='content'>" + content + "</span>";

    kico.notice_list.appendChild(notice_item);

    if (!document.querySelector("body > .bk-notice-list")) {
        document.body.appendChild(kico.notice_list);
    }

    if (attr && attr.time) {
        setTimeout(notice_remove, attr.time);
    } else {
        var close = document.createElement("span");
        close.className = "close";

        close.addEventListener("click", function() {
            notice_remove();
        });

        notice_item.classList.add("dismiss");
        notice_item.appendChild(close);
    }

    if (attr && attr.color) {
        notice_item.classList.add(attr.color);
    }
    if (attr && attr.time && attr.overlay === true) {
        bk_overlay({
            time: attr.time
        });
    }

    function notice_remove() {
        notice_item.classList.add("remove");

        setTimeout(function() {
            try {
                kico.notice_list.removeChild(notice_item);
                document.querySelector("body > .bk-notice-list").removeChild(notice_item);
            } catch (err) {}

            if (document.querySelector("body > .bk-notice-list") && kico.notice_list.childNodes.length === 0) {
                document.body.removeChild(kico.notice_list);
            }
        }, 300);
    }
}

// 閬僵
kico.overlay = document.createElement("div");
kico.overlay.classList.add("bk-overlay");

function bk_overlay(attr) {
    document.body.appendChild(kico.overlay);

    if (attr && attr.time) {
        setTimeout(overlay_remove, attr.time);
    } else {
        kico.overlay.addEventListener("click", function() {
            overlay_remove();
        });
    }

    if (attr && attr.code) {
        kico.overlay.addEventListener("click", function() {
            attr.code();
        });
    }

    function overlay_remove() {
        kico.overlay.classList.add("remove");

        setTimeout(function() {
            if (document.querySelector("body > .bk-overlay")) {
                kico.overlay.classList.remove("remove");
                document.body.removeChild(kico.overlay);
            }
        }, 300);
    }
}

// 鍥剧墖鏀惧ぇ
kico.image_box = document.createElement("div");
kico.image_box.className = "bk-image";
kico.image_single = document.createElement("img");
kico.image_box.appendChild(kico.image_single);

function bk_image(selector) {
    var get_images = document.querySelectorAll(selector);

    function item(obj) {
        obj.setAttribute("bk-image", "active");
        obj.addEventListener("click", function() {
            kico.image_single.src = obj.src;
            if (!document.querySelector("body > .bk-image")) {
                document.body.appendChild(kico.image_box);
            }
        });
    }

    for (var i = 0; i < get_images.length; i++) {
        item(get_images[i]);
    }

    kico.image_box.addEventListener("click", function() {
        kico.image_box.classList.add("remove");
        setTimeout(function() {
            try {
                document.body.removeChild(kico.image_box);
                kico.image_box.classList.remove("remove");
            } catch (err) {}
        }, 300);
    });
}


if (window.console && window.console.log) {
    console.log("\n %c Kico Style %c https://www.binkic.com \n\n", "color: #fff; background: #3498db; padding: 5px 0;", "background: #efefef; padding: 5px 0; text-decoration: none;");
}

$('a').click(function () {
        //根据a标签的href转换为id选择器，获取id元素所处的位置，并高度减50px（这里根据需要自由设置）
        $('html,body').animate({
            scrollTop: ($($(this).attr('path')).offset().top)
        }, 1000);
    });
