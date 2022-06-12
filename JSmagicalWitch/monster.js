//****敵キャラ****//

//----------------------------------敵のひな型----------------------------------
class Enemy {
    constructor(snum, x, y, vx, vy, sizeX, sizeY, hp) {
        this.snum = snum;//スプライトナンバー
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.animeCount = this.snum;//スプライトのアニメーション
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.hp = hp;//ヒットポイント
        this.kill = false;
    }
    update() {
        //基本動作
        this.x += this.vx;
        this.y += this.vy;

        //画面外に行ったら消える
        if (this.x < -200 || this.x > SCREEN_W || this.y < -200 || this.y > SCREEN_H) {
            this.kill = true;
        }
    }

    draw() {
        drawSprite(this.snum, this.x, this.y);
    }
}


//----------------------------------コウモリ----------------------------------

//コウモリ出現時のアニメーション 群れで出現するので群れが現れる最初だけ
class Shutugen extends Enemy {

    constructor(snum, x, y, vx, vy, sizeX, sizeY, hp, shutNum2) {
        super(snum, x, y, vx, vy, sizeX, sizeY, hp);
        this.shutugenCount = 0;
        this.shutNum2 = shutNum2;
    }

    update() {
        this.shutugenCount++;
        if (this.shutugenCount > 50) {
            if (this.shutugenCount % 10 == 0) {
                if (this.shutNum2 == 1) {
                    bat.push(new Bat(0, this.x, this.y + 10, 0, 0, 64, 43, 10, 1));
                    //スプライトナンバー, 出現位置ｘ, 出現位置ｙ, 動きｘ, 動きｙ, 大きさｘ, 大きさｙ, ヒットポイント
                }
                if (this.shutNum2 == 2) {
                    bat.push(new Bat(0, this.x, this.y + 10, 0, 0, 64, 43, 10, 2));
                    //スプライトナンバー, 出現位置ｘ, 出現位置ｙ, 動きｘ, 動きｙ, 大きさｘ, 大きさｙ, ヒットポイント
                }

            }
            if (this.shutugenCount > 250) {
                this.kill = true;
            }
        }
    }

    draw() {
        this.animeCount++;
        if (this.animeCount < 10) {
            this.snum = 5;
        } else if (this.animeCount < 20) {
            this.snum = 6;
        } else if (this.animeCount < 30) {
            this.snum = 7;
        } else if (this.animeCount < 40) {
            this.snum = 8;
        } else if (this.animeCount < 50) {
            this.snum = 9;
        } else {
            this.animeCount = 20;
        }
        super.draw();
    }
}

//コウモリ撃破時の浄化アニメーション
class Jyouka extends Enemy {
    draw() {
        this.animeCount++;
        if (this.animeCount > 10) {
            this.kill = true;
        }
        super.draw();
    }
}

//コウモリ
class Bat extends Enemy {
    constructor(snum, x, y, vx, vy, sizeX, sizeY, hp, shutNum) {
        super(snum, x, y, vx, vy, sizeX, sizeY, hp);
        this.shutNum = shutNum;
    }

    update() {
        super.update();
        //敵と自機がぶつかった時のダメージ判定
        if (!this.kill && checkHit(
            this.x, this.y, this.sizeX, this.sizeY,
            jiki.position.x, jiki.position.y, jiki.size, jiki.size
        )) {
            jiki.hpPoint -= 1;
        }

        //コウモリの動作
        if (this.shutNum == 1) {
            this.vx = 2;
            this.vy = 2;
            //弾の発射
            if (this.y == 200 && !this.kill) {
                homing(this.x, this.y);
            }
        }
        if (this.shutNum == 2) {
            this.vx = -2;
            this.vy = 2;
            //弾の発射
            if (this.y == 400 && !this.kill) {
                homing(this.x, this.y);
            }
        }
    }

    draw() {
        //コウモリの羽ばたきアニメーション
        this.animeCount++;
        if (this.animeCount < 10) {
            this.snum = 0;
        } else if (this.animeCount < 20) {
            this.snum = 1;
        } else if (this.animeCount < 30) {
            this.snum = 2;
        } else if (this.animeCount < 40) {
            this.snum = 1;
        } else {
            this.animeCount = 0;
        }
        super.draw();
    }
}

//コウモリの自機狙いの弾
function homing(objX, objY) {
    let an, dx, dy;
    an = Math.atan2(jiki.position.y - (objY + 15), jiki.position.x - (objX + 15));//+15は弾のサイズ1/2
    an += rand(-10, 10) * Math.PI / 180;//ランダムにばらける
    dx = Math.cos(an) * 5;//*5は弾の速度
    dy = Math.sin(an) * 5;
    batAtack.push(new BatAtack(3, objX, objY, dx, dy, 35, 33, 10));//コウモリの弾発射
    //スプライトナンバー, 出現位置ｘ, 出現位置ｙ, 動きｘ, 動きｙ, 大きさｘ, 大きさｙ, ヒットポイント
}

//コウモリの弾
class BatAtack extends Enemy {
    constructor(snum, x, y, vx, vy, sizeX, sizeY, hp) {
        super(snum, x, y, vx, vy, sizeX, sizeY, hp);
    }

    update() {
        super.update();

        if (checkHit(
            this.x, this.y, this.sizeX, this.sizeY,
            jiki.position.x, jiki.position.y, jiki.size, jiki.size
        )) {
            jiki.hpPoint -= 100;
            this.kill = true;
        }
    }
}