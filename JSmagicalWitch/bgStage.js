//****背景の処理****//

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
          if (seFlag) bossUpSE.play();
        }
        if (this.stCount == 52) {
          this.fadeCount = 0;
        }
        if (this.stCount == 100) {
          this.fadeCount = 1;
          if (seFlag) {
            bossUpSE.currentTime = 0;
            bossUpSE.play();
          }
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