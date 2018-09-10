'use strict';

const rules = require("./rules");
console.log(rules);
module.exports.rules = rules;

module.exports.configs = {
  recommended: {
    rules: {
      'you-dont-need-momentjs/no-import-moment': 2,
    },
  },
};