//***********************//
//    Magical Witch      //
//***********************//

//デバッグモードフラグ
let Debug = false;

//ゲームスピード
const GAME_SPEED = 1000 / 60;

//画面サイズ
const SCREEN_W = 1200;
const SCREEN_H = 800;

//キャンバスサイズ
const CANVAS_W = SCREEN_W;
const CANVAS_H = SCREEN_H;

//フィールドサイズ
const FIELD_W = SCREEN_W * 2;
const FIELD_H = SCREEN_H * 2;

//キャンバス
let can = document.getElementById("can");
let con = can.getContext("2d");
can.width = CANVAS_W;
can.height = CANVAS_H;

//フィールド仮想画面
let vcan = document.createElement("canvas");
let vcon = vcan.getContext("2d");
vcan.width = FIELD_W;
vcan.height = FIELD_H;

//カメラの座標
let camera_x = 0;
let camera_y = 0;

//自機の座標
let jiki_x = 0;
let jiki_y = 0;
let mouse = new Point();

//自機が向いている方向
let direc = 0;

//斜め方向の補正
let ruto2 = Math.sqrt(2);
let diago = 1.0 / ruto2;

//自機ショット変数
const CHARA_SHOT_SIZE = 5;
const CHARA_SIDE_SHOT_SIZE = 3;
const CHARA_SHOT_SPEED = 20;
const CHARA_SIDE_SHOT_SPEED = 18;
const CHARA_SHOT_MAX_COUNT = 100;
let fire = false;
let blastInit = 0.5;//ショットが段々大きくなる

//画像ファイルを読み込み
let spriteImage = new Image();
spriteImage.src = "../images/bat.png";

//スプライトクラス
class Sprite {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
}

//スプライト
let sprite = [
  new Sprite(0,0,100,49)
];
// let sprite = [
//   new Sprite(4,13,28,45),
//   new Sprite(100,13,28,45),
//   new Sprite(4,62,28,45),
//   new Sprite(100,62,28,45),
//   new Sprite(4,110,28,45),
//   new Sprite(100,110,28,45),
//   new Sprite(4,158,28,45),
//   new Sprite(99,158,28,45)
// ];

//スプライトを描画する
function drawSprite(snum, x, y) {
  let sx = sprite[snum].x;
  let sy = sprite[snum].y;
  let sw = sprite[snum].w;
  let sh = sprite[snum].h;

  vcon.drawImage(spriteImage, sx, sy, sw, sh, x, y, sw, sh);
}

//コウモリ
let bat = new Bat(0,200,100,100,50);

//ゲーム初期化
function gameInit() {
  setInterval(gameLoop, GAME_SPEED);
  //requestAnimationFrame の方がゲームに向いてるけど面倒なので保留
}


//ゲームループ
function gameLoop() {

  //-----自機ショットの生成-----
  setShot();

  //-----描画の処理-----
  //背景
  vcon.fillStyle = "#2e8b57";
  vcon.fillRect(0, 0, SCREEN_W, SCREEN_H);

  //自機判定とショットの描画
  drawJiki();//←仮の描画
  drawShot();

  //敵の描画
  bat.draw();//コウモリ

  //drawSprite(0, 100, 100);

  //仮想画面から実際のキャンバスにコピー
  con.drawImage(vcan, 0, 0, SCREEN_W, SCREEN_H, 0, 0, CANVAS_W, CANVAS_H);


  //-----デバッグ-----
  if (Debug) {
    con.font = "20px 'Impact'";
    con.fillStyle = "black";
    con.fillText("弾" + charaShotCenter.length, 20, 20);
  }
}

window.onload = function () {
  gameInit();
}