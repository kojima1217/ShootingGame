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

//GameOverフラグ
let gameOver = false;

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
let shotAtackPoint = 10;//弾の攻撃力初期値

//画像ファイルを読み込み
//背景の枠
let waku = new Image();
waku.src = "../images/waku.gif";
//モンスター
let spriteImage = new Image();
spriteImage.src = "../images/monster.gif";


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

let reload = 0;
let reload2 = 0;

let gamethread = 0;

//ゲームループ
function gameLoop() {

  if (!gameOver) {

    gamethread++;

    if(gamethread == 100){
      shutugen.push(new Shutugen(5, 300, 100, 0, 0, 50, 50, 1, 1));
    }
    if(gamethread == 200) shutugen.push(new Shutugen(5, 200, 300, 0, 0, 50, 50, 1, 2));

    //コウモリの出現（仮）ステージ作る時は消す
    // if (reload == 0) {
    //   bat.push(new Bat(0, 200, 100, 2, 2, 64, 43, 10));
    //   //スプライトナンバー, 出現位置ｘ, 出現位置ｙ, 動きｘ, 動きｙ, 大きさｘ, 大きさｙ, ヒットポイント
    //   reload = 1;
    //   if (++reload2 == 1) {
    //     reload = 20;
    //     reload2 = 0;
    //   }
    // }
    // if (reload > 0) reload--;

    //-----敵の動き-----
    update_on(bat);//コウモリ
    update_on(batAtack);//コウモリの弾
    update_on(jyouka);//コウモリ浄化
    update_on(shutugen);

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
    if (jiki.hpPoint > 30) {
      vcon.fillStyle = "rgba(0,0,255,0.5)";
    } else {
      vcon.fillStyle = "rgba(255,0,0,0.5)";
    }
    vcon.fillRect(100, 100, jiki.hpPoint / 5, 20);
    vcon.strokeStyle = "black";
    vcon.strokeRect(100, 100, 200, 20);

  }

  //ゲームオーバー
  if (jiki.hpPoint <= 0) { gameOver = true }
  if (gameOver) {
    vcon.fillStyle = "black";
    vcon.fillRect(0, 0, SCREEN_W, SCREEN_H);
    vcon.drawImage(waku, 0, 0, SCREEN_W, SCREEN_H, -20, -18, 1393, 818);
  }

  //仮想画面から実際のキャンバスにコピー
  con.drawImage(vcan, 0, 0, SCREEN_W, SCREEN_H, 0, 0, CANVAS_W, CANVAS_H);


  //-----デバッグ-----
  gameDebug();
}

window.onload = function () {
  gameInit();
}