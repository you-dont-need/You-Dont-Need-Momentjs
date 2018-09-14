module.exports = function(context) {
  return {
    CallExpression(node) {
      if (node.callee.name === 'moment') {
        if (node.arguments.length === 0 || node.arguments.length === 1) {
          context.report({
            node,
            message: `Consider using Native new Date().`,
          });
        } else {
          context.report({
            node,
            message: `Consider using date-fns, e.g. parse("2010-10-20 4:30", "yyyy-MM-dd H:mm", new Date()).`,
          });
        }
      }
    },
  };
};
