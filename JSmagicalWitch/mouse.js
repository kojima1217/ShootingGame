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
          startVo.play();
          gameSituation = 1;
          toggleFlag = false;
        }
      }
      if (gameSituation == 2) {//ゲームオーバー
        if (clickPositonX > 160 && clickPositonX < 520 && clickPositonY > 330 && clickPositonY < 450) {
          continueVo.play();
          if (stagethred == 1) stagethred = 0;
          else if (stagethred == 3) stagethred = 2;
          else if (stagethred == 5) stagethred = 4;
          else if (stagethred == 7) stagethred = 6;
          else if (stagethred == 9) stagethred = 8;
          jiki.hpPoint = 1000;
          gameSituation = 1;
          stopStage = false;
          fire = false;
          gamethread = 0;
          actFontCount = 0;
          actFontFlag = true;
          goVoCount = 0;
          lastFadeOut = 1;
          lastCount = 0;
          damageFlag = false;
          toggleFlag = false;
        }
        if (clickPositonX > 160 && clickPositonX < 520 && clickPositonY > 490 && clickPositonY < 610) {
          //ゲームの初期化
          jiki.hpPoint = 1000;
          gameSituation = 0;
          stagethred = 0;
          actFontCount = 0;
          actFontFlag = true;
          stopStage = false;
          fire = false;
          damageFlag = false;
          toggleFlag = false;
        }
      }
      if (gameSituation == 3) {//ステージクリア
        if (stagethred == 1) stagethred = 2;
        else if (stagethred == 3) stagethred = 4;
        else if (stagethred == 5) stagethred = 6;
        else if (stagethred == 7) stagethred = 8;
        gameSituation = 1;
        stopStage = false;
        gamethread = 0;
        toggleFlag = false;
      }
      if (gameSituation == 4 && lastCount > 500) {//全ステージクリア
        jiki.hpPoint = 1000;
        gameSituation = 0;
        stagethred = 0;
        actFontCount = 0;
        actFontFlag = true;
        stopStage = false;
        fire = false;
        damageFlag = false;
        toggleFlag = false;
      }
    }
    if (gameSituation == 1 && stopStage && !thunderSwordFlag) fire = true;
  }
  if (event.which == 2) {
    console.log("中クリック");
  }
  if (event.which == 3 && gameSituation == 1 && stopStage) {
    console.log("右クリック");
    fire = false;

    if (changeMagic == 0 && fireReload == 1800) {
      fireBl.push(new FireBlast());
    } else if (changeMagic == 1 && thunderReload == 1800) {
      thunderSwordFlag = true;
      thHantei.push(new ThunderHantei(1));
      thHantei.push(new ThunderHantei(2));
      thHantei.push(new ThunderHantei(3));
      thHantei.push(new ThunderHantei(4));
      thHantei.push(new ThunderHantei(5));
      thGra.push(new ThunderGraphic());
    } else if (changeMagic == 2 && iceReload == 1800) {
      barrierOn = true;
      iceBa.push(new IceBarrier(0));
      iceBa.push(new IceBarrier(60));
      iceBa.push(new IceBarrier(120));
      iceBa.push(new IceBarrier(180));
      iceBa.push(new IceBarrier(240));
      iceBa.push(new IceBarrier(300));
    }
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

let changeMagic = 0;
//マウスホイール
document.onmousewheel = function (event) {
  //console.log(event.wheelDelta);
  console.log(changeMagic);
  if (event.wheelDelta > 0) {
    changeMagic--;
  } else {
    changeMagic++;
  }
  if (changeMagic > 2) {
    changeMagic = 0;
  }
  if (changeMagic < 0) {
    changeMagic = 2;
  }
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

