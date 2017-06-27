var KeyAnimation = function (para) {
    this.sampleName = para.sampleName;
    this.wrap = para.wrap;
    this.num = para.num;
    this.fps = para.fps;
    this.loop = para.loop;
    this.onComplete = para.onComplete;
};

var fn = KeyAnimation.prototype;

fn.createCanvas = function () {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = options.width * 2 || el.width() * 2;
    canvas.height = options.height * 2 || el.height() * 2;
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    el.append(canvas);

    this.canvas = canvas;
    this.ctx = ctx;
}

module.exports = KeyAnimation;
