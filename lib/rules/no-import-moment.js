module.exports = function(context) {
  return {
    ImportDeclaration: function(node) {
      node.specifiers.forEach(function(specifier) {
        if (
          (specifier.type === 'ImportDefaultSpecifier' ||
            specifier.type === 'ImportNamespaceSpecifier') &&
          specifier.local.type === 'Identifier' &&
          specifier.local.name === 'moment'
        ) {
          context.report(
            node,
            'Use date-fns or Native Date methods instead of moment.js'
          );
        }
      });
    },
  };
};
