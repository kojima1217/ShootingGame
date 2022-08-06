//****大事な関数****//

//-----デバッグ-----
function gameDebug() {
  if (Debug) {
    con.font = "20px 'Impact'";
    con.fillStyle = "blue";
    con.fillText("弾" + charaShotCenter.length, 20, 20);
    con.fillText("敵" + bat.length, 20, 40);
    con.fillText("ボスHP" + bossHP, 20, 60);
    con.fillText("HP" + jiki.hpPoint, 20, 80);
    con.fillText("MAXHP" + jiki.maxHp, 20, 100);
    con.fillText("ゲームの状態" + gameSituation, 20, 120);
    con.fillText("クリック座標Ｘ" + clickPositonX, 20, 140);
    con.fillText("クリック座標Ｙ" + clickPositonY, 20, 160);
    con.fillText("stagethred" + stagethred, 20, 180);
    con.fillText("gamethred" + gamethread, 20, 200);
    con.fillText("stopStage" + stopStage, 20, 220);
    con.fillText("actFontFlag" + actFontFlag, 20, 240);
    con.fillText("actFontCount" + actFontCount, 20, 260);
    con.fillText("フォーメーション" + formation, 20, 280);
    con.fillText("treantCount" + treantCount, 20, 300);
    con.fillText("左のおてて" + deathLeft, 20, 320);
    con.fillText("難易度" + difficulty, 20, 340);
    con.fillText("deadlyCount" + deadlyCount, 20, 360);
  }
}

function Point() {
  this.x = 0;
  this.y = 0;
}

//自機
function Jiki() {
  this.position = new Point();
  this.size = 0;
}
Jiki.prototype.init = function (size) {
  this.size = size;
  this.maxHp = 1000;
  this.hpPoint = this.maxHp;
}

//自機ショット
function CharacterShot() {
  this.position = new Point();
  this.size = 0;
  this.speed = 0;
  this.alive = false;
}

CharacterShot.prototype.set = function (p, size, speed, blast, direction, screenW, screenH, diagonal, shotAttackPoint) {
  //座標をセット
  this.position.x = p.x;
  this.position.y = p.y;

  //サイズ、スピードをセット
  this.size = size;
  this.speed = speed;

  //弾を撃つために必要なもろもろをセット
  this.blast = blast;//徐々に大きく速くなる
  this.direction = direction;//向き
  this.screenW = screenW;//画面サイズ横
  this.screenH = screenH;//画面サイズ縦
  this.diagonal = diagonal;//斜め補正

  this.shotAttackPoint = shotAttackPoint;//攻撃力

  //生存フラグを立てる
  this.alive = true;
}

CharacterShot.prototype.move = function () {

  //弾が段々大きくなり、段々早くなり、段々攻撃力アップ
  this.size += this.blast;
  this.speed += this.blast;
  this.shotAttackPoint += this.blast;

  if (this.direction == 0) {//----------------------------上----------------------------------
    //弾をspeed分だけ移動させる
    this.position.y -= this.speed;
  } else if (this.direction == 1) {//----------------------------右上----------------------------------
    //弾をspeed分だけ移動させる
    this.position.x += this.speed * this.diagonal;
    this.position.y -= this.speed * this.diagonal;
  } else if (this.direction == 2) {//----------------------------右----------------------------------
    //弾をspeed分だけ移動させる
    this.position.x += this.speed;
  } else if (this.direction == 3) {//----------------------------右下----------------------------------
    //弾をspeed分だけ移動させる
    this.position.x += this.speed * this.diagonal;
    this.position.y += this.speed * this.diagonal;
  } else if (this.direction == 4) {//----------------------------下----------------------------------
    //弾をspeed分だけ移動させる
    this.position.y += this.speed;
  } else if (this.direction == 5) {//----------------------------左下----------------------------------
    //弾をspeed分だけ移動させる
    this.position.x -= this.speed * this.diagonal;
    this.position.y += this.speed * this.diagonal;
  } else if (this.direction == 6) {//----------------------------左----------------------------------
    //弾をspeed分だけ移動させる
    this.position.x -= this.speed;
  } else {//---------------------------------------------------左上----------------------------------
    //弾をspeed分だけ移動させる
    this.position.x -= this.speed * this.diagonal;
    this.position.y -= this.speed * this.diagonal;
  }

  //一定以上の座標に到達していたら生存フラグを降ろす
  if (this.position.y < -this.size || this.position.x < this.size || this.position.x > this.screenW + this.size || this.position.y > this.screenH + this.size) {
    this.alive = false;
  }

  //敵に弾が当たったらHPを減らす
  if (attackDamage(bat, this.position.x, this.position.y, this.size, this.shotAttackPoint, 0, 0, 0, 0)) {
    this.alive = false;
  }
  if (attackDamage(treant, this.position.x, this.position.y, this.size, this.shotAttackPoint, 30, 20, -50, -30)) {
    hitEf.push(new HitEffect(17, this.position.x - 32 + rand(-10,10), this.position.y -32 + rand(-10,10), 0, 0, 65, 65));
    this.alive = false;
  }
  if (attackDamage(pumpkin, this.position.x, this.position.y, this.size, this.shotAttackPoint, 10, 10, -20, -20)) {
    hitEf.push(new HitEffect(17, this.position.x - 32 + rand(-10,10), this.position.y -32 + rand(-10,10), 0, 0, 65, 65));
    this.alive = false;
  }
  if (attackDamage(ghost, this.position.x, this.position.y, this.size, this.shotAttackPoint, 15, 0, -30, -10)) {
    hitEf.push(new HitEffect(17, this.position.x - 32 + rand(-10,10), this.position.y -32 + rand(-10,10), 0, 0, 65, 65));
    this.alive = false;
  }
  if (attackDamage(devil, this.position.x, this.position.y, this.size, this.shotAttackPoint, 30, 20, -50, -40)) {
    hitEf.push(new HitEffect(17, this.position.x - 32 + rand(-10,10), this.position.y -32 + rand(-10,10), 0, 0, 65, 65));
    this.alive = false;
  }
  if (attackDamage(bossSkull, this.position.x, this.position.y, this.size, this.shotAttackPoint, 102, 260, -204, -300)) {
    hitEf.push(new HitEffect(17, this.position.x - 32 + rand(-10,10), this.position.y -32 + rand(-10,10), 0, 0, 65, 65));
    this.alive = false;
    bossHP-=this.shotAttackPoint;
  }
  if (attackDamage(bossHand, this.position.x, this.position.y, this.size, this.shotAttackPoint, 60, 60, -120, -100)) {
    hitEf.push(new HitEffect(17, this.position.x - 32 + rand(-10,10), this.position.y -32 + rand(-10,10), 0, 0, 65, 65));
    this.alive = false;
  }
  //ボスと自機ショットの描画優先度調整
  for (let i = 0; i < bossSkull.length; i++) {
    if (!bossSkull[i].kill && !bossSkull[i].active) {
      if (checkHit(
        this.position.x, this.position.y, this.size, this.size,
        bossSkull[i].x + 60, bossSkull[i].y + 30, bossSkull[i].sizeX -120, bossSkull[i].sizeY -100
      )) {
        if(bossHP > 0) this.alive = false;
        break;
      }
    }
  }

  // for (let i = 0; i < bat.length; i++) {
  //   if (!bat[i].kill) {
  //     if (checkHit(
  //       this.position.x, this.position.y, this.size, this.size,
  //       bat[i].x, bat[i].y, bat[i].sizeX, bat[i].sizeY
  //     )) {
  //       bat[i].hp -= this.shotAttackPoint;
  //       this.alive = false;
  //       if (bat[i].hp < 0) {
  //         jyouka.push(new Jyouka(4, bat[i].x + 10, bat[i].y, bat[i].vx, bat[i].vy));
  //         bat[i].kill = true;
  //       }
  //       break;
  //     }
  //   }
  // }
}

//ダメージ判定
function attackDamage(obj, x, y, size, attack, adaptX, adaptY, adaptSX, adaptSY) {
  //(obj,sprite,x,y,size,attack,jyoukaX,jyoukaY,adaptX,adaptY,adaptSX,adaptSY){
  for (let i = 0; i < obj.length; i++) {
    if (!obj[i].kill && obj[i].active) {
      if (checkHit(
        x, y, size, size,
        obj[i].x + adaptX, obj[i].y + adaptY, obj[i].sizeX + adaptSX, obj[i].sizeY + adaptSY
      )) {
        obj[i].hp -= attack;
        if(seFlag && obj != bat){
          hitSE.currentTime = 0;
          hitSE.play();
        }       
        // if (obj[i].hp < 0) {
        //   jyouka.push(new Jyouka(sprite, obj[i].x + jyoukaX, obj[i].y + jyoukaY, obj[i].vx, obj[i].vy));
        //   obj[i].kill = true;
        // }
        return true;
      }
    }
  }
}

//ファイヤーブラストのヒット判定
// function fireHit(obj,x,y,size,adaptX,adaptY,adaptSX,adaptSY){
//   for (let i = 0; i < obj.length; i++) {
//     if (!obj[i].kill) {
//       if (checkHit(
//         x, y, size, size,
//         obj[i].x + adaptX, obj[i].y + adaptY, obj[i].sizeX + adaptSX, obj[i].sizeY + adaptSY
//       )) {
//         explod.push(new Explosion(x, y));
//         return true;
//       }
//     }
//   }
// }

//動作処理のまとめ
function update_on(obj) {
  for (let i = obj.length - 1; i >= 0; i--) {
    obj[i].update();
    if (obj[i].kill) obj.splice(i, 1);
  }
}

//描画処理のまとめ
function draw_on(obj) {
  for (let i = 0; i < obj.length; i++) obj[i].draw();
}

//ヒットしたかどうか
function checkHit(x1, y1, w1, h1, x2, y2, w2, h2) {

  let left1 = x1,
    right1 = left1 + w1,
    top1 = y1,
    bottom1 = top1 + h1;

  let left2 = x2,
    right2 = left2 + w2,
    top2 = y2,
    bottom2 = top2 + h2;

  return (left1 <= right2 && right1 >= left2 && top1 <= bottom2 && bottom1 >= top2);
}

//円状のヒット確認
function circleHit(x1, y1, r1, x2, y2, r2) {
  let a = (x2 - x1);
  let b = (y2 - y1);
  let r = r1 + r2;
  return r * r >= a * a + b * b;
}

//ランダム関数
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



