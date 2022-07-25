//****オプション画面****//

let difButtonX = 0;
let stageSelectButtonX = 0;
let bgmFlagButtonX = 0;
let seFlagButtonX = 0;
let voFlagButtonX = 0;

function option() {
    if (gameSituation == 5) {
        //難易度設定
        if (difficulty == 0) {//EASY
            fireReloadAddPoint = 20;
            thunderReloadAddPoint = 10;
            iceReloadAddPoint = 5;
            batAtackPoint = 2;
            treantShotCount = 500;
            pumpkinHP = 2000;
            ghostShotCount = 400;
            devilHP = 2000;
            bossHandAtackPoint = 5;
            poCurePoint = 500;
            elCurePoint = 1000;
            
            difButtonX = 120;//セレクターのX座標

        } else if (difficulty == 1) {//NORMAL
            fireReloadAddPoint = 10;
            thunderReloadAddPoint = 5;
            iceReloadAddPoint = 2;
            batAtackPoint = 5;
            treantShotCount = 400;
            pumpkinHP = 3000;
            ghostShotCount = 300;
            devilHP = 3000;
            bossHandAtackPoint = 10;
            poCurePoint = 250;
            elCurePoint = 500;

            difButtonX = 305;//セレクターのX座標

        } else if (difficulty == 2) {//HARD
            fireReloadAddPoint = 5;
            thunderReloadAddPoint = 2;
            iceReloadAddPoint = 1;
            batAtackPoint = 10;
            treantShotCount = 300;
            pumpkinHP = 5000;
            ghostShotCount = 200;
            devilHP = 5000;
            bossHandAtackPoint = 20;
            poCurePoint = 250;
            elCurePoint = 500;

            difButtonX = 505;//セレクターのX座標
        }
        
        //セレクターのX座標
        if(stagethred == 0) stageSelectButtonX = 130; 
        if(stagethred == 2) stageSelectButtonX = 225;
        if(stagethred == 4) stageSelectButtonX = 320;
        if(stagethred == 6) stageSelectButtonX = 415;
        if(stagethred == 8) stageSelectButtonX = 510;
        if(bgmFlag){
            bgmFlagButtonX = 880;
        }else{
            bgmFlagButtonX = 995;
        }
        if(seFlag){
            seFlagButtonX = 880;
        }else{
            seFlagButtonX = 995;
        }
        if(voFlag){
            voFlagButtonX = 880;
        }else{
            voFlagButtonX = 995;
        }

        //-----描画の処理-----
        //背景
        vcon.fillStyle = "#fffacd";
        vcon.fillRect(0, 0, SCREEN_W, SCREEN_H);
        vcon.drawImage(waku, 0, 0, SCREEN_W, SCREEN_H, -20, -18, 1393, 818);

        //オプションメニュー
        vcon.drawImage(optionMenu, 0, 0, 812, 368, 110, 180, 812*1.3, 368*1.3);

        //セレクター
        vcon.drawImage(optionSelecter, 0, 0, 300, 286, difButtonX, 283, 300*0.7, 286*0.3);
        vcon.drawImage(optionSelecter, 0, 0, 300, 286, stageSelectButtonX, 520, 300*0.3, 286*0.42);
        vcon.drawImage(optionSelecter, 0, 0, 300, 286, bgmFlagButtonX, 250, 300*0.4, 286*0.3);
        vcon.drawImage(optionSelecter, 0, 0, 300, 286, seFlagButtonX, 385, 300*0.4, 286*0.3);
        vcon.drawImage(optionSelecter, 0, 0, 300, 286, voFlagButtonX, 520, 300*0.4, 286*0.3);
        
        //バックボタン
        vcon.drawImage(optionBackButton, 0, 0, 216, 220, SCREEN_W-100, 30, 216/3, 220/3);

        //判定テスト
        // vcon.strokeStyle = "blue";
        // vcon.strokeRect(140, 250, 170, 160);
        // vcon.strokeStyle = "red";
        // vcon.strokeRect(325, 250, 170, 160);
        // vcon.strokeStyle = "black";
        // vcon.strokeRect(525, 250, 170, 160);

        // vcon.strokeStyle = "red";
        // vcon.strokeRect(130, 520, 90, 120);
        // vcon.strokeStyle = "blue";
        // vcon.strokeRect(225, 520, 90, 120);
        // vcon.strokeStyle = "black";
        // vcon.strokeRect(320, 520, 90, 120);
        // vcon.strokeStyle = "red";
        // vcon.strokeRect(415, 520, 90, 120);
        // vcon.strokeStyle = "blue";
        // vcon.strokeRect(510, 520, 90, 120);

        // vcon.strokeStyle = "red";
        // vcon.strokeRect(880, 250, 110, 100);
        // vcon.strokeStyle = "blue";
        // vcon.strokeRect(1000, 250, 120, 100);
        // vcon.strokeStyle = "red";
        // vcon.strokeRect(880, 380, 110, 100);
        // vcon.strokeStyle = "blue";
        // vcon.strokeRect(1000, 380, 120, 100);
        // vcon.strokeStyle = "red";
        // vcon.strokeRect(880, 510, 110, 100);
        // vcon.strokeStyle = "blue";
        // vcon.strokeRect(1000, 510, 120, 100);
    }
}