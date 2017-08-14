var Config = require('./Config');
var Imglist = require('./Imglist');

// 加载页对象
var LoadViewController = function () {
    this.pageEl = $('.m-loading');

    this.init();
};

var fn = LoadViewController.prototype;

// 初始化，包括整体页面
fn.init = function () {
    $(document.documentElement).on('touchmove', function (e) {
        e.preventDefault();
    });

    Config.Loader
        .add(Imglist)
        .onLoad(function (p) {
            console.log(p);
        })
        .load(function () {
            console.log(this);
        });
};

// 显示
fn.show = function () {
    this.pageEl.show();
};

// 隐藏
fn.hide = function () {
    _that.onhide && _that.onhide();
    this.pageEl.hide();
};

module.exports = LoadViewController;
