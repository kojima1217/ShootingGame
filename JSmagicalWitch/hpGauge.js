//****HPゲージと魔法アイコン****//

function HpGauge() {
    if (gameSituation == 1 || gameSituation == 3) {
        vcon.beginPath();
        //魔法アイコンリロードゲージ
        if (fireReload < 1800) fireReload += fireReloadAddPoint;
        if (thunderReload < 1800) thunderReload += thunderReloadAddPoint;
        if (iceReload < 1800) iceReload += iceReloadAddPoint;
        if (reloadGauge == 1800) {
            vcon.fillStyle = "rgba(30, 200, 230, 0.7)";
        } else {
            vcon.fillStyle = "rgba(30, 150, 200, 0.7)";
        }
        vcon.fillRect(140, 85, reloadGauge / 10, 10);
        //HPゲージ枠
        vcon.fillStyle = "silver";
        vcon.fillRect(148, 58, 204, 24);
        vcon.fillStyle = "black";
        vcon.fillRect(150, 60, 200, 20);
        //HPゲージ
        if (jiki.hpPoint > 500) {
            vcon.fillStyle = "rgba(0,255,0,0.7)";
        } else if (jiki.hpPoint > 200) {
            vcon.fillStyle = "rgba(255,255,0,0.7)";
        } else {
            vcon.fillStyle = "rgba(255,0,0,0.7)";
        }
        vcon.fillRect(150, 60, jiki.hpPoint / 5, 20);
        //アイコン枠
        vcon.fillStyle = "silver";
        vcon.arc(110, 70, 40, 0, 2 * Math.PI);
        vcon.fill();
        vcon.closePath();
        vcon.beginPath();
        //魔法アイコン
        if (changeMagic == 0) {
            if (fireReload == 1800) {
                drawSprite2(21, 70, 29, 1 / 7 * 8);
            } else {
                drawSprite2(24, 70, 29, 1 / 7 * 8);
            }
            vcon.strokeStyle = "rgba(255,0,0,0.2)";
            reloadGauge = fireReload;
        }
        if (changeMagic == 1) {
            if (thunderReload == 1800) {
                drawSprite2(22, 70, 29, 1 / 7 * 8);
            } else {
                drawSprite2(25, 70, 29, 1 / 7 * 8);
            }
            vcon.strokeStyle = "rgba(255,255,0,0.2)";
            reloadGauge = thunderReload;
        }
        if (changeMagic == 2) {
            if (iceReload == 1800) {
                drawSprite2(23, 70, 29, 1 / 7 * 8);
            } else {
                drawSprite2(26, 70, 29, 1 / 7 * 8);
            }
            vcon.strokeStyle = "rgba(0,0,255,0.2)";
            reloadGauge = iceReload;
        }
        vcon.lineWidth = 10;
        vcon.arc(jiki.position.x, jiki.position.y - 5, 60, Math.PI / 180 * -90, Math.PI / 180 * (-90 + reloadGauge / 10 * 2), false);
        //MIN-90 MAX270
        vcon.stroke();
        vcon.closePath();

        //回復アイテムの処理
        if(getPortion){
            portionCount++;
            if(portionCount <= poCurePoint/5){//25%回復
                if(1000 > jiki.hpPoint) jiki.hpPoint+=5;
            }else{
                portionCount = 0;
                getPortion = false;
            }
        }
        if(getElixir){
            elixirCount++;
            if(elixirCount <= elCurePoint/5){//50%回復
                if(1000 > jiki.hpPoint) jiki.hpPoint+=5;
            }else{
                elixirCount = 0;
                getElixir = false;
            }
        }

        //ボスのHP
        if (bossHpOnFlag) {
            //HPゲージ枠
            vcon.strokeStyle = "rgba(255,215,0,0.5)";
            vcon.lineWidth = 4;
            vcon.strokeRect(838, 58, 404, 24+4);
            //HPゲージ
            vcon.fillStyle = "rgba(255,0,0,0.5)";
            vcon.fillRect(840, 60, bossHP / bossHPgauge, 20+4);
            if(bossHP < 0) bossHP = 0;
        }
    }

    //戦闘が終わったらリロード回復
    if (gameSituation != 1) {
        fireReload = 1800;
        thunderReload = 1800;
        iceReload = 1800;
    }
}