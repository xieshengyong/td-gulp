var TD = require('./module/TD');
var Config = require('./Config');
var Imglist = require('./Imglist');

// 项目初始化的一些函数
var initProject = function () {
    // 让部分元素去适配屏幕
    setTimeout(() => {
        Config.scale = TD.responseBody({
            width: 375,
            height: 600,
            type: 'contain'
        });
    }, 300);

    $(document.documentElement).on('touchmove', function (e) {
        e.preventDefault();
    });
};

// 加载页对象
var LoadViewController = function () {
    // 公共变量
    var _that = this;

    // 私有变量
    var _private = {};

    _private.pageEl = $('.m-loading');

    _private.isInit = false;

    // 初始化，包括整体页面
    _private.init = function () {
        if (_private.isInit === true) {
            return;
        }
        initProject();

        // 加载体现在页面上
        _private.processLineEl = _private.pageEl.find('.loadProcess .inner');

        _private.gload = new Config.Loader(Config.imgPath);
        _private.gload
            .add(Imglist)
            .on('progress', function (p) {
                console.log(p);
            })
            .load(function () {
            });

        _private.isInit = true;
    };

    // 显示
    _that.show = function () {
        _private.pageEl.show();
    };

    // 隐藏
    _that.hide = function () {
        _that.onhide && _that.onhide();
        _private.pageEl.hide();
    };

    _private.init();
};

module.exports = LoadViewController;
