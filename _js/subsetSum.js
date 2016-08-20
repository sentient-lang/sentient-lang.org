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

  var renderGrid = function (gridX, gridY, cellSize, fontSize, fontPadding) {
    context.save();
    context.font = fontSize + "px Open Sans";

    var result = results[currentSolution];

    for (var i = 0; i < 5; i += 1) {
      for (var j = 0; j < 4; j += 1) {
        var index = j * 5 + i;
        var member;

        if (typeof result !== "undefined") {
          member = result.members[index];
        } else {
          member = false;
        }

        var x = gridX + i * cellSize;
        var y = gridY + j * cellSize;

        if (member) {
          context.fillStyle = "#ffa";
        } else {
          context.fillStyle = "#f6f6f6";
        }

        context.fillRect(x, y, cellSize, cellSize);

        context.strokeStyle = "gray";
        context.strokeRect(x, y, cellSize, cellSize);

        var number = numbers[index];

        var fontX = x + fontPadding + textOffset(number, fontSize);
        var fontY = y + fontSize + fontPadding;

        context.fillStyle = "black";
        context.fillText(number, fontX, fontY);
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

    context.fillText(sum, fontX, fontY);

    var plusX = fontX + fontPadding / 2 - textOffset(sum, fontSize);
    var plusY = fontY - fontSize - fontPadding;
    var minusX = plusX;
    var minusY = fontY + fontSize + fontPadding;

    context.font = (fontSize * 1.3) + "px Open Sans";

    context.fillStyle = "#AC1D0C";
    context.fillText("+", plusX, plusY);

    context.fillStyle = "#434AFD";
    context.fillText("–", minusX, minusY);

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

    if (length == 1) {
      offset += fontSize / 3;
    } else if (length == 3) {
      offset -= fontSize / 3;
    }

    if (number < 0) {
      offset -= fontSize / 6;
    }

    return offset;
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

  var shuffleGrid = function (params) {
    shuffle();
    run();
    render();
  };
};
