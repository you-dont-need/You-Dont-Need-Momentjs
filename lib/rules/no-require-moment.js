/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  create(context) {
    return {
      CallExpression(node) {
        if (
          node.callee.type === 'Identifier' &&
          node.callee.name === 'require'
        ) {
          var arg = node.arguments[0];

          if (arg && arg.type === 'Literal' && arg.value === 'moment') {
            context.report({
              node,
              message:
                'Use date-fns or Native Date methods instead of moment.js',
            });
          }
        }
      },
    };
  },
};
