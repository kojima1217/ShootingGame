//****大事な関数****//

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
    con.fillText("ゲームの状態" + gameSituation, 20, 120);
    con.fillText("クリック座標Ｘ" + clickPositonX, 20, 140);
    con.fillText("クリック座標Ｙ" + clickPositonY, 20, 160);
    con.fillText("stagethred" + stagethred, 20, 180);
    con.fillText("gamethred" + gamethread, 20, 200);
    con.fillText("stopStage" + stopStage, 20, 220);
    con.fillText("actFontFlag" + actFontFlag, 20, 240);
    con.fillText("actFontCount" + actFontCount, 20, 260);
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

class Stage {
  constructor(pt, sizeSTX, sizeSTY, stageNum) {
    this.pt = pt;
    this.sizeSTX = sizeSTX;
    this.sizeSTY = sizeSTY;
    this.stageNum = stageNum;
    this.stCount = 0;//何回ループしたかのカウント
    this.fadeCount = 0;//暗幕のフェードアウト
    this.fadeFlag = false;
    this.yasikiStop = false;
    this.flash = 255;
    this.kill = false;
  }

  update() {
    if (!stopStage && stagethred != 9) {
      if (stagethred == 7) {
        if (!this.yasikiStop) {
          this.pt += 10;
        } else {
          this.pt = 0;
        }
      } else {
        this.pt += 20;
      }
    }

    if (stagethred == 1) {
      if (this.stageNum != 1) {
        if (this.pt > this.sizeSTY * 2) {
          this.stCount++;
          this.pt = -this.sizeSTY * 2;
        }
        if (this.stCount > 1) {
          stopStage = true;
        }
      }
    } else if (stagethred == 3) {
      if (this.stageNum == 5) {
        if (this.pt > this.sizeSTY * 2 && this.stCount < 2) {
          this.stCount++;
          this.pt = -this.sizeSTY * 2;
        }
      }
      if (this.stageNum == 6) {
        if (this.pt > 0) {
          stopStage = true;
        }
      }
    } else if (stagethred == 5) {
      if (this.stageNum == 8) {
        if (this.pt > this.sizeSTY * 2 && this.stCount < 2) {
          this.stCount++;
          this.pt = -this.sizeSTY * 2;
        }
      }
      if (this.stageNum == 10) {
        if (this.pt > 0) {
          stopStage = true;
        }
      }
    } else if (stagethred == 7) {
      if (this.stageNum == 12) {
        if (this.pt > 0) {
          this.yasikiStop = true;
        }
      }
      if (this.yasikiStop) {
        this.stCount++;
      }
    } else if (stagethred == 9) {
      this.stCount++;
      if (this.stCount == 40) this.pt += 20;
      if (this.stCount == 42) this.pt -= 40;
      if (this.stCount == 44) this.pt += 20;

      if (this.stCount == 60) this.pt -= 20;
      if (this.stCount == 62) this.pt += 40;
      if (this.stCount == 64) this.pt -= 20;

      if (this.stCount == 80) this.pt += 20;
      if (this.stCount == 82) this.pt -= 40;
      if (this.stCount == 84) this.pt += 20;

      if (this.stCount == 110) this.pt -= 20;
      if (this.stCount == 112) this.pt += 40;
      if (this.stCount == 114) this.pt -= 20;

      if (this.stCount == 130) this.pt += 20;
      if (this.stCount == 132) this.pt -= 40;
      if (this.stCount == 134) this.pt += 20;

      if (this.stCount == 140) this.pt -= 20;
      if (this.stCount == 142) this.pt += 40;
      if (this.stCount == 144) this.pt -= 20;
    }

    if (gameSituation == 2 || this.pt > 3800 || gameSituation == 4) {
      this.kill = true;
    }

  }

  draw() {
    if (stagethred == 1) {
      if (this.stageNum == 1) {
        vcon.drawImage(mati_1, 0, 0, this.sizeSTX, this.sizeSTY, -60, -this.sizeSTY + this.pt, this.sizeSTX * 2, this.sizeSTY * 2);
      } else if (this.stageNum == 2) {
        vcon.drawImage(sougen_2, 0, 0, this.sizeSTX, this.sizeSTY, -60, 0 + this.pt, this.sizeSTX * 2, this.sizeSTY * 2);
        if (stopStage) {
          vcon.drawImage(sougen_2, 0, 0, this.sizeSTX, this.sizeSTY, -60, 0, this.sizeSTX * 2, this.sizeSTY * 2);
        }
      }
    } else if (stagethred == 3) {
      if (this.stageNum == 3) {
        vcon.drawImage(sougen_2, 0, 0, this.sizeSTX, this.sizeSTY, -60, 0 + this.pt, this.sizeSTX * 2, this.sizeSTY * 2);
      } else if (this.stageNum == 4) {
        vcon.drawImage(mori_3, 0, 0, this.sizeSTX, this.sizeSTY, -80, 0 + this.pt, this.sizeSTX * 2, this.sizeSTY * 2);
      } else if (this.stageNum == 5) {
        vcon.drawImage(mori_4, 0, 0, this.sizeSTX, this.sizeSTY, -80, 0 + this.pt, this.sizeSTX * 2, this.sizeSTY * 2);
      } else if (this.stageNum == 6) {
        vcon.drawImage(mori_5, 0, 0, this.sizeSTX, this.sizeSTY, -30, 0 + this.pt, this.sizeSTX * 2, this.sizeSTY * 2);
        if (stopStage) {
          vcon.drawImage(mori_5, 0, 0, this.sizeSTX, this.sizeSTY, -30, 0, this.sizeSTX * 2, this.sizeSTY * 2);
        }
      }
    } else if (stagethred == 5) {
      if (this.stageNum == 7) {
        vcon.drawImage(mori_5, 0, 0, this.sizeSTX, this.sizeSTY, -30, 0 + this.pt, this.sizeSTX * 2, this.sizeSTY * 2);
      } else if (this.stageNum == 8) {
        vcon.drawImage(mori_4, 0, 0, this.sizeSTX, this.sizeSTY, -80, 0 + this.pt, this.sizeSTX * 2, this.sizeSTY * 2);
      } else if (this.stageNum == 9) {
        vcon.drawImage(mori_6, 0, 0, this.sizeSTX, this.sizeSTY, -80, 0 + this.pt, this.sizeSTX * 2, this.sizeSTY * 2);
      } else if (this.stageNum == 10) {
        vcon.drawImage(haka_7, 0, 0, this.sizeSTX, this.sizeSTY, -80, 0 + this.pt, this.sizeSTX * 2, this.sizeSTY * 2);
        if (stopStage) {
          vcon.drawImage(haka_7, 0, 0, this.sizeSTX, this.sizeSTY, -80, 0, this.sizeSTX * 2, this.sizeSTY * 2);
        }
      }
    } else if (stagethred == 7) {
      if (this.stageNum == 11) {
        vcon.drawImage(haka_7, 0, 0, this.sizeSTX, this.sizeSTY, -80, 0 + this.pt, this.sizeSTX * 2, this.sizeSTY * 2);
      } else if (this.stageNum == 12) {
        vcon.drawImage(yasikigaikan_8, 0, 0, this.sizeSTX, this.sizeSTY, -60, 0 + this.pt, this.sizeSTX * 2, this.sizeSTY * 2);
        if (this.yasikiStop) {
          vcon.drawImage(yasikigaikan_8, 0, 0, this.sizeSTX, this.sizeSTY, -60, 0, this.sizeSTX * 2, this.sizeSTY * 2);
        }
        if (this.stCount > 100) {
          if (this.stCount > 200) {
            if (!this.fadeFlag) {
              if (this.fadeCount < 1) {
                this.fadeCount += 0.01;
              } else {
                this.fadeFlag = true;
              }
            } else {
              vcon.drawImage(yasiki_9, 0, 0, this.sizeSTX, this.sizeSTY, -60, 0, this.sizeSTX * 2, this.sizeSTY * 2);
              if (this.fadeCount > 0) {
                this.fadeCount -= 0.01;
              } else {
                stopStage = true;
              }
            }

          }
          vcon.fillStyle = "rgba(" + [0, 0, 0, this.fadeCount] + ")";
          vcon.fillRect(0, 0, SCREEN_W, SCREEN_H);
        }
      }
    } else if (stagethred == 9) {
      if (this.stageNum == 14) {
        vcon.drawImage(yasiki_9, 0, 0, this.sizeSTX, this.sizeSTY, -60 + this.pt, 0, this.sizeSTX * 2, this.sizeSTY * 2);

        if (this.stCount == 50) {
          this.fadeCount = 1;
        }
        if (this.stCount == 52) {
          this.fadeCount = 0;
        }
        if (this.stCount == 100) {
          this.fadeCount = 1;
        }
        if (this.stCount == 102) {
          this.fadeCount = 0;
        }
        if (this.stCount > 200) {
          this.flash = 0;//黒色になる　フラッシュから暗転
          if (this.fadeCount < 1) {
            this.fadeCount += 0.01;
          }
        }
        if (this.stCount > 250) {
          stopStage = true;
        }
      }
      vcon.fillStyle = "rgba(" + [this.flash, this.flash, this.flash, this.fadeCount] + ")";
      vcon.fillRect(0, 0, SCREEN_W, SCREEN_H);
    }
  }
}

function stage_on() {

  if (stagethred == 0) {
    stageSituation.push(new Stage(-1020, 700, 1836, 1));
    stagethred += 1;
  }
  if (stagethred == 1 && stageSituation[0].pt == 1820) {
    stageSituation.push(new Stage(-800, 700, 400, 2));
    stageSituation.push(new Stage(-1600, 700, 400, 2));
  }
  if (stagethred == 2) {
    stageSituation.push(new Stage(0, 700, 400, 3));
    stageSituation.push(new Stage(-800, 700, 400, 4));
    stageSituation.push(new Stage(-1600, 700, 400, 5));
    stageSituation.push(new Stage(-2400, 700, 400, 5));
    stageSituation.push(new Stage(-4800, 700, 400, 6));
    stagethred += 1;
  }
  if (stagethred == 4) {
    stageSituation.push(new Stage(0, 700, 400, 7));
    stageSituation.push(new Stage(-800, 700, 400, 8));
    stageSituation.push(new Stage(-1600, 700, 400, 8));
    stageSituation.push(new Stage(-4000, 700, 400, 9));
    stageSituation.push(new Stage(-4800, 700, 400, 10));
    stagethred += 1;
  }
  if (stagethred == 6) {
    stageSituation.push(new Stage(0, 700, 400, 11));
    stageSituation.push(new Stage(-800, 700, 400, 12));
    stageSituation.push(new Stage(-1600, 700, 400, 13));
    stagethred += 1;
  }
  if (stagethred == 8) {
    stageSituation.push(new Stage(0, 700, 400, 14));
    stagethred += 1;
  }
}

let actFontCount = 0;
let actFontFlag = true;

function actFont() {
  if (actFontFlag) {
    if (gameSituation == 1) actFontCount++;
    if (actFontCount > 50) {
      if (stagethred != 9) {
        vcon.fillStyle = "rgba(233, 222, 164, 0.3)";
        vcon.fillRect(0, 150, SCREEN_W, 450);
      }
      if (stagethred == 1) {
        vcon.drawImage(act1, 0, 0, 960, 320, 30, 160, 960 * 1.3, 320 * 1.3);
      }
      if (stagethred == 3) {
        vcon.drawImage(act2, 0, 0, 960, 320, 40, 160, 960 * 1.3, 320 * 1.3);
      }
      if (stagethred == 5) {
        vcon.drawImage(act3, 0, 0, 960, 320, 100, 160, 960 * 1.3, 320 * 1.3);
      }
      if (stagethred == 7) {
        vcon.drawImage(act4, 0, 0, 960, 320, 150, 160, 960 * 1.3, 320 * 1.3);
      }
    }
    if (actFontCount > 250) {
      actFontFlag = false;
    }
  }
}

class FireBlast {
  constructor() {
    this.x = jiki.position.x;
    this.y = jiki.position.y;
    this.size = 20;
    this.speed = 10;
    this.fbDirec = direc;
    this.tenmetuCount = 0;
    this.hitReroad = true;
    this.kill = false;
  }

  update() {
    if (this.fbDirec == 0) {//上
      this.y -= this.speed;
    } else if (this.fbDirec == 1) {//右上
      this.x += this.speed * diago;
      this.y -= this.speed * diago;
    } else if (this.fbDirec == 2) {//右
      this.x += this.speed;
    } else if (this.fbDirec == 3) {//右下
      this.x += this.speed * diago;
      this.y += this.speed * diago;
    } else if (this.fbDirec == 4) {//下
      this.y += this.speed;
    } else if (this.fbDirec == 5) {//左下
      this.x -= this.speed * diago;
      this.y += this.speed * diago;
    } else if (this.fbDirec == 6) {//左
      this.x -= this.speed;
    } else {//左上
      this.x -= this.speed * diago;
      this.y -= this.speed * diago;
    }

    if (this.x < -50 || this.x > SCREEN_W + 50 || this.y < -50 || this.y > SCREEN_H + 50) {
      this.kill = true;
    }

    //敵に弾が着弾して爆発
    for (let i = 0; i < bat.length; i++) {
      if (!bat[i].kill) {
        if (checkHit(
          this.x, this.y, this.size, this.size,
          bat[i].x, bat[i].y, bat[i].sizeX, bat[i].sizeY
        )) {
          if (this.hitReroad) {
            explod.push(new Explosion(this.x, this.y));
            this.hitReroad = false;
          }
          this.kill = true;
          break;
        }
      }
    }
  }

  draw() {
    vcon.beginPath();
    vcon.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    this.tenmetuCount++;
    if (this.tenmetuCount < 5) {
      vcon.fillStyle = "red";
    } else if (this.tenmetuCount < 10) {
      vcon.fillStyle = "#b22222";
    }
    vcon.fill();
    vcon.closePath();
    vcon.beginPath();
    vcon.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2, false);
    if (this.tenmetuCount < 5) {
      vcon.fillStyle = "#ff8c00";
    } else if (this.tenmetuCount < 10) {
      vcon.fillStyle = "orange";
    }
    vcon.fill();
    vcon.closePath();
    if (this.tenmetuCount >= 10) this.tenmetuCount = 0;
  }
}

class Explosion {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sizeX = 120 * 4;
    this.sizeY = 120 * 4;
    this.exCount = 0;
    this.spriteAnime = 0;
    this.kill = false;
  }

  update() {
    this.exCount++;
    if (this.exCount < 10) {
      this.spriteAnime = 0;
    } else if (this.exCount < 20) {
      this.spriteAnime = 1;
    } else if (this.exCount < 30) {
      this.spriteAnime = 2;
    } else if (this.exCount < 40) {
      this.spriteAnime = 3;
    } else if (this.exCount < 50) {
      this.spriteAnime = 4;
    } else if (this.exCount < 60) {
      this.spriteAnime = 5;
    } else if (this.exCount < 70) {
      this.spriteAnime = 6;
    }
    if (this.exCount == 71) this.kill = true;

    //敵に弾が当たったらHPを減らす
    for (let i = 0; i < bat.length; i++) {
      if (!bat[i].kill) {
        if (checkHit(
          this.x - this.sizeX / 2 + 80, this.y - this.sizeY / 2 + 80, this.sizeX / 2 + 80, this.sizeY / 2 + 80,
          bat[i].x, bat[i].y, bat[i].sizeX, bat[i].sizeY
        )) {
          bat[i].hp -= 5;
          if (bat[i].hp < 0) {
            jyouka.push(new Jyouka(4, bat[i].x + 10, bat[i].y, bat[i].vx >> 4, bat[i].vy >> 4));
            bat[i].kill = true;
          }
          break;
        }
      }
    }
  }

  draw() {
    drawSprite2(this.spriteAnime, this.x - this.sizeX / 2, this.y - this.sizeY / 2, 4);
  }
}


let barrierOn = false;

class IceBarrier {
  constructor(posi) {
    this.x = 0;
    this.y = 0;
    this.sizeX = 47;
    this.sizeY = 54;
    this.hankei = 80;
    this.posi = posi * Math.PI / 180;
    this.kaitenCount = this.posi;
    this.kill = false;
  }

  update() {
    this.kaitenCount += 0.1;
    this.x = jiki.position.x - this.hankei * Math.cos(Math.PI + this.kaitenCount) - this.sizeX / 2;
    this.y = jiki.position.y - this.hankei * Math.sin(Math.PI + this.kaitenCount) - this.sizeY / 2;

    if (this.kaitenCount - this.posi > 20) {
      barrierOn = false;
      this.kill = true;
    }
  }

  draw() {
    drawSprite2(19, this.x - 5, this.y - 5, 1);
    //vcon.drawImage(test, 0, 0, 470, 540, this.x, this.y-5, this.sizeX, this.sizeY);
  }
}