//***********************//
//    Magical Witch      //
//***********************//

//デバッグモードフラグ
let Debug = true;

//ゲームスピード
const GAME_SPEED = 1000 / 60;

//画面サイズ
const SCREEN_W = 1280;
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

//ゲームの状態 0=Opening 1=game 2=gameOver
let gameSituation = 0;
let toggleFlag = true;

//自機の座標
let jiki_x = 0;
let jiki_y = 0;
let mouse = new Point();

//自機のダメージ判定(描画用)
let damageFlag = false;

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
let shotAtackPoint = 10;//弾の攻撃力初期値

//音声ファイルの読み込み
const startSE = new Audio("sounds/se/start.wav");

//画像ファイルを読み込み
//背景の枠
let waku = new Image();
waku.src = "images/waku.gif";
//モンスター
let spriteImage = new Image();
spriteImage.src = "images/monster.gif";
//ゲーム開始画面の画像
let titleLogo = new Image();
titleLogo.src = "images/TitleLogo.png";
let titleWitch = new Image();
titleWitch.src = "images/TitleWitch.png";
let howTo = new Image();
howTo.src = "images/HowToPlay.png";
let startBtn = new Image();
startBtn.src = "images/startbutton.png";
let openingBG = new Image();
openingBG.src = "images/OpeningBG.jpg";
//ゲームオーバー時の女の子立ち絵
let loseWitch = new Image();
loseWitch.src = "images/GameOverWitch3.png";
let continueBtn = new Image();
continueBtn.src = "images/continue.png";
let gameOverBG = new Image();
gameOverBG.src = "images/GameOverBG.jpg";
let yarare = new Image();
yarare.src = "images/yararechatta.png";

//ダメージエフェクト　後にスプライト化
let damageEf = new Image();
damageEf.src = "images/damage.png";

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
  new Sprite(0, 19, 64, 43),//0：コウモリ１
  new Sprite(64, 19, 64, 43),//1：コウモリ２
  new Sprite(123, 19, 64, 43),//2：コウモリ３
  new Sprite(195, 19, 35, 33),//3：コウモリの弾
  new Sprite(240, 16, 38, 38),//4：コウモリ浄化
  new Sprite(286, 13, 50, 50),//5：コウモリ出現魔法陣１
  new Sprite(335, 14, 50, 50),//6：コウモリ出現魔法陣２
  new Sprite(394, 14, 50, 50),//7：コウモリ出現魔法陣３
  new Sprite(446, 14, 50, 50),//8：コウモリ出現魔法陣４
  new Sprite(500, 14, 50, 50),//9：コウモリ出現魔法陣５
];

//スプライトを描画する
function drawSprite(snum, x, y) {
  let sx = sprite[snum].x;
  let sy = sprite[snum].y;
  let sw = sprite[snum].w;
  let sh = sprite[snum].h;

  vcon.drawImage(spriteImage, sx, sy, sw, sh, x, y, sw, sh);
}

//コウモリ
let bat = [];
let batAtack = [];
let jyouka = [];
let shutugen = [];

//ゲーム初期化
function gameInit() {
  setInterval(gameLoop, GAME_SPEED);
  //requestAnimationFrame の方がゲームに向いてるけど面倒なので保留
}

let gamethread = 0;

//ゲームループ
function gameLoop() {

  if (gameSituation == 0) {
    gamethread = 0;
    vcon.drawImage(openingBG, 0, 0, 1920, 1080, -600, 0, 1920, 1080);
    vcon.drawImage(waku, 0, 0, SCREEN_W, SCREEN_H, -20, -18, 1393, 818);
    vcon.drawImage(titleWitch, 0, 0, 1180, 1070, 600, 160, (1180 / 2) * 1.2, (1070 / 2) * 1.2);
    vcon.drawImage(howTo, 0, 0, 800, 550, 100, 220, 800/1.5, 550/1.5);
    vcon.drawImage(startBtn, 0, 0, 450, 130, 185, 630, 450*0.8, 130*0.8);
    vcon.drawImage(titleLogo, 0, 0, 650, 150, (SCREEN_W-650*1.5)/2, 20, 650*1.5, 150*1.5);
    // vcon.strokeStyle = "red";
    // vcon.strokeRect(200, 640, 330, 90);

  }

  if (gameSituation == 1) {

    gamethread++;
    //-----ステージ１-----
    if (gamethread == 100) shutugen.push(new Shutugen(5, 300, 100, 0, 0, 50, 50, 1, 1));
    if (gamethread == 200) shutugen.push(new Shutugen(5, 200, 300, 0, 0, 50, 50, 1, 2));

    //-----敵の動き-----
    // update_on(bat);//コウモリ
    // update_on(batAtack);//コウモリの弾
    // update_on(jyouka);//コウモリ浄化
    // update_on(shutugen);

    //-----自機ショットの生成-----
    setShot();

    //-----描画の処理-----
    //背景
    vcon.fillStyle = "#2e8b57";
    //vcon.fillStyle = "black";
    vcon.fillRect(0, 0, SCREEN_W, SCREEN_H);
    vcon.drawImage(waku, 0, 0, SCREEN_W, SCREEN_H, -20, -18, 1393, 818);

    //自機判定とショットの描画
    drawJiki();//←仮の描画
    drawShot();

    //敵の描画
    draw_on(shutugen);//コウモリ出現の魔法陣　描画順はコウモリより上
    draw_on(bat);//コウモリ
    draw_on(batAtack);//コウモリの弾
    draw_on(jyouka);//コウモリ浄化


    //自機ＨＰの表示（仮）
    if (jiki.hpPoint > 300) {
      vcon.fillStyle = "rgba(0,0,255,0.5)";
    } else {
      vcon.fillStyle = "rgba(255,0,0,0.5)";
    }
    vcon.fillRect(100, 60, jiki.hpPoint / 5, 20);
    vcon.strokeStyle = "black";
    vcon.strokeRect(100, 60, 200, 20);

    //HPがゼロになったらゲームオーバー判定
    //if (jiki.hpPoint <= 0) { gameSituation = 2; }
  }

  //ゲーム状況に影響されないようgameSituationの外に置く
  //敵の動き
  update_on(bat);//コウモリ
  update_on(batAtack);//コウモリの弾
  update_on(jyouka);//コウモリ浄化
  update_on(shutugen);

  //ゲームオーバー
  if (gameSituation == 2) {
    // vcon.fillStyle = "#f5deb3";
    // vcon.fillRect(0, 0, SCREEN_W, SCREEN_H);
    vcon.drawImage(gameOverBG, 0, 0, 800, 600, 0, 0, 800*1.6, 600*1.6);
    vcon.drawImage(continueBtn, 0, 0, 260, 260, 50, 220, 260*2.2, 260*2.2);
    vcon.drawImage(waku, 0, 0, SCREEN_W, SCREEN_H, -20, -18, 1393, 818);
    vcon.drawImage(loseWitch, 0, 0, 1180, 1070, 600, 160, (1180 / 2) * 1.2, (1070 / 2) * 1.2);
    vcon.drawImage(yarare, 0, 0, 640, 100, 50, 40, 640*1.8, 100*1.8);
    // vcon.font = "100px 'HGS創英角ﾎﾟｯﾌﾟ体'";
    // vcon.fillStyle = "black";
    // vcon.fillText("げーむおーばー", 80, 150);
    // vcon.strokeStyle = "red";
    // vcon.strokeRect(160, 330, 360, 120);
    // vcon.strokeStyle = "blue";
    // vcon.strokeRect(160, 490, 360, 120);
  }

  //仮想画面から実際のキャンバスにコピー
  con.drawImage(vcan, 0, 0, SCREEN_W, SCREEN_H, 0, 0, CANVAS_W, CANVAS_H);


  //-----デバッグ-----
  gameDebug();
}

window.onload = function () {
  gameInit();
}