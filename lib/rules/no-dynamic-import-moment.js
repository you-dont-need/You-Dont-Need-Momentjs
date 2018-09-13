var message = 'Use date-fns or Native Date methods instead of moment.js';

module.exports = function(context) {
  return {
    CallExpression: function(node) {
      if (node.callee.type !== 'Import') {
        return;
      }

      var arg = node.arguments[0];

      if (arg.type === 'Literal' && arg.value === 'moment') {
        context.report(node, message);
      }
    },
  };
};
