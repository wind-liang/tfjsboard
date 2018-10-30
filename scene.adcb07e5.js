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
})({"scene/main/scene.js":[function(require,module,exports) {
var Scene = function Scene(game) {
  var s = {
    game: game // 初始化

  };
  var paddle = Paddle(game);
  var ball = Ball(game);
  var score = 0;
  var blocks = loadLevel(game, 1);
  game.registerAction('a', function () {
    paddle.moveLeft();
  });
  game.registerAction('d', function () {
    paddle.moveRight();
  });
  game.registerAction('f', function () {
    ball.fire();
  });

  s.draw = function () {
    // draw 背景
    game.context.fillStyle = "#554";
    game.context.fillRect(0, 0, 400, 300); // draw

    game.drawImage(paddle);
    game.drawImage(ball); // draw blocks

    for (var i = 0; i < blocks.length; i++) {
      var block = blocks[i];

      if (block.alive) {
        game.drawImage(block);
      }
    } // draw labels


    game.context.fillText('分数: ' + score, 10, 290);
  };

  s.update = function () {
    if (window.paused) {
      return;
    }

    ball.move(); // 判断游戏结束

    if (ball.y > paddle.y) {
      // 跳转到 游戏结束 的场景
      var end = SceneEnd.new(game);
      game.replaceScene(end);
    } // 判断相撞


    if (paddle.collide(ball)) {
      // 这里应该调用一个 ball.反弹() 来实现
      ball.反弹();
    } // 判断 ball 和 blocks 相撞


    for (var i = 0; i < blocks.length; i++) {
      var block = blocks[i];

      if (block.collide(ball)) {
        // log('block 相撞')
        block.kill();
        ball.反弹(); // 更新分数

        score += 100;
      }
    }
  }; // mouse event


  var enableDrag = false;
  game.canvas.addEventListener('mousedown', function (event) {
    var x = event.offsetX;
    var y = event.offsetY;
    log(x, y, event); // 检查是否点中了 ball

    if (ball.hasPoint(x, y)) {
      // 设置拖拽状态
      enableDrag = true;
    }
  });
  game.canvas.addEventListener('mousemove', function (event) {
    var x = event.offsetX;
    var y = event.offsetY; // log(x, y, 'move')

    if (enableDrag) {
      log(x, y, 'drag');
      ball.x = x;
      ball.y = y;
    }
  });
  game.canvas.addEventListener('mouseup', function (event) {
    var x = event.offsetX;
    var y = event.offsetY;
    log(x, y, 'up');
    enableDrag = false;
  });
  return s;
};
},{}]},{},["scene/main/scene.js"], null)
//# sourceMappingURL=/scene.adcb07e5.map