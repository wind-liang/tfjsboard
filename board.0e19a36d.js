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
})({"kX88":[function(require,module,exports) {
window.board = {};
var canvas = document.getElementById('id-canvas');
var context = canvas.getContext('2d'); //
// var getCoordInDocument = function(e) {
//     e = e || window.event;
//     var x = e.pageX || (e.clientX +
//       (document.documentElement.scrollLeft
//       || document.body.scrollLeft));
//     var y= e.pageY || (e.clientY +
//       (document.documentElement.scrollTop
//       || document.body.scrollTop));
//     return {'x':x,'y':y};
//   }
// document.getElementById('id-canvas').onmouseup = function (oEvent) {
//     if (!oEvent) {
//         oEvent = window.event;
//     }
//     if (oEvent.button === 0) {
//         var pointer = getCoordInDocument(oEvent);
//         console.log(pointer.x + ' ' + pointer.y);
//     }
// };

var paddleW = 150;
var paddleX = 150;
var paddleY = 250;
var paddleSpeed = 10;
var paddleWidth = paddleW;
var paddleHeight = 25;
var paddle = new Image();
paddle.src = 'https://tensorflow-pro.oss-cn-beijing.aliyuncs.com/paddle.jpg';

paddle.onload = function () {
  context.drawImage(paddle, paddleX, paddleY, paddleWidth, paddleHeight);
};

board.move = function (direction) {
  if (direction === 37) {
    board.left();
  } else if (direction === 39) {
    board.right();
  } // else if (direction === 38) {
  //     drawALL();
  // }
  // else {
  //
  // }

};

board.left = function () {
  paddleX -= paddleSpeed;

  if (paddleX >= 0) {
    drawALL();
  } else {
    paddleX += paddleSpeed;
    drawALL();
  }
};

board.right = function () {
  var temp = paddleX + paddleSpeed + paddleWidth;

  if (temp <= canvas.width) {
    drawALL();
    paddleX = paddleX + paddleSpeed;
  } else {
    drawALL();
  }
};

window.addEventListener('keydown', function (event) {
  if (event.key === 'a') {
    board.left();
  } else if (event.key === 'd') {
    board.right();
  }
}); // 球

var ballSpeedX = 1;
var ballSpeedY = 1;
var ballX = 150;
var ballY = 219; //var isKeeping = false;

var ball = new Image();
var ballWidth = 30;

var drawALL = function drawALL() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(paddle, paddleX, paddleY, paddleWidth, paddleHeight);
  context.drawImage(ball, ballX, ballY, ballWidth, ballWidth);
};

ball.src = 'https://tensorflow-pro.oss-cn-beijing.aliyuncs.com/ball.png';

ball.onload = function () {
  context.drawImage(ball, ballX, ballY, ballWidth, ballWidth);
};

var fps = 60;

var isBorder = function isBorder() {
  if (ballX < 0 || ballX + ballWidth > canvas.width) {
    ballSpeedX *= -1;
  }

  if (ballY < 0) {
    ballSpeedY *= -1;
  }
};

var intersect = function intersect(rect1, rect2) {
  var half1Width = rect1.width / 2;
  var half1Height = rect1.height / 2;
  var half2Width = rect2.width / 2;
  var half2Height = rect2.height / 2;
  var cen1 = {
    x: rect1.x + half1Width,
    y: rect1.y + half1Height
  };
  var cen2 = {
    x: rect2.x + half2Width,
    y: rect2.y + half2Height
  };
  return Math.abs(cen2.x - cen1.x) <= half1Width + half2Width && Math.abs(cen2.y - cen1.y) <= half1Height + half2Height;
};

var ballToPaddle = function ballToPaddle() {
  var b = {};
  b.x = ballX;
  b.y = ballY;
  b.width = ballWidth;
  b.height = ballWidth;
  var p = {};
  p.x = paddleX;
  p.y = paddleY;
  p.width = paddleWidth;
  p.height = paddleHeight;

  if (intersect(b, p)) {
    if (b.x < p.x + p.width * 1 / 4 && ballSpeedX > 0) {
      ballSpeedX *= -1;
    }

    if (b.x > p.x + p.width * 3 / 4 && ballSpeedX < 0) {
      ballSpeedX *= -1;
    }

    ballSpeedY *= -1;
  }
};

var isOver = function isOver() {
  if (ballY >= paddleY + paddleHeight) {
    window.isPredicting = false;
    clearInterval(window.board.timeout);
    alert('游戏结束！');
    init();
  }
};

var runloop = function runloop() {
  // events
  // if (isKeeping) {
  ballX += ballSpeedX;

  if (ballX <= 0 && ballSpeedX > 0) {
    ballX = 1;
  }

  ballY -= ballSpeedY;
  console.log(ballX + ' ' + ballY);
  console.log(ballSpeedX);
  isBorder();
  ballToPaddle();
  isOver();
  drawALL(); //  }
};

var init = function init() {
  ballSpeedX = 3;
  ballSpeedY = 3;
  ballX = 150;
  ballY = 219;
  ballWidth = 30;
  paddleX = 150;
  paddleY = 250;
  paddleSpeed = 10;
  paddleWidth = paddleW;
  paddleHeight = 25;
}; // setTimeout(function () {
//     runloop();
// }, 1000 / fps);


window.board.timeout;

window.board.start = function () {
  init(); // isKeeping = true;

  window.board.timeout = setInterval(function () {
    runloop();
  }, 1000 / fps);
};
},{}]},{},["kX88"], null)
//# sourceMappingURL=board.0e19a36d.map