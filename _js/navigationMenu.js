"use strict";

SentientWebsite.NavigationMenu = function () {
  var self = this;

  self.initialize = function () {
    highlightCurrentLink();
    openExamplesIfIntroduction();
    bindHandlers();

    $("nav").show();
    $("footer").show();
  };

  var highlightCurrentLink = function () {
    $("nav a").each(function (index, anchor) {
      if (anchor.href === window.location.href) {
        $(anchor).addClass("current");
        var list = $(anchor).closest("ul");
        toggleVisibility(list);
      }
    });
  };

  var openExamplesIfIntroduction = function () {
    var path = window.location.pathname;

    if (path === "/" || path.indexOf("/intro") !== -1) {
      var examples = $("nav h4")[1];
      var list = $(examples).next("ul");
      toggleVisibility(list);
    }
  };

  var bindHandlers = function () {
    $("nav h4").click(function (event) {
      var header = event.target;
      var list = $(header).next("ul");
      toggleVisibility(list);
    });
  };

  var toggleVisibility = function (list) {
    $(list).children().toggle();
  };
};
