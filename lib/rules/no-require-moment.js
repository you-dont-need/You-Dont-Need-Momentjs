module.exports = function(context) {
  return {
    CallExpression: function(node) {
      if (node.callee.type === 'Identifier' && node.callee.name === 'require') {
        var arg = node.arguments[0];

        if (arg && arg.type === 'Literal' && arg.value === 'moment') {
          context.report(
            node,
            'Use date-fns or Native Date methods instead of moment.js'
          );
        }
      }
    },
  };
};
