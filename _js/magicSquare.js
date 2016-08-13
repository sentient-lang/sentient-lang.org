"use strict";

SentientWebsite.MagicSquare = function () {
  var self = this;
  var codeBlock = $("code");

  var compiledProgram;
  var results = [];

  var currentSolution = 0;
  var currentTarget = 15;
  var lockedCells = [];

  var canvas, context;
  var eventHandlers = [];
  var registeredHandlers = false;
  var tolerance = 8;

  self.initialize = function () {
    $.getJSON("/compiled/magic-square.json", function (program) {
      compiledProgram = program;
      results = run(currentTarget);
      render();
    });
  };

  var run = function (target) {
    var assignments = {
      target: target,
      magic_square: {}
    };

    for (var i = 0; i < lockedCells.length; i += 1) {
      var lockedCell = lockedCells[i];

      var x = lockedCell.x;
      var y = lockedCell.y;

      if (typeof assignments.magic_square[x] === "undefined") {
        assignments.magic_square[x] = {};
      }

      assignments.magic_square[x][y] = lockedCell.number;
    }

    var results = Sentient.run({
      program: compiledProgram,
      number: 99,
      assignments: assignments
    });

    var last = results[results.length - 1];
    if (typeof last.magic_square === "undefined") {
      results.pop();
    }

    return results;
  };

  var render = function () {
    setupCanvas();

    var gridX = 48;
    var gridY = 48;
    var cellSize = 35;

    renderSolutions(35, 30, 18, 10);
    renderTarget(gridX, gridY, cellSize, 18, 6);
    renderGrid(gridX, gridY, cellSize, 20, 5);

    renderSums({
      gridX: gridX,
      gridY: gridY,
      cellSize: cellSize,
      arrowLength: 10,
      fontSize: 18,
      fontPadding: 6
    });

    if (SentientWebsite.debug) {
      renderHandlers();
    }

    registeredHandlers = true;

    if (!$(canvas).is(":visible")) {
      $(canvas).fadeIn();
    }
  };

  var setupCanvas = function () {
    if (typeof canvas === "undefined") {
      var container = codeBlock.parent();

      $(container).prepend(
        "<canvas id='magic-square-example' width='200' height='200'></canvas>"
      );

      canvas = $("#magic-square-example")[0];
      context = canvas.getContext("2d");
      context.translate(0.5, 0.5);
      canvas.addEventListener("mousedown", handleEvent);
    } else {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  var renderSolutions = function (x, y, fontSize, arrowWidth) {
    context.save();
    context.font = fontSize + "px Open Sans";

    if (results.length === 0) {
      context.fillText("   No solutions", x, y);
      return;
    } else {
      var text = "Solution " + pad(currentSolution + 1);
      text += " / " + pad(results.length);

      context.fillText(text, x, y);
    }

    var fontBaseline = y + fontSize / 6;
    var topY = fontBaseline - 0.85 * fontSize;
    var middleY = fontBaseline - 0.5 * fontSize;
    var bottomY = fontBaseline - 0.15 * fontSize;

    var middleLeftX = x - 2 * arrowWidth;
    var topRightX = middleLeftX + arrowWidth;
    var bottomRightX = topRightX;

    context.fillStyle = "#01B7BA";

    context.beginPath();
    context.moveTo(middleLeftX, middleY);
    context.lineTo(topRightX, topY);
    context.lineTo(bottomRightX, bottomY);
    context.fill();

    var endX = canvas.width - x;
    var middleRightX = endX + 2 * arrowWidth;
    var topLeftX = middleRightX - arrowWidth;
    var bottomLeftX = topLeftX;

    context.beginPath();
    context.moveTo(middleRightX, middleY);
    context.lineTo(topLeftX, topY);
    context.lineTo(bottomLeftX, bottomY);
    context.fill();

    context.restore();

    if (!registeredHandlers) {
      eventHandlers.push({
        fromX: middleLeftX, fromY: topY,
        toX: topRightX, toY: bottomY,
        fn: changeSolution, params: { direction: -1 }
      });

      eventHandlers.push({
        fromX: topLeftX, fromY: topY,
        toX: middleRightX, toY: bottomY,
        fn: changeSolution, params: { direction: 1 }
      });
    }
  };

  var renderTarget = function (gridX, gridY, cellSize, fontSize, fontPadding) {
    context.save();
    context.font = fontSize + "px Open Sans";

    var fontX = gridX - cellSize - fontPadding / 2;
    var fontY = gridY + cellSize + fontSize + fontPadding;

    context.fillText(pad(currentTarget), fontX, fontY);
    context.font = 1.5 * fontSize + "px Open Sans";

    var plusX = fontX + fontPadding / 2;
    var plusY = fontY - fontSize - fontPadding;
    var minusX = plusX + 1;
    var minusY = fontY + fontSize + 1.5 * fontPadding;

    context.fillStyle = "#AC1D0C";
    context.fillText("+", plusX, plusY);

    context.fillStyle = "#434AFD";
    context.fillText("–", minusX, minusY);

    context.restore();

    if (!registeredHandlers) {
      eventHandlers.push({
        fromX: plusX, fromY: plusY - fontSize,
        toX: plusX + fontSize, toY: plusY,
        fn: changeTarget, params: { direction: 1 }
      });

      eventHandlers.push({
        fromX: minusX, fromY: minusY - fontSize,
        toX: minusX + fontSize, toY: minusY,
        fn: changeTarget, params: { direction: -1 }
      });
    }
  };

  /* jshint maxcomplexity:9 */
  var renderGrid = function (gridX, gridY, cellSize, fontSize, fontPadding) {
    context.save();
    context.font = fontSize + "px Open Sans";

    for (var i = 0; i < 3; i += 1) {
      for (var j = 0; j < 3; j += 1) {
        var number = "";
        var color = "rgba(0, 0, 0, 0.1)";

        var index = lockedIndex(i, j);

        if (typeof index !== "undefined") {
          number = lockedCells[index].number;
          color = "yellow";
        } else if (results.length !== 0) {
          number = results[currentSolution].magic_square[i][j];

          var ratio = number / currentTarget;
          var normalised = ratio / 0.6;

          if (normalised < 0) {
            normalised = 0;
          } else if (normalised > 255) {
            normalised = 255;
          }

          var increasing = normalised * 255;
          var decreasing = 255 - increasing;

          var red = Math.round(increasing);
          var green = Math.round(decreasing / 2);
          var blue = Math.round(decreasing);

          color = "rgba(" + red + "," + green + "," + blue + ", 0.2)";
        }

        var x = gridX + i * cellSize;
        var y = gridY + j * cellSize;

        context.fillStyle = "white";
        context.fillRect(x, y, cellSize, cellSize);

        context.fillStyle = color;
        context.fillRect(x, y, cellSize, cellSize);
        context.strokeRect(x, y, cellSize, cellSize);

        var fontX = x + fontPadding;
        var fontY = y + fontSize + fontPadding;

        if (number < 10) {
          fontX += fontSize / 3;
        }

        context.fillStyle = "black";
        context.fillText(number, fontX, fontY);

        if (!registeredHandlers) {
          eventHandlers.push({
            fromX: x, fromY: y,
            toX: x + cellSize, toY: y + cellSize,
            fn: toggleCell, params: { x: i, y: j }
          });
        }
      }
    }

    context.restore();
  };

  var renderSums = function (params) {
    var gridX = params.gridX;
    var gridY = params.gridY;
    var cellSize = params.cellSize;
    var arrowLength = params.arrowLength;
    var fontSize = params.fontSize;
    var fontPadding = params.fontPadding;

    context.save();
    context.font = fontSize + "px Open Sans";
    context.fillStyle = "gray";

    var startX, startY, midX, midY, endX, endY, fontX, fontY;

    for (var i = 0; i < 3; i += 1) {
      startX = gridX + cellSize * 3;
      endX = startX + arrowLength;
      midY = gridY + (i + 0.5) * cellSize;
      fontX = endX + fontPadding;
      fontY = gridY + i * cellSize + fontSize + fontPadding;

      context.beginPath();
      context.moveTo(startX, midY);
      context.lineTo(endX, midY);
      context.closePath();
      context.stroke();
      context.fillText(pad(currentTarget), fontX, fontY);
    }

    for (var j = 0; j < 3; j += 1) {
      startY = gridY + cellSize * 3;
      endY = startY + arrowLength;
      midX = gridX + (j + 0.5) * cellSize;
      fontX = gridX + j * cellSize + fontPadding;
      fontY = endY + fontSize + fontPadding;

      context.beginPath();
      context.moveTo(midX, startY);
      context.lineTo(midX, endY);
      context.closePath();
      context.stroke();
      context.fillText(pad(currentTarget), fontX, fontY);
    }

    var rightX = gridX + cellSize * 3;
    var bottomY = gridY + cellSize * 3;
    var diagonalLength = 0.8 * arrowLength;

    endX = rightX + diagonalLength;
    endY = bottomY + diagonalLength;
    fontX = endX + fontPadding / 2;
    fontY = endY + fontSize + fontPadding / 2;

    context.lineWidth = 1.5;

    context.beginPath();
    context.moveTo(rightX, bottomY);
    context.lineTo(endX, endY);
    context.closePath();
    context.stroke();
    context.fillText(pad(currentTarget), fontX, fontY);

    endX = gridX - diagonalLength;
    fontX = endX - fontSize - fontPadding / 2;

    context.beginPath();
    context.moveTo(gridX, bottomY);
    context.lineTo(endX, endY);
    context.closePath();
    context.stroke();
    context.fillText(pad(currentTarget), fontX, fontY);

    context.restore();
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

  var pad = function (number) {
    if (number < 10) {
      return "0" + number;
    } else {
      return number;
    }
  };

  var handleEvent = function (event) {
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

  var changeSolution = function (params) {
    currentSolution += params.direction;
    currentSolution %= results.length;

    if (currentSolution < 0) {
      currentSolution += results.length;
    }

    render();
  };

  var changeTarget = function (params) {
    currentTarget += params.direction;

    if (currentTarget < 1) {
      currentTarget = 99;
    } else if (currentTarget > 99) {
      currentTarget = 1;
    }

    results = run(currentTarget);
    currentSolution = 0;

    render();
  };

  var toggleCell = function (params) {
    var x = params.x;
    var y = params.y;

    var index = lockedIndex(x, y);

    if (typeof index === "undefined") {
      var result = results[currentSolution];

      if (typeof result !== "undefined") {
        var number = result.magic_square[x][y];
        lockedCells.push({ x: x, y: y, number: number });
      } else {
        return;
      }
    } else {
      lockedCells.splice(index, 1);
    }

    results = run(currentTarget);
    currentSolution = 0;

    render();
  };

  var lockedIndex = function (x, y) {
    for (var i = 0; i < lockedCells.length; i += 1) {
      var lockedCell = lockedCells[i];

      if (lockedCell.x === x && lockedCell.y === y) {
        return i;
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
};
