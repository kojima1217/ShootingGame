//****仮の自機判定とショットの処理****//

//自機初期化
let jiki = new Jiki();
jiki.init(10);

//仮の自機判定描画
function drawJiki() {
  //パスの設定を開始
  vcon.beginPath();

  //自機の位置を設定
  jiki.position.x = mouse.x;
  jiki.position.y = mouse.y;

  //自機を描くパスを設定
  vcon.arc(jiki.position.x, jiki.position.y, 10, 0, Math.PI * 2, false);

  //自機の色を設定する
  vcon.fillStyle = "blue";

  //自機を描く
  vcon.fill();
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
    //自機ショットのチェック
    for (i = 0; i < CHARA_SHOT_MAX_COUNT; i++) {
      //ショットが既に発射されているか？
      if (!charaShotCenter[i].alive && !charaShotRight[i].alive && !charaShotLeft[i].alive) {
        //ショットを自機の位置にセット、サイズ、速度
        charaShotCenter[i].set(jiki.position, CHARA_SHOT_SIZE, CHARA_SHOT_SPEED, blastInit, direc, SCREEN_W, SCREEN_H, diago);
        charaShotRight[i].set(jiki.position, CHARA_SIDE_SHOT_SIZE, CHARA_SIDE_SHOT_SPEED, blastInit, direc, SCREEN_W, SCREEN_H, diago);
        charaShotLeft[i].set(jiki.position, CHARA_SIDE_SHOT_SIZE, CHARA_SIDE_SHOT_SPEED, blastInit, direc, SCREEN_W, SCREEN_H, diago);
        //ループを抜ける
        break;
      }
    }
  }
}


//自機ショットの描画処理まとめ
function drawShot() {
  //** 真ん中の弾の描画 **//
  //自機ショットのパスを設定
  vcon.beginPath();
  //自機ショットのチェック（描画用）
  for (i = 0; i < CHARA_SHOT_MAX_COUNT; i++) {
    //ショットはもう発射されてる？
    if (charaShotCenter[i].alive) {
      //ショットを動かす
      charaShotCenter[i].move();

      //ショットを描くパスを設定
      vcon.arc(
        charaShotCenter[i].position.x,
        charaShotCenter[i].position.y,
        charaShotCenter[i].size,
        0, Math.PI * 2, false
      );
      //パスをいったん閉じる
      vcon.closePath();
    }
  }
  //自機ショットの色を設定
  vcon.fillStyle = "cyan";
  //自機ショットを描く
  vcon.fill();


  //** 右側の弾の描画 **//
  //自機ショットのパスを設定
  vcon.beginPath();
  //自機ショットのチェック（描画用）
  for (i = 0; i < CHARA_SHOT_MAX_COUNT; i++) {
    //ショットはもう発射されてる？
    if (charaShotRight[i].alive) {
      //ショットを動かす
      if (direc == 0) charaShotRight[i].position.x += 1.5;//上
      else if (direc == 1) charaShotRight[i].position.x += 1.5;//右上
      else if (direc == 2) charaShotRight[i].position.y += 1.5;//右
      else if (direc == 3) charaShotRight[i].position.x -= 1.5;//右下
      else if (direc == 4) charaShotRight[i].position.x -= 1.5;//下
      else if (direc == 5) charaShotRight[i].position.y -= 1.5;//左下
      else if (direc == 6) charaShotRight[i].position.y -= 1.5;//左
      else charaShotRight[i].position.x += 1.5;//左上
      charaShotRight[i].move();

      //ショットを描くパスを設定
      vcon.arc(
        charaShotRight[i].position.x,
        charaShotRight[i].position.y,
        charaShotRight[i].size,
        0, Math.PI * 2, false
      );
      //パスをいったん閉じる
      vcon.closePath();
    }
  }
  //自機ショットの色を設定
  vcon.fillStyle = "#87cefa";
  //自機ショットを描く
  vcon.fill();


  //** 左側の弾の描画 **//
  //自機ショットのパスを設定
  vcon.beginPath();
  //自機ショットのチェック（描画用）
  for (i = 0; i < CHARA_SHOT_MAX_COUNT; i++) {
    //ショットはもう発射されてる？
    if (charaShotLeft[i].alive) {
      //ショットを動かす
      //charaShotLeft[i].position.x -= 1.5;
      if (direc == 0) charaShotLeft[i].position.x -= 1.5;//上
      else if (direc == 1) charaShotLeft[i].position.x -= 1.5;//右上
      else if (direc == 2) charaShotLeft[i].position.y -= 1.5;//右
      else if (direc == 3) charaShotLeft[i].position.x += 1.5;//右下
      else if (direc == 4) charaShotLeft[i].position.x += 1.5;//下
      else if (direc == 5) charaShotLeft[i].position.y += 1.5;//左下
      else if (direc == 6) charaShotLeft[i].position.y += 1.5;//左
      else charaShotLeft[i].position.x -= 1.5;//左上
      charaShotLeft[i].move();

      //ショットを描くパスを設定
      vcon.arc(
        charaShotLeft[i].position.x,
        charaShotLeft[i].position.y,
        charaShotLeft[i].size,
        0, Math.PI * 2, false
      );
      //パスをいったん閉じる
      vcon.closePath();
    }
  }
  //自機ショットの色を設定
  vcon.fillStyle = "#87cefa";
  //自機ショットを描く
  vcon.fill();
}
