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

//ゲーム画面内のクリックされた座標を計算するための変数
let clickX = 0;
let clickY = 0;
let clickPositonX = 0;
let clickPositonY = 0;
let targetElement = document.getElementById("hako");
let screenBox = targetElement.getBoundingClientRect();
let cX = Math.floor(screenBox.left);
let cY = Math.floor(screenBox.top);

//マウスボタンを押下した時
document.addEventListener("mousedown", mouseDown, true);
function mouseDown(event) {
  //クリックした座標を取得
  clickX = event.pageX;
  clickY = event.pageY;
  clickPositonX = clickX - cX;
  clickPositonY = clickY - cY;
  event.preventDefault();
  if (event.which == 1) {
    console.log("左クリック");
    if (toggleFlag) {
      if (gameSituation == 0) {//ゲーム開始
        if (clickPositonX > 200 && clickPositonX < 530 && clickPositonY > 640 && clickPositonY < 730) {
          gamethread = 0;
          startSE.play();
          gameSituation = 1;
          toggleFlag = false;
        }
      }
      if (gameSituation == 2) {//ゲームオーバー
        if (clickPositonX > 160 && clickPositonX < 520 && clickPositonY > 330 && clickPositonY < 450) {
          console.log("コンテニュー");
        }
        if (clickPositonX > 160 && clickPositonX < 520 && clickPositonY > 490 && clickPositonY < 610) {
          jiki.hpPoint = 1000;
          gameSituation = 0;
          damageFlag = false;
          toggleFlag = false;
        }
      }
    }
    if (gameSituation == 1) fire = true;
    /*
    GameOverの時にクリックしたら初期化
    押しっぱなし対策
    delete jiki;
    jiki = new jiki();
    ゲームオーバーフラッグを元に戻してオープニングへ
    スコア初期化
    */
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
    toggleFlag = true;
    if (gameSituation == 1) fire = false;
  }
  if (event.which == 2) {
    console.log("中クリック離された");
  }
  if (event.which == 3) {
    console.log("右クリック離された");
  }
}

//右クリックのメニュー無効
if (!Debug) {
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  });
  document.oncontextmenu = function () {
    return false;
  };
}

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

