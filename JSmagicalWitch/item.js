class Item {
    constructor(snum, x, y, sizeX, sizeY) {
        this.snum = snum;//スプライトナンバー
        this.x = x;
        this.y = y;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.kill = false;

        this.killCount = 0;//時間経過で消える
    }
    update() {
        this.killCount++;
        //画面が切り替わったら全部消すor時間経過で消える
        if (gameSituation != 1 || this.killCount > 300) {
            this.kill = true;
        }
    }

    draw() {
        if (this.killCount > 250) {
            if (this.killCount % 5 == 0) {
                drawSprite2(this.snum, this.x, this.y, 0.8);
            }
        } else {
            drawSprite2(this.snum, this.x, this.y, 0.8);
        }
    }
}

//ポーション HP25%回復
let getPortion = false;
let portionCount = 0;
class Portion extends Item {
    constructor(snum, x, y, sizeX, sizeY) {
        super(snum, x, y, sizeX, sizeY);
    }

    update() {
        super.update();

        //アイテムゲット時の処理
        if (!this.kill && checkHit(
            this.x, this.y, this.sizeX, this.sizeY,
            jiki.position.x, jiki.position.y, jiki.size, jiki.size
        )) {
            itemEffect.push(new ItemEffect(27,jiki.position.x-80/2-5,jiki.position.y-105/2-5,80,105));
            getPortion = true;
            this.kill = true;
        }
    }

    draw() {
        super.draw();
    }
}

//エリクサー HP50%回復
let getElixir = false;
let elixirCount = 0;
class Elixir extends Item {
    constructor(snum, x, y, sizeX, sizeY) {
        super(snum, x, y, sizeX, sizeY);
    }

    update() {
        super.update();

        //アイテムゲット時の処理
        if (!this.kill && checkHit(
            this.x, this.y, this.sizeX, this.sizeY,
            jiki.position.x, jiki.position.y, jiki.size, jiki.size
        )) {
            itemEffect.push(new ItemEffect(27,jiki.position.x-80/2-5,jiki.position.y-105/2-5,80,105));
            getElixir = true;
            this.kill = true;
        }
    }

    draw() {
        super.draw();
    }
}

//アイテム取得時のエフェクト
class ItemEffect {
    constructor(snum, x, y, sizeX, sizeY) {
        this.snum = snum;//スプライトナンバー
        this.x = x;
        this.y = y;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.kill = false;
        this.animeCount = 0;
    }
    update() {
        this.x = jiki.position.x-80/2-5;
        this.y = jiki.position.y-105/2-5;
        //画面が切り替わったら全部消す
        if (gameSituation != 1) {
            this.kill = true;
        }
    }

    draw() {
        this.animeCount++;
        if (this.animeCount < 10) {
            this.snum = 27;
        } else if (this.animeCount < 20) {
            this.snum = 28;
        } else if (this.animeCount < 30) {
            this.snum = 29;
        } else {
            this.kill = true;
        }
        drawSprite2(this.snum, this.x, this.y, 1);

    }
}