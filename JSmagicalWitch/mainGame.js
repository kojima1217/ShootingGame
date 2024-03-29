//***********************//
//    Magical Witch      //
//***********************//

//デバッグモードフラグ
let Debug = false;

//検証用右クリックフラグ
let leftClickFlag = false;

//エラー発生フラグ
let errorFlag = false;

//難易度設定
let difficulty = 1;//0=EASY 1=NORMAL 2=HARD 3=DEADLY
let fireReloadAddPoint = 10;//EASY=20 NORMAL=10 HARD=5
let thunderReloadAddPoint = 5;//EASY=10 NORMAL=5 HARD=2
let iceReloadAddPoint = 2;//EASY=5 NORMAL=2 HARD=1
let batAtackPoint = 5;//EASY=2 NORMAL=5 HARD=10
let treantShotCount = 400;//EASY=500 NORMAL=400 HARD=300
let pumpkinHP = 3000;//EASY=2000 NORMAL=3000 HARD=5000
let ghostShotCount = 300;//EASY=400 NORMAL=300 HARD=200
let devilHP = 3000;//EASY=2000 NORMAL=3000 HARD=5000
let bossHandAtackPoint = 10;//EASY=5 NORMAL=10 HARD=20
let bossHandHP = 10000;//EASY=5000 NORMAL=10000 HARD=20000
let bossPlasmaSpeed = 20;//EASY=10 NORMAL=20 HARD=30
let bossPlasmaRhythm = 30;//EASY=40 NORMAL=30 HARD=20
let bossBatCount = 20;//EASY=10 NORMAL=20 HARD=40
let bossMAXHP = 50000;//EASY=50000 NORMAL=50000 HARD=100000
let bossHPgauge = 125;//EASY=125 NORMAL=125 HARD=250
let poCurePoint = 250;//EASY=500 NORMAL=250 HARD=250 回復処理はhpGauge.jsで
let elCurePoint = 500;//EASY=1000 NORMAL=500 HARD=500 回復処理はhpGauge.jsで

//超むずかしい難易度カウント
let deadlyCount = 0;

//BGMフラグ
let bgmFlag = true;
//SEフラグ
let seFlag = true;
//ボイスフラグ
let voFlag = true;

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
// 5オプション画面
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
//ボイス
const startVo = new Audio("sounds/vo/start.wav");
const gameOverVo = new Audio("sounds/vo/gameover.wav");
let goVoCount = 0;
const continueVo = new Audio("sounds/vo/continue.wav");
const stageClearVo = new Audio("sounds/vo/ok.wav");
let stageClearVoFlag = true;
const allStageClearVo = new Audio("sounds/vo/yatta.wav");
const thankVo = new Audio("sounds/vo/arigatou.wav");
const damageVo1 = new Audio("sounds/vo/damageVo1.wav");
const damageVo2 = new Audio("sounds/vo/damageVo2.wav");
const deadlyVo = new Audio("sounds/vo/deadly.wav");
const sugoiVo = new Audio("sounds/vo/sugoi.wav");
//BGM
const act1BGM = new Audio("sounds/bgm/act1.wav");
const act2BGM = new Audio("sounds/bgm/act2.wav");
const act3BGM = new Audio("sounds/bgm/act3.wav");
const act4BGM = new Audio("sounds/bgm/act4.wav");
const bossBGM = new Audio("sounds/bgm/boss.wav");
const gameOverBGM = new Audio("sounds/bgm/gameoverBgm.wav");
const allClearBGM = new Audio("sounds/bgm/happytime.wav");
const stageClearBGM = new Audio("sounds/bgm/stageclear.wav");
//SE
const shotSE = new Audio("sounds/se/shot.wav");//自機ショット
const hitSE = new Audio("sounds/se/hit.wav");//自機の弾が敵にヒット
const fbSE = new Audio("sounds/se/fireBlast.wav");//炎魔法の玉
const burnSE = new Audio("sounds/se/blastBurn.wav");//炎魔法の爆発
const tsSE = new Audio("sounds/se/thunderSword.wav");//雷魔法
const ibSE = new Audio("sounds/se/iceBarrier.wav");//氷魔法
const itSE = new Audio("sounds/se/iceHit.wav");//氷魔法に弾ヒット
const cureSE = new Audio("sounds/se/itemCure.wav");//回復アイテム
const shoukanSE = new Audio("sounds/se/shoukan.wav");//コウモリの魔法陣
const batDeathSE = new Audio("sounds/se/batDeath.wav");//コウモリ撃破
const treantShotSE = new Audio("sounds/se/treantShot.wav");//トレント弾発射
const treantDeathSE = new Audio("sounds/se/treantDeath.wav");//トレント撃破
const pumpkinShotSE = new Audio("sounds/se/pumpkinShot.wav");//パンプキン弾発射
const pumpkinDeathSE = new Audio("sounds/se/pumpkinDeath.wav");//パンプキン撃破
const ghostShotSE = new Audio("sounds/se/ghostShot.wav");//ゴースト弾発射
const ghostDeathSE = new Audio("sounds/se/ghostDeath.wav");//ゴースト撃破
const devilShotSE = new Audio("sounds/se/devilShot.wav");//デビル弾発射、ボス目弾
const devilDeathSE = new Audio("sounds/se/devilDeath.wav");//デビル撃破
const bossUpSE = new Audio("sounds/se/bossUp.wav")//ボス登場時
const bossHandSE = new Audio("sounds/se/bossHand.wav");//ボス手掴み(2回鳴らす)
const bossPbSE = new Audio("sounds/se/bossPlasmaBall.wav");//ボスプラズマボール
const bossLaserSE = new Audio("sounds/se/bossLaser.wav");//ボス極太レーザー
const bossDeathSE = new Audio("sounds/se/bossDeath.wav");//ボス本体、ボス手撃破
//optionSE
const optionOpenSE = new Audio("sounds/se/optionOpen.wav");
const optionCloseSE = new Audio("sounds/se/optionClose.wav");
const optionSelectSE = new Audio("sounds/se/optionSelect.wav");

//画像ファイルを読み込み
//背景の枠
let waku = new Image();
waku.src = "images/screen/waku.gif";
//モンスター
let spriteImage = new Image();
spriteImage.src = "images/sprite/monster.png";
//魔法
let spriteImage2 = new Image();
spriteImage2.src = "images/sprite/magic.png";
//ゲーム開始画面の画像
let titleLogo = new Image();
titleLogo.src = "images/ui/TitleLogo.png";
let titleWitch = new Image();
titleWitch.src = "images/ui/TitleWitch.png";
let howTo = new Image();
howTo.src = "images/ui/HowToPlay.png";
let startBtn = new Image();
startBtn.src = "images/ui/startbutton.png";
let openingBG = new Image();
openingBG.src = "images/screen/OpeningBG.jpg";
//ゲームオーバー画面の画像
let loseWitch = new Image();
loseWitch.src = "images/ui/GameOverWitch.png";
let continueBtn = new Image();
continueBtn.src = "images/ui/continue.png";
let gameOverBG = new Image();
gameOverBG.src = "images/screen/GameOverBG.jpg";
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
clearWitch.src = "images/screen/clearWitch.jpg";
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
//クレジット
let credit = new Image();
credit.src = "images/ui/credit.png";
//オプション画面
let optionButton = new Image();
optionButton.src = "images/ui/optionButton.png";
let optionBackButton = new Image();
optionBackButton.src = "images/ui/backButton.png";
let optionMenu = new Image();
optionMenu.src = "images/ui/optionSelect.png";
let optionSelecter = new Image();
optionSelecter.src = "images/ui/selecter.png";

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

//エンドグラフィックフラグ
let endGraFlag = false;

//ゲーム初期化
function gameInit() {
  setInterval(gameLoop, GAME_SPEED);
  //requestAnimationFrame の方がゲームに向いてるけど面倒なので保留
}

//ゲームループ
function gameLoop() {

  try {
    //バトル中
    if (gameSituation == 1) {
      stageClearVoFlag = true;

      //-----ステージの背景-----
      stage_on();

      //-----ステージの敵出現パターンセット-----
      setStage();

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
      draw_on(pumpkin);
      draw_on(ghost);
      draw_on(devil);
      draw_on(bossSkull);
      draw_on(bossPlasma);
      draw_on(bossLaser);
      draw_on(bossHand);
      draw_on(bossForm);
      draw_on(bossDeath);
      draw_on(shutugen);//コウモリ出現の魔法陣　描画順はコウモリより上
      draw_on(bat);//コウモリ　どの敵よりも優先して描画
      //draw_on(batShot);//コウモリの弾
      draw_on(jyouka);//コウモリ浄化
      draw_on(hitEf);//ヒットエフェクト

      //魔法の描画は敵より優先
      draw_on(iceBa);
      draw_on(fireBl);
      draw_on(explod);
      draw_on(thHantei);

      //アイテムの描画
      draw_on(itemPortion);
      draw_on(itemElixir);
      draw_on(itemEffect);

      //敵弾の描画は最優先
      draw_on(treantShot);//トレントの弾
      draw_on(pumpkinShot);
      draw_on(ghostShot);
      draw_on(devilShot);

      if (jiki.hpPoint <= 0) {
        if (voFlag) {
          damageVo2.currentTime = 0;
          damageVo2.play();
        }
        gameSituation = 2;
      }

    }

    //ゲームオーバーorクリア時の初期化
    if (gameSituation != 1) {
      batKillCount = 0;
      treantCount = 0;
      treantKillCount = 0;
      ghostKillCount = 0;
      pumpkinKillCount = 0;
      devilKillCount = 0;

      soundsCount = 0;

      if (bgmFlag) {
        act1BGM.loop = false;
        act1BGM.pause();
        act1BGM.currentTime = 0;
        act2BGM.loop = false;
        act2BGM.pause();
        act2BGM.currentTime = 0;
        act3BGM.loop = false;
        act3BGM.pause();
        act3BGM.currentTime = 0;
        act4BGM.loop = false;
        act4BGM.pause();
        act4BGM.currentTime = 0;
        bossBGM.loop = false;
        bossBGM.pause();
        bossBGM.currentTime = 0;
      }
    }

    //ゲーム状況に影響されないようgameSituationの外に置く
    if (!errorFlag) {
      //自機ダメージ判定
      jikiDamage();
      drawJiki();
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
    }

    //オープニング画面
    if (gameSituation == 0) {
      stopStage = false;
      gamethread = 0;
      goVoCount = 0;
      lastFadeOut = 1;
      lastCount = 0;
      vcon.drawImage(openingBG, 0, 0, 1920, 1080, -600, 0, 1920, 1080);
      vcon.drawImage(waku, 0, 0, SCREEN_W, SCREEN_H, -20, -18, 1393, 818);
      vcon.drawImage(titleWitch, 0, 0, 1180, 1070, 600, 160, (1180 / 2) * 1.2, (1070 / 2) * 1.2);
      vcon.drawImage(howTo, 0, 0, 800, 550, 100, 220, 800 / 1.5, 550 / 1.5);
      vcon.drawImage(startBtn, 0, 0, 450, 130, 185, 630, 450 * 0.8, 130 * 0.8);
      vcon.drawImage(titleLogo, 0, 0, 650, 150, (SCREEN_W - 650 * 1.5) / 2, 20, 650 * 1.5, 150 * 1.5);
      vcon.drawImage(optionButton, 0, 0, 216, 220, SCREEN_W - 100, 30, 216 / 3, 220 / 3);
    }

    //ゲームオーバー
    if (gameSituation == 2) {
      if (bgmFlag && goVoCount == 1) {//goVoCountを利用
        gameOverBGM.play();
        gameOverBGM.loop = false;
      }
      if (goVoCount <= 80) {
        goVoCount++;
        if (goVoCount == 80) {
          if (voFlag) gameOverVo.play();
        }
      }
      vcon.drawImage(gameOverBG, 0, 0, 800, 600, 0, 0, 800 * 1.6, 600 * 1.6);
      vcon.drawImage(continueBtn, 0, 0, 260, 260, 50, 220, 260 * 2.2, 260 * 2.2);
      vcon.drawImage(waku, 0, 0, SCREEN_W, SCREEN_H, -20, -18, 1393, 818);
      vcon.drawImage(loseWitch, 0, 0, 1180, 1070, 600, 160, (1180 / 2) * 1.2, (1070 / 2) * 1.2);
      vcon.drawImage(gameOverFont, 0, 0, 620, 100, 50, 40, 620 * 1.8, 100 * 1.8);
    }
    if (gameSituation != 2) {
      if (bgmFlag) {
        gameOverBGM.pause();
        gameOverBGM.currentTime = 0;
      }
    }

    //ステージクリア
    if (gameSituation == 3) {
      if (stageClearVoFlag) {
        if (voFlag) stageClearVo.play();
        if (bgmFlag) stageClearBGM.play();
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
    if (gameSituation != 3) {
      if (bgmFlag) {
        stageClearBGM.pause();
        stageClearBGM.currentTime = 0;
      }
    }

    //全ステージクリア
    if (gameSituation == 4) {
      lastCount++;
      if (!endGraFlag) {
        if (bgmFlag && lastCount == 100) {
          allClearBGM.play();
          allClearBGM.loop = true;
        }
        vcon.drawImage(sougen_2, 0, 0, 700, 400, -60, 0, 1400, 800);
        vcon.fillStyle = "rgba(" + [0, 0, 0, lastFadeOut] + ")";
        vcon.fillRect(0, 0, SCREEN_W, SCREEN_H);
        if (lastCount > 100) {
          if (lastFadeOut > 0) {
            lastFadeOut -= 0.01;
          }
        }
        if (lastCount == 200) {
          if (voFlag) {
            if (difficulty != 3) {
              allStageClearVo.play();
            } else {
              sugoiVo.play();
            }
          }
        }
        if (lastCount > 200) {
          vcon.drawImage(allClearFont, 0, 0, 690, 180, (SCREEN_W - 690 * 1.5) / 2, 50, 690 * 1.5, 180 * 1.5);
          vcon.drawImage(credit, 0, 0, 907, 416, SCREEN_W / 2 - 907 / 2, SCREEN_H - 460, 907, 416);
        }
      } else {
        if (lastCount == 1) {
          if (voFlag) thankVo.play();
        }
        vcon.drawImage(clearWitch, 0, 150, 1024, 1024, 0, 0, 1024 * 1.3, 1024 * 1.3);
        vcon.drawImage(thank, 0, 0, 600, 100, 680, 680, 600, 100);
        if (difficulty == 2) {
          vcon.font = "20px 'Impact'";
          vcon.fillStyle = "white";
          vcon.fillText("「むずかしい」を５回クリックすると・・・？", 830, SCREEN_H - 110);
        }
      }
      vcon.drawImage(waku, 0, 0, SCREEN_W, SCREEN_H, -20, -18, 1393, 818);
    }
    if (gameSituation != 4) {
      if (bgmFlag) {
        allClearBGM.loop = false;
        allClearBGM.pause();
        allClearBGM.currentTime = 0;
      }
      endGraFlag = false;
    }

    HpGauge();

    option();

    //仮想画面から実際のキャンバスにコピー
    con.drawImage(vcan, 0, 0, SCREEN_W, SCREEN_H, 0, 0, CANVAS_W, CANVAS_H);

    //-----デバッグ-----
    gameDebug();

  } catch (e) {
    console.log(e.message);
    con.fillStyle = "white";
    con.fillRect(0, 0, SCREEN_W, SCREEN_H);
    con.font = "20px 'MSゴシック'";
    con.fillStyle = "black";
    con.fillText(e.message, 20, SCREEN_H / 2 - 150);
    con.fillText("致命的なエラーが発生しました。", 100, SCREEN_H / 2 - 20);
    con.fillText("ブラウザを更新してもダメな場合は、", 100, SCREEN_H / 2 + 20);
    con.fillText("制作者にご連絡ください。", 100, SCREEN_H / 2 + 60);
    errorFlag = true;
  }
}

window.onload = function () {
  gameInit();
}