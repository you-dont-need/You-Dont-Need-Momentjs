const rule = require('../').rules;
const RuleTester = require('eslint').RuleTester;

RuleTester.setDefaultConfig({
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
});

var ruleTester = new RuleTester();

describe('ESLint plugin', () => {
  ruleTester.run('no-dynamic-import-moment', rule['no-dynamic-import-moment'], {
    valid: ["import('date-fns').then()"],
    invalid: [
      {
        code: "import('moment').then(()=>{})",
        errors: [
          {
            message: 'Use date-fns or Native Date methods instead of moment.js',
            type: 'CallExpression',
          },
        ],
      },
      {
        code: "(async () => { const m = await import('moment'); })()",
        errors: [
          {
            message: 'Use date-fns or Native Date methods instead of moment.js',
            type: 'CallExpression',
          },
        ],
      },
    ],
  });

  ruleTester.run('no-import-moment', rule['no-import-moment'], {
    valid: [
      "import { format, formatDistance, formatRelative, subDays } from 'date-fns'",
    ],
    invalid: [
      {
        code: "import moment from 'moment'",
        errors: [
          {
            message: 'Use date-fns or Native Date methods instead of moment.js',
            type: 'ImportDeclaration',
          },
        ],
      },
      {
        code: "import * as moment from 'moment'",
        errors: [
          {
            message: 'Use date-fns or Native Date methods instead of moment.js',
            type: 'ImportDeclaration',
          },
        ],
      },
    ],
  });

  ruleTester.run('no-moment-constructor', rule['no-moment-constructor'], {
    valid: ['new Date()', 'Date()'],
    invalid: [
      {
        code: 'moment()',
        errors: [
          {
            message: 'Consider using Native new Date().',
            type: 'CallExpression',
          },
        ],
      },
      {
        code: "moment('12-25-1995')",
        errors: [
          {
            message: 'Consider using Native new Date().',
            type: 'CallExpression',
          },
        ],
      },
      {
        code: "moment('12-25-1995', 'MM-DD-YYYY')",
        errors: [
          {
            message:
              'Consider using date-fns, e.g. parse("2010-10-20 4:30", "yyyy-MM-dd H:mm", new Date()).',
            type: 'CallExpression',
          },
        ],
      },
    ],
  });

  ruleTester.run('no-moment-methods/seconds', rule['seconds'], {
    valid: [],
    invalid: [
      {
        code: 'moment().seconds()',
        errors: [
          {
            message:
              'Consider using new Date().getSeconds() or new Date().setSeconds()',
            type: 'CallExpression',
          },
        ],
      },
    ],
  });

  ruleTester.run('no-moment-methods/seconds', rule['seconds'], {
    valid: [],
    invalid: [
      {
        code: "moment()['seconds']();",
        errors: [
          {
            message:
              'Consider using new Date().getSeconds() or new Date().setSeconds()',
            type: 'CallExpression',
          },
        ],
      },
    ],
  });

  ruleTester.run('no-moment-methods/is-after', rule['is-after'], {
    valid: [],
    invalid: [
      {
        code: "const m = moment('2010-10-20').isAfter('2010-10-19')",
        errors: [
          {
            message:
              'Consider using date-fns isAfter(date, dateToCompare) or dayjs().isAfter()',
            type: 'CallExpression',
          },
        ],
      },
    ],
  });

  ruleTester.run('no-require-moment', rule['no-require-moment'], {
    valid: [
      "var { format, formatDistance, formatRelative, subDays } = require('date-fns')",
      'var empty = require()',
      'var other = r()',
    ],
    invalid: [
      {
        code: "var moment = require('moment')",
        errors: [
          {
            message: 'Use date-fns or Native Date methods instead of moment.js',
            type: 'CallExpression',
          },
        ],
      },
      {
        code: "var format = require('moment').format",
        errors: [
          {
            message: 'Use date-fns or Native Date methods instead of moment.js',
            type: 'CallExpression',
          },
        ],
      },
    ],
  });
});
