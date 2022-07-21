//***********************//
//    Magical Witch      //
//***********************//

//デバッグモードフラグ
let Debug = false;

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

//ゲームの状態
// 0オープニング画面
// 1ゲーム中
// 2コンテニュー画面
// 3ステージクリア画面
// 4エンディング画面
let gameSituation = 0;
let toggleFlag = true;//ゲーム状態の切り換えトグル

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
let shotAttackPoint = 10;//弾の攻撃力初期値

//音声ファイルの読み込み
const startVo = new Audio("sounds/se/start.wav");
const gameOverVo = new Audio("sounds/se/gameover.wav");
let goVoCount = 0;
const continueVo = new Audio("sounds/se/continue.wav");
const stageClearVo = new Audio("sounds/se/ok.wav");
let stageClearVoFlag = true;
const allStageClearVo = new Audio("sounds/se/yatta.wav");
const thankVo = new Audio("sounds/se/arigatou.wav");


//画像ファイルを読み込み
//背景の枠
let waku = new Image();
waku.src = "images/waku.gif";
//モンスター
let spriteImage = new Image();
spriteImage.src = "images/monster.png";
//魔法
let spriteImage2 = new Image();
spriteImage2.src = "images/magic.png";
//ゲーム開始画面の画像
let titleLogo = new Image();
titleLogo.src = "images/ui/TitleLogo.png";
let titleWitch = new Image();
titleWitch.src = "images/TitleWitch.png";
let howTo = new Image();
howTo.src = "images/ui/HowToPlay.png";
let startBtn = new Image();
startBtn.src = "images/ui/startbutton.png";
let openingBG = new Image();
openingBG.src = "images/OpeningBG.jpg";
//ゲームオーバー画面の画像
let loseWitch = new Image();
loseWitch.src = "images/GameOverWitch3.png";
let continueBtn = new Image();
continueBtn.src = "images/ui/continue.png";
let gameOverBG = new Image();
gameOverBG.src = "images/GameOverBG.jpg";
let gameOverFont = new Image();
gameOverFont.src = "images/ui/gameOverFont.png";
//ゲームスタンバイ画面のステージ紹介文
let act1 = new Image();
act1.src = "images/ui/act1.gif";
let act2 = new Image();
act2.src = "images/ui/act2.gif";
let act3 = new Image();
act3.src = "images/ui/act3.gif";
let act4 = new Image();
act4.src = "images/ui/act4.gif";
//ステージクリア画面の画像
let clearFont = new Image();
clearFont.src = "images/ui/clearFont.gif"
let allClearFont = new Image();
allClearFont.src = "images/ui/allClearFont.gif";
let clearWitch = new Image();
clearWitch.src = "images/clearWitch.jpg";
let thank = new Image();
thank.src = "images/ui/TFP.gif";
//ステージ画像
let mati_1 = new Image();
mati_1.src = "images/map/1mati.gif";
let sougen_2 = new Image();
sougen_2.src = "images/map/2sougen.gif";
let mori_3 = new Image();
mori_3.src = "images/map/3mori.gif";
let mori_4 = new Image();
mori_4.src = "images/map/4mori.gif";
let mori_5 = new Image();
mori_5.src = "images/map/5mori.gif";
let mori_6 = new Image();
mori_6.src = "images/map/6mori.gif";
let haka_7 = new Image();
haka_7.src = "images/map/7haka.gif";
let yasikigaikan_8 = new Image();
yasikigaikan_8.src = "images/map/8yasikigaikan.gif";
let yasiki_9 = new Image();
yasiki_9.src = "images/map/9yasiki.gif";


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
  new Sprite(195, 19, 35, 33),//3：コウモリの弾(デバッグ用)
  new Sprite(240, 16, 38, 38),//4：コウモリ浄化
  new Sprite(286, 13, 50, 50),//5：コウモリ出現魔法陣１
  new Sprite(335, 14, 50, 50),//6：コウモリ出現魔法陣２
  new Sprite(394, 14, 50, 50),//7：コウモリ出現魔法陣３
  new Sprite(446, 14, 50, 50),//8：コウモリ出現魔法陣４
  new Sprite(500, 14, 50, 50),//9：コウモリ出現魔法陣５
  new Sprite(0, 70, 64, 43),//10：赤コウモリ１
  new Sprite(64, 70, 64, 43),//11：赤コウモリ２
  new Sprite(123, 70, 64, 43),//12：赤コウモリ３

  new Sprite(18, 130, 112, 110),//13:トレント
  new Sprite(140, 130, 112, 110),//14:トレント弾発射
  new Sprite(266, 130, 112, 110),//15:トレント枯れ木
  new Sprite(410, 172, 50, 50),//16:トレントの弾

  new Sprite(484, 163, 65, 65),//17:ヒットエフェクト１(２、３、４は一番下)

  new Sprite(394, 262, 80, 70),//18:パンプキン１
  new Sprite(300, 262, 80, 70),//19:パンプキン２
  new Sprite(207, 262, 80, 70),//20:パンプキン弾発射１
  new Sprite(113, 262, 80, 70),//21:パンプキン弾発射２
  new Sprite(19, 262, 80, 70),//22:パンプキン弾発射３
  new Sprite(508, 280, 48, 48),//23:パンプキンの弾
  new Sprite(18, 360, 65, 64),//24:パンプキン消滅１
  new Sprite(84, 360, 65, 64),//25:パンプキン消滅２
  new Sprite(166, 360, 65, 64),//26:パンプキン消滅３
  new Sprite(241, 360, 65, 64),//27:パンプキン消滅４
  new Sprite(327, 360, 65, 64),//28:パンプキン消滅５
  new Sprite(411, 360, 65, 64),//29:パンプキン消滅６

  new Sprite(22, 471, 70, 74),//30:ゴースト１
  new Sprite(98, 471, 70, 74),//31:ゴースト２
  new Sprite(174, 471, 70, 74),//32:ゴースト弾発射
  new Sprite(272, 478, 57, 57),//33:ゴーストの弾
  new Sprite(28, 582, 57, 66),//34:ゴースト消滅１
  new Sprite(110, 582, 57, 66),//35:ゴースト消滅２
  new Sprite(179, 582, 57, 66),//36:ゴースト消滅３

  new Sprite(22, 680, 110, 80),//37:デビル１
  new Sprite(143, 680, 110, 80),//38:デビル２
  new Sprite(285, 695, 64, 64),//39:デビルの弾
  new Sprite(23, 786, 102, 106),//40:デビル消滅１
  new Sprite(133, 786, 102, 106),//41:デビル消滅２
  new Sprite(242, 786, 102, 106),//42:デビル消滅３
  new Sprite(352, 786, 102, 106),//43:デビル消滅４

  new Sprite(8, 927, 132, 175),//44:ボス１
  new Sprite(152, 927, 132, 175),//45:ボス２
  new Sprite(296, 927, 132, 175),//46:ボス口開く１
  new Sprite(440, 927, 132, 175),//47:ボス口開く２
  new Sprite(584, 927, 132, 175),//48:ボス弱点出現１
  new Sprite(728, 927, 132, 175),//49:ボス弱点出現２

  new Sprite(44, 1121, 136, 124),//50:ボス左下の手１
  new Sprite(198, 1121, 136, 124),//51:ボス左下の手２
  new Sprite(334, 1121, 136, 124),//52:ボス左下の手３
  new Sprite(486, 1121, 136, 124),//53:ボス右下の手１
  new Sprite(620, 1121, 136, 124),//54:ボス右下の手２
  new Sprite(774, 1121, 136, 124),//55:ボス右下の手３

  new Sprite(16, 1273, 146, 161),//56:ボス左壁の手１
  new Sprite(164, 1273, 146, 161),//57:ボス左壁の手２
  new Sprite(320, 1273, 146, 161),//58:ボス左壁の手３
  new Sprite(477, 1273, 146, 161),//59:ボス右壁の手１
  new Sprite(636, 1273, 146, 161),//60:ボス右壁の手２
  new Sprite(781, 1273, 146, 161),//61:ボス右壁の手３

  new Sprite(53, 1464, 30, 53),//62:ボス目から弾

  new Sprite(120, 1450, 96, 96),//63:ボスサンダーボール１
  new Sprite(226, 1450, 96, 96),//64:ボスサンダーボール２
  new Sprite(333, 1450, 96, 96),//65:ボスサンダーボール３
  new Sprite(438, 1450, 96, 96),//66:ボスサンダーボール４

  new Sprite(40, 1557, 850, 69),//67:ボス右側からレーザー１
  new Sprite(40, 1628, 850, 69),//68:ボス右側からレーザー２
  new Sprite(40, 1700, 850, 69),//69:ボス右側からレーザー３
  new Sprite(40, 1773, 850, 69),//70:ボス右側からレーザー４
  new Sprite(40, 1844, 850, 69),//71:ボス右側からレーザー５
  new Sprite(40, 1915, 850, 69),//72:ボス右側からレーザー６
  new Sprite(40, 1988, 850, 69),//73:ボス右側からレーザー７

  new Sprite(27, 2070, 850, 69),//74:ボス左側からレーザー１
  new Sprite(27, 2140, 850, 69),//75:ボス左側からレーザー２
  new Sprite(27, 2213, 850, 69),//76:ボス左側からレーザー３
  new Sprite(27, 2285, 850, 69),//77:ボス左側からレーザー４
  new Sprite(27, 2357, 850, 69),//78:ボス左側からレーザー５
  new Sprite(27, 2428, 850, 69),//79:ボス左側からレーザー６
  new Sprite(27, 2500, 850, 69),//80:ボス左側からレーザー７

  new Sprite(50, 2612, 68, 67),//81:ボス爆発１
  new Sprite(205, 2612, 68, 67),//82:ボス爆発２
  new Sprite(276, 2612, 68, 67),//83:ボス爆発３
  new Sprite(355, 2612, 68, 67),//84:ボス爆発４
  new Sprite(430, 2612, 68, 67),//85:ボス爆発５
  new Sprite(503, 2612, 68, 67),//86:ボス爆発６

  new Sprite(556, 163, 65, 65),//87:ヒットエフェクト２
  new Sprite(629, 163, 65, 65),//88:ヒットエフェクト３
  new Sprite(712, 163, 65, 65),//89:ヒットエフェクト４

  new Sprite(42, 2712, 128, 133),//90:ボス左下の光る手１
  new Sprite(194, 2712, 128, 133),//91:ボス右下の光る手１
  new Sprite(346, 2712, 128, 133),//92:ボス左下の光る手２
  new Sprite(497, 2712, 128, 133),//93:ボス右下の光る手２

];

let sprite2 = [
  new Sprite(16, 38, 120, 120),//0:炎魔法１
  new Sprite(142, 38, 120, 120),//1:炎魔法２
  new Sprite(283, 38, 120, 120),//2:炎魔法３
  new Sprite(437, 38, 120, 120),//3:炎魔法４
  new Sprite(583, 38, 120, 120),//4:炎魔法５
  new Sprite(736, 38, 120, 120),//5:炎魔法６
  new Sprite(892, 38, 120, 120),//6:炎魔法７

  new Sprite(62, 186, 80, 200),//7:雷魔法１
  new Sprite(212, 208, 125, 180),//8:雷魔法２
  new Sprite(374, 274, 190, 110),//9:雷魔法３
  new Sprite(618, 308, 200, 80),//10:雷魔法４
  new Sprite(46, 496, 170, 125),//11:雷魔法５
  new Sprite(282, 480, 130, 170),//12:雷魔法６
  new Sprite(484, 480, 80, 200),//13:雷魔法７
  new Sprite(636, 480, 110, 190),//14:雷魔法８
  new Sprite(776, 506, 190, 110),//15:雷魔法９
  new Sprite(43, 780, 200, 80),//16:雷魔法１０
  new Sprite(317, 746, 170, 125),//17:雷魔法１１
  new Sprite(565, 711, 125, 170),//18:雷魔法１２

  new Sprite(58, 952, 55, 62),//19:氷魔法

  new Sprite(172, 921, 150, 130),//20:自機ダメージエフェクト

  new Sprite(397, 952, 70, 70),//21:魔法アイコン炎
  new Sprite(481, 952, 70, 70),//22:魔法アイコン雷
  new Sprite(566, 952, 70, 70),//23:魔法アイコン氷
  new Sprite(648, 952, 70, 70),//24:魔法アイコン炎リロード中
  new Sprite(728, 952, 70, 70),//25:魔法アイコン雷リロード中
  new Sprite(808, 952, 70, 70),//26:魔法アイコン氷リロード中

  new Sprite(45, 1083, 80, 105),//27:回復エフェクト１
  new Sprite(158, 1083, 80, 105),//28:回復エフェクト２
  new Sprite(268, 1083, 80, 105),//29:回復エフェクト３

  new Sprite(402, 1113, 45, 67),//30:回復薬
  new Sprite(502, 1112, 50, 68),//31:大回復薬

  new Sprite(762, 1115, 55, 55),//32:ファイヤーブラスト１
  new Sprite(828, 1115, 55, 55),//33:ファイヤーブラスト２

  new Sprite(56, 1228, 43, 43),//34:真ん中弾１
  new Sprite(103, 1228, 43, 43),//35:真ん中弾２
  new Sprite(149, 1228, 43, 43),//36:真ん中弾３
  new Sprite(196, 1228, 43, 43),//37:真ん中弾４
  new Sprite(242, 1228, 43, 43),//38:真ん中弾５
  new Sprite(289, 1228, 43, 43),//39:真ん中弾６

  new Sprite(56, 1290, 43, 43),//40:横弾１
  new Sprite(103, 1290, 43, 43),//41:横弾２
  new Sprite(149, 1290, 43, 43),//42:横弾３
  new Sprite(196, 1290, 43, 43),//43:横弾４
  new Sprite(242, 1290, 43, 43),//44:横弾５
  new Sprite(289, 1290, 43, 43),//45:横弾６

];

//スプライトを描画する
function drawSprite(snum, x, y, ex) {
  let sx = sprite[snum].x;
  let sy = sprite[snum].y;
  let sw = sprite[snum].w;
  let sh = sprite[snum].h;
  let sw2 = sprite[snum].w * ex;
  let sh2 = sprite[snum].h * ex;

  vcon.drawImage(spriteImage, sx, sy, sw, sh, x, y, sw2, sh2);
}
function drawSprite2(snum, x, y, ex) {
  let sx = sprite2[snum].x;
  let sy = sprite2[snum].y;
  let sw = sprite2[snum].w;
  let sh = sprite2[snum].h;
  let sw2 = sprite2[snum].w * ex;
  let sh2 = sprite2[snum].h * ex;

  vcon.drawImage(spriteImage2, sx, sy, sw, sh, x, y, sw2, sh2);
}

//魔法
let fireBl = [];//ファイヤーブラスト
let explod = [];//ファイヤーブラストの爆発
let thHantei = [];//サンダーソードの判定
let thGra = [];//サンダーソードのグラフィック
let iceBa = [];//アイスバリア

//魔法リロード
let fireReload = 1800;
let thunderReload = 1800;
let iceReload = 1800;
let reloadGauge = 0;

//ヒットエフェクト
let hitEf = [];
//浄化
let jyouka = [];
//コウモリ
let bat = [];
//let batShot = [];
let shutugen = [];
//トレント
let treant = [];
let treantShot = [];
//パンプキン
let pumpkin = [];
let pumpkinShot = [];
//ゴースト
let ghost = [];
let ghostShot = [];
//デビル
let devil = [];
let devilShot = [];
//ボス：スカル
let bossSkull = [];
let bossHand = [];
let bossDeath = [];
let bossForm = [];
let bossPlasma = [];
let bossLaser = [];
let bossHpOnFlag = false;//ボスHPの可視フラグ

//アイテム
let itemPortion = [];
let itemElixir = [];
let itemEffect = [];

//ステージ
let stageSituation = [];
let gamethread = 0;
let stagethred = 0;//ステージの段階　スタンバイ画面も合わせてるので注意
let stopStage = false;
let lastFadeOut = 1;
let lastCount = 0;
let treantCount = 0;

//ゲーム初期化
function gameInit() {
  setInterval(gameLoop, GAME_SPEED);
  //requestAnimationFrame の方がゲームに向いてるけど面倒なので保留
}

//ゲームループ
function gameLoop() {

  if (gameSituation == 1) {
    stageClearVoFlag = true;

    if (stopStage) gamethread++;

    //-----ステージの背景-----
    stage_on();

    //if (gamethread == 200) itemPortion.push(new Portion(30,500,500,45*0.8,67*0.8));
    if (gamethread == 200) itemElixir.push(new Elixir(31,500,500,50*0.8,68*0.8));

    //-----ステージ１-----
    if (gamethread == 100) shutugen.push(new Shutugen(5, SCREEN_W - 150 - 50/2, 150, 0, 0, 50, 50, 1));
    //if (gamethread == 100) shutugen.push(new Shutugen(5, 150, 150, 0, 0, 50, 50, 2));
    //if (gamethread == 100) shutugen.push(new Shutugen(5, 150, SCREEN_H - 150 - 50/2, 0, 0, 50, 50, 3));
    //if (gamethread == 100) shutugen.push(new Shutugen(5, SCREEN_W - 150 - 50/2, SCREEN_H - 150 - 50/2, 0, 0, 50, 50, 4));

    //if (gamethread == 100) shutugen.push(new Shutugen(5, SCREEN_W/2 - 50/2, 150, 0, 0, 50, 50, 5));
    //if (gamethread == 100) shutugen.push(new Shutugen(5, 150, SCREEN_H/2 - 50/2, 0, 0, 50, 50, 6));
    //if (gamethread == 100) shutugen.push(new Shutugen(5, SCREEN_W/2 - 50/2, SCREEN_H - 150 - 50/2, 0, 0, 50, 50, 7));
    //if (gamethread == 100) shutugen.push(new Shutugen(5, SCREEN_W - 150 - 50/2, SCREEN_H/2 - 50/2, 0, 0, 50, 50, 8));

    //if (gamethread == 100) shutugen.push(new Shutugen(5, 150, SCREEN_H/2 - 50/2, 0, 0, 50, 50, 9));
    //if (gamethread == 100) shutugen.push(new Shutugen(5, SCREEN_W - 150 - 50/2, SCREEN_H/2 - 50/2, 0, 0, 50, 50, 10));

    //if (gamethread == 100) shutugen.push(new Shutugen(5, SCREEN_W/2 - 50/2, SCREEN_H/2 - 50/2, 0, 0, 50, 50, 11));
    //if (gamethread == 100) shutugen.push(new Shutugen(5, SCREEN_W/2 - 50/2, SCREEN_H/2 - 50/2, 0, 0, 50, 50, 12));

    //if (gamethread == 100) shutugen.push(new Shutugen(5, 150, 150, 0, 0, 50, 50, 13));
    //if (gamethread == 100) shutugen.push(new Shutugen(5, 150, SCREEN_H - 150 - 50/2, 0, 0, 50, 50, 14));
    //if (gamethread == 100) shutugen.push(new Shutugen(5, SCREEN_W - 150 - 50/2, 150, 0, 0, 50, 50, 15));
    //if (gamethread == 100) shutugen.push(new Shutugen(5, SCREEN_W - 150 - 50/2, SCREEN_H - 150 - 50/2, 0, 0, 50, 50, 16));

    //if (gamethread == 100) shutugen.push(new Shutugen(5, 150, 150, 0, 0, 50, 50, 17));
    //if (gamethread == 100) shutugen.push(new Shutugen(5, SCREEN_W - 150 - 50/2, 150, 0, 0, 50, 50, 18));

    if(stagethred == 3){
      treantCount++;
      if(treantCount == 190){
        treant.push(new Treant(13,300,-500,0,0,112,110));
        treant.push(new Treant(13,300,-900,0,0,112,110));
        treant.push(new Treant(13,900,-500,0,0,112,110));
        treant.push(new Treant(13,900,-900,0,0,112,110));
        //スプライトナンバー, 出現位置ｘ, 出現位置ｙ, 動きｘ, 動きｙ, 大きさｘ, 大きさｙ
      }
    }
    //if(stagethred == 4) treantCount = 0;//★他でも初期化しないといけない

    if(stagethred == 5){
      treantCount++;
      if(treantCount == 190){
        treant.push(new Treant(13,50,-700,0,0,112,110));
        treant.push(new Treant(13,1050,-950,0,0,112,110));
        treant.push(new Treant(13,1050,-400,0,0,112,110));
      }
      if(gamethread == 100){
        pumpkin.push(new Pumpkin(18,100,100,0,0,80,70));
        ghost.push(new Ghost(30,700,100,0,0,70,90));
      }
    }

    if(stagethred == 7){
      if(gamethread == 100){
        devil.push(new Devil(37,SCREEN_W+120,100,0,0,110,80,1));
        // devil.push(new Devil(37,-200,200,0,0,110,80,2));
        // devil.push(new Devil(37,SCREEN_W/2-55,SCREEN_H+200,0,0,110,80,3));
        // devil.push(new Devil(37,SCREEN_W/2-55,-200,0,0,110,80,4));
      }
    }

    if(stagethred == 9){
      if(gamethread == 50){
        bossSkull.push(new BossSkull(44,SCREEN_W/2-132,10,0,0,132*2,175*2));
        bossHand.push(new BossHand(52,0,SCREEN_H-248,0,0,272,248,0));
        bossHand.push(new BossHand(53,SCREEN_W-272,SCREEN_H-248,0,0,272,248,1));
        bossForm.push(new BossForm(57,-146*1.8,SCREEN_H/2-161*1.7/2,0,0,146*1.7,161*1.7,0));
        bossForm.push(new BossForm(60,SCREEN_W,SCREEN_H/2-161*1.7/2,0,0,146*1.7,161*1.7,1));
      }
      if(gamethread == 100) bossHpOnFlag = true;
    }

    //クリア条件(仮)
    if (stagethred != 9) {
      if (gamethread > 2000) {
        gameSituation = 3;
      }
    }

    //-----自機ショットの生成-----
    setShot();

    //-----描画の処理-----
    //背景
    //vcon.fillStyle = "#2e8b57";
    //vcon.fillStyle = "black";
    //vcon.fillRect(0, 0, SCREEN_W, SCREEN_H);
    //vcon.drawImage(test, 0, 0, 700, 400, 0, 0, 1400, 800);
    draw_on(stageSituation);
    actFont();
    vcon.drawImage(waku, 0, 0, SCREEN_W, SCREEN_H, -20, -18, 1393, 818);

    //自機ショットの描画
    drawShot();

    //敵の描画
    draw_on(treant);//トレント
    draw_on(treantShot);//トレントの弾
    draw_on(pumpkin);
    draw_on(pumpkinShot);
    draw_on(ghost);
    draw_on(ghostShot);
    draw_on(devil);
    draw_on(bossSkull);
    draw_on(bossPlasma);
    draw_on(bossLaser);
    draw_on(bossHand);
    draw_on(bossForm);
    draw_on(bossDeath);
    draw_on(devilShot);
    draw_on(shutugen);//コウモリ出現の魔法陣　描画順はコウモリより上
    draw_on(bat);//コウモリ　どの敵よりも優先して描画
    //draw_on(batShot);//コウモリの弾
    draw_on(jyouka);//コウモリ浄化
    draw_on(hitEf);//ヒットエフェクト

    //アイテムの描画
    draw_on(itemPortion);
    draw_on(itemElixir);
    draw_on(itemEffect);

    //魔法の描画は敵より優先
    draw_on(iceBa);
    draw_on(fireBl);
    draw_on(explod);
    draw_on(thHantei);

    if (jiki.hpPoint <= 0) {
      gameSituation = 2;
    }

  }

  if(gameSituation != 1){
    treantCount = 0;
  }

  //ゲーム状況に影響されないようgameSituationの外に置く
  //自機判定
  drawJiki();//←仮の描画
  //ステージ背景の動き
  update_on(stageSituation);
  //魔法の動き
  update_on(fireBl);
  update_on(explod);
  update_on(thHantei);
  update_on(thGra);
  draw_on(thGra);//サンダーソードのグラはここじゃないとダメ
  update_on(iceBa);
  //敵の動き
  update_on(bat);//コウモリ
  //update_on(batShot);//コウモリの弾
  update_on(jyouka);//コウモリ浄化
  update_on(hitEf);
  update_on(shutugen);
  update_on(treant);
  update_on(treantShot);
  update_on(pumpkin);
  update_on(pumpkinShot);
  update_on(ghost);
  update_on(ghostShot);
  update_on(devil);
  update_on(bossSkull);
  update_on(bossHand);
  update_on(bossDeath);
  update_on(devilShot);
  update_on(bossForm);
  update_on(bossPlasma);
  update_on(bossLaser);
  update_on(itemPortion);
  update_on(itemElixir);
  update_on(itemEffect);

  //オープニング画面
  if (gameSituation == 0) {
    stopStage = false;
    gamethread = 0;
    //stagethred = 0;//←ここで初期化するとバグる
    goVoCount = 0;
    lastFadeOut = 1;
    lastCount = 0;
    vcon.drawImage(openingBG, 0, 0, 1920, 1080, -600, 0, 1920, 1080);
    vcon.drawImage(waku, 0, 0, SCREEN_W, SCREEN_H, -20, -18, 1393, 818);
    vcon.drawImage(titleWitch, 0, 0, 1180, 1070, 600, 160, (1180 / 2) * 1.2, (1070 / 2) * 1.2);
    vcon.drawImage(howTo, 0, 0, 800, 550, 100, 220, 800 / 1.5, 550 / 1.5);
    vcon.drawImage(startBtn, 0, 0, 450, 130, 185, 630, 450 * 0.8, 130 * 0.8);
    vcon.drawImage(titleLogo, 0, 0, 650, 150, (SCREEN_W - 650 * 1.5) / 2, 20, 650 * 1.5, 150 * 1.5);
  }

  //ゲームオーバー
  if (gameSituation == 2) {
    if (goVoCount <= 40) {
      goVoCount++;
      if (goVoCount == 40) {
        gameOverVo.play();
      }
    }
    vcon.drawImage(gameOverBG, 0, 0, 800, 600, 0, 0, 800 * 1.6, 600 * 1.6);
    vcon.drawImage(continueBtn, 0, 0, 260, 260, 50, 220, 260 * 2.2, 260 * 2.2);
    vcon.drawImage(waku, 0, 0, SCREEN_W, SCREEN_H, -20, -18, 1393, 818);
    vcon.drawImage(loseWitch, 0, 0, 1180, 1070, 600, 160, (1180 / 2) * 1.2, (1070 / 2) * 1.2);
    vcon.drawImage(gameOverFont, 0, 0, 620, 100, 50, 40, 620 * 1.8, 100 * 1.8);
  }

  //ステージクリア
  if (gameSituation == 3) {
    if (stageClearVoFlag) {
      stageClearVo.play();
      stageClearVoFlag = false;
    }
    actFontCount = 0;
    actFontFlag = true;
    if (stagethred == 1) {
      vcon.drawImage(sougen_2, 0, 0, 700, 400, -60, 0, 1400, 800);
    } else if (stagethred == 3) {
      vcon.drawImage(mori_5, 0, 0, 700, 400, -30, 0, 1400, 800);
    } else if (stagethred == 5) {
      vcon.drawImage(haka_7, 0, 0, 700, 400, -80, 0, 1400, 800);
    } else if (stagethred == 7) {
      vcon.drawImage(yasiki_9, 0, 0, 700, 400, -60, 0, 1400, 800);
    }
    vcon.drawImage(clearFont, 0, 0, 470, 170, (SCREEN_W - 470 * 1.5) / 2, 200, 470 * 1.5, 170 * 1.5);
    vcon.drawImage(waku, 0, 0, SCREEN_W, SCREEN_H, -20, -18, 1393, 818);
  }

  //全ステージクリア
  if (gameSituation == 4) {
    vcon.drawImage(sougen_2, 0, 0, 700, 400, -60, 0, 1400, 800);
    vcon.fillStyle = "rgba(" + [0, 0, 0, lastFadeOut] + ")";
    vcon.fillRect(0, 0, SCREEN_W, SCREEN_H);
    lastCount++;
    if (lastCount > 100) {
      if (lastFadeOut > 0) {
        lastFadeOut -= 0.01;
      }
    }
    if (lastCount == 200) allStageClearVo.play();
    if (lastCount > 200) {
      vcon.drawImage(allClearFont, 0, 0, 690, 180, (SCREEN_W - 690 * 1.5) / 2, 200, 690 * 1.5, 180 * 1.5);
    }
    if (lastCount == 400) thankVo.play();
    if (lastCount > 400) {
      vcon.drawImage(clearWitch, 0, 0, 960, 540, 0, 0, 960 * 1.5, 540 * 1.5);
      vcon.drawImage(thank, 0, 0, 600, 100, 680, 680, 600, 100);
    }
    vcon.drawImage(waku, 0, 0, SCREEN_W, SCREEN_H, -20, -18, 1393, 818);
  }

  HpGauge();

  //仮想画面から実際のキャンバスにコピー
  con.drawImage(vcan, 0, 0, SCREEN_W, SCREEN_H, 0, 0, CANVAS_W, CANVAS_H);


  //-----デバッグ-----
  gameDebug();
}

window.onload = function () {
  gameInit();
}