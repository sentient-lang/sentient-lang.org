"use strict";

SentientWebsite.SubsetSum = function () {
  var self = this;

  var codeBlock = $("code");
  var canvas, context, compiledProgram;
  var shuffleImage;

  var results, numbers;
  var sum = 25;
  var currentSolution;

  var eventHandlers = [];
  var registeredHandlers = false;
  var tolerance = 8;

  self.initialize = function () {
    shuffleImage = new Image();
    shuffleImage.src = "/images/shuffle.png";
    shuffleImage.onload = render;

    $.getJSON("/compiled/subset-sum.json", function (program) {
      compiledProgram = program;

      shuffle();
      run();
      render();
    });
  };

  var shuffle = function () {
    numbers = [];

    for (var i = 0; i < 20; i += 1) {
      var random = Math.floor(Math.random() * 30) - 5;
      numbers.push(random);
    }
  };

  var run = function () {
    currentSolution = 0;

    results = Sentient.run({
      program: compiledProgram,
      assignments: {
        numbers: numbers,
        sum: sum
      },
      number: 7
    });

    var last = results[results.length - 1];
    if (typeof last.members === "undefined") {
      results.pop();
    }
  };

  var render = function () {
    if (typeof results === "undefined") {
      return;
    }

    setupCanvas();

    renderGrid(54, 16, 42, 16, 11.5);
    renderSum(7, 37, 42, 16, 10);
    renderShuffle(15, 150, 25);

    if (SentientWebsite.debug) {
      renderHandlers();
    }

    bindPaperclip();
    registeredHandlers = true;

    if (!$(canvas).is(":visible")) {
      $(canvas).fadeIn();
      $(".paperclip").fadeIn();
    }
  };

  var setupCanvas = function () {
    if (typeof canvas === "undefined") {
      var container = codeBlock.parent();

      $(container).prepend(
        "<canvas id='subset-sum-example' width='280' height='200'></canvas>"
      );

      canvas = $("#subset-sum-example")[0];
      context = canvas.getContext("2d");
      context.translate(0.5, 0.5);
      canvas.addEventListener("mousedown", handleEvent);
    } else {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  /* jshint maxcomplexity:20 */
  var renderGrid = function (gridX, gridY, cellSize, fontSize, fontPadding) {
    context.save();
    context.font = fontSize + "px Open Sans";

    var result = results[currentSolution];

    for (var i = 0; i < 5; i += 1) {
      for (var j = 0; j < 4; j += 1) {
        var index = j * 5 + i;
        var member;

        if (self.animating && self.frame[j][i]) {
          member = true;
        } else if (self.animating) {
          member = false;
        } else if (typeof result !== "undefined") {
          member = result.members[index];
        } else {
          member = false;
        }

        var x = gridX + i * cellSize;
        var y = gridY + j * cellSize;

        if (member && self.animating) {
          context.fillStyle = self.swap ? "black" : "lime";
        } else if (self.animating) {
          context.fillStyle = self.swap ? "yellow" : "black";
        } else if (member) {
          context.fillStyle = "#ffa";
        } else {
          context.fillStyle = "#f6f6f6";
        }

        context.fillRect(x, y, cellSize, cellSize);

        context.strokeStyle = "gray";
        context.strokeRect(x, y, cellSize, cellSize);

        var number = numbers[index];

        var text;
        if (self.animating) {
          text = self.animationText[j][i];
          number = 1;
        } else {
          text = number;
        }

        var fontX = x + fontPadding + textOffset(number, fontSize);
        var fontY = y + fontSize + fontPadding;

        context.fillStyle = "black";
        context.fillText(text, fontX, fontY);
      }
    }

    context.restore();

    if (!registeredHandlers) {
      var toX = gridX + 5 * cellSize;
      var toY = gridY + 4 * cellSize;

      eventHandlers.push({
        fromX: gridX, fromY: gridY,
        toX: toX, toY: toY,
        fn: nextSolution, params: {}
      });
    }
  };

  var renderSum = function (x, y, cellSize, fontSize, fontPadding) {
    context.save();
    context.font = fontSize + "px Open Sans";

    var fontX = x + fontPadding + textOffset(sum, fontSize);
    var fontY = y + fontSize + fontPadding;

    if (!self.animating) {
      context.fillText(sum, fontX, fontY);
    }

    var plusX = fontX + fontPadding / 2 - textOffset(sum, fontSize);
    var plusY = fontY - fontSize - fontPadding;
    var minusX = plusX;
    var minusY = fontY + fontSize + fontPadding;

    context.font = (fontSize * 1.3) + "px Open Sans";

    context.fillStyle = "#AC1D0C";

    if (self.animating) {
      context.fillText("S", plusX, plusY);
    } else {
      context.fillText("+", plusX, plusY);
    }

    context.fillStyle = "#434AFD";

    if (self.animating) {
      context.fillText("L", minusX, minusY);
    } else {
      context.fillText("–", minusX, minusY);
    }

    context.restore();

    if (!registeredHandlers) {
      eventHandlers.push({
        fromX: plusX, fromY: plusY - fontSize,
        toX: plusX + fontSize, toY: plusY,
        fn: changeSum, params: { direction: 1 }
      });

      eventHandlers.push({
        fromX: minusX, fromY: minusY - fontSize,
        toX: minusX + fontSize, toY: minusY,
        fn: changeSum, params: { direction: -1 }
      });
    }
  };

  var renderShuffle = function (x, y, size) {
    context.save();

    context.drawImage(shuffleImage, x, y, size, size);
    context.restore();

    if (!registeredHandlers) {
      eventHandlers.push({
        fromX: x, fromY: y,
        toX: x + size, toY: y + size,
        fn: shuffleGrid, params: {}
      });
    }
  };

  var renderHandlers = function () {
    context.save();

    for (var i = 0; i < eventHandlers.length; i += 1) {
      var handler = eventHandlers[i];

      context.strokeStyle = "red";

      context.strokeRect(
        handler.fromX,
        handler.fromY,
        handler.toX - handler.fromX,
        handler.toY - handler.fromY
      );

      context.strokeStyle = "blue";

      context.strokeRect(
        handler.fromX - tolerance,
        handler.fromY - tolerance,
        handler.toX - handler.fromX + 2 * tolerance,
        handler.toY - handler.fromY + 2 * tolerance
      );
    }

    context.restore();
  };

  var textOffset = function (number, fontSize) {
    var offset = 0;
    var length = Math.abs(number).toString().length;

    if (length === 1) {
      offset += fontSize / 3;
    } else if (length === 3) {
      offset -= fontSize / 3;
    }

    if (number < 0) {
      offset -= fontSize / 6;
    }

    return offset;
  };

  var bindPaperclip = function () {
    var paperclip = $(".paperclip");
    var degrees = 30;

    paperclip.click(function () {
      if (self.animating) {
        return;
      }

      degrees += 30;
      degrees %= 360;

      paperclip.css("-ms-transform", "rotate(" + degrees + "deg)");
      paperclip.css("-webkit-transform", "rotate(" + degrees + "deg)");
      paperclip.css("transform", "rotate(" + degrees + "deg)");

      if (degrees === 30) {
        animate();
      }
    });
  };

  var animate = function () {
    canvas.removeEventListener("mousedown", handleEvent);
    self.animating = true;

    var t = true;
    var _ = false;

    var startFrame = [
      [_, t, _, _, _],
      [_, _, t, _, t],
      [t, t, t, _, _],
      [_, _, _, _, t]
    ];

    self.animationText = [
      ["e", "n", "t", "i", "e"],
      ["", "", "", "", "n"],
      ["a", "", "g", "", "t"],
      ["", "n", "", "", ""]
    ];

    self.frame = startFrame;

    setInterval(function () {
      render();

      var nextFrame = [];
      for (var y = 0; y < self.frame.length; y += 1) {
        var row = self.frame[y];
        var nextRow = [];

        for (var x = 0; x < row.length; x += 1) {
          var neighbours = neighbourCount(x, y);
          var nextAlive = isAlive(x, y) && neighbours === 2 || neighbours === 3;

          nextRow.push(nextAlive);
        }

        nextFrame.push(nextRow);
      }


      if (isEmpty()) {
        self.frame = startFrame;
        self.swap = !self.swap;
      } else {
        self.frame = nextFrame;
      }
    }, 1000);
  };

  /* jshint maxcomplexity:9 */
  var neighbourCount = function (x, y) {
    var count = 0;

    count += isAlive(x - 1, y - 1) ? 1 : 0;
    count += isAlive(x - 1, y) ? 1 : 0;
    count += isAlive(x - 1, y + 1) ? 1 : 0;
    count += isAlive(x, y - 1) ? 1 : 0;
    count += isAlive(x, y + 1) ? 1 : 0;
    count += isAlive(x + 1, y - 1) ? 1 : 0;
    count += isAlive(x + 1, y) ? 1 : 0;
    count += isAlive(x + 1, y + 1) ? 1 : 0;

    return count;
  };

  var isAlive = function (x, y) {
    var width = self.frame[0].length;
    var height = self.frame.length;

    x %= width;
    y %= height;

    if (x < 0) {
      x += width;
    }

    if (y < 0) {
      y += height;
    }

    return self.frame[y][x];
  };

  var isEmpty = function () {
    var present = false;

    for (var y = 0; y < self.frame.length; y += 1) {
      var row = self.frame[y];
      for (var x = 0; x < row.length; x += 1) {
        present = present || row[x];
      }
    }

    return !present;
  };

  var handleEvent = function (event) {
    event.preventDefault();

    var coord = getCoordinate(event);

    if (handleWithTolerance(coord, 0)) {
      return;
    }

    handleWithTolerance(coord, tolerance);
  };

  var handleWithTolerance = function (coord, t) {
    for (var i = 0; i < eventHandlers.length; i += 1) {
      var handler = eventHandlers[i];

      var xBounds = coord.x >= handler.fromX - t && coord.x < handler.toX + t;
      var yBounds = coord.y >= handler.fromY - t && coord.y < handler.toY + t;

      if (xBounds && yBounds) {
        handler.fn(handler.params);
        return true;
      }
    }
  };

  var getCoordinate = function (event) {
    var rect = canvas.getBoundingClientRect();

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  };

  var nextSolution = function () {
    if (results.length !== 0) {
      currentSolution += 1;
      currentSolution %= results.length;
      render();
    }
  };

  var changeSum = function (params) {
    sum += params.direction;

    var min = -9;
    var max = 99;

    if (sum < min) {
      sum = max;
    } else if (sum > max) {
      sum = min;
    }

    run();
    render();
  };

  var shuffleGrid = function () {
    shuffle();
    run();
    render();
  };
};
