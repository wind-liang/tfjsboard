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
})({"board.js":[function(require,module,exports) {
window.board = {};
var canvas = document.getElementById('id-canvas');
var context = canvas.getContext('2d');
var x = 150;
var y = 250;
var speed = 10;
var img = new Image();
img.src = "https://tensorflow-pro.oss-cn-beijing.aliyuncs.com/paddle.jpg";

img.onload = function () {
  context.drawImage(img, x, y);
};

board.move = function (directon) {
  if (directon == 37) {
    this.left();
  }

  if (directon == 39) {
    this.right();
  }
};

board.left = function () {
  context.clearRect(0, 0, 400, 300);
  x -= speed;

  if (x >= 0) {
    context.drawImage(img, x, y);
  } else {
    x += speed;
    context.drawImage(img, x, y);
  }
};

board.right = function () {
  context.clearRect(0, 0, 400, 300);
  var temp = x + speed + img.width;

  if (temp <= canvas.width) {
    context.drawImage(img, x, y);
    x = x + speed;
  } else {
    context.drawImage(img, x, y);
  }
};

window.addEventListener('keydown', function (event) {
  if (event.key == 'a') {
    board.left();
  } else if (event.key == 'd') {
    board.right();
  }
});
},{}]},{},["board.js"], null)
//# sourceMappingURL=/board.6f1e82a3.map