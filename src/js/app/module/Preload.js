/*
    常规H5图片及逐帧数据加载器

    特点：
        1、支持加载字符串形式单张图片、数组形式多张图片、逐帧数据、键值对(hash)对象
        2、链式调用
        3、自定义缓存中图片别名
        4、寄存器 Preload.Buffer

    API: add(string|Array|Object)   添加加载对象
        load(function)  加载过程，回调参数p为加载百分百
        onLoad(function)    加载完成
        setPath(string)     重设加载路径

    使用：
        var loader = new Preload.Loader('imgPath/');
        loader.add('aa.png')
            .add(['a2.png', 'a3.png'])
            .add({name1: 'name1.png', name2: 'name2.png'})
            .onLoad(function (p) {
                console.log(p);
            })
            .load(function () {
                console.log('succeed');
            });
    注意：支持加载的json格式为texturepacker(http://www.codeandweb.com/texturepacker)生成的普通json(Array)数据；
*/

var Preload = {};

// 寄存器
Preload.Buffer = {};

// 加载器
Preload.Loader = function (path) {
    this.path = path;
    this.loadNum = 0;
    this.loadedNum = 0;
};

var fn = Preload.Loader.prototype;

// 判断分流
fn.add = function (para) {
    if (typeof para === 'string') {
        this.loadType(para);
        this.loadNum++;
        return this;
    };
    if (para instanceof Array) {
        this.loadImgArray(para);
        this.loadNum += para.length;
        return this;
    };
    if (para instanceof Object) {
        var keys = Object.getOwnPropertyNames(para);
        for (var i = keys.length - 1; i >= 0; i--) {
            var key = keys[i];
            this.loadImg(para[key], key);
            this.loadNum++;
        }
        return this;
    };
};

// 再次判断分流
fn.loadType = function (para) {
    if (para instanceof Object) {
        var name = Object.getOwnPropertyNames(para)[0];
        this.loadImg(para[name], name);
        return;
    }
    if (para.indexOf('.json') > -1) {
        this.loadAjax(para);
        return;
    }
    if (/.png|.jpeg|.png|.svg|.gif/.test(para)) {
        this.loadImg(para);
        return;
    }
    console.error('无法加载的资源类型！', para);
};

// 加载单个图片
fn.loadImg = function (src, name) {
    var self = this;
    var _name = name || src;
    var img = new Image();
    img.src = this.path + src;
    img.onload = img.onerror = function () {
        var imgData = {};
        imgData.image = img;
        imgData.x = img.x;
        imgData.y = img.y;
        imgData.w = img.width;
        imgData.h = img.height;
        Preload.Buffer[_name] = imgData;
        self.updateProgress();
    };
};

// 加载图片数组
fn.loadImgArray = function (arr) {
    var aLength = arr.length;
    for (var i = 0; i < aLength; i++) {
        this.loadType(arr[i]);
    }
};

// 加载图片json数据
fn.loadAjax = function (para) {
    var self = this;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            self.readAjax(xhr.responseText);
        };
    };
    xhr.open('GET', this.path + para, true);
    xhr.send();
};

// 解析json数据
fn.readAjax = function (data) {
    var self = this;
    if (typeof data === 'string') {
        data = JSON.parse(data);
    };
    var img = new Image();
    var frames = data.frames;
    var fLength = frames.length;
    img.onload = function () {
        for (var i = 0; i < fLength; i++) {
            var tframe = frames[i];
            var tframeF = tframe.frame;
            var imgData = {};
            imgData.image = img;
            imgData.x = tframeF.x;
            imgData.y = tframeF.y;
            imgData.w = tframeF.w;
            imgData.h = tframeF.h;
            Preload.Buffer[tframe.filename] = imgData;
        }
        self.updateProgress();
    };
    img.src = this.path + data.meta.image;
};

// 加载进度
fn.updateProgress = function () {
    this.loadedNum++;
    var p = this.loadedNum / this.loadNum * 100;
    this.updateCallBack && this.updateCallBack(Math.floor(p));
    if (p === 100) {
        this.loadCallBack && this.loadCallBack();
    }
};

// 绑定事件
fn.onLoad = function (fn) {
    this.updateCallBack = fn;
    return this;
};

// 加载完成
fn.load = function (fn) {
    this.loadCallBack = fn.bind(Preload.Buffer);
    return this;
};

// 重设加载路径
fn.setPath = function (path) {
    this.path = path;
    return this;
};

module.exports = Preload;
