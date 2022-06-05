//****入れ物****//

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
}

//自機ショット
function CharacterShot() {
  this.position = new Point();
  this.size = 0;
  this.speed = 0;
  this.alive = false;
}

CharacterShot.prototype.set = function (p, size, speed, blast, direction, screenW, screenH, diagonal) {
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

  //生存フラグを立てる
  this.alive = true;
}

CharacterShot.prototype.move = function () {

  //弾が段々大きくなり、段々早くなる
  this.size += this.blast;
  this.speed += this.blast;

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
}

class Enemy {
  constructor(snum, x, y, vx, vy) {
    this.snum = snum;//スプライトナンバー
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.kill = false;
  }
  update() {
    //基本動作
  }

  draw() {
    drawSprite(this.snum, this.x, this.y);
  }
}

class Bat extends Enemy {
  constructor(snum, x, y, vx, vy) {
    super(snum, x, y, vx, vy);
  }

  update() {
    super.update();
    //コウモリの動作

  }

  draw() {
    super.draw();
  }

}