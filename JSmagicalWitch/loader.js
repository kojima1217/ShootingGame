let bg = document.getElementById("loader-bg");

bg.classList.remove("is-hide");

window.addEventListener("load", stopload);

setTimeout("stopload()",30000);

function stopload() {
    bg.classList.add("fadeout-bg");
}