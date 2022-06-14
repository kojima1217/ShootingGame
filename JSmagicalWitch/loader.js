let bg = document.getElementById("loader-bg"),
    loader = document.getElementById("loader");

bg.classList.remove("is-hide");
loader.classList.remove("in-hide");

window.addEventListener("load", stopload);

setTimeout("stopload()",10000);

function stopload() {
    bg.classList.add("fadeout-bg");
    loader.classList.add("fadeout-loader");
    console.log("ローダー");
}