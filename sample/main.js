/* 変数 */
var screenCanvas, info;
var run = true;
var fps = 1000 / 30;
var mouse = new Point();
var ctx;
var fire = false;

/* 自機の定数 */
var CHARA_COLOR = "rgba(0, 0, 255, 0.75)";
var CHARA_SHOT_COLOR = "rgba(0, 255, 0, 0.75)";
var CHARA_SHOT_MAX_COUNT = 10;//画面上に出せるショットの最大値

/* メイン */
window.onload = function(){
    //スクリーンの初期化
    screenCanvas = document.getElementById("screen");
    screenCanvas.width = 256;
    screenCanvas.height = 256;

    //2dコンテキスト
    ctx = screenCanvas.getContext("2d");

    //イベントの登録
    screenCanvas.addEventListener("mousemove", mouseMove, true);
    screenCanvas.addEventListener("mousedown", mouseDown, true);
    window.addEventListener("keydown", keyDown, true);

    //エレメント関連
    info = document.getElementById("info");

    //自機初期化
    var chara = new Character();
    chara.init(10);

    //ショットの初期化
    var charaShot = new  Array(CHARA_SHOT_MAX_COUNT);
    for(i = 0; i < CHARA_SHOT_MAX_COUNT; i++){
        charaShot[i] = new CharacterShot();
    }

    //ループ処理を呼び出す
    (function(){
        //HTMLを更新
        info.innerHTML = mouse.x + " : " + mouse.y;

        //screenクリア
        ctx.clearRect(0, 0, screenCanvas.width, screenCanvas.height);

        //パスの設定を開始
        ctx.beginPath();

        //自機の位置を設定
        chara.position.x = mouse.x;
        chara.position.y = mouse.y;

        //自機を描くパスを設定
        ctx.arc(chara.position.x, chara.position.y, 10, 0, Math.PI * 2, false);

        //自機の色を設定する
        ctx.fillStyle = CHARA_COLOR;
        
        //自機を描く
        ctx.fill();

        //自機ショットのパスを設定
        ctx.beginPath();
        //自機ショットのチェック（描画用）
        for(i = 0; i < CHARA_SHOT_MAX_COUNT; i++){
            //ショットはもう発射されてる？
            if(charaShot[i].alive){
                //ショットを動かす
                charaShot[i].move();

                //ショットを描くパスを設定
                ctx.arc(
                    charaShot[i].position.x,
                    charaShot[i].position.y,
                    charaShot[i].size,
                    0, Math.PI * 2, false
                );
                //パスをいったん閉じる
                ctx.closePath();
            }
        }
        //自機ショットの色を設定
        ctx.fillStyle = CHARA_SHOT_COLOR;
        //自機ショットを描く
        ctx.fill();

        //フラグにより再帰呼び出し
        if(run){
            setTimeout(arguments.callee, fps);
        }

        //ショット
        if(fire){
            //自機ショットのチェック
            for(i = 0; i < CHARA_SHOT_MAX_COUNT; i++){
                //ショットが既に発射されているか？
                if(!charaShot[i].alive){
                    //ショットを自機の位置にセット、サイズ、速度
                    charaShot[i].set(chara.position, 3, 5);
                    //ループを抜ける
                    break;
                }
            }
            //ショットフラグオフ
            fire = false;
        }

    })();

}

/* イベント */
function mouseMove(event){
    //マウスカーソル座標の更新
    mouse.x = event.clientX - screenCanvas.offsetLeft;
    mouse.y = event.clientY - screenCanvas.offsetTop;
}

function keyDown(event){
    //キーコードを取得
    var ck = event.keyCode;

    //Escキーが推されたらフラグ
    if(ck === 27){
        run = false;
    }
}

function mouseDown(event){
    //弾発射
    fire = true;
}
