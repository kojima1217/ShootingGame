//****マウス操作の処理****//

can.addEventListener("mousemove", mouseMove, true);
function mouseMove(event) {
  //マウスカーソル座標の更新
  mouse.x = event.clientX - can.offsetLeft;
  mouse.y = event.clientY - can.offsetTop;
}

//スペースキーで方向をロック
let rockOn = false;
document.addEventListener("keydown", keyDown, true);
function keyDown(e) {
  if (e.keyCode == 32) {
    rockOn = true;
  }
}
document.addEventListener("keyup", keyUp, true);
function keyUp(e) {
  if (e.keyCode == 32) {
    rockOn = false;
  }
}

//マウスボタンを押下した時
document.addEventListener("mousedown", mouseDown, true);
function mouseDown(event) {
  event.preventDefault();
  if (event.which == 1) {
    console.log("左クリック");
    fire = true;
  }
  if (event.which == 2) {
    console.log("中クリック");
  }
  if (event.which == 3) {
    console.log("右クリック");
  }
}

//マウスボタンから指を離した時
document.addEventListener("mouseup", mouseUp, true);
function mouseUp(event) {
  if (event.which == 1) {
    console.log("左クリック離された");
    fire = false;
  }
  if (event.which == 2) {
    console.log("中クリック離された");
  }
  if (event.which == 3) {
    console.log("右クリック離された");
  }
}

//右クリックのメニュー無効
// document.addEventListener('contextmenu', function (e) {
//   e.preventDefault();
// });
// document.oncontextmenu = function () {
//   return false;
// };

//マウスホイール
document.onmousewheel = function (event) {
  console.log(event.wheelDelta);
}

//ドラッグのデフォルト動作無効
function DragStartFunc(e) {
  if (e.preventDefault) {
    e.preventDefault();
  } else {
    return false;
  }
}
document.addEventListener("dragstart", DragStartFunc);

