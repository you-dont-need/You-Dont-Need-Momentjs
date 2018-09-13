const kebabCase = require('kebab-case');
const rules = require('./methods');

for (const rule in rules) {
  const alternative = rules[rule].alternative;
  const ruleName = rules[rule].ruleName || kebabCase(rule);
  module.exports[ruleName] = {
    create(context) {
      return {
        CallExpression(node) {
          const callee = node.callee;
          const objectName =
            callee.name ||
            (callee.object && callee.object.name) ||
            (callee.object &&
              callee.object.callee &&
              callee.object.callee.name);
          if (
            objectName === 'moment' &&
            callee.property &&
            (callee.property.name === rule || callee.property.value === rule)
          ) {
            context.report({
              node,
              message: `Consider using ${alternative}`,
            });
          }
        },
      };
    },
  };
}
