//****ステージの敵配置とクリア条件****//

//何匹倒したかカウント
let batKillCount = 0;
let treantKillCount = 0;
let ghostKillCount = 0;
let pumpkinKillCount = 0;
let devilKillCount = 0;

//BGM再生タイミングカウント
let soundsCount = 0;

function setStage() {
  if (stopStage) gamethread++;
  soundsCount++;

  //-----ステージ１-----
  if (stagethred == 1) {
    if (bgmFlag && soundsCount == 5) {
      act1BGM.play();
      act1BGM.loop = true;
    }
    //コウモリの群れ
    if (gamethread == 100) shutugen.push(new Shutugen(5, SCREEN_W - 150 - 50 / 2, 150, 0, 0, 50, 50, 1));
    if (gamethread == 300) shutugen.push(new Shutugen(5, SCREEN_W / 2 - 50 / 2, SCREEN_H - 150 - 50 / 2, 0, 0, 50, 50, 7));
    if (gamethread == 600) shutugen.push(new Shutugen(5, SCREEN_W / 2 - 50 / 2, SCREEN_H / 2 - 50 / 2, 0, 0, 50, 50, 12));
    if (gamethread == 900) shutugen.push(new Shutugen(5, 150, SCREEN_H / 2 - 50 / 2, 0, 0, 50, 50, 9));
    if (gamethread == 1300) shutugen.push(new Shutugen(5, 150, 150, 0, 0, 50, 50, 13));
    if (gamethread == 1500) shutugen.push(new Shutugen(5, SCREEN_W - 150 - 50 / 2, SCREEN_H / 2 - 50 / 2, 0, 0, 50, 50, 10));
    if (gamethread == 1800) shutugen.push(new Shutugen(5, 150, SCREEN_H - 150 - 50 / 2, 0, 0, 50, 50, 3));
    if (gamethread == 2000) shutugen.push(new Shutugen(5, SCREEN_W / 2 - 50 / 2, 150, 0, 0, 50, 50, 5));
    //クリア条件
    if (batKillCount == 160 && difficulty != 3) gameSituation = 3;

    //超むずかしいモード
    if (difficulty == 3) {
      //コウモリ追加
      if (gamethread == 100) shutugen.push(new Shutugen(5, 150, SCREEN_H - 150 - 50 / 2, 0, 0, 50, 50, 3));
      if (gamethread == 300) shutugen.push(new Shutugen(5, SCREEN_W - 150 - 50 / 2, SCREEN_H / 2 - 50 / 2, 0, 0, 50, 50, 10));
      if (gamethread == 600) shutugen.push(new Shutugen(5, SCREEN_W - 150 - 50 / 2, 150, 0, 0, 50, 50, 15));
      if (gamethread == 900) shutugen.push(new Shutugen(5, 150, SCREEN_H - 150 - 50 / 2, 0, 0, 50, 50, 14));
      if (gamethread == 1300) shutugen.push(new Shutugen(5, SCREEN_W - 150 - 50 / 2, SCREEN_H / 2 - 50 / 2, 0, 0, 50, 50, 8));
      if (gamethread == 1500) shutugen.push(new Shutugen(5, SCREEN_W / 2 - 50 / 2, SCREEN_H / 2 - 50 / 2, 0, 0, 50, 50, 11));
      if (gamethread == 1800) shutugen.push(new Shutugen(5, SCREEN_W - 150 - 50 / 2, 150, 0, 0, 50, 50, 1));
      if (gamethread == 2000) shutugen.push(new Shutugen(5, SCREEN_W - 150 - 50 / 2, SCREEN_H - 150 - 50 / 2, 0, 0, 50, 50, 16));
      //パンプキン追加
      if (gamethread == 100) pumpkin.push(new Pumpkin(18, SCREEN_W / 2 - 40, SCREEN_H + 10, 0, 0, 80, 70));
      if (gamethread == 100) pumpkin.push(new Pumpkin(18, SCREEN_W / 2 - 40, -80, 0, 0, 80, 70));
      if (gamethread == 600) pumpkin.push(new Pumpkin(18, -90, SCREEN_H + 10, 0, 0, 80, 70));
      if (gamethread == 600) pumpkin.push(new Pumpkin(18, SCREEN_W + 10, -80, 0, 0, 80, 70));
      if (gamethread == 1300) pumpkin.push(new Pumpkin(18, SCREEN_W + 10, SCREEN_H / 2 - 70 / 2, 0, 0, 80, 70));
      if (gamethread == 1300) pumpkin.push(new Pumpkin(18, -90, SCREEN_H / 2 - 70 / 2, 0, 0, 80, 70));
      if (gamethread == 1800) pumpkin.push(new Pumpkin(18, SCREEN_W / 2 - 40, SCREEN_H + 10, 0, 0, 80, 70));
      if (gamethread == 1800) pumpkin.push(new Pumpkin(18, SCREEN_W / 2 - 40, -80, 0, 0, 80, 70));
      //クリア条件
      if (batKillCount == 320 && pumpkinKillCount == 8) gameSituation = 3;
    }
  }

  //-----ステージ２-----
  if (stagethred == 3) {
    if (bgmFlag && soundsCount == 5) {
      act2BGM.play();
      act2BGM.loop = true;
    }
    //トレント
    treantCount++;
    if (treantCount == 190) {
      treant.push(new Treant(13, 300, -500, 0, 0, 112, 110));
      treant.push(new Treant(13, 300, -900, 0, 0, 112, 110));
      treant.push(new Treant(13, 900, -500, 0, 0, 112, 110));
      treant.push(new Treant(13, 900, -900, 0, 0, 112, 110));
    }
    //コウモリ
    if (gamethread == 300) shutugen.push(new Shutugen(5, SCREEN_W / 2 - 50 / 2, SCREEN_H / 2 - 50 / 2, 0, 0, 50, 50, 11));
    if (gamethread == 1200) shutugen.push(new Shutugen(5, 150, 150, 0, 0, 50, 50, 2));
    if (gamethread == 1200) shutugen.push(new Shutugen(5, SCREEN_W - 150 - 50 / 2, SCREEN_H - 150 - 50 / 2, 0, 0, 50, 50, 4));
    if (gamethread == 2000) shutugen.push(new Shutugen(5, SCREEN_W / 2 - 50 / 2, SCREEN_H / 2 - 50 / 2, 0, 0, 50, 50, 11));
    if (gamethread == 2900) shutugen.push(new Shutugen(5, 150, 150, 0, 0, 50, 50, 2));
    if (gamethread == 2900) shutugen.push(new Shutugen(5, SCREEN_W - 150 - 50 / 2, SCREEN_H - 150 - 50 / 2, 0, 0, 50, 50, 4));
    //クリア条件
    if (treantKillCount == 4 && difficulty != 3) gameSituation = 3;

    //超むずかしいモード
    if (difficulty == 3) {
      //ゴースト追加
      if (gamethread == 100) {
        ghost.push(new Ghost(30, SCREEN_W - 200 - 70 / 2, SCREEN_H / 2 - 90 / 2, 0, 0, 70, 90));
        ghost.push(new Ghost(30, 150 - 70 / 2, SCREEN_H - 100 - 90 / 2, 0, 0, 70, 90));
        ghost.push(new Ghost(30, 400, SCREEN_H / 2, 0, 0, 70, 90));
      }
      if (gamethread == 600) {
        ghost.push(new Ghost(30, 300 - 70 / 2, 200, 0, 0, 70, 90));
        ghost.push(new Ghost(30, SCREEN_W - 500 - 70 / 2, SCREEN_H - 200 - 90 / 2, 0, 0, 70, 90));
        ghost.push(new Ghost(30, SCREEN_W / 2 + 200, SCREEN_H / 2 - 100, 0, 0, 70, 90));
      }
      if (gamethread == 1100) {
        ghost.push(new Ghost(30, 300 - 70 / 2, 200, 0, 0, 70, 90));
        ghost.push(new Ghost(30, SCREEN_W - 500 - 70 / 2, SCREEN_H - 200 - 90 / 2, 0, 0, 70, 90));
        ghost.push(new Ghost(30, SCREEN_W / 2 - 120, 150, 0, 0, 70, 90));
      }
      //クリア条件
      if (treantKillCount == 4 && ghostKillCount == 9) gameSituation = 3;
    }
  }

  //-----ステージ３-----
  if (stagethred == 5) {
    if (bgmFlag && soundsCount == 5) {
      act3BGM.play();
      act3BGM.loop = true;
    }
    //トレント
    treantCount++;
    if (treantCount == 190) {
      treant.push(new Treant(13, 50, -700, 0, 0, 112, 110));
      treant.push(new Treant(13, 1050, -950, 0, 0, 112, 110));
      treant.push(new Treant(13, 1050, -400, 0, 0, 112, 110));
    }
    //ゴースト
    if (gamethread == 200) {
      ghost.push(new Ghost(30, 300 - 70 / 2, 200, 0, 0, 70, 90));
      ghost.push(new Ghost(30, SCREEN_W - 500 - 70 / 2, SCREEN_H - 200 - 90 / 2, 0, 0, 70, 90));
    }
    if (gamethread == 1000) {
      ghost.push(new Ghost(30, SCREEN_W - 200 - 70 / 2, SCREEN_H / 2 - 90 / 2, 0, 0, 70, 90));
      ghost.push(new Ghost(30, 150 - 70 / 2, SCREEN_H - 100 - 90 / 2, 0, 0, 70, 90));
    }
    if (gamethread == 1800) {
      ghost.push(new Ghost(30, SCREEN_W / 2 - 70 / 2 - 200, SCREEN_H / 2 - 90 / 2, 0, 0, 70, 90));
      ghost.push(new Ghost(30, SCREEN_W / 2 - 70 / 2 + 200, SCREEN_H / 2 - 90 / 2, 0, 0, 70, 90));
    }
    //パンプキン
    if (gamethread == 600) {
      pumpkin.push(new Pumpkin(18, SCREEN_W - 10, SCREEN_H / 2 - 70 / 2, 0, 0, 80, 70));
    }
    if (gamethread == 1200) {
      pumpkin.push(new Pumpkin(18, SCREEN_W / 2 - 80 / 2, SCREEN_H + 10, 0, 0, 80, 70));
    }
    if (gamethread == 2200) {
      pumpkin.push(new Pumpkin(18, -90, SCREEN_H - 300, 0, 0, 80, 70));
      pumpkin.push(new Pumpkin(18, SCREEN_W / 2 - 80 / 2, -80, 0, 0, 80, 70));
    }
    //コウモリ
    if (gamethread == 400) shutugen.push(new Shutugen(5, SCREEN_W / 2 - 50 / 2, SCREEN_H - 150 - 50 / 2, 0, 0, 50, 50, 10));
    if (gamethread == 1500) shutugen.push(new Shutugen(5, SCREEN_W - 150 - 50 / 2, SCREEN_H / 2 - 50 / 2, 0, 0, 50, 50, 8));
    //クリア条件
    if (treantKillCount == 3 && ghostKillCount == 6 && pumpkinKillCount == 4 && difficulty != 3) gameSituation = 3;

    //超むずかしいモード
    if (difficulty == 3) {
      //コウモリ追加
      if (gamethread == 400) shutugen.push(new Shutugen(5, SCREEN_W - 150 - 50 / 2, 150, 0, 0, 50, 50, 15));
      if (gamethread == 900) shutugen.push(new Shutugen(5, 150, SCREEN_H / 2 - 50 / 2, 0, 0, 50, 50, 9));
      if (gamethread == 1000) shutugen.push(new Shutugen(5, 150, SCREEN_H - 150 - 50 / 2, 0, 0, 50, 50, 14));
      if (gamethread == 1400) shutugen.push(new Shutugen(5, SCREEN_W / 2 - 50 / 2, SCREEN_H / 2 - 50 / 2, 0, 0, 50, 50, 12));
      //ゴースト追加
      if (gamethread == 200) ghost.push(new Ghost(30, SCREEN_W / 2 + 200, SCREEN_H / 2 - 100, 0, 0, 70, 90));
      if (gamethread == 1000) ghost.push(new Ghost(30, 400, SCREEN_H / 2, 0, 0, 70, 90));
      if (gamethread == 1800) {
        ghost.push(new Ghost(30, SCREEN_W / 2 - 70 / 2, SCREEN_H / 2 - 90 / 2 + 200, 0, 0, 70, 90));
        ghost.push(new Ghost(30, SCREEN_W / 2 - 70 / 2, SCREEN_H / 2 - 90 / 2 - 200, 0, 0, 70, 90));
      }
      //パンプキン追加
      if (gamethread == 700) pumpkin.push(new Pumpkin(18, -90, SCREEN_H - 300, 0, 0, 80, 70));
      if (gamethread == 1000) pumpkin.push(new Pumpkin(18, -90, SCREEN_H + 10, 0, 0, 80, 70));
      if (gamethread == 2000) pumpkin.push(new Pumpkin(18, SCREEN_W + 10, SCREEN_H + 10, 0, 0, 80, 70));
      //クリア条件
      if (treantKillCount == 3 && ghostKillCount == 10 && pumpkinKillCount == 7) gameSituation = 3;
    }
  }

  //-----ステージ４-----
  if (stagethred == 7) {
    if (bgmFlag && soundsCount == 5) {
      act4BGM.play();
      act4BGM.loop = true;
    }
    //デビル
    if (gamethread == 100) devil.push(new Devil(37, SCREEN_W + 120, 100, 0, 0, 110, 80, 1));
    if (gamethread == 1100) devil.push(new Devil(37, -200, 200, 0, 0, 110, 80, 2));
    if (gamethread == 2100) devil.push(new Devil(37, SCREEN_W, SCREEN_H + 200, 0, 0, 110, 80, 3));
    if (gamethread == 3100) devil.push(new Devil(37, SCREEN_W / 2 - 55, -200, 0, 0, 110, 80, 4));
    //ゴースト
    if (gamethread == 700) {
      ghost.push(new Ghost(30, 300 - 70 / 2, SCREEN_H - 200 - 90 / 2, 0, 0, 70, 90));
      ghost.push(new Ghost(30, SCREEN_W / 2 + 200 - 70 / 2, 200 - 90 / 2, 0, 0, 70, 90));
    }
    if (gamethread == 1300) {
      ghost.push(new Ghost(30, SCREEN_W - 200 - 70 / 2, SCREEN_H / 2 - 90 / 2, 0, 0, 70, 90));
      ghost.push(new Ghost(30, SCREEN_W / 2 - 70 / 2, SCREEN_H - 100 - 90 / 2, 0, 0, 70, 90));
    }
    if (gamethread == 1800) {
      ghost.push(new Ghost(30, SCREEN_W / 2 - 70 / 2 - 400, SCREEN_H / 2 - 90 / 2, 0, 0, 70, 90));
      ghost.push(new Ghost(30, SCREEN_W / 2 - 70 / 2 + 400, SCREEN_H / 2 - 90 / 2, 0, 0, 70, 90));
    }
    if (gamethread == 2500) {
      ghost.push(new Ghost(30, 500 - 70 / 2, SCREEN_H / 2 - 90 / 2, 0, 0, 70, 90));
      ghost.push(new Ghost(30, SCREEN_W - 200 - 70 / 2, SCREEN_H - 300 - 90 / 2, 0, 0, 70, 90));
    }
    //コウモリ
    if (gamethread == 100) shutugen.push(new Shutugen(5, 150, SCREEN_H / 2 - 50 / 2, 0, 0, 50, 50, 6));
    if (gamethread == 600) shutugen.push(new Shutugen(5, 150, SCREEN_H - 150 - 50 / 2, 0, 0, 50, 50, 14));
    if (gamethread == 1600) {
      shutugen.push(new Shutugen(5, SCREEN_W - 150 - 50 / 2, 150, 0, 0, 50, 50, 15));
      shutugen.push(new Shutugen(5, SCREEN_W - 150 - 50 / 2, SCREEN_H - 150 - 50 / 2, 0, 0, 50, 50, 16));
    }
    if (gamethread == 3000) {
      shutugen.push(new Shutugen(5, SCREEN_W - 150 - 50 / 2, 150, 0, 0, 50, 50, 1));
      shutugen.push(new Shutugen(5, 150, SCREEN_H - 150 - 50 / 2, 0, 0, 50, 50, 3));
    }
    //クリア条件
    if (ghostKillCount == 8 && devilKillCount == 4 && difficulty != 3) gameSituation = 3;

    //超むずかしいモード
    if (difficulty == 3) {
      //デビル追加
      if (gamethread == 200) devil.push(new Devil(37, SCREEN_W, SCREEN_H + 200, 0, 0, 110, 80, 3));
      if (gamethread == 800) devil.push(new Devil(37, SCREEN_W / 2 - 55, -200, 0, 0, 110, 80, 4));
      if (gamethread == 1700) devil.push(new Devil(37, SCREEN_W + 120, 100, 0, 0, 110, 80, 1));
      if (gamethread == 3000) devil.push(new Devil(37, -200, 200, 0, 0, 110, 80, 2));
      //クリア条件
      if (ghostKillCount == 8 && devilKillCount == 8) gameSituation = 3;
    }
  }

  //ボス戦
  if (stagethred == 9) {
    if (bgmFlag && soundsCount == 10) {
      bossBGM.play();
      bossBGM.loop = true;
    }
    if (gamethread == 50) {
      bossSkull.push(new BossSkull(44, SCREEN_W / 2 - 132, 10, 0, 0, 132 * 2, 175 * 2));
      bossHand.push(new BossHand(52, 0, SCREEN_H - 248, 0, 0, 272, 248, 0));
      bossHand.push(new BossHand(53, SCREEN_W - 272, SCREEN_H - 248, 0, 0, 272, 248, 1));
      bossForm.push(new BossForm(57, -146 * 1.8, SCREEN_H / 2 - 161 * 1.7 / 2, 0, 0, 146 * 1.7, 161 * 1.7, 0));
      bossForm.push(new BossForm(60, SCREEN_W, SCREEN_H / 2 - 161 * 1.7 / 2, 0, 0, 146 * 1.7, 161 * 1.7, 1));
    }
    if (gamethread == 150) bossHpOnFlag = true;
    if (gamethread > 1000) gamethread = 200;

    //超むずかしいモード
    if (difficulty == 3) {
      if (formation == 0 || formation == 2) {
        if (gamethread == 300) {
          ghost.push(new Ghost(30, SCREEN_W / 2 - 70 / 2 - 400, SCREEN_H / 2 - 90 / 2, 0, 0, 70, 90));
          ghost.push(new Ghost(30, SCREEN_W / 2 - 70 / 2 + 400, SCREEN_H / 2 - 90 / 2, 0, 0, 70, 90));
        }
      } else {
        gamethread = 200;
      }
    }
  }

}


//一例リスト
  //if (gamethread == 200) itemPortion.push(new Portion(30,500,500,45*0.8,67*0.8));
  //if (gamethread == 200) itemElixir.push(new Elixir(31,500,500,50*0.8,68*0.8));

  //if (gamethread == 100) shutugen.push(new Shutugen(5, SCREEN_W - 150 - 50/2, 150, 0, 0, 50, 50, 1));
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