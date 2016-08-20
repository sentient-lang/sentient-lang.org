"use strict";

SentientWebsite.KnightsTour = function () {
  var self = this;

  var codeBlock = $("code");
  var canvas, context, results, knightImage;
  var size = 60;

  var currentSolution = 0;
  var currentPosition = 0;

  self.initialize = function () {
    knightImage = new Image();
    knightImage.src = "/images/knight.png";
    knightImage.onload = render;

    $.getJSON("/compiled/knights-tour.json", function (program) {
      results = Sentient.run({
        program: program,
        number: 2
      });

      render();
      self.timeout = setTimeout(renderFrame, 1000);
    });
  };

  var renderFrame = function () {
    currentPosition += 0.025;

    if (currentPosition > 24) {
      return;
    }

    render();
    self.timeout = setTimeout(renderFrame, 17);
  };

  var render = function () {
    if (typeof results === "undefined") {
      return;
    }

    setupCanvas();

    drawBoard();
    drawMarks();
    drawKnight();

    if (!$(canvas).is(":visible")) {
      $(canvas).fadeIn();
    }
  };

  var setupCanvas = function () {
    if (typeof canvas === "undefined") {
      var container = codeBlock.parent();

      $(container).prepend(
        "<canvas id='knights-tour-example' width='300' height='300'></canvas>"
      );

      canvas = $("#knights-tour-example")[0];
      context = canvas.getContext("2d");
      canvas.addEventListener("mousedown", handleEvent);
    } else {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  var drawBoard = function () {
    context.save();
    context.fillStyle = "rgb(240, 217, 181)";


    for (var i = 0; i < 5; i += 1) {
      for (var j = 0; j < 5; j += 1) {
        var x = i * size;
        var y = j * size;

        if ((i + j) % 2 === 0) {
          context.fillRect(x, y, size, size);
        }
      }
    }

    context.restore();
  };

  var drawKnight = function () {
    context.save();

    var result = results[currentSolution];
    var tour = result.knightsTour;

    if (typeof tour === "undefined") {
      return;
    }

    var previousIndex = Math.floor(currentPosition);
    var nextIndex = previousIndex + 1;

    var previousCoordinate = tour[previousIndex];
    var nextCoordinate = tour[nextIndex];

    var previousX = previousCoordinate[0] - 1;
    var previousY = previousCoordinate[1] - 1;

    var nextX, nextY;

    if (typeof nextCoordinate === "undefined") {
      nextX = previousX;
      nextY = previousY;
    } else {
      nextX = nextCoordinate[0] - 1;
      nextY = nextCoordinate[1] - 1;
    }

    var ratio = currentPosition % 1;
    ratio = Math.sin(ratio * Math.PI / 2);

    var xDelta = (nextX - previousX) * ratio;
    var yDelta = (nextY - previousY) * ratio;

    var x = (previousX + xDelta) * size;
    var y = (previousY + yDelta) * size;

    context.drawImage(knightImage, x + 5, y + 5, size - 10, size - 10);
    context.restore();
  };

  var drawMarks = function () {
    var index = Math.floor(currentPosition);

    var result = results[currentSolution];
    var tour = result.knightsTour;

    if (typeof tour === "undefined") {
      return;
    }

    for (var i = 0; i <= index && i < 25; i += 1) {
      drawMark(tour[i]);
    }
  };

  var drawMark = function (coordinate) {
    context.save();
    context.lineWidth = 2;

    var x = coordinate[0] - 1;
    var y = coordinate[1] - 1;

    var startX = x * size + 20;
    var startY = y * size + 20;

    var endX = (x + 1) * size - 20;
    var endY = (y + 1) * size - 20;

    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.moveTo(startX, endY);
    context.lineTo(endX, startY);
    context.stroke();

    context.restore();
  };

  var handleEvent = function (event) {
    clearTimeout(self.timeout);

    currentSolution += 1;
    currentSolution %= 2;
    currentPosition = 0;

    render();
    self.timeout = setTimeout(renderFrame, 500);

    event.preventDefault();
  };
};
