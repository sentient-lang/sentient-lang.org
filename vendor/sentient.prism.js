Prism.languages.sentient = {
  // Comments
  "comment": /#.*/,

  // Keywords
  "keyword": /\b(expose|invariant|return)\b/,

  // Constants
  "number": /-?\b\d+/,
  "boolean": /\b(true|false)\b/,

  // Type declarations
  "cdata": [
    /\barray\d+\b/,
    /\bint\d+\b/,
    /\b(int|bool)\b/,
  ],

  // Brackets
  "entity": /\[|\]|{|\}/,

  // Functions and Pointers
  "function": [
    /\bfunction\b/,
    /\*\w+[?!]?/
  ],
  "important": /\^/,

  // Semicolons
  "punctuation": /;/,
};
