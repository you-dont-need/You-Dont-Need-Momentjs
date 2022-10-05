/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  create(context) {
    return {
      ImportDeclaration(node) {
        node.specifiers.forEach((specifier) => {
          if (
            (specifier.type === 'ImportDefaultSpecifier' ||
              specifier.type === 'ImportNamespaceSpecifier') &&
            specifier.local.type === 'Identifier' &&
            specifier.local.name === 'moment'
          ) {
            context.report({
              node,
              message:
                'Use date-fns or Native Date methods instead of moment.js',
            });
          }
        });
      },
    };
  },
};
