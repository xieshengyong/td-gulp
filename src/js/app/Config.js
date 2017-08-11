require('./module/TD');
var Preload = require('./module/Preload');
var MediaSprite = require('./module/MediaSprite');

var Config = {};

// ajax请求链接
Config.requireUrl = '';

// 图片路径前缀
Config.imgPath = '/dist/img/';

// 默认分享语
Config.defShare = {
    title: '分享标题',
    desc: '分享描述',
    link: location.href,
    // 分享配图
    img: Config.imgPath + 'share.jpg',
    // 项目名，数据查询时候用
    proj: 'streetgame',
    // 填写公众号绑定的appid
    appid: 'wx12380ea254191f1b',
    cnzz: '1259179479'
};

Config.Loader = Preload.Loader;
Config.Buffer = Preload.Buffer;

var med = new MediaSprite({
    wrap: '.m-video-wrap',
    type: 'video',
    src: 'http://lolkhj.treedom.cn/dist/img/v7.mp4',
    fps: 25,
    timeline: {
        a: {
            begin: 0,
            end: 4.05
        }
    }
});

$('body').one('touchend', function () {
    med.play('a');
});

module.exports = Config;
