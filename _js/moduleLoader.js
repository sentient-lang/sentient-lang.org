"use strict";

SentientWebsite.ModuleLoader = function () {
  var self = this;
  var url = "https://sentient-lang.github.io/sentient-lang/bin/sentient.js";

  self.initialize = function () {
    if (SentientWebsite.loadSentient) {
      $.ajaxSetup({ cache: true });
      $.getScript(url, loadModules);
    } else {
      loadModules();
    }
  };

  var loadModules = function () {
    $.each(SentientWebsite.modulesToLoad, function (_, module) {
      new SentientWebsite[module]().initialize();
    });
  };
};
