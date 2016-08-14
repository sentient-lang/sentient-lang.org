---
# JavaScript manifset
---

// Run early to minimise DOM flicker.
{% include_relative _js/navigationMenu.js %}
new SentientWebsite.NavigationMenu().initialize();

{% include_relative _js/moduleLoader.js %}
{% include_relative _js/magicSquare.js %}
{% include_relative _js/eightQueens.js %}
{% include_relative _js/knightsTour.js %}

new SentientWebsite.ModuleLoader().initialize();
