"use strict";

SentientWebsite.NavigationMenu = function () {
  var self = this;

  self.initialize = function () {
    highlightCurrentLink();
    openSuggestedItemsIfIntroduction();
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

  var openSuggestedItemsIfIntroduction = function () {
    var path = window.location.pathname;

    if (path === "/" || path.indexOf("/intro/") !== -1) {
      var recorded = $("nav h4")[1];
      var examples = $("nav h4")[2];

      toggleVisibility($(recorded).next("ul"));
      toggleVisibility($(examples).next("ul"));
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
