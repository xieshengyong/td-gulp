/*
    本地调试无网络时可释放此项；已集成fx，touch模块；
*/
require('zepto');

/*
    可按需加载Zepto模块
*/
require('./app/module/fx'); // 以动画形式的 show, hide, toggle, 和 fade*()方法.依赖fx模块。
require('./app/module/fx_methods'); // 以动画形式的 show, hide, toggle, 和 fade*()方法.依赖fx模块。
// require('./app/module/howler.core.js');

// 引入的包根据实际情况而定
var LoadViewController = require('./app/LoadViewController.js');
var IndexViewController = require('./app/IndexViewController.js');

var Init = function () {
    this.loadPageBack();
};

var fn = Init.prototype;

fn.loadPageBack = function () {
    this.loadView = this.loadView || new LoadViewController();
    this.loadView.show();
    this.loadView.onhide = this.indexPageBack.bind(this);
};

fn.indexPageBack = function () {
    console.log(this);
    this.indexView = this.indexView || new IndexViewController();
    this.indexView.show();
    // this.indexView.onhide = gamePageBack;
};

new Init(); // eslint-disable-line no-new
