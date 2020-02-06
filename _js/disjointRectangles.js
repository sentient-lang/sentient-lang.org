"use strict";

SentientWebsite.DisjointRectangles = function () {
  var self = this;

  var codeBlock = $("code");
  var canvas, context, results;

  var width = 7;
  var height = 7;
  var solutions = 8;
  var currentSolution = 0;
  var scale = 21;

  var colors = [
    "rgba(229,204,75,0.6)",
    "rgba(172,29,12,0.6)",
    "rgba(236,139,32,0.6)",
    "rgba(24,224,138,0.6)",
    "rgba(67,74,253,0.6)",
    "rgba(153,153,153,0.6)",
    "rgba(248,116,243,0.6)"
  ];

  self.initialize = function () {
    $.getJSON("/compiled/disjoint-rectangles.json", function (program) {
      results = Sentient.run({
        program: program,
        assignments: {
          gridWidth: width,
          gridHeight: height,
          areas: [2, 4, 6, 9, 9, undefined, undefined]
        },
        number: solutions
      });
      render();
    });
  };

  var render = function () {
    if (typeof results === "undefined") {
      return;
    }

    setupCanvas();

    drawRectangles();
    drawGrid();

    if (!$(canvas).is(":visible")) {
      $(canvas).fadeIn();
    }
  };

  var setupCanvas = function () {
    if (typeof canvas === "undefined") {
      var container = codeBlock.parent();

      var w = width * scale + 1;
      var h = height * scale + 1;

      $(container).prepend(
        "<canvas id='rectangles-example' width='"+w+"' height='"+h+"'></canvas>"
      );

      canvas = $("#rectangles-example")[0];
      context = canvas.getContext("2d");
      context.translate(0.5, 0.5);
      canvas.addEventListener("mousedown", handleEvent);
    } else {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  var drawGrid = function () {
    context.save();

    for (var i = 0; i < width; i += 1) {
      for (var j = 0; j < height; j += 1) {
        var x = i * scale;
        var y = j * scale;

        context.beginPath();
        context.rect(x, y, scale, scale);
        context.stroke();
        context.closePath();
      }
    }

    context.restore();
  };

  var drawRectangles = function () {
    var result = results[currentSolution];
    var rectangles = result.rectangles;

    for (var i = 0; i < rectangles.length; i += 1) {
      var rectangle = rectangles[i];
      var color = colors[i];

      drawRectangle(rectangle, color);
    }
  };

  var drawRectangle = function (rectangle, color) {
    context.save();

    var i = rectangle[0];
    var j = rectangle[1];

    var x = i * scale;
    var y = j * scale;

    var w = (rectangle[2] - i) * scale;
    var h = (rectangle[3] - j) * scale;

    console.log(x, y, w, h);
    context.beginPath();
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
    context.closePath();

    context.restore();
  };

  var handleEvent = function (event) {
    currentSolution += 1;
    currentSolution %= results.length;
    render();
    event.preventDefault();
  };
};
