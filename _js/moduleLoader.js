/* jshint maxlen: 100 */

"use strict";

SentientWebsite.ModuleLoader = function () {
  var self = this;
  var url = "https://cdnjs.cloudflare.com/ajax/libs/sentient-lang/0.0.0-alpha.41/sentient.js";

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
