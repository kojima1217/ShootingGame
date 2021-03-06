//****自機の処理****//


//自機初期化
let jiki = new Jiki();
jiki.init(10);//自機のサイズ

let dFcount = 0;//ダメージフラグカウント
let dVcount = 0;//ダメージボイスカウント
let damageVoFlag = false;

//仮の自機判定描画
function drawJiki() {
//パスの設定を開始
//vcon.beginPath();

//自機の位置を設定
//jiki.position.x = mouse.x;
//jiki.position.y = mouse.y;

//自機を描くパスを設定
//vcon.arc(jiki.position.x, jiki.position.y, 10, 0, Math.PI * 2, false);

//自機の色を設定する
//vcon.fillStyle = "blue";

//自機を描く
//vcon.fill();
}

function jikiDamage() {
  //自機の位置を設定
  jiki.position.x = mouse.x;
  jiki.position.y = mouse.y;
  //自機ダメージを受けた時の描画
  if (damageFlag) {
    if (jiki.hpPoint >= 10) damageVoFlag = true;
    dFcount++;
    if (dFcount % 3 == 0) {
      //vcon.drawImage(damageEf, 0, 0, 150, 130, jiki.position.x-75, jiki.position.y-75, 150, 130);
      drawSprite2(20, jiki.position.x - 75, jiki.position.y - 75, 1);
    }
    if (dFcount >= 21) {
      dFcount = 0;
      damageFlag = false;
    }
  }
  //自機ダメージを受けた時のボイス
  if (damageVoFlag) {
    dVcount++;
    if (voFlag && dVcount == 1) {
      damageVo1.currentTime = 0;
      damageVo1.play();
    }
    if (dVcount >= 50) {
      dVcount = 0;
      damageVoFlag = false;
    }
  }
}


//ショットの初期化
let charaShotCenter = new Array(CHARA_SHOT_MAX_COUNT);
for (i = 0; i < CHARA_SHOT_MAX_COUNT; i++) {
  charaShotCenter[i] = new CharacterShot();
}
let charaShotRight = new Array(CHARA_SHOT_MAX_COUNT);
for (i = 0; i < CHARA_SHOT_MAX_COUNT; i++) {
  charaShotRight[i] = new CharacterShot();
}
let charaShotLeft = new Array(CHARA_SHOT_MAX_COUNT);
for (i = 0; i < CHARA_SHOT_MAX_COUNT; i++) {
  charaShotLeft[i] = new CharacterShot();
}

//自機ショットを生成する
function setShot() {
  if (fire) {
    if (seFlag && stopStage && gameSituation == 1) {
      shotSE.currentTime = 0;
      shotSE.play();
    }
    //自機ショットのチェック
    for (i = 0; i < CHARA_SHOT_MAX_COUNT; i++) {
      //ショットが既に発射されているか？
      if (!charaShotCenter[i].alive && !charaShotRight[i].alive && !charaShotLeft[i].alive) {
        //ショットを自機の位置にセット、サイズ、速度
        charaShotCenter[i].set(jiki.position, CHARA_SHOT_SIZE, CHARA_SHOT_SPEED, blastInit, direc, SCREEN_W, SCREEN_H, diago, shotAttackPoint);
        charaShotRight[i].set(jiki.position, CHARA_SIDE_SHOT_SIZE, CHARA_SIDE_SHOT_SPEED, blastInit, direc, SCREEN_W, SCREEN_H, diago, shotAttackPoint);
        charaShotLeft[i].set(jiki.position, CHARA_SIDE_SHOT_SIZE, CHARA_SIDE_SHOT_SPEED, blastInit, direc, SCREEN_W, SCREEN_H, diago, shotAttackPoint);
        //ループを抜ける
        break;
      }
    }
  }
}

let shotRdraw = 56;
let sRdCount = 0;
let shotLdraw = 56;
let sLdCount = 0;
let shotCdraw = 56;
let sCdCount = 0;

//自機ショットの描画処理まとめ
function drawShot() {
  //** 右側の弾の描画 **//
  //自機ショットのパスを設定
  //vcon.beginPath();
  //自機ショットのチェック（描画用）
  for (i = 0; i < CHARA_SHOT_MAX_COUNT; i++) {
    //ショットはもう発射されてる？
    if (charaShotRight[i].alive) {
      //ショットを動かす
      if (charaShotRight[i].direction == 0) charaShotRight[i].position.x += 1.5;//上
      else if (charaShotRight[i].direction == 1) charaShotRight[i].position.x += 1.5;//右上
      else if (charaShotRight[i].direction == 2) charaShotRight[i].position.y += 1.5;//右
      else if (charaShotRight[i].direction == 3) charaShotRight[i].position.y += 1.5;//右下
      else if (charaShotRight[i].direction == 4) charaShotRight[i].position.x -= 1.5;//下
      else if (charaShotRight[i].direction == 5) charaShotRight[i].position.x -= 1.5;//左下
      else if (charaShotRight[i].direction == 6) charaShotRight[i].position.y -= 1.5;//左
      else charaShotRight[i].position.y -= 1.5;//左上
      charaShotRight[i].move();

      //ショットを描くパスを設定
      if (stopStage) {
        // vcon.arc(
        //   charaShotRight[i].position.x,
        //   charaShotRight[i].position.y,
        //   charaShotRight[i].size,
        //   0, Math.PI * 2, false
        // );
        sRdCount++;
        if (sRdCount > 6) sRdCount = 0;
        if (sRdCount == 0) shotRdraw = 56;
        if (sRdCount == 1) shotRdraw = 103;
        if (sRdCount == 2) shotRdraw = 149;
        if (sRdCount == 3) shotRdraw = 196;
        if (sRdCount == 4) shotRdraw = 242;
        if (sRdCount == 5) shotRdraw = 289;
        vcon.drawImage(spriteImage2, shotRdraw, 1290, 43, 43, charaShotRight[i].position.x - charaShotRight[i].size, charaShotRight[i].position.y - charaShotRight[i].size, charaShotRight[i].size * 2, charaShotRight[i].size * 2);
      }
      //パスをいったん閉じる
      //vcon.closePath();
    }
  }
  //自機ショットの色を設定
  //vcon.fillStyle = "#87cefa";
  //自機ショットを描く
  //vcon.fill();


  //** 左側の弾の描画 **//
  //自機ショットのパスを設定
  //vcon.beginPath();
  //自機ショットのチェック（描画用）
  for (i = 0; i < CHARA_SHOT_MAX_COUNT; i++) {
    //ショットはもう発射されてる？
    if (charaShotLeft[i].alive) {
      //ショットを動かす
      //charaShotLeft[i].position.x -= 1.5;
      if (charaShotLeft[i].direction == 0) charaShotLeft[i].position.x -= 1.5;//上
      else if (charaShotLeft[i].direction == 1) charaShotLeft[i].position.y -= 1.5;//右上
      else if (charaShotLeft[i].direction == 2) charaShotLeft[i].position.y -= 1.5;//右
      else if (charaShotLeft[i].direction == 3) charaShotLeft[i].position.x += 1.5;//右下
      else if (charaShotLeft[i].direction == 4) charaShotLeft[i].position.x += 1.5;//下
      else if (charaShotLeft[i].direction == 5) charaShotLeft[i].position.y += 1.5;//左下
      else if (charaShotLeft[i].direction == 6) charaShotLeft[i].position.y += 1.5;//左
      else charaShotLeft[i].position.x -= 1.5;//左上
      charaShotLeft[i].move();

      //ショットを描くパスを設定
      if (stopStage) {
        // vcon.arc(
        //   charaShotLeft[i].position.x,
        //   charaShotLeft[i].position.y,
        //   charaShotLeft[i].size,
        //   0, Math.PI * 2, false
        // );
        sLdCount++;
        if (sLdCount > 6) sLdCount = 0;
        if (sLdCount == 0) shotLdraw = 56;
        if (sLdCount == 1) shotLdraw = 103;
        if (sLdCount == 2) shotLdraw = 149;
        if (sLdCount == 3) shotLdraw = 196;
        if (sLdCount == 4) shotLdraw = 242;
        if (sLdCount == 5) shotLdraw = 289;
        vcon.drawImage(spriteImage2, shotLdraw, 1290, 43, 43, charaShotLeft[i].position.x - charaShotLeft[i].size, charaShotLeft[i].position.y - charaShotLeft[i].size, charaShotLeft[i].size * 2, charaShotLeft[i].size * 2);
      }
      //パスをいったん閉じる
      //vcon.closePath();
    }
  }
  //自機ショットの色を設定
  //vcon.fillStyle = "#87cefa";
  //自機ショットを描く
  //vcon.fill();


  //** 真ん中の弾の描画 **//
  //自機ショットのパスを設定
  //vcon.beginPath();
  //自機ショットのチェック（描画用）
  for (i = 0; i < CHARA_SHOT_MAX_COUNT; i++) {
    //ショットはもう発射されてる？
    if (charaShotCenter[i].alive) {
      //ショットを動かす
      charaShotCenter[i].move();

      //ショットを描くパスを設定
      if (stopStage) {
        // vcon.arc(
        //   charaShotCenter[i].position.x,
        //   charaShotCenter[i].position.y,
        //   charaShotCenter[i].size,
        //   0, Math.PI * 2, false
        // );
        sCdCount++;
        if (sCdCount > 6) sCdCount = 0;
        if (sCdCount == 0) shotCdraw = 56;
        if (sCdCount == 1) shotCdraw = 103;
        if (sCdCount == 2) shotCdraw = 149;
        if (sCdCount == 3) shotCdraw = 196;
        if (sCdCount == 4) shotCdraw = 242;
        if (sCdCount == 5) shotCdraw = 289;
        vcon.drawImage(spriteImage2, shotRdraw, 1228, 43, 43, charaShotCenter[i].position.x - charaShotCenter[i].size, charaShotCenter[i].position.y - charaShotCenter[i].size, charaShotCenter[i].size * 2, charaShotCenter[i].size * 2);
      }
      //パスをいったん閉じる
      //vcon.closePath();
    }
  }
  //自機ショットの色を設定
  //vcon.fillStyle = "cyan";
  //自機ショットを描く
  //vcon.fill();
}


