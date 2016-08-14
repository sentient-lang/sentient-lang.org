"use strict";

SentientWebsite.SubsetSum = function () {
  var self = this;

  var codeBlock = $("code");
  var canvas, context, result;

  self.initialize = function () {
    $.getJSON("/compiled/subset-sum.json", function (program) {
      result = Sentient.run({
        program: program,
        assignments: {
          numbers: [5, 8, 4, 11, 6],
          sum: 20
        }
      })[0];
      render();
    });
  };

  var render = function () {
    // TODO
    console.log(result);
  };
};
