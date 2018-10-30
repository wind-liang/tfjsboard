// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"node_modules/@babel/runtime/helpers/setPrototypeOf.js":[function(require,module,exports) {
function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;
},{}],"node_modules/@babel/runtime/helpers/construct.js":[function(require,module,exports) {
var setPrototypeOf = require("./setPrototypeOf");

function isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = Reflect.construct;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

module.exports = _construct;
},{"./setPrototypeOf":"node_modules/@babel/runtime/helpers/setPrototypeOf.js"}],"node_modules/@babel/runtime/helpers/classCallCheck.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;
},{}],"node_modules/@babel/runtime/helpers/createClass.js":[function(require,module,exports) {
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;
},{}],"guagame/gua_game.js":[function(require,module,exports) {
"use strict";

var _construct2 = _interopRequireDefault(require("@babel/runtime/helpers/construct"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 瓜
var GuaGame =
/*#__PURE__*/
function () {
  function GuaGame(fps, images, runCallback) {
    var _this = this;

    (0, _classCallCheck2.default)(this, GuaGame);
    window.fps = fps;
    this.images = images;
    this.runCallback = runCallback; //

    this.scene = null;
    this.actions = {};
    this.keydowns = {};
    this.canvas = document.querySelector('#id-canvas');
    this.context = this.canvas.getContext('2d'); // events

    var self = this;
    window.addEventListener('keydown', function (event) {
      _this.keydowns[event.key] = true;
    });
    window.addEventListener('keyup', function (event) {
      self.keydowns[event.key] = false;
    });
    this.init();
  }

  (0, _createClass2.default)(GuaGame, [{
    key: "drawImage",
    value: function drawImage(img) {
      this.context.drawImage(img.image, img.x, img.y);
    } // update

  }, {
    key: "update",
    value: function update() {
      this.scene.update();
    } // draw

  }, {
    key: "draw",
    value: function draw() {
      this.scene.draw();
    } //

  }, {
    key: "registerAction",
    value: function registerAction(key, callback) {
      this.actions[key] = callback;
    }
  }, {
    key: "runloop",
    value: function runloop() {
      log(window.fps); // events

      var g = this;
      var actions = Object.keys(g.actions);

      for (var i = 0; i < actions.length; i++) {
        var key = actions[i];

        if (g.keydowns[key]) {
          // 如果按键被按下, 调用注册的 action
          g.actions[key]();
        }
      } // update


      g.update(); // clear

      g.context.clearRect(0, 0, g.canvas.width, g.canvas.height); // draw

      g.draw(); // next run loop

      setTimeout(function () {
        g.runloop();
      }, 1000 / window.fps);
    }
  }, {
    key: "imageByName",
    value: function imageByName(name) {
      var g = this;
      log('image by name', g.images);
      var img = g.images[name];
      var image = {
        w: img.width,
        h: img.height,
        image: img
      };
      return image;
    }
  }, {
    key: "runWithScene",
    value: function runWithScene(scene) {
      var g = this;
      g.scene = scene; // 开始运行程序

      setTimeout(function () {
        g.runloop();
      }, 1000 / window.fps);
    }
  }, {
    key: "replaceScene",
    value: function replaceScene(scene) {
      this.scene = scene;
    }
  }, {
    key: "__start",
    value: function __start(scene) {
      this.runCallback(this);
    }
  }, {
    key: "init",
    value: function init() {
      var g = this;
      var loads = []; // 预先载入所有图片

      var names = Object.keys(g.images);

      var _loop = function _loop() {
        var name = names[i];
        path = g.images[name];
        var img = new Image();
        img.src = path;

        img.onload = function () {
          // 存入 g.images 中
          g.images[name] = img; // 所有图片都成功载入之后, 调用 run

          loads.push(1);
          log('load images', loads.length, names.length);

          if (loads.length == names.length) {
            log('load images', g.images);

            g.__start();
          }
        };
      };

      for (var i = 0; i < names.length; i++) {
        var path;

        _loop();
      }
    }
  }], [{
    key: "instance",
    value: function instance() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this.i = this.i || (0, _construct2.default)(this, args);
      return this.i;
    }
  }]);
  return GuaGame;
}();
},{"@babel/runtime/helpers/construct":"node_modules/@babel/runtime/helpers/construct.js","@babel/runtime/helpers/classCallCheck":"node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"node_modules/@babel/runtime/helpers/createClass.js"}]},{},["guagame/gua_game.js"], null)
//# sourceMappingURL=/gua_game.175d42af.map