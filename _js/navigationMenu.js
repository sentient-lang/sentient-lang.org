"use strict";

var NavigationMenu = function () {
  var self = this;

  self.initialize = function () {
    updateMenu();
    bindHandlers();

    $("nav").show();
    $("footer").show();
  };

  var bindHandlers = function () {
    $("nav h4").click(function (event) {
      var header = event.target;
      var index = $("nav h4").index(header);

      toggleVisibility(index);
    });
  };

  var toggleVisibility = function (index) {
    var visibility = loadVisibility();
    visibility[index] = !visibility[index];
    saveVisibility(visibility);

    updateMenu();
  };

  var updateMenu = function () {
    var visibility = loadVisibility();

    $("nav ul").each(function (index, list) {
      var items = $(list).children();

      if (visibility[index]) {
        items.show();
      } else {
        items.hide();
      }
    });
  };

  var saveVisibility = function (visibility) {
    var value = JSON.stringify(visibility);
    sessionStorage.setItem("NavigationMenu.visibility", value);
  };

  var loadVisibility = function () {
    var value = sessionStorage.getItem("NavigationMenu.visibility");
    return JSON.parse(value || "{}");
  };
};

$(document).ready(function () {
  new NavigationMenu().initialize();
});
