//***８方向の演算とキャラの描画***//

class P2 {
    constructor(x = 0, y = 0) { this.x = x; this.y = y }
    get clone() { return new P2(this.x, this.y) }//複写
    add({ x = 0, y = 0 }, { x: X, y: Y } = this) { this.x = X + x; this.y = Y + y; return this }//加算
    sub({ x = 0, y = 0 }, { x: X, y: Y } = this) { this.x = X - x; this.y = Y - y; return this }//減算
    mul({ x = 0, y = 0 }, { x: X, y: Y } = this) { this.x = X * x; this.y = Y * y; return this }//乗算
    div({ x = 0, y = 0 }, { x: X, y: Y } = this) { this.x = X / x; this.y = Y / y; return this }//除算
    sMul(n = 0, { x: X, y: Y } = this) { this.x = X * n; this.y = Y * n; return this }//スカラー倍
  }
  //__

  //追いかける素となるもの（マウスの座標）
  class MousePointer extends P2 {
    constructor(x, y) {
      super(x, y);
    }

    handleEvent(event) {
      this.x = event.clientX + window.pageXOffset - 38;
      this.y = event.clientY + window.pageYOffset - 50;
    }

    static create(view = can) {
      let obj = new this();
      view.addEventListener('mousemove', obj, false);
      return obj;
    }
  }

  //__
  //追いかけるもの
  class Stalker extends P2 {
    constructor(target, images, pointer, option = {}) {
      super(pointer.x, pointer.y);
      this.target = target;
      this.images = images;
      this.pointer = pointer;
      this.option = Object.assign({}, this.constructor.getDefaultOption(), option);
      this.disabled = false;

      this.chase();
    }


    chase() {
      const { PI, floor: int } = Math;
      if (this.disabled) return;
      let
        dp = this.pointer.clone.sub(this),
        n = 360 / this.images.length,
        ang = Math.atan2(dp.x, -dp.y) * 180 / PI;

      this.add(dp.sMul(this.option.accelerator));
      this.locate();
      if (!rockOn && jiki.hpPoint > 0) this.target.src = this.images[int((360 + ang) % 360 / n)].src;
      if (this.target.src == this.images[0].src) direc = 0;
      if (this.target.src == this.images[1].src) direc = 1;
      if (this.target.src == this.images[2].src) direc = 2;
      if (this.target.src == this.images[3].src) direc = 3;
      if (this.target.src == this.images[4].src) direc = 4;
      if (this.target.src == this.images[5].src) direc = 5;
      if (this.target.src == this.images[6].src) direc = 6;
      if (this.target.src == this.images[7].src) direc = 7;
      if (jiki.hpPoint <= 0) this.target.src = lose.src;//GameOver時の画像に変換
      requestAnimationFrame(this.chase.bind(this));
    }


    locate() {
      const int = Math.floor;
      let p = this.option.offset.clone.add(this);
      Object.assign(this.target.style, { left: int(p.x) + 'px', top: int(p.y) + 'px' });
      return this;
    }


    static getDefaultOption() {
      return {
        offset: new P2(0, 0),
        accelerator: .9
      };
    }


    static create(imageList, pointer, option = {}) {
      let
        div = document.createElement('div'),
        target = new Image,
        style = { position: 'absolute', left: '0px', top: '0px' },
        images = imageList.map(src => Object.assign(new Image, { src }));

      target.src = images[0].src;
      Object.assign(div.style, style);
      Object.assign(target.style, style);
      document.body.appendChild(div).appendChild(target);

      return new Stalker(target, images, pointer, option);
    }
  }

  //__ 

  let src = [
    "../images/witch0.gif",
    "../images/witch1.gif",
    "../images/witch2.gif",
    "../images/witch3.gif",
    "../images/witch4.gif",
    "../images/witch5.gif",
    "../images/witch6.gif",
    "../images/witch7.gif",
  ];

  //GameOver時の画像
  let lose = new Image();
  lose.src = "../images/witch0.gif";

  let
    pointer0 = MousePointer.create(),
    pointer1 = Stalker.create(src, pointer0, { offset: new P2(), accelerator: .4 });
