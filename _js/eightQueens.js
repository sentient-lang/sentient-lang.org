"use strict";

SentientWebsite.EightQueens = function () {
  var self = this;

  var codeBlock = $("code");
  var canvas, context, results, queenImage;
  var currentSolution = 0;

  self.initialize = function () {
    queenImage = new Image();
    queenImage.src = "/images/queen.png";

    $.getJSON("/compiled/eight-queens.json", function (program) {
      results = Sentient.run({ program: program, number: 20 });
      render();
    });
  };

  var render = function () {
    setupCanvas();
    drawBoard();

    if (!$(canvas).is(":visible")) {
      $(canvas).fadeIn();
    }
  };

  var setupCanvas = function () {
    if (typeof canvas === "undefined") {
      var container = codeBlock.parent();

      $(container).prepend(
        "<canvas id='eight-queens-example' width='304' height='304'></canvas>"
      );

      canvas = $("#eight-queens-example")[0];
      context = canvas.getContext("2d");
      canvas.addEventListener("mousedown", handleEvent);
    } else {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  var drawBoard = function () {
    context.save();
    context.fillStyle = "rgb(240, 217, 181)";

    var size = 38;

    for (var i = 0; i < 8; i += 1) {
      for (var j = 0; j < 8; j += 1) {
        var x = i * size;
        var y = j * size;

        if ((i + j) % 2 == 0) {
          context.fillRect(x, y, size, size);
        }

        if (queenAtLocation(i, j)) {
          context.drawImage(queenImage, x, y, size, size);
        }
      }
    }

    context.restore();
  };

  var queenAtLocation = function (x, y) {
    var result = results[currentSolution];
    var queens = result.queens;

    if (typeof queens === "undefined") {
      return false;
    }

    for (var i = 0; i < queens.length; i += 1) {
      var queen = queens[i];

      var xNormalised = queen[0] - 1;
      var yNormalised = queen[1] - 1;

      if (x == xNormalised && y == yNormalised) {
        return true;
      }
    };
  };

  var handleEvent = function (event) {
    currentSolution += 1;
    currentSolution %= results.length;
    render();
    event.preventDefault();
  };
};
