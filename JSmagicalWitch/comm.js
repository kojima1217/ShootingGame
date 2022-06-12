//****色々、関数やクラスなど****//

//-----デバッグ-----
function gameDebug() {
  if (Debug) {
    con.font = "20px 'Impact'";
    con.fillStyle = "white";
    con.fillText("弾" + charaShotCenter.length, 20, 20);
    con.fillText("敵" + bat.length, 20, 40);
    con.fillText("敵弾" + batAtack.length, 20, 60);
    con.fillText("HP" + jiki.hpPoint, 20, 80);
    con.fillText("MAXHP" + jiki.maxHp, 20, 100);
    //con.fillText("test" + shutugen[1].shutNum, 20, 120);
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

CharacterShot.prototype.set = function (p, size, speed, blast, direction, screenW, screenH, diagonal, shotAtackPoint) {
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

  this.shotAtackPoint = shotAtackPoint;//攻撃力

  //生存フラグを立てる
  this.alive = true;
}

CharacterShot.prototype.move = function () {

  //弾が段々大きくなり、段々早くなり、段々攻撃力アップ
  this.size += this.blast;
  this.speed += this.blast;
  this.shotAtackPoint += this.blast;

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
  for (let i = 0; i < bat.length; i++) {
    if (!bat[i].kill) {
      if (checkHit(
        this.position.x, this.position.y, this.size, this.size,
        bat[i].x, bat[i].y, bat[i].sizeX, bat[i].sizeY
      )) {
        bat[i].hp -= this.shotAtackPoint;
        this.alive = false;
        if (bat[i].hp < 0) {
          jyouka.push(new Jyouka(4, bat[i].x + 10, bat[i].y, bat[i].vx >> 4, bat[i].vy >> 4));
          bat[i].kill = true;
        }
        break;
      }
    }
  }
}

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
    bottom2 = top2;

  return (left1 <= right2 && right1 >= left2 && top1 <= bottom2 && bottom1 >= top2);
}

//ランダム関数
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


