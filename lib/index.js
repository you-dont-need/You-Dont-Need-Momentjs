const rules = {
  'no-dynamic-import-moment': require('./rules/no-dynamic-import-moment'),
  'no-import-moment': require('./rules/no-import-moment'),
  'no-moment-constructor': require('./rules/no-moment-constructor'),
  'no-require-moment': require('./rules/no-require-moment'),
  ...require('./rules/no-moment-methods'),
};
module.exports.rules = rules;

const configure = (list, level) => {
  const r = {};
  Object.keys(list).map(rule => (r['you-dont-need-momentjs/' + rule] = level));
  return r;
};
module.exports.configs = {
  recommended: {
    plugins: ['you-dont-need-momentjs'],
    rules: configure(rules, 2),
  },
};
