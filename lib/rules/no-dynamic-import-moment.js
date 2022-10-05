var message = 'Use date-fns or Native Date methods instead of moment.js';

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  create(context) {
    return {
      ImportExpression(node) {
        if (node.source.type === 'Literal' && node.source.value === 'moment') {
          context.report({ node, message });
        }
      },
    };
  },
};
