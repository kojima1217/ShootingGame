//****敵キャラ****//

//----------------------------------敵のひな型----------------------------------
class Enemy {
    constructor(snum, x, y, vx, vy, sizeX, sizeY) {
        this.snum = snum;//スプライトナンバー
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.animeCount = 0;//スプライトのアニメーション
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.kill = false;
    }
    update() {
        //基本動作
        this.x += this.vx;
        this.y += this.vy;

        //画面が切り替わったら全部消す
        if (gameSituation != 1) {
            this.kill = true;
        }
    }

    draw() {
        drawSprite(this.snum, this.x, this.y, 1);
    }
}

//ヒットエフェクト
class HitEffect extends Enemy {
    draw() {
        this.animeCount++;
        if (this.animeCount > 1) {
            this.kill = true;
        }
        let r = rand(1, 4);
        if (r == 1) {
            this.snum = 17;
        } else if (r == 2) {
            this.snum = 87;
        } else if (r == 3) {
            this.snum = 88;
        } else if (r == 4) {
            this.snum = 89;
        }
        super.draw();
    }
}

//撃破時の浄化アニメーション
class Jyouka extends Enemy {
    draw() {
        this.animeCount++;
        if (this.animeCount > 10) {
            this.kill = true;
        }
        super.draw();
    }
}

//弾
class EnemyShot extends Enemy {
    constructor(snum, x, y, vx, vy, sizeX, sizeY, attack) {
        super(snum, x, y, vx, vy, sizeX, sizeY);
        this.attack = attack;
    }

    update() {
        super.update();

        //画面外に行ったら消える
        if (this.x < -200 || this.x > SCREEN_W + 200 || this.y < -200 || this.y > SCREEN_H + 200) {
            this.kill = true;
        }

        if (barrierOn) {
            if (circleHit(
                this.x + this.sizeX / 2, this.y + this.sizeY / 2, this.sizeX / 2,
                jiki.position.x, jiki.position.y, 80//80はアイスバリアの半径
            )) {
                if (seFlag) {
                    itSE.currentTime = 0;
                    itSE.play();
                }
                this.kill = true;
            }
        } else {
            if (circleHit(
                this.x + this.sizeX / 2, this.y + this.sizeY / 2, this.sizeX / 2,
                jiki.position.x, jiki.position.y, jiki.size / 2
            )) {
                jiki.hpPoint -= this.attack;
                damageFlag = true;
                this.kill = true;
            }
        }

    }
}


//----------------------------------コウモリ----------------------------------

//コウモリ出現時のアニメーション 群れで出現するので群れが現れる最初だけ
class Shutugen extends Enemy {

    constructor(snum, x, y, vx, vy, sizeX, sizeY, shutNum2) {
        super(snum, x, y, vx, vy, sizeX, sizeY);
        this.shutugenCount = 0;
        this.shutNum2 = shutNum2;
        this.max = 250;
    }

    update() {
        super.update();
        if (this.shutNum2 == 17 || this.shutNum2 == 18) this.max = 150;
        this.shutugenCount++;
        if (this.shutugenCount == 1 && seFlag) {
            shoukanSE.currentTime = 0;
            shoukanSE.play();
        }
        if (this.shutugenCount > 50) {
            if (this.shutugenCount % 10 == 0) {
                for (let i = 1; i <= 18; i++) {
                    if (this.shutNum2 == i) bat.push(new Bat(0, this.x - 64 / 2 + 50 / 2, this.y - 43 / 2 + 50 / 2, 0, 0, 64, 43, i));
                    //スプライトナンバー, 出現位置ｘ, 出現位置ｙ, 動きｘ, 動きｙ, 大きさｘ, 大きさｙ, コウモリのパターン
                }
            }
            if (this.shutugenCount > this.max) {
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

//コウモリ
class Bat extends Enemy {
    constructor(snum, x, y, vx, vy, sizeX, sizeY, shutNum) {
        super(snum, x, y, vx, vy, sizeX, sizeY);
        this.shutNum = shutNum;
        this.hp = 1;
        this.active = true;
        this.pattern = 1;
        this.rockOn = 0;//1でロックオン
        this.togFlag = 0;//0=false 1=true
    }

    update() {
        super.update();
        //敵と自機がぶつかった時のダメージ判定
        if (!this.kill && checkHit(
            this.x, this.y, this.sizeX, this.sizeY,
            jiki.position.x, jiki.position.y, jiki.size, jiki.size
        )) {
            jiki.hpPoint -= batAtackPoint;
            damageFlag = true;
        }

        //画面外に行ったら消える
        if (this.x < -200 || this.x > SCREEN_W + 200 || this.y < -200 || this.y > SCREEN_H + 200) {
            if (this.shutNum != 17 && this.shutNum != 18) batKillCount++;
            this.kill = true;
        }

        if (this.hp > 0) {
            //コウモリの動作
            //batPattern(obj, turn, x1, y1, j1, x2, y2, j2, x3, y3, j3, x4, y4, j4, x5, y5, j5, x6, y6, j6) 
            if (this.shutNum == 1) batPattern(this, 3, -5, 0, 0, 0, 5, 1, 5, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0);
            if (this.shutNum == 2) batPattern(this, 3, 5, 0, 2, 0, 5, 1, -5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
            if (this.shutNum == 3) batPattern(this, 3, 5, 0, 2, 0, -5, 3, -5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
            if (this.shutNum == 4) batPattern(this, 3, -5, 0, 0, 0, -5, 3, 5, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0);

            if (this.shutNum == 5) batPattern(this, 4, -8 * diago, 5 * diago, 0, 8 * diago, 5 * diago, 1, 8 * diago, -5 * diago, 2, -8 * diago, -5 * diago, 3, 0, 0, 0, 0, 0, 0);
            if (this.shutNum == 6) batPattern(this, 4, 8 * diago, 5 * diago, 1, 8 * diago, -5 * diago, 2, -8 * diago, -5 * diago, 3, -8 * diago, 5 * diago, 0, 0, 0, 0, 0, 0, 0);
            if (this.shutNum == 7) batPattern(this, 4, 8 * diago, -5 * diago, 2, -8 * diago, -5 * diago, 3, -8 * diago, 5 * diago, 0, 8 * diago, 5 * diago, 1, 0, 0, 0, 0, 0, 0);
            if (this.shutNum == 8) batPattern(this, 4, -8 * diago, -5 * diago, 3, -8 * diago, 5 * diago, 0, 8 * diago, 5 * diago, 1, 8 * diago, -5 * diago, 2, 0, 0, 0, 0, 0, 0);

            if (this.shutNum == 9) batPattern(this, 3, 5, 0, 2, -10 * diago, 5 * diago, 1, 0, -5, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0);
            if (this.shutNum == 10) batPattern(this, 3, -5, 0, 0, 10 * diago, -5 * diago, 3, 0, 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0);

            if (this.shutNum == 11) batPattern(this, 5, 0, -5, 3, 5, 0, 2, 0, 5, 1, -5, 0, 0, 0, -5, 3, 0, 0, 0);
            if (this.shutNum == 12) batPattern(this, 5, 0, 5, 1, -5, 0, 0, 0, -5, 3, 5, 0, 2, 0, 5, 1, 0, 0, 0);

            if (this.shutNum == 13) batPattern(this, 3, 8 * diago, 5 * diago, 1, -5, 0, 0, 8 * diago, -5 * diago, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0);
            if (this.shutNum == 14) batPattern(this, 3, 8 * diago, -5 * diago, 3, -5, 0, 0, 8 * diago, 5 * diago, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0);
            if (this.shutNum == 15) batPattern(this, 3, -8 * diago, 5 * diago, 1, 5, 0, 2, -8 * diago, -5 * diago, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0);
            if (this.shutNum == 16) batPattern(this, 3, -8 * diago, -5 * diago, 3, 5, 0, 2, -8 * diago, 5 * diago, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0);

            if (this.shutNum == 17) batPattern(this, 1, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
            if (this.shutNum == 18) batPattern(this, 1, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

        } else {
            batKillCount++;
            if (stagethred == 1 && batKillCount == 80) itemPortion.push(new Portion(30, this.x + this.sizeX / 2 - 45 * 0.8 / 2, this.y + this.sizeY / 2 - 67 * 0.8 / 2, 45 * 0.8, 67 * 0.8));
            if (stagethred == 9 && batKillCount == 10) {
                itemElixir.push(new Elixir(31, this.x + this.sizeX / 2 - 50 * 0.8 / 2, this.y + this.sizeY / 2 - 68 * 0.8 / 2, 50 * 0.8, 68 * 0.8));
                batKillCount = 0;
            }
            if (seFlag) {
                batDeathSE.currentTime = 0;
                batDeathSE.play();
            }
            jyouka.push(new Jyouka(4, this.x + 10, this.y, this.vx, this.vy));
            this.kill = true;
        }
    }

    draw() {
        //コウモリの羽ばたきアニメーション
        this.animeCount++;
        if (this.animeCount < 10) {
            if (this.shutNum == 17 || this.shutNum == 18) {
                this.snum = 10;
            } else {
                this.snum = 0;
            }
        } else if (this.animeCount < 20) {
            if (this.shutNum == 17 || this.shutNum == 18) {
                this.snum = 11;
            } else {
                this.snum = 1;
            }
        } else if (this.animeCount < 30) {
            if (this.shutNum == 17 || this.shutNum == 18) {
                this.snum = 12;
            } else {
                this.snum = 2;
            }
        } else if (this.animeCount < 40) {
            if (this.shutNum == 17 || this.shutNum == 18) {
                this.snum = 11;
            } else {
                this.snum = 1;
            }
        } else {
            this.animeCount = 0;
        }
        super.draw();
    }
}

//コウモリの自機狙いの体当たり
function tackle(objX, objY, speed) {
    let an, dx, dy;
    an = Math.atan2(jiki.position.y - objY, jiki.position.x - objX);
    an += rand(-10, 10) * Math.PI / 180;//ランダムにばらける
    dx = Math.cos(an) * speed;
    dy = Math.sin(an) * speed;
    return [dx, dy];
}

//行動パターン中の体当たり用関数
function batRockOnAtack(obj) {
    if (obj.rockOn == 0) {
        obj.dx = tackle(obj.x + obj.sizeX / 2, obj.y + obj.sizeY / 2, 5)[0];
        obj.dy = tackle(obj.x + obj.sizeX / 2, obj.y + obj.sizeY / 2, 5)[1];
        obj.rockOn = 1;
    }
    if (obj.rockOn == 1) {
        obj.vx = obj.dx;
        obj.vy = obj.dy;
    }
}

//コウモリ行動パターンの条件式
function batConditions(pa, obj) {
    if (pa == 0) {
        return obj.x > 150;
    } else if (pa == 1) {
        return obj.y < SCREEN_H - 150;
    } else if (pa == 2) {
        return obj.x < SCREEN_W - obj.sizeX - 150;
    } else if (pa == 3) {
        return obj.y > 150;
    } else if (pa == 4) {
        return false;
    }
}

//コウモリ行動パターン
function batPattern(obj, turn, x1, y1, j1, x2, y2, j2, x3, y3, j3, x4, y4, j4, x5, y5, j5, x6, y6, j6) {
    if (obj.pattern == 1) {
        if (batConditions(j1, obj)) {
            obj.vx = x1;
            obj.vy = y1;

        } else {
            obj.togFlag = 1;
        }
        if (obj.togFlag == 1) {
            if (turn == 1) {
                //自機を狙って飛んでいく
                batRockOnAtack(obj);
            } else {
                obj.pattern = 2;
                obj.togFlag = 0;
            }
        }
    }
    if (obj.pattern == 2) {
        if (batConditions(j2, obj)) {
            obj.vx = x2;
            obj.vy = y2;
        } else {
            obj.togFlag = 1;
        }
        if (obj.togFlag == 1) {
            if (turn == 2) {
                //自機を狙って飛んでいく
                batRockOnAtack(obj);
            } else {
                obj.pattern = 3;
                obj.togFlag = 0;
            }
        }
    }
    if (obj.pattern == 3) {
        if (batConditions(j3, obj)) {
            obj.vx = x3;
            obj.vy = y3;
        } else {
            obj.togFlag = 1;
        }
        if (obj.togFlag == 1) {
            if (turn == 3) {
                //自機を狙って飛んでいく
                batRockOnAtack(obj);
            } else {
                obj.pattern = 4;
                obj.togFlag = 0;
            }
        }
    }
    if (obj.pattern == 4) {
        if (batConditions(j4, obj)) {
            obj.vx = x4;
            obj.vy = y4;
        } else {
            obj.togFlag = 1;
        }
        if (obj.togFlag == 1) {
            if (turn == 4) {
                //自機を狙って飛んでいく
                batRockOnAtack(obj);
            } else {
                obj.pattern = 5;
                obj.togFlag = 0;
            }
        }
    }
    if (obj.pattern == 5) {
        if (batConditions(j5, obj)) {
            obj.vx = x5;
            obj.vy = y5;
        } else {
            obj.togFlag = 1;
        }
        if (obj.togFlag == 1) {
            if (turn == 5) {
                //自機を狙って飛んでいく
                batRockOnAtack(obj);
            } else {
                obj.pattern = 6;
                obj.togFlag = 0;
            }
        }
    }
    if (obj.pattern == 6) {
        if (batConditions(j6, obj)) {
            obj.vx = x6;
            obj.vy = y6;
        } else {
            obj.togFlag = 1;
        }
        if (obj.togFlag == 1) {
            //自機を狙って飛んでいく
            batRockOnAtack(obj);
        }
    }
}

// //コウモリの自機狙いの弾
// function homing(objX, objY) {
//     let an, dx, dy;
//     an = Math.atan2(jiki.position.y - (objY + 15), jiki.position.x - (objX + 15));//+15は弾のサイズ1/2
//     an += rand(-10, 10) * Math.PI / 180;//ランダムにばらける
//     dx = Math.cos(an) * 5;//*5は弾の速度
//     dy = Math.sin(an) * 5;
//     batShot.push(new BatShot(3, objX, objY, dx, dy, 35, 33, 10));//コウモリの弾発射
//     //スプライトナンバー, 出現位置ｘ, 出現位置ｙ, 動きｘ, 動きｙ, 大きさｘ, 大きさｙ, ヒットポイント
// }

// //コウモリの弾
// class BatShot extends Enemy {
//     constructor(snum, x, y, vx, vy, sizeX, sizeY, hp) {
//         super(snum, x, y, vx, vy, sizeX, sizeY, hp);
//     }

//     update() {
//         super.update();

//         if (barrierOn) {
//             if (circleHit(
//                 this.x, this.y, this.sizeX,
//                 jiki.position.x, jiki.position.y, 80//80はアイスバリアの半径
//             )) {
//                 this.kill = true;
//             }
//         } else {
//             if (checkHit(
//                 this.x, this.y, this.sizeX, this.sizeY,
//                 jiki.position.x, jiki.position.y, jiki.size, jiki.size
//             )) {
//                 jiki.hpPoint -= 100;
//                 damageFlag = true;
//                 this.kill = true;
//             }
//         }

//     }
// }


//----------------------------------トレント----------------------------------
class Treant extends Enemy {
    constructor(snum, x, y, vx, vy, sizeX, sizeY) {
        super(snum, x, y, vx, vy, sizeX, sizeY);
        this.hp = 8000;
        this.move = true;
        this.actionCount = 0;
        this.killCount = 0;
        this.active = false;
    }

    update() {

        if (this.hp > 0) {
            this.actionCount++;

            if (this.move) {
                this.y += 20;
                if (this.actionCount > 50) {
                    this.move = false;
                }
            }

            if (this.actionCount > 200) {
                this.active = true;
            }
            if (this.active) {
                //弾の発射
                if (this.actionCount == treantShotCount) {
                    homing(this.x + this.sizeX / 2 - 25, this.y + this.sizeY / 2);
                    if (seFlag) {
                        treantShotSE.currentTime = 0;
                        treantShotSE.play();
                    }
                }
                if (this.actionCount > treantShotCount + 10) {
                    this.actionCount = 200;
                }
            }
        } else {//HPがゼロになったら
            this.active = false;
            this.killCount++;
            if (this.killCount == 1) {
                if (seFlag) {
                    treantDeathSE.currentTime = 0;
                    treantDeathSE.play();
                }
            }
            if (this.killCount > 100) {
                treantKillCount++;
                if (stagethred == 3 && this.x > 500 && this.y > 500) {
                    itemPortion.push(new Portion(30, this.x + this.sizeX / 2 - 45 * 0.8 / 2, this.y + this.sizeY / 2 - 67 * 0.8 / 2, 45 * 0.8, 67 * 0.8));
                }
                if (stagethred == 5 && this.x > 500 && this.y < 500) {
                    itemPortion.push(new Portion(30, this.x + this.sizeX / 2 - 45 * 0.8 / 2, this.y + this.sizeY / 2 - 67 * 0.8 / 2, 45 * 0.8, 67 * 0.8));
                }
                this.kill = true;
            }
        }

        //画面が切り替わったら全部消す
        if (gameSituation != 1) {
            this.kill = true;
        }

    }

    draw() {
        if (this.hp > 0) {
            if (!this.active) {
                if (this.actionCount > 150) {
                    if (this.actionCount % 5 == 0) {
                        this.snum = 13;
                    }
                    else {
                        this.snum = 15;
                    }
                } else {
                    this.snum = 15;//枯れ木
                }
            } else {
                if (this.actionCount > treantShotCount - 10 && this.actionCount <= treantShotCount + 10) {
                    this.snum = 14;
                } else {
                    this.snum = 13;
                }
            }
            super.draw();
        } else { //HPがゼロになったら
            this.snum = 14;
            if (this.killCount % 5 == 0) {
                super.draw();
            }
        }

    }
}

//トレントの自機狙いの弾
function homing(objX, objY) {
    let an, dx, dy;
    an = Math.atan2(jiki.position.y - (objY + 25), jiki.position.x - (objX + 25));//+25は弾のサイズ1/2
    //an += rand(-10, 10) * Math.PI / 180;//ランダムにばらける
    dx = Math.cos(an) * 5;//*5は弾の速度
    dy = Math.sin(an) * 5;
    treantShot.push(new TreantShot(16, objX, objY, dx, dy, 50, 50, 100));//弾発射
    //スプライトナンバー, 出現位置ｘ, 出現位置ｙ, 動きｘ, 動きｙ, 大きさｘ, 大きさｙ,攻撃力
}

//トレントの弾
class TreantShot extends EnemyShot {
}

//----------------------------------パンプキン----------------------------------
class Pumpkin extends Enemy {
    constructor(snum, x, y, vx, vy, sizeX, sizeY) {
        super(snum, x, y, vx, vy, sizeX, sizeY);
        this.hp = pumpkinHP;
        this.move = true;
        this.actionCount = 0;
        this.killCount = 0;
        this.active = true;
        this.shotCount = 1;

        //体当たり用
        this.an = 0;
        this.dx = 0;
        this.dy = 0;

        //弾をばらまく用
        this.dr = 90;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.hp > 0) {
            this.actionCount++;

            this.an = Math.atan2(jiki.position.y - this.y, jiki.position.x - this.x);
            this.dx = Math.cos(this.an) * 2;
            this.dy = Math.sin(this.an) * 2;

            if (this.move) {
                //体当たり
                this.vx = this.dx;
                this.vy = this.dy;
                if (this.actionCount > 100) {
                    this.vx = 0;
                    this.vy = 0;
                    this.move = false;
                }
            } else {
                if (this.actionCount > 200) {
                    this.shotCount++;
                    this.move = true;
                    this.actionCount = 0;
                }
                if (this.shotCount != 1 && this.shotCount % 2 == 0) {
                    if (this.actionCount >= 120 && this.actionCount < 170) {
                        scatter(this.x + this.sizeX / 2 - 24, this.y + this.sizeY / 2 - 24, this, 5);
                        if (seFlag) {
                            pumpkinShotSE.currentTime = 0;
                            pumpkinShotSE.play();
                        }
                    }
                }
            }

        } else {//HPがゼロになったら
            this.vx = 0;
            this.vy = 0;
            this.active = false;
            this.move = false;
            this.killCount++;
            if (this.killCount == 1) {
                if (seFlag) {
                    pumpkinDeathSE.currentTime = 0;
                    pumpkinDeathSE.play();
                }
            }
            if (this.killCount > 36) {
                pumpkinKillCount++;
                if (pumpkinKillCount == 3) itemPortion.push(new Portion(30, this.x + this.sizeX / 2 - 45 * 0.8 / 2, this.y + this.sizeY / 2 - 67 * 0.8 / 2, 45 * 0.8, 67 * 0.8));
                this.kill = true;
            }
        }

        //画面が切り替わったら全部消す
        if (gameSituation != 1) {
            this.kill = true;
        }

    }

    draw() {
        if (this.hp > 0) {
            //20,21,22 弾発射
            if (!this.move && this.shotCount != 0 && this.shotCount % 2 == 0) {
                if (this.actionCount < 110) {
                    this.snum = 20;
                } else if (this.actionCount < 120) {
                    this.snum = 21;
                } else if (this.actionCount < 180) {
                    this.snum = 22;
                } else {
                    this.snum = 18;
                }
            } else {
                //18,19
                if (this.actionCount % 25 == 0) {
                    if (this.snum == 18) {
                        this.snum++;
                    } else {
                        this.snum--;
                    }
                }
            }
        } else { //HPがゼロになったら
            //this.snum = 24;//〜29　killCount100の間に消える
            if (this.killCount < 6) {
                this.snum = 24;
            } else if (this.killCount < 12) {
                this.snum = 25;
            } else if (this.killCount < 18) {
                this.snum = 26;
            } else if (this.killCount < 24) {
                this.snum = 27;
            } else if (this.killCount < 30) {
                this.snum = 28;
            } else {
                this.snum = 29;
            }
        }
        super.draw();
    }
}

//パンプキンのばらまく弾
function scatter(objX, objY, obj, speed) {
    let an, dx, dy;
    an = obj.dr * Math.PI / 180;
    dx = Math.cos(an) * speed;//弾の速度
    dy = Math.sin(an) * speed;
    pumpkinShot.push(new PumpkinShot(23, objX, objY, dx, dy, 48, 48, 50));//弾発射
    obj.dr += 12;//ばら撒く角度の間隔
    if (obj.dr >= 360) obj.dr = 0;
}

//パンプキンの弾
class PumpkinShot extends EnemyShot {
}

//----------------------------------ゴースト----------------------------------
class Ghost extends Enemy {
    constructor(snum, x, y, vx, vy, sizeX, sizeY) {
        super(snum, x, y, vx, vy, sizeX, sizeY);
        this.hp = 2000;
        this.actionCount = 0;
        this.killCount = 0;
        this.active = false;
    }

    update() {

        if (this.hp > 0) {
            if (this.active) {

                if (this.vx != 0 && this.vy != 0) {
                    this.x += this.vx * diago;
                    this.y += this.vy * diago;
                } else {
                    this.x += this.vx;
                    this.y += this.vy;
                }
                this.actionCount++;

                //ランダムに動く
                if (this.actionCount % 20 == 0) {
                    this.vx = rand(-5, 5);
                    this.vy = rand(-5, 5);
                }

                //画面外にはいかない
                if (this.x <= 0) this.x = 0;
                if (this.x >= SCREEN_W - this.sizeX) this.x = SCREEN_W - this.sizeX
                if (this.y <= 0) this.y = 0;
                if (this.y >= SCREEN_H - this.sizeY) this.y = SCREEN_H - this.sizeY;

                //カウントが溜まると弾を撃つ
                if (this.actionCount > ghostShotCount) {
                    if (seFlag) {
                        ghostShotSE.currentTime = 0;
                        ghostShotSE.play();
                    }
                    //弾発射
                    way4(this.x + this.sizeX / 2 - 28, this.y + this.sizeY / 2 - 28, 10);//最後の数値は角度
                    way4(this.x + this.sizeX / 2 - 28, this.y + this.sizeY / 2 - 28, -10);
                    way4(this.x + this.sizeX / 2 - 28, this.y + this.sizeY / 2 - 28, 30);
                    way4(this.x + this.sizeX / 2 - 28, this.y + this.sizeY / 2 - 28, -30);
                    this.actionCount = 0;
                }

            } else {
                this.actionCount++;
                if (this.actionCount > 100) {
                    this.actionCount = 0;
                    this.active = true;
                }
            }

        } else {//HPがゼロになったら
            this.vx = 0;
            this.vy = 0;
            this.active = false;
            this.killCount++;
            if (this.killCount == 1) {
                if (seFlag) {
                    ghostDeathSE.currentTime = 0;
                    ghostDeathSE.play();
                }
            }
            if (this.killCount > 30) {
                ghostKillCount++;
                if (stagethred == 7 && ghostKillCount == 7) {
                    itemElixir.push(new Elixir(31, this.x + this.sizeX / 2 - 50 * 0.8 / 2, this.y + this.sizeY / 2 - 68 * 0.8 / 2, 50 * 0.8, 68 * 0.8));
                }
                this.kill = true;
            }
        }

        //画面が切り替わったら全部消す
        if (gameSituation != 1) {
            this.kill = true;
        }

    }

    draw() {
        if (this.hp > 0) {
            if (this.active) {
                if (this.actionCount > ghostShotCount - 20) {
                    this.snum = 32;
                } else {
                    if (this.actionCount % 5 == 0) {
                        this.snum = 31;
                    } else {
                        this.snum = 30;
                    }
                }
                super.draw();
            } else {
                if (this.actionCount % 10) { } else {
                    super.draw();
                }
            }
        } else { //HPがゼロになったら
            if (this.killCount < 10) {
                this.snum = 34;
            } else if (this.killCount < 20) {
                this.snum = 35;
            } else {
                this.snum = 36;
            }
            super.draw();
        }
    }
}

//ゴーストの４Wayの弾
function way4(objX, objY, rdi) {
    let an, dx, dy;
    an = Math.atan2(jiki.position.y - (objY + 28), jiki.position.x - (objX + 28));//弾のサイズ1/2
    an += rdi * Math.PI / 180;//ばらける
    dx = Math.cos(an) * 2;//弾の速度
    dy = Math.sin(an) * 2;
    ghostShot.push(new GhostShot(33, objX, objY, dx, dy, 57, 57, 100));//弾発射
    //スプライトナンバー, 出現位置ｘ, 出現位置ｙ, 動きｘ, 動きｙ, 大きさｘ, 大きさｙ, 攻撃力
}

//ゴーストの弾
class GhostShot extends EnemyShot {
}

//----------------------------------デビル----------------------------------
class Devil extends Enemy {
    constructor(snum, x, y, vx, vy, sizeX, sizeY, number) {
        super(snum, x, y, vx, vy, sizeX, sizeY);
        this.hp = devilHP;
        this.actionCount = 0;
        this.killCount = 0;
        this.active = true;
        this.number = number;//何体目のデビルか
        this.pattern = 1;//行動パターン
        this.paSwitch = 1;//行動分岐
        this.animeCount = 0;//アニメーション用
        this.shotFlag = 0;//弾発射時の動き用 0=false 1=true

        //弾をばらまく用
        this.dr = 90;
    }

    update() {

        if (this.hp > 0) {
            this.animeCount++;
            if (this.animeCount >= 1000) this.animeCount = 0;

            if (this.vx != 0 && this.vy != 0) {
                this.x += this.vx * diago;
                this.y += this.vy * diago;
            } else {
                this.x += this.vx;
                this.y += this.vy;
            }

            //移動パターン
            if (this.number == 1) {
                devilPattern(this, -50, 20, 0, -20, -20, 1, 20, 0, 2, -20, 20, 3, 4);
                //obj,x1,y1,j1,x4,y4,j4,x5,y5,j5,x6,y6,j6,reset
            }
            if (this.number == 2) {
                devilPattern(this, 50, 0, 4, 0, 50, 5, -50, 0, 6, 0, -50, 7, 1);
            }
            if (this.number == 3) {
                devilPattern(this, -20, -30, 8, -40, 20, 9, 40, 20, 10, 40, -20, 11, 1);
            }
            if (this.number == 4) {
                devilPattern(this, 0, 50, 12, -40, 0, 13, 40, 0, 14, -40, 0, 15, 4);
            }

        } else {//HPがゼロになったら
            this.vx = 0;
            this.vy = 0;
            this.active = false;
            this.killCount++;
            if (this.killCount == 1 && seFlag) {
                devilDeathSE.currentTime = 0;
                devilDeathSE.play();
            }
            if (this.killCount > 40) {
                devilKillCount++;
                if (devilKillCount == 2) itemElixir.push(new Elixir(31, this.x + this.sizeX / 2 - 50 * 0.8 / 2, this.y + this.sizeY / 2 - 68 * 0.8 / 2, 50 * 0.8, 68 * 0.8));
                this.kill = true;
            }
        }

        //画面が切り替わったら全部消す
        if (gameSituation != 1) {
            this.kill = true;
        }

    }

    draw() {
        if (this.hp > 0) {
            if (this.shotFlag == 1) {
                if (this.animeCount > 50) {
                    this.snum = 37;
                } else {
                    if (this.animeCount % 10 == 0) {
                        this.snum = 38;
                    } else if (this.animeCount % 5 == 0) {
                        this.snum = 37;
                    }
                }
            } else if (this.shotFlag == 0) {
                if (this.animeCount % 20 == 0) {
                    this.snum = 38;
                } else if (this.animeCount % 10 == 0) {
                    this.snum = 37;
                }
            }

        } else { //HPがゼロになったら
            if (this.killCount < 10) {
                this.snum = 40;
            } else if (this.killCount < 20) {
                this.snum = 41;
            } else if (this.killCount < 30) {
                this.snum = 42;
            } else {
                this.snum = 43;
            }
        }
        super.draw();
    }
}

//デビル弾連射
function rapid(objX, objY) {
    let an, dx, dy;
    an = Math.atan2(jiki.position.y - (objY + 32), jiki.position.x - (objX + 32));//弾のサイズ1/2
    dx = Math.cos(an) * 20;//弾の速度
    dy = Math.sin(an) * 20;
    devilShot.push(new DevilShot(39, objX, objY, dx, dy, 64, 64, 20));//弾発射
    //スプライトナンバー, 出現位置ｘ, 出現位置ｙ, 動きｘ, 動きｙ, 大きさｘ, 大きさｙ, 攻撃力
}

//デビル弾ばら撒き
function cyclone(objX, objY, obj, speed, rad) {
    let an, dx, dy;
    an = obj.dr * Math.PI / 180;
    dx = Math.cos(an) * speed;//弾の速度
    dy = Math.sin(an) * speed;
    devilShot.push(new DevilShot(39, objX, objY, dx, dy, 64, 64, 50));//弾発射
    obj.dr += rad;//ばら撒く角度の間隔
    if (obj.dr >= 360) obj.dr = 0;
}

//デビルの弾
class DevilShot extends EnemyShot {
}

//デビル行動パターンの条件式
function devilConditions(pa, obj) {
    if (pa == 0) {//pattern == 1
        return obj.y >= SCREEN_H / 2 + obj.sizeY / 2;
    } else if (pa == 1) {
        return obj.y <= 200;
    } else if (pa == 2) {
        return obj.x >= 1000;
    } else if (pa == 3) {
        return obj.y >= SCREEN_H / 2 + 100;
    } else if (pa == 4) {//pattern == 2
        return obj.x >= SCREEN_W - 300;
    } else if (pa == 5) {
        return obj.y >= SCREEN_H - 300;
    } else if (pa == 6) {
        return obj.x <= 200;
    } else if (pa == 7) {
        return obj.y <= 200;
    } else if (pa == 8) {//pattern == 3
        return obj.y <= 100;
    } else if (pa == 9) {
        return obj.x <= 100;
    } else if (pa == 10) {
        return obj.y >= SCREEN_H - 200;
    } else if (pa == 11) {
        return obj.x >= SCREEN_W - 200 || obj.y <= 200;
    } else if (pa == 12) {//pattern == 4
        return obj.y >= SCREEN_H / 2 - obj.sizeY / 2;
    } else if (pa == 13) {
        return obj.x <= 200;
    } else if (pa == 14) {
        return obj.x >= SCREEN_W - 300;
    } else if (pa == 15) {
        return obj.x <= SCREEN_W / 2 - obj.sizeX / 2;
    }
}

//デビル行動パターン
function devilPattern(obj, x1, y1, j1, x4, y4, j4, x5, y5, j5, x6, y6, j6, reset) {
    if (obj.pattern == 1) {
        obj.paSwitch = 1;
        if (devilConditions(j1, obj)) {
            obj.vx = 0;
            obj.vy = 0;
            obj.actionCount++;
            if (obj.actionCount > 50) {
                obj.pattern = 2;
                obj.actionCount = 0;
            }
        } else {
            obj.vx = x1;
            obj.vy = y1;
        }
    }
    if (obj.pattern == 2) {
        obj.vx = 0;
        obj.vy = 0;
        obj.actionCount++;
        obj.shotFlag = 1;
        if (obj.actionCount > 50 && obj.actionCount <= 150) {
            //弾連射
            rapid(obj.x + obj.sizeX / 2 - 32, obj.y + obj.sizeY / 2 - 32);
            if (seFlag) {
                devilShotSE.currentTime = 0;
                devilShotSE.play();
            }
        }
        if (obj.actionCount > 150) {
            obj.pattern = 3;
            obj.actionCount = 0;
        }
    }
    if (obj.pattern == 3) {
        obj.vx = 0;
        obj.vy = 0;
        obj.actionCount++;
        if (obj.actionCount > 10 && obj.actionCount <= 80) {
            //弾ばらまく
            cyclone(obj.x + obj.sizeX / 2 - 32, obj.y + obj.sizeY / 2 - 32, obj, 10, 30);
            if (seFlag) {
                devilShotSE.currentTime = 0;
                devilShotSE.play();
            }
        }
        if (obj.actionCount > 100) {
            if (obj.paSwitch == 1) {
                obj.pattern = 4;
            } else if (obj.paSwitch == 2) {
                obj.pattern = 5;
            } else if (obj.paSwitch == 3) {
                obj.pattern = 6;
            } else if (obj.paSwitch == 4) {
                obj.pattern = reset;//パターンの最初に戻る
            }
            obj.shotFlag = 0;
            obj.animeCount = 0;
            obj.actionCount = 0;
        }
    }
    if (obj.pattern == 4) {
        obj.paSwitch = 2;
        if (devilConditions(j4, obj)) {
            obj.vx = 0;
            obj.vy = 0;
            obj.actionCount++;
            if (obj.actionCount > 50) {
                obj.pattern = 2;
                obj.animeCount = 0;
                obj.actionCount = 0;
            }
        } else {
            obj.vx = x4;
            obj.vy = y4;
        }
    }
    if (obj.pattern == 5) {
        obj.paSwitch = 3;
        if (devilConditions(j5, obj)) {
            obj.vx = 0;
            obj.vy = 0;
            obj.actionCount++;
            if (obj.actionCount > 50) {
                obj.pattern = 2;
                obj.animeCount = 0;
                obj.actionCount = 0;
            }
        } else {
            obj.vx = x5;
            obj.vy = y5;
        }
    }
    if (obj.pattern == 6) {
        obj.paSwitch = 4;
        if (devilConditions(j6, obj)) {
            obj.vx = 0;
            obj.vy = 0;
            obj.actionCount++;
            if (obj.actionCount > 50) {
                obj.pattern = 2;
                obj.animeCount = 0;
                obj.actionCount = 0;
            }
        } else {
            obj.vx = x6;
            obj.vy = y6;
        }
    }
}

//----------------------------------ボス：スカル----------------------------------

let downFlag = false;
let deathLeft = false;
let deathRight = false;
let formation = 0;//1=プラズマ　3=レーザー
let formCount = 0;
let formTime = 700;
class BossSkull extends Enemy {
    constructor(snum, x, y, vx, vy, sizeX, sizeY) {
        super(snum, x, y, vx, vy, sizeX, sizeY);
        this.actionCount = 0;
        this.killCount = 0;
        this.active = false;//口を開けたらtrue
        this.downCount = 0;//口を開けている時間

        //弾をばらまく用
        this.dr = 90;
    }

    update() {

        if (bossHP > 0) {
            this.x += this.vx;
            this.y += this.vy;
            this.actionCount++;

            if (this.actionCount < 100) {//出現時は停止
                this.vx = 0;
                this.vy = 0;
            } else {
                if (!downFlag) {
                    if (formation == 0 || formation == 2) {//首を左右にゆっくり動かして目から弾
                        if (this.actionCount < 300) {
                            this.vx = -0.2;
                        } else if (this.actionCount < 700) {
                            this.vx = 0.2;
                        } else if (this.actionCount < 1100) {
                            this.vx = -0.2;
                        } else {
                            this.actionCount = 300;
                        }
                        //弾ばらまく
                        if (this.actionCount >= 300 && this.actionCount < 360) {
                            cyclone(this.x + 50, this.y + 110, this, 5, 30);
                            if (seFlag) {
                                devilShotSE.currentTime = 0;
                                devilShotSE.play();
                            }
                        }
                        if (this.actionCount >= 700 && this.actionCount < 760) {
                            cyclone(this.x + this.sizeX - 110, this.y + 110, this, 5, 30);
                            if (seFlag) {
                                devilShotSE.currentTime = 0;
                                devilShotSE.play();
                            }
                        }
                        //赤コウモリ召喚
                        if (this.actionCount == 500) {
                            shutugen.push(new Shutugen(5, 150, 150, 0, 0, 50, 50, 17));
                        }
                        if (this.actionCount == 900) {
                            shutugen.push(new Shutugen(5, SCREEN_W - 150 - 50 / 2, 150, 0, 0, 50, 50, 18));
                        }
                    } else if (formation == 1) {//プラズマ
                        //首が真ん中へ
                        if (this.x <= SCREEN_W / 2 - this.sizeX / 2) {
                            this.vx = 0.2;
                        }
                        if (this.x > SCREEN_W / 2 - this.sizeX / 2) {
                            this.vx = -0.2;
                        }
                        formCount++;
                        if (formCount > formTime) {//フォーメーションが終了
                            formation++;
                            formCount = 0;
                            this.actionCount = 500;
                        }
                    } else if (formation == 3) {//レーザー
                        //首が真ん中へ
                        if (this.x <= SCREEN_W / 2 - this.sizeX / 2) {
                            this.vx = 0.2;
                        }
                        if (this.x > SCREEN_W / 2 - this.sizeX / 2) {
                            this.vx = -0.2;
                        }
                        formCount++;
                        if (formCount > formTime) {//フォーメーションが終了
                            formation = 0;//formationをゼロにする
                            formCount = 0;
                            this.actionCount = 500;
                        }
                    }
                } else {//ダウンしたら口を開く
                    this.vx = 0;
                    this.vy = 0;
                    this.active = true;
                    this.downCount++;
                    if (this.downCount > 500) {
                        formation++;
                        this.active = false;
                        downFlag = false;
                        this.downCount = 0;

                        //腕は画面外で復活しておく　待機
                        if (deathLeft) {
                            bossHand.push(new BossHand(52, -this.sizeX, SCREEN_H, 0, 0, 272, 248, 0));
                            deathLeft = false;
                        }
                        if (deathRight) {
                            bossHand.push(new BossHand(53, SCREEN_W, SCREEN_H, 0, 0, 272, 248, 1));
                            deathRight = false;
                        }
                    }
                }

            }

        } else {//HPがゼロになったら
            this.vx = 0;
            this.vy = 0;
            this.active = false;
            this.killCount++;
            if (this.killCount == 10) bossDeath.push(new Death(81, this.x + this.sizeX / 2 + rand(-200, 200), this.y + this.sizeY / 2 + rand(-200, 200), 0, 0, 68, 67));
            if (this.killCount == 30) bossDeath.push(new Death(81, this.x + this.sizeX / 2 + rand(-200, 200), this.y + this.sizeY / 2 + rand(-200, 200), 0, 0, 68, 67));
            if (this.killCount == 50) bossDeath.push(new Death(81, this.x + this.sizeX / 2 + rand(-200, 200), this.y + this.sizeY / 2 + rand(-200, 200), 0, 0, 68, 67));
            if (this.killCount == 60) bossDeath.push(new Death(81, this.x + this.sizeX / 2 + rand(-200, 200), this.y + this.sizeY / 2 + rand(-200, 200), 0, 0, 68, 67));
            if (this.killCount == 80) bossDeath.push(new Death(81, this.x + this.sizeX / 2 + rand(-200, 200), this.y + this.sizeY / 2 + rand(-200, 200), 0, 0, 68, 67));
            if (this.killCount == 100) bossDeath.push(new Death(81, this.x + this.sizeX / 2 + rand(-200, 200), this.y + this.sizeY / 2 + rand(-200, 200), 0, 0, 68, 67));
            if (this.killCount == 120) bossDeath.push(new Death(81, this.x + this.sizeX / 2 + rand(-200, 200), this.y + this.sizeY / 2 + rand(-200, 200), 0, 0, 68, 67));
            if (this.killCount == 130) bossDeath.push(new Death(81, this.x + this.sizeX / 2 + rand(-200, 200), this.y + this.sizeY / 2 + rand(-200, 200), 0, 0, 68, 67));
            if (this.killCount == 150) bossDeath.push(new Death(81, this.x + this.sizeX / 2 + rand(-200, 200), this.y + this.sizeY / 2 + rand(-200, 200), 0, 0, 68, 67));
            if (this.killCount == 170) bossDeath.push(new Death(81, this.x + this.sizeX / 2 + rand(-200, 200), this.y + this.sizeY / 2 + rand(-200, 200), 0, 0, 68, 67));
            if (this.killCount == 190) bossDeath.push(new Death(81, this.x + this.sizeX / 2 + rand(-200, 200), this.y + this.sizeY / 2 + rand(-200, 200), 0, 0, 68, 67));
            if (this.killCount > 200) {
                //倒したらクリア画面へ
                bossHpOnFlag = false;
                gameSituation = 4;
                this.kill = true;
            }
        }

        //画面が切り替わったら全部消す
        if (gameSituation != 1) {
            bossHP = 50000;
            downFlag = false;
            deathLeft = false;
            deathRight = false;
            formation = 0;
            formCount = 0;
            bossHpOnFlag = false;
            this.kill = true;
        }

    }

    draw() {
        if (bossHP > 0) {
            if (!this.active) {
                if (this.actionCount < 100) {//点滅して出現
                    if (this.actionCount % 10 == 0) {
                        drawSprite(44, this.x, this.y, 2);
                    }
                } else {//口パカパカ
                    if (this.actionCount % 100 == 0) {
                        this.snum = 44;
                    } else if (this.actionCount % 50 == 0) {
                        this.snum = 46;
                    }
                    drawSprite(this.snum, this.x, this.y, 2);
                }

            } else {//口を開ける
                drawSprite(48, this.x, this.y, 2);
            }
        } else { //HPがゼロになったら
            //連続であちこち爆発　爆発は雑魚敵にする
            //点滅して少しずつ消えていく
            if (this.killCount % 10 == 0) {
                drawSprite(48, this.x, this.y, 2);
            }
        }
    }
}

//----------------------------------ボス：手----------------------------------
class BossHand extends Enemy {
    constructor(snum, x, y, vx, vy, sizeX, sizeY, lr) {
        super(snum, x, y, vx, vy, sizeX, sizeY);
        this.hp = bossHandHP;
        this.active = false;
        this.leftRight = lr;//0=左 1=右
        this.actionCount = 0;
        this.killCount = 0;
        this.animeCount = 0;
    }

    update() {

        if (this.hp > 0) {
            this.x += this.vx;
            this.y += this.vy;
            this.actionCount++;

            if (this.actionCount > 100) this.active = true;

            if (formation == 0 || formation == 2) {
                //掴みかかり
                if (this.actionCount == 220 && seFlag) {
                    bossHandSE.currentTime = 0;
                    bossHandSE.play();
                }
                if (this.actionCount == 240 && seFlag) {
                    bossHandSE.currentTime = 0;
                    bossHandSE.play();
                }
                if (this.actionCount == 250) {
                    this.dx = grab(this.x + this.sizeX / 2, this.y + this.sizeY / 2)[0];
                    this.dy = grab(this.x + this.sizeX / 2, this.y + this.sizeY / 2)[1];
                }
                if (this.actionCount > 250 && this.actionCount <= 300) {
                    this.vx = this.dx;
                    this.vy = this.dy;
                    //敵と自機がぶつかった時のダメージ判定
                    if (!this.kill && this.active && checkHit(
                        this.x, this.y, this.sizeX, this.sizeY,
                        jiki.position.x, jiki.position.y, jiki.size, jiki.size
                    )) {
                        jiki.hpPoint -= 10;
                        damageFlag = true;
                    }
                }
                if (this.actionCount > 300) {
                    //手が初期位置に戻って行く処理は左右で判定する
                    if (this.leftRight == 0) {
                        if (this.x >= 0) {
                            this.vx = -30;
                        } else {
                            this.vx = 0;
                        }
                        if (this.y <= SCREEN_H - this.sizeY) {
                            this.vy = 30;
                        } else {
                            this.vy = 0;
                        }
                    }
                    if (this.leftRight == 1) {
                        if (this.x <= SCREEN_W - this.sizeX) {
                            this.vx = 30;
                        } else {
                            this.vx = 0;
                        }
                        if (this.y <= SCREEN_H - this.sizeY) {
                            this.vy = 30;
                        } else {
                            this.vy = 0;
                        }
                    }
                    if (this.actionCount > 350) this.actionCount = 100;
                }
            } else if (formation == 1 || formation == 3) {
                this.actionCount = 100;
                if (this.leftRight == 0) {//左手
                    if (formCount < formTime - 50) {
                        if (this.x >= -this.sizeX) {
                            this.vx = -10;
                        } else {
                            this.vx = 0;
                        }
                        if (this.y <= SCREEN_H) {
                            this.vy = 10;
                        } else {
                            this.vy = 0;
                        }
                    } else {
                        if (this.x <= 0) {
                            this.vx = 10;
                        } else {
                            this.vx = 0;
                        }
                        if (this.y >= SCREEN_H - this.sizeY) {
                            this.vy = -10;
                        } else {
                            this.vy = 0;
                        }
                    }
                }
                if (this.leftRight == 1) {//右手
                    if (formCount < formTime - 50) {
                        if (this.x <= SCREEN_W) {
                            this.vx = 10;
                        } else {
                            this.vx = 0;
                        }
                        if (this.y <= SCREEN_H) {
                            this.vy = 10;
                        } else {
                            this.vy = 0;
                        }
                    } else {
                        if (this.x >= SCREEN_W - this.sizeX) {
                            this.vx = -10;
                        } else {
                            this.vx = 0;
                        }
                        if (this.y >= SCREEN_H - this.sizeY) {
                            this.vy = -10;
                        } else {
                            this.vy = 0;
                        }
                    }
                }
            }



        } else {//HPがゼロになったら
            this.vx = 0;
            this.vy = 0;
            this.active = false;
            this.killCount++;
            if (this.leftRight == 0) deathLeft = true;
            if (this.leftRight == 1) deathRight = true;
            if (this.killCount == 20) bossDeath.push(new Death(81, this.x + this.sizeX / 2 + rand(-100, 100), this.y + this.sizeY / 2 + rand(-100, 100), 0, 0, 68, 67));
            if (this.killCount == 40) bossDeath.push(new Death(81, this.x + this.sizeX / 2 + rand(-100, 100), this.y + this.sizeY / 2 + rand(-100, 100), 0, 0, 68, 67));
            if (this.killCount == 70) bossDeath.push(new Death(81, this.x + this.sizeX / 2 + rand(-100, 100), this.y + this.sizeY / 2 + rand(-100, 100), 0, 0, 68, 67));
            if (this.killCount == 90) bossDeath.push(new Death(81, this.x + this.sizeX / 2 + rand(-100, 100), this.y + this.sizeY / 2 + rand(-100, 100), 0, 0, 68, 67));
            if (this.killCount > 100) {
                if (formation == 0 || formation == 2) downFlag = true;
                this.kill = true;
            }
        }

        //ボスが倒されたら
        if (bossHP <= 0) {
            this.vx = 0;
            this.vy = 0;
            this.active = false;
            this.killCount++;
            if (this.killCount == 20) bossDeath.push(new Death(81, this.x + this.sizeX / 2 + rand(-100, 100), this.y + this.sizeY / 2 + rand(-100, 100), 0, 0, 68, 67));
            if (this.killCount == 40) bossDeath.push(new Death(81, this.x + this.sizeX / 2 + rand(-100, 100), this.y + this.sizeY / 2 + rand(-100, 100), 0, 0, 68, 67));
            if (this.killCount == 70) bossDeath.push(new Death(81, this.x + this.sizeX / 2 + rand(-100, 100), this.y + this.sizeY / 2 + rand(-100, 100), 0, 0, 68, 67));
            if (this.killCount == 90) bossDeath.push(new Death(81, this.x + this.sizeX / 2 + rand(-100, 100), this.y + this.sizeY / 2 + rand(-100, 100), 0, 0, 68, 67));
            if (this.killCount > 100) {
                this.kill = true;
            }
        }

        //画面が切り替わったら全部消す
        if (gameSituation != 1) {
            this.kill = true;
        }
    }

    draw() {//右手の時と左手の時で画像を変える
        if (bossHP > 0) {
            if (this.hp > 0) {
                if (this.actionCount < 100) {//点滅して出現
                    if (this.actionCount % 10 == 0) {
                        if (this.leftRight == 0) this.snum = 52;
                        if (this.leftRight == 1) this.snum = 53;
                        drawSprite(this.snum, this.x, this.y, 2);
                    }
                } else if (this.actionCount < 250) {
                    if (this.actionCount % 30 == 0) {
                        if (this.leftRight == 0) this.snum = 50;
                        if (this.leftRight == 1) this.snum = 53;
                    } else if (this.actionCount % 20 == 0) {
                        if (this.leftRight == 0) this.snum = 51;
                        if (this.leftRight == 1) this.snum = 54;
                    } else if (this.actionCount % 10 == 0) {
                        if (this.leftRight == 0) this.snum = 52;
                        if (this.leftRight == 1) this.snum = 55;
                    }
                    drawSprite(this.snum, this.x, this.y, 2);
                } else {
                    if (this.actionCount < 300) {
                        this.animeCount++;
                        if (this.animeCount > 100) this.animeCount = 0;
                        if (this.leftRight == 0) {
                            if (this.animeCount % 4 == 0) {
                                this.snum = 90;
                            } else if (this.animeCount % 2 == 0) {
                                this.snum = 92;
                            }
                        }
                        if (this.leftRight == 1) {
                            if (this.animeCount % 4 == 0) {
                                this.snum = 91;
                            } else if (this.animeCount % 2 == 0) {
                                this.snum = 93;
                            }
                        }
                    } else if (this.actionCount < 350) {
                        if (this.leftRight == 0) this.snum = 52;
                        if (this.leftRight == 1) this.snum = 53;
                    }
                    drawSprite(this.snum, this.x, this.y, 2);
                }
            } else {//手が破壊されたら爆発して消滅
                if (this.killCount % 10 == 0) {
                    drawSprite(this.snum, this.x, this.y, 2);
                }
            }
        } else {//ボスが死んだら点滅
            if (this.killCount % 10 == 0) {
                drawSprite(this.snum, this.x, this.y, 2);
            }
        }
    }
}

//ボスの手による掴みかかり
function grab(objX, objY) {
    let an, dx, dy;
    an = Math.atan2(jiki.position.y - objY, jiki.position.x - objX);
    dx = Math.cos(an) * 20;
    dy = Math.sin(an) * 20;
    return [dx, dy];
}

//ボス(手も含む)撃破時の爆発
class Death extends Enemy {
    draw() {
        this.animeCount++;
        if (this.animeCount == 1 && seFlag) {
            bossDeathSE.currentTime = 0;
            bossDeathSE.play();
        }
        if (this.animeCount < 10) {
            this.snum = 81;
        } else if (this.animeCount < 20) {
            this.snum = 82;
        } else if (this.animeCount < 30) {
            this.snum = 83;
        } else if (this.animeCount < 40) {
            this.snum = 84;
        } else if (this.animeCount < 50) {
            this.snum = 85;
        } else if (this.animeCount < 60) {
            this.snum = 86;
        } else {
            this.kill = true;
        }
        drawSprite(this.snum, this.x, this.y, 2);
    }
}

//----------------------------------ボス：フォーメーション（手）----------------------------------
class BossForm extends Enemy {
    constructor(snum, x, y, vx, vy, sizeX, sizeY, lr) {
        super(snum, x, y, vx, vy, sizeX, sizeY);
        this.active = false;
        this.leftRight = lr;//0=左 1=右

        //HPはなし　攻撃判定もない
    }

    update() {

        this.x += this.vx;
        this.y += this.vy;

        //プラズマボール
        if (formation == 1) {
            if (formCount <= formTime) {
                //まずは画面外から現れる（最初から画面外で待機している）
                if (formCount > 50 && formCount <= 100) {
                    if (this.leftRight == 0) {
                        if (this.x <= 0) {
                            this.vx = 10;
                        } else {
                            this.vx = 0;
                        }
                    }
                    if (this.leftRight == 1) {
                        if (this.x >= SCREEN_W - this.sizeX) {
                            this.vx = -10;
                        } else {
                            this.vx = 0;
                        }
                    }
                }
                //上下に移動
                if (formCount > 120 && formCount <= 170) {
                    if (this.leftRight == 0) {
                        if (this.y >= 0 - 100) {//ここの100は安置潰し
                            this.vy = -10;
                        } else {
                            this.vy = 0;
                        }
                    }
                    if (this.leftRight == 1) {
                        if (this.y <= SCREEN_H - this.sizeY + 100) {
                            this.vy = 10;
                        } else {
                            this.vy = 0;
                        }
                    }
                }
                //発射軌道
                if (formCount > 180 && formCount <= 600) {
                    if (this.leftRight == 0) {
                        if (this.y <= SCREEN_H - this.sizeY + 100) {//ここの100は安置潰し
                            this.vy = 2;
                            //プラズマボール発射
                            if (formCount % bossPlasmaRhythm == 0) {
                                bossPlasma.push(new BossPlasmaBall(63, this.x, this.y + this.sizeY / 2 - 96 * 1.7 / 2, bossPlasmaSpeed, 0, 96 * 1.7, 96 * 1.7, 200));
                                if (seFlag) {
                                    bossPbSE.currentTime = 0;
                                    bossPbSE.play();
                                }
                            }
                        } else {
                            this.vy = 0;
                        }
                    }
                    if (this.leftRight == 1) {
                        if (this.y >= 0 - 100) {
                            this.vy = -2;
                            //プラズマボール発射
                            if (formCount % bossPlasmaRhythm == 0) bossPlasma.push(new BossPlasmaBall(63, this.x, this.y + this.sizeY / 2 - 96 * 1.7 / 2, -bossPlasmaSpeed, 0, 96 * 1.7, 96 * 1.7, 200));
                        } else {
                            this.vy = 0;
                        }
                    }
                }
                //再び画面外へ
                if (formCount > 600) {
                    if (this.leftRight == 0) {
                        if (this.x >= -this.sizeX) {
                            this.vx = -10;
                        } else {
                            this.vx = 0;
                        }
                    }
                    if (this.leftRight == 1) {
                        if (this.x <= SCREEN_W) {
                            this.vx = 10;
                        } else {
                            this.vx = 0;
                        }
                    }
                }
            }
        }

        //極太レーザー
        if (formation == 3) {
            if (formCount <= formTime) {
                //まずは画面外から現れる（最初から画面外で待機している）
                if (formCount > 50 && formCount <= 100) {
                    if (this.leftRight == 0) {
                        if (this.x <= 0) {
                            this.vx = 10;
                        } else {
                            this.vx = 0;
                        }
                    }
                    if (this.leftRight == 1) {
                        if (this.x >= SCREEN_W - this.sizeX) {
                            this.vx = -10;
                        } else {
                            this.vx = 0;
                        }
                    }
                }
                //上下に移動
                if (formCount > 120 && formCount <= 170) {
                    if (this.leftRight == 0) {
                        if (this.y <= SCREEN_H - this.sizeY + 100) {
                            this.vy = 10;
                        } else {
                            this.vy = 0;
                        }
                    }
                    if (this.leftRight == 1) {
                        if (this.y >= 0 - 100) {
                            this.vy = -10;
                        } else {
                            this.vy = 0;
                        }
                    }
                }
                //発射軌道
                if (formCount > 180 && formCount <= 600) {
                    if (this.leftRight == 0) {
                        //極太レーザー発射
                        if (this.y >= SCREEN_H / 2 - 10) {//10は微調整 レーザー側もある
                            this.vy = -1;
                            if (formCount == 181) {
                                bossLaser.push(new BossLaser(67, this.x + 45, this.y + 33, 0, 0, 850 * 3, 69 * 3, 200, 0));
                                if (seFlag) {
                                    bossLaserSE.currentTime = 0;
                                    bossLaserSE.play();
                                }
                            }
                        } else {
                            this.vy = 0;
                        }
                    }
                    if (this.leftRight == 1) {
                        //極太レーザー発射
                        if (this.y <= SCREEN_H / 2 - this.sizeY + 10) {
                            this.vy = 1;
                            if (formCount == 181) bossLaser.push(new BossLaser(74, this.x - 50 - 850 * 3 + this.sizeX, this.y + 30, 0, 0, 850 * 3, 69 * 3, 200, 1));
                        } else {
                            this.vy = 0;
                        }
                    }
                }
                //再び画面外へ
                if (formCount > 600) {
                    if (this.leftRight == 0) {
                        if (this.x >= -this.sizeX) {
                            this.vx = -10;
                        } else {
                            this.vx = 0;
                        }
                    }
                    if (this.leftRight == 1) {
                        if (this.x <= SCREEN_W) {
                            this.vx = 10;
                        } else {
                            this.vx = 0;
                        }
                    }
                }
            }
        }

        //画面外で初期位置に戻る
        if (formation == 0 || formation == 2) {
            this.y = SCREEN_H / 2 - this.sizeY / 2;
        }

        //画面が切り替わったら全部消す
        if (gameSituation != 1) {
            this.kill = true;
        }
    }

    draw() {//右手の時と左手の時で画像を変える
        this.animeCount++;
        if (this.animeCount > 400) this.animeCount = 0;
        if (this.animeCount % 40 == 0) {
            if (this.leftRight == 0) this.snum = 57;
            if (this.leftRight == 1) this.snum = 60;
        } else if (this.animeCount % 30 == 0) {
            if (this.leftRight == 0) this.snum = 58;
            if (this.leftRight == 1) this.snum = 59;
        } else if (this.animeCount % 20 == 0) {
            if (this.leftRight == 0) this.snum = 57;
            if (this.leftRight == 1) this.snum = 60;
        } else if (this.animeCount % 10 == 0) {
            if (this.leftRight == 0) this.snum = 56;
            if (this.leftRight == 1) this.snum = 61;
        }

        drawSprite(this.snum, this.x, this.y, 1.7);

    }
}

//プラズマボール
class BossPlasmaBall extends EnemyShot {
    //63 66
    draw() {
        this.animeCount++;
        if (this.animeCount < 5) {
            this.snum = 63;
        } else if (this.animeCount < 10) {
            this.snum = 64;
        } else if (this.animeCount < 15) {
            this.snum = 65;
        } else if (this.animeCount < 20) {
            this.snum = 66;
        } else {
            this.animeCount = 0;
        }
        drawSprite(this.snum, this.x, this.y, 1.7);
    }
}

//極太レーザー
class BossLaser extends EnemyShot {
    constructor(snum, x, y, vx, vy, sizeX, sizeY, attack, lr) {
        super(snum, x, y, vx, vy, sizeX, sizeY, attack);
        this.leftRight = lr;
    }

    update() {//superしない

        //基本動作
        this.y += this.vy;

        if (formCount > 180 && formCount <= 600) {
            if (this.leftRight == 0) {
                if (this.y >= SCREEN_H / 2 + 33 - 10) {//10は微調整
                    this.vy = -1;
                } else {
                    this.vy = 0;
                }
            }
            if (this.leftRight == 1) {
                if (this.y <= SCREEN_H / 2 - 30 - this.sizeY + 10) {
                    this.vy = 1;
                } else {
                    this.vy = 0;
                }
            }
        }

        //画面が切り替わったら全部消す
        if (gameSituation != 1) {
            this.kill = true;
        }

        if (checkHit(
            this.x - 50, this.y + 40, this.sizeX + 100, this.sizeY - 40,
            jiki.position.x, jiki.position.y, jiki.size, jiki.size
        )) {
            jiki.hpPoint -= this.attack;
            damageFlag = true;
        }

    }

    draw() {
        this.animeCount++;
        if (formCount == 500) this.animeCount = 0;
        if (formCount < 500) {
            if (this.animeCount < 2) {
                if (this.leftRight == 1) this.snum = 67;//※左右逆なので注意
                if (this.leftRight == 0) this.snum = 74;
            } else if (this.animeCount < 4) {
                if (this.leftRight == 1) this.snum = 68;
                if (this.leftRight == 0) this.snum = 75;
            } else if (this.animeCount < 6) {
                if (this.leftRight == 1) this.snum = 69;
                if (this.leftRight == 0) this.snum = 76;
            } else if (this.animeCount < 8) {
                if (this.leftRight == 1) this.snum = 70;
                if (this.leftRight == 0) this.snum = 77;
            } else if (this.animeCount < 10) {
                if (this.leftRight == 1) this.snum = 71;
                if (this.leftRight == 0) this.snum = 78;
            } else {
                if (this.leftRight == 1) {
                    if (this.animeCount % 2 == 0) {
                        this.snum = 72;
                    } else {
                        this.snum = 73;
                    }
                }
                if (this.leftRight == 0) {
                    if (this.animeCount % 2 == 0) {
                        this.snum = 79;
                    } else {
                        this.snum = 80;
                    }
                }
            }
        } else {
            if (this.animeCount < 2) {
                if (this.leftRight == 1) this.snum = 71;
                if (this.leftRight == 0) this.snum = 78;
            } else if (this.animeCount < 4) {
                if (this.leftRight == 1) this.snum = 70;
                if (this.leftRight == 0) this.snum = 77;
            } else if (this.animeCount < 6) {
                if (this.leftRight == 1) this.snum = 69;
                if (this.leftRight == 0) this.snum = 76;
            } else if (this.animeCount < 8) {
                if (this.leftRight == 1) this.snum = 68;
                if (this.leftRight == 0) this.snum = 75;
            } else if (this.animeCount < 10) {
                if (this.leftRight == 1) this.snum = 67;
                if (this.leftRight == 0) this.snum = 74;
            } else {
                this.kill = true;
            }
        }
        drawSprite(this.snum, this.x, this.y, 3);
    }
}