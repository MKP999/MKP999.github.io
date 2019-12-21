var stage = document.querySelector(".stage");

function stagemove(e) {
    var x = e.clientX - stage.offsetLeft - stage.offsetWidth / 2;
    var y = e.clientY - stage.offsetTop - stage.offsetHeight / 2;
    stage.style.transform = "rotateX(" + -y / 20 + "deg) rotateY(" + -x / 20 + "deg)";
}

document.body.addEventListener("mousemove", stagemove);

var states = true;
function stageClick() {
    if (states == true) {
        states = false;
        stage.classList.toggle("active");
        stage.style.transform = "rotateX(" + 60 + "deg) rotateY(" + 0 + "deg)";
        document.body.removeEventListener("mousemove", stagemove);
    } else {
        stage.classList.toggle("active");
        document.body.addEventListener("mousemove", stagemove);
        states = true;
    }
}

document.body.onclick = function() {
    stageClick();
};
