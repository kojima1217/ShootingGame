//****魔法の処理****//

class FireBlast {
  constructor() {
    this.x = jiki.position.x-55/2;
    this.y = jiki.position.y-55/2;
    this.size = 55;
    this.speed = 10;
    this.fbDirec = direc;
    this.tenmetuCount = 0;
    this.hitReroad = true;
    this.snum = 32;
    this.kill = false;
  }

  update() {
    fireReload = 0;

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
    if (gameSituation != 1) {
      this.kill = true;
    }

    //敵に弾が着弾して爆発
    if (attackDamage(bat, this.x, this.y, this.size, 0, 0, 0, 0, 0)) {
      explod.push(new Explosion(this.x, this.y));
      this.kill = true;
    }
    if (attackDamage(treant, this.x, this.y, this.size, 0, 30, 20, -50, -30)) {
      explod.push(new Explosion(this.x, this.y));
      this.kill = true;
    }
    if (attackDamage(pumpkin, this.x, this.y, this.size, 0, 10, 10, -20, -20)) {
      explod.push(new Explosion(this.x, this.y));
      this.kill = true;
    }
    if (attackDamage(ghost, this.x, this.y, this.size, 0, 15, 0, -30, -10)) {
      explod.push(new Explosion(this.x, this.y));
      this.kill = true;
    }
    if (attackDamage(devil, this.x, this.y, this.size, 0, 30, 20, -50, -40)) {
      explod.push(new Explosion(this.x, this.y));
      this.kill = true;
    }
    if (attackDamage(bossSkull, this.x, this.y, this.size, 0, 102, 260, -204, -300)) {
      explod.push(new Explosion(this.x, this.y));
      this.kill = true;
    }
    if (attackDamage(bossHand, this.x, this.y, this.size, 0, 60, 60, -120, -120)) {
      explod.push(new Explosion(this.x, this.y));
      this.kill = true;
    }
    // for (let i = 0; i < bat.length; i++) {
    //   if (!bat[i].kill) {
    //     if (checkHit(
    //       this.x, this.y, this.size, this.size,
    //       bat[i].x, bat[i].y, bat[i].sizeX, bat[i].sizeY
    //     )) {
    //       if (this.hitReroad) {
    //         explod.push(new Explosion(this.x, this.y));
    //         this.hitReroad = false;
    //       }
    //       this.kill = true;
    //       break;
    //     }
    //   }
    // }
  }

  draw() {
    //   vcon.beginPath();
    //   vcon.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    //   this.tenmetuCount++;
    //   if (this.tenmetuCount < 5) {
    //     vcon.fillStyle = "red";
    //   } else if (this.tenmetuCount < 10) {
    //     vcon.fillStyle = "#b22222";
    //   }
    //   vcon.fill();
    //   vcon.closePath();
    //   vcon.beginPath();
    //   vcon.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2, false);
    //   if (this.tenmetuCount < 5) {
    //     vcon.fillStyle = "#800000";
    //   } else if (this.tenmetuCount < 10) {
    //     vcon.fillStyle = "rgb(120,10,10)";
    //   }
    //   vcon.fill();
    //   vcon.closePath();
    //   if (this.tenmetuCount >= 10) this.tenmetuCount = 0;
    this.tenmetuCount++;
    if (this.tenmetuCount > 10) this.tenmetuCount = 0;
    if (this.tenmetuCount % 2 == 0) {
      this.snum = 32;
    } else {
      this.snum = 33;
    }
    drawSprite2(this.snum, this.x, this.y, 1);
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
    this.attackPoint = 30;
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

    if (gameSituation != 1) {
      this.kill = true;
    }

    //敵に弾が当たったらHPを減らす
    attackDamage(bat, this.x - this.sizeX / 2 + 80, this.y - this.sizeY / 2 + 80, this.sizeX / 2 + 80, this.attackPoint, 0, 0, 0, 0);
    attackDamage(treant, this.x - this.sizeX / 2 + 80, this.y - this.sizeY / 2 + 80, this.sizeX / 2 + 80, this.attackPoint, 30, 20, -50, -30);
    attackDamage(pumpkin, this.x - this.sizeX / 2 + 80, this.y - this.sizeY / 2 + 80, this.sizeX / 2 + 80, this.attackPoint, 10, 10, -20, -20);
    attackDamage(ghost, this.x - this.sizeX / 2 + 80, this.y - this.sizeY / 2 + 80, this.sizeX / 2 + 80, this.attackPoint, 15, 0, -30, -10);
    attackDamage(devil, this.x - this.sizeX / 2 + 80, this.y - this.sizeY / 2 + 80, this.sizeX / 2 + 80, this.attackPoint, 30, 20, -50, -40);
    if (attackDamage(bossSkull, this.x - this.sizeX / 2 + 80, this.y - this.sizeY / 2 + 80, this.sizeX / 2 + 80, this.attackPoint, 102, 260, -204, -300)) {
      bossHP -= this.attackPoint;
    }
    attackDamage(bossHand, this.x - this.sizeX / 2 + 80, this.y - this.sizeY / 2 + 80, this.sizeX / 2 + 80, this.attackPoint, 60, 60, -120, -120);

    //(obj,sprite,x,y,size,attack,hoseiX,hoseiY,hoseiSX,hoseiSY,jyoukaX,jyoukaY)
    // for (let i = 0; i < bat.length; i++) {
    //   if (!bat[i].kill) {
    //     if (checkHit(
    //       this.x - this.sizeX / 2 + 80, this.y - this.sizeY / 2 + 80, this.sizeX / 2 + 80, this.sizeY / 2 + 80,
    //       bat[i].x, bat[i].y, bat[i].sizeX, bat[i].sizeY
    //     )) {
    //       bat[i].hp -= 5;
    //       if (bat[i].hp < 0) {
    //         jyouka.push(new Jyouka(4, bat[i].x + 10, bat[i].y, bat[i].vx >> 4, bat[i].vy >> 4));
    //         bat[i].kill = true;
    //       }
    //       break;
    //     }
    //   }
    // }
  }

  draw() {
    drawSprite2(this.spriteAnime, this.x - this.sizeX / 2, this.y - this.sizeY / 2, 4);
  }
}

let thunderSwordFlag = false;
class ThunderHantei {
  constructor(num) {
    this.number = num;
    this.x = jiki.position.x;
    this.y = jiki.position.y;
    this.size = 20;
    this.thDirec = direc;
    this.nagiruCount = 0;
    this.fukuramiCount = 0;
    this.fukuramiFlag = true;
    this.attackPoint = 1000;
    this.kill = false;
  }

  update() {
    thunderReload = 0;

    if (this.thDirec == 0) {//上

      if (this.number == 1) {
        this.x = jiki.position.x - 30 + this.nagiruCount;
        this.y = jiki.position.y - 10 + this.fukuramiCount * 4;
      } else if (this.number == 2) {
        this.x = jiki.position.x - 60 + this.nagiruCount * 2;
        this.y = jiki.position.y - 30 + this.fukuramiCount * 5;
      } else if (this.number == 3) {
        this.x = jiki.position.x - 90 + this.nagiruCount * 3;
        this.y = jiki.position.y - 50 + this.fukuramiCount * 6;
      } else if (this.number == 4) {
        this.x = jiki.position.x - 120 + this.nagiruCount * 4;
        this.y = jiki.position.y - 70 + this.fukuramiCount * 7;
      } else if (this.number == 5) {
        this.x = jiki.position.x - 150 + this.nagiruCount * 5;
        this.y = jiki.position.y - 90 + this.fukuramiCount * 8;
      }
      if (this.nagiruCount > 60) {
        thunderSwordFlag = false;
        this.kill = true;
      }

    } else if (this.thDirec == 1) {//右上

      if (this.number == 1) {
        this.x = jiki.position.x - 10 + this.nagiruCount * diago - this.fukuramiCount * 4;
        this.y = jiki.position.y - 30 + this.nagiruCount * diago + this.fukuramiCount * 4;
      } else if (this.number == 2) {
        this.x = jiki.position.x - 30 + this.nagiruCount * 2 * diago - this.fukuramiCount * 5;
        this.y = jiki.position.y - 60 + this.nagiruCount * 2 * diago + this.fukuramiCount * 5;
      } else if (this.number == 3) {
        this.x = jiki.position.x - 50 + this.nagiruCount * 3 * diago - this.fukuramiCount * 6;
        this.y = jiki.position.y - 90 + this.nagiruCount * 3 * diago + this.fukuramiCount * 6;
      } else if (this.number == 4) {
        this.x = jiki.position.x - 70 + this.nagiruCount * 4 * diago - this.fukuramiCount * 7;
        this.y = jiki.position.y - 120 + this.nagiruCount * 4 * diago + this.fukuramiCount * 7;
      } else if (this.number == 5) {
        this.x = jiki.position.x - 90 + this.nagiruCount * 5 * diago - this.fukuramiCount * 8;
        this.y = jiki.position.y - 150 + this.nagiruCount * 5 * diago + this.fukuramiCount * 8;
      }
      if (this.nagiruCount > 60) {
        thunderSwordFlag = false;
        this.kill = true;
      }


    } else if (this.thDirec == 2) {//右

      if (this.number == 1) {
        this.x = jiki.position.x + 10 - this.fukuramiCount * 4;
        this.y = jiki.position.y - 30 + this.nagiruCount;
      } else if (this.number == 2) {
        this.x = jiki.position.x + 30 - this.fukuramiCount * 5;
        this.y = jiki.position.y - 60 + this.nagiruCount * 2;
      } else if (this.number == 3) {
        this.x = jiki.position.x + 50 - this.fukuramiCount * 6;
        this.y = jiki.position.y - 90 + this.nagiruCount * 3;
      } else if (this.number == 4) {
        this.x = jiki.position.x + 70 - this.fukuramiCount * 7;
        this.y = jiki.position.y - 120 + this.nagiruCount * 4;
      } else if (this.number == 5) {
        this.x = jiki.position.x + 90 - this.fukuramiCount * 8;
        this.y = jiki.position.y - 150 + this.nagiruCount * 5;
      }
      if (this.nagiruCount > 60) {
        thunderSwordFlag = false;
        this.kill = true;
      }

    } else if (this.thDirec == 3) {//右下

      if (this.number == 1) {
        this.x = jiki.position.x + 30 - this.nagiruCount * diago - this.fukuramiCount * 4;
        this.y = jiki.position.y - 10 + this.nagiruCount * diago - this.fukuramiCount * 4;
      } else if (this.number == 2) {
        this.x = jiki.position.x + 60 - this.nagiruCount * 2 * diago - this.fukuramiCount * 5;
        this.y = jiki.position.y - 30 + this.nagiruCount * 2 * diago - this.fukuramiCount * 5;
      } else if (this.number == 3) {
        this.x = jiki.position.x + 90 - this.nagiruCount * 3 * diago - this.fukuramiCount * 6;
        this.y = jiki.position.y - 50 + this.nagiruCount * 3 * diago - this.fukuramiCount * 6;
      } else if (this.number == 4) {
        this.x = jiki.position.x + 120 - this.nagiruCount * 4 * diago - this.fukuramiCount * 7;
        this.y = jiki.position.y - 70 + this.nagiruCount * 4 * diago - this.fukuramiCount * 7;
      } else if (this.number == 5) {
        this.x = jiki.position.x + 150 - this.nagiruCount * 5 * diago - this.fukuramiCount * 8;
        this.y = jiki.position.y - 90 + this.nagiruCount * 5 * diago - this.fukuramiCount * 8;
      }
      if (this.nagiruCount > 60) {
        thunderSwordFlag = false;
        this.kill = true;
      }

    } else if (this.thDirec == 4) {//下

      if (this.number == 1) {
        this.x = jiki.position.x + 30 - this.nagiruCount;
        this.y = jiki.position.y + 10 - this.fukuramiCount * 4;
      } else if (this.number == 2) {
        this.x = jiki.position.x + 60 - this.nagiruCount * 2;
        this.y = jiki.position.y + 30 - this.fukuramiCount * 5;
      } else if (this.number == 3) {
        this.x = jiki.position.x + 90 - this.nagiruCount * 3;
        this.y = jiki.position.y + 50 - this.fukuramiCount * 6;
      } else if (this.number == 4) {
        this.x = jiki.position.x + 120 - this.nagiruCount * 4;
        this.y = jiki.position.y + 70 - this.fukuramiCount * 7;
      } else if (this.number == 5) {
        this.x = jiki.position.x + 150 - this.nagiruCount * 5;
        this.y = jiki.position.y + 90 - this.fukuramiCount * 8;
      }
      if (this.nagiruCount > 60) {
        thunderSwordFlag = false;
        this.kill = true;
      }

    } else if (this.thDirec == 5) {//左下

      if (this.number == 1) {
        this.x = jiki.position.x + 10 - this.nagiruCount * diago + this.fukuramiCount * 4;
        this.y = jiki.position.y + 30 - this.nagiruCount * diago - this.fukuramiCount * 4;
      } else if (this.number == 2) {
        this.x = jiki.position.x + 30 - this.nagiruCount * 2 * diago + this.fukuramiCount * 5;
        this.y = jiki.position.y + 60 - this.nagiruCount * 2 * diago - this.fukuramiCount * 5;
      } else if (this.number == 3) {
        this.x = jiki.position.x + 50 - this.nagiruCount * 3 * diago + this.fukuramiCount * 6;
        this.y = jiki.position.y + 90 - this.nagiruCount * 3 * diago - this.fukuramiCount * 6;
      } else if (this.number == 4) {
        this.x = jiki.position.x + 70 - this.nagiruCount * 4 * diago + this.fukuramiCount * 7;
        this.y = jiki.position.y + 120 - this.nagiruCount * 4 * diago - this.fukuramiCount * 7;
      } else if (this.number == 5) {
        this.x = jiki.position.x + 90 - this.nagiruCount * 5 * diago + this.fukuramiCount * 8;
        this.y = jiki.position.y + 150 - this.nagiruCount * 5 * diago - this.fukuramiCount * 8;
      }
      if (this.nagiruCount > 60) {
        thunderSwordFlag = false;
        this.kill = true;
      }

    } else if (this.thDirec == 6) {//左

      if (this.number == 1) {
        this.x = jiki.position.x - 10 + this.fukuramiCount * 4;
        this.y = jiki.position.y + 30 - this.nagiruCount;
      } else if (this.number == 2) {
        this.x = jiki.position.x - 30 + this.fukuramiCount * 5;
        this.y = jiki.position.y + 60 - this.nagiruCount * 2;
      } else if (this.number == 3) {
        this.x = jiki.position.x - 50 + this.fukuramiCount * 6;
        this.y = jiki.position.y + 90 - this.nagiruCount * 3;
      } else if (this.number == 4) {
        this.x = jiki.position.x - 70 + this.fukuramiCount * 7;
        this.y = jiki.position.y + 120 - this.nagiruCount * 4;
      } else if (this.number == 5) {
        this.x = jiki.position.x - 90 + this.fukuramiCount * 8;
        this.y = jiki.position.y + 150 - this.nagiruCount * 5;
      }
      if (this.nagiruCount > 60) {
        thunderSwordFlag = false;
        this.kill = true;
      }

    } else {//左上

      if (this.number == 1) {
        this.x = jiki.position.x - 30 + this.nagiruCount * diago + this.fukuramiCount * 4;
        this.y = jiki.position.y + 10 - this.nagiruCount * diago + this.fukuramiCount * 4;
      } else if (this.number == 2) {
        this.x = jiki.position.x - 60 + this.nagiruCount * 2 * diago + this.fukuramiCount * 5;
        this.y = jiki.position.y + 30 - this.nagiruCount * 2 * diago + this.fukuramiCount * 5;
      } else if (this.number == 3) {
        this.x = jiki.position.x - 90 + this.nagiruCount * 3 * diago + this.fukuramiCount * 6;
        this.y = jiki.position.y + 50 - this.nagiruCount * 3 * diago + this.fukuramiCount * 6;
      } else if (this.number == 4) {
        this.x = jiki.position.x - 120 + this.nagiruCount * 4 * diago + this.fukuramiCount * 7;
        this.y = jiki.position.y + 70 - this.nagiruCount * 4 * diago + this.fukuramiCount * 7;
      } else if (this.number == 5) {
        this.x = jiki.position.x - 150 + this.nagiruCount * 5 * diago + this.fukuramiCount * 8;
        this.y = jiki.position.y + 90 - this.nagiruCount * 5 * diago + this.fukuramiCount * 8;
      }
      if (this.nagiruCount > 60) {
        thunderSwordFlag = false;
        this.kill = true;
      }

    }

    this.nagiruCount += 5;
    if (this.fukuramiFlag) {
      this.fukuramiCount -= 2;
      if (this.fukuramiCount < -10) {
        this.fukuramiFlag = false;
      }
    } else {
      this.fukuramiCount += 2;
    }

    //敵に弾が当たったらHPを減らす
    attackDamage(bat, this.x, this.y, this.size, this.attackPoint, 0, 0, 0, 0);
    attackDamage(treant, this.x, this.y, this.size, this.attackPoint, 30, 20, -50, -30);
    attackDamage(pumpkin, this.x, this.y, this.size, this.attackPoint, 10, 10, -20, -20);
    attackDamage(ghost, this.x, this.y, this.size, this.attackPoint, 15, 0, -30, -10);
    attackDamage(devil, this.x, this.y, this.size, this.attackPoint, 30, 20, -50, -40);
    if (attackDamage(bossSkull, this.x, this.y, this.size, this.attackPoint, 102, 260, -204, -300)) {
      bossHP -= this.attackPoint;
    }
    attackDamage(bossHand, this.x, this.y, this.size, this.attackPoint, 60, 60, -120, -120);
    // for (let i = 0; i < bat.length; i++) {
    //   if (!bat[i].kill) {
    //     if (checkHit(
    //       this.x, this.y, this.size, this.size,
    //       bat[i].x, bat[i].y, bat[i].sizeX, bat[i].sizeY
    //     )) {
    //       bat[i].hp -= 100;
    //       if (bat[i].hp < 0) {
    //         jyouka.push(new Jyouka(4, bat[i].x + 10, bat[i].y, bat[i].vx >> 4, bat[i].vy >> 4));
    //         bat[i].kill = true;
    //       }
    //       break;
    //     }
    //   }
    // }
  }

  draw() {
    //デバッグ用に残しておく
    // vcon.beginPath();
    // vcon.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    // vcon.fillStyle = "black";
    // vcon.fill();
    // vcon.closePath();
  }
}

class ThunderGraphic {
  constructor() {
    this.x = jiki.position.x;
    this.y = jiki.position.y;
    this.chX = 0;
    this.chY = 0;
    this.thGraDirec = direc;
    this.tgNagiruCount = 0;
    this.thAnime = 7;
    this.exSize = 1;
    this.kill = false;
  }
  update() {
    if (this.thGraDirec == 0) {//上
      if (this.tgNagiruCount < 10) {
        this.thAnime = 17;
        this.chX = -170;
        this.chY = -125;
      } else if (this.tgNagiruCount < 20) {
        this.thAnime = 18;
        this.chX = -125;
        this.chY = -170;
      } else if (this.tgNagiruCount < 30) {
        this.thAnime = 7;
        this.chX = -40;
        this.chY = -200;
      } else if (this.tgNagiruCount < 40) {
        this.thAnime = 8;
        this.chX = 0;
        this.chY = -180;
      } else if (this.tgNagiruCount < 50) {
        this.thAnime = 9;
        this.chX = 0;
        this.chY = -110;
      } else {
        this.kill = true;
      }
    } else if (this.thGraDirec == 1) {//右上
      if (this.tgNagiruCount < 10) {
        this.thAnime = 18;
        this.chX = -125;
        this.chY = -170;
      } else if (this.tgNagiruCount < 20) {
        this.thAnime = 7;
        this.chX = -40;
        this.chY = -200;
      } else if (this.tgNagiruCount < 30) {
        this.thAnime = 8;
        this.chX = 0;
        this.chY = -180;
      } else if (this.tgNagiruCount < 40) {
        this.thAnime = 9;
        this.chX = 0;
        this.chY = -110;
      } else if (this.tgNagiruCount < 50) {
        this.thAnime = 10;
        this.chX = 0;
        this.chY = -40;
      } else {
        this.kill = true;
      }
    } else if (this.thGraDirec == 2) {//右
      if (this.tgNagiruCount < 10) {
        this.thAnime = 8;
        this.chX = 0;
        this.chY = -180;
      } else if (this.tgNagiruCount < 20) {
        this.thAnime = 9;
        this.chX = 0;
        this.chY = -110;
      } else if (this.tgNagiruCount < 30) {
        this.thAnime = 10;
        this.chX = 0;
        this.chY = -40;
      } else if (this.tgNagiruCount < 40) {
        this.thAnime = 11;
        this.chX = 0;
        this.chY = 0;
      } else if (this.tgNagiruCount < 50) {
        this.thAnime = 12;
        this.chX = 0;
        this.chY = 0;
      } else {
        this.kill = true;
      }
    } else if (this.thGraDirec == 3) {//右下
      if (this.tgNagiruCount < 10) {
        this.thAnime = 9;
        this.chX = 0;
        this.chY = -110;
      } else if (this.tgNagiruCount < 20) {
        this.thAnime = 10;
        this.chX = 0;
        this.chY = -40;
      } else if (this.tgNagiruCount < 30) {
        this.thAnime = 11;
        this.chX = 0;
        this.chY = 0;
      } else if (this.tgNagiruCount < 40) {
        this.thAnime = 12;
        this.chX = 0;
        this.chY = 0;
      } else if (this.tgNagiruCount < 50) {
        this.thAnime = 13;
        this.chX = -40;
        this.chY = 0;
      } else {
        this.kill = true;
      }
    } else if (this.thGraDirec == 4) {//下
      if (this.tgNagiruCount < 10) {
        this.thAnime = 11;
        this.chX = 0;
        this.chY = 0;
      } else if (this.tgNagiruCount < 20) {
        this.thAnime = 12;
        this.chX = 0;
        this.chY = 0;
      } else if (this.tgNagiruCount < 30) {
        this.thAnime = 13;
        this.chX = -40;
        this.chY = 0;
      } else if (this.tgNagiruCount < 40) {
        this.thAnime = 14;
        this.chX = -110;
        this.chY = 0;
      } else if (this.tgNagiruCount < 50) {
        this.thAnime = 15;
        this.chX = -190;
        this.chY = 0;
      } else {
        this.kill = true;
      }
    } else if (this.thGraDirec == 5) {//左下
      if (this.tgNagiruCount < 10) {
        this.thAnime = 12;
        this.chX = 0;
        this.chY = 0;
      } else if (this.tgNagiruCount < 20) {
        this.thAnime = 13;
        this.chX = -40;
        this.chY = 0;
      } else if (this.tgNagiruCount < 30) {
        this.thAnime = 14;
        this.chX = -110;
        this.chY = 0;
      } else if (this.tgNagiruCount < 40) {
        this.thAnime = 15;
        this.chX = -190;
        this.chY = 0;
      } else if (this.tgNagiruCount < 50) {
        this.thAnime = 16;
        this.chX = -200;
        this.chY = -40;
      } else {
        this.kill = true;
      }
    } else if (this.thGraDirec == 6) {//左
      if (this.tgNagiruCount < 10) {
        this.thAnime = 14;
        this.chX = -110;
        this.chY = 0;
      } else if (this.tgNagiruCount < 20) {
        this.thAnime = 15;
        this.chX = -190;
        this.chY = 0;
      } else if (this.tgNagiruCount < 30) {
        this.thAnime = 16;
        this.chX = -200;
        this.chY = -40;
      } else if (this.tgNagiruCount < 40) {
        this.thAnime = 17;
        this.chX = -170;
        this.chY = -125;
      } else if (this.tgNagiruCount < 50) {
        this.thAnime = 18;
        this.chX = -125;
        this.chY = -170;
      } else {
        this.kill = true;
      }
    } else {//左上
      if (this.tgNagiruCount < 10) {
        this.thAnime = 15;
        this.chX = -190;
        this.chY = 0;
      } else if (this.tgNagiruCount < 20) {
        this.thAnime = 16;
        this.chX = -200;
        this.chY = -40;
      } else if (this.tgNagiruCount < 30) {
        this.thAnime = 17;
        this.chX = -170;
        this.chY = -125;
      } else if (this.tgNagiruCount < 40) {
        this.thAnime = 18;
        this.chX = -125;
        this.chY = -170;
      } else if (this.tgNagiruCount < 50) {
        this.thAnime = 7;
        this.chX = -40;
        this.chY = -200;
      } else {
        this.kill = true;
      }
    }
    this.tgNagiruCount += 5;
    if (gameSituation != 1) {
      this.kill = true;
    }
  }
  draw() {
    drawSprite2(this.thAnime, this.x + this.chX, this.y + this.chY, this.exSize);
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
    iceReload = 0;

    this.kaitenCount += 0.1;
    this.x = jiki.position.x - this.hankei * Math.cos(Math.PI + this.kaitenCount) - this.sizeX / 2;
    this.y = jiki.position.y - this.hankei * Math.sin(Math.PI + this.kaitenCount) - this.sizeY / 2;

    if (this.kaitenCount - this.posi > 20) {
      barrierOn = false;
      this.kill = true;
    }
    if (gameSituation != 1) {
      barrierOn = false;
      this.kill = true;
    }
  }

  draw() {
    drawSprite2(19, this.x - 5, this.y - 5, 1);
  }
}
