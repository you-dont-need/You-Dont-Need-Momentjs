const moment = require('moment');
const { getSeconds, getHours } = require('date-fns');
const dayjs = require('dayjs');
const iterations = 1000000;

const performanceTest = (type, testFunction) => {
  console.time(type);
  for (let i = 0; i < iterations; i++) {
    testFunction();
  }
  console.timeEnd(type);
};

const runTests = object => {
  for (const key in object) {
    if (typeof object[key] === 'function') {
      object[key]();
    }
  }
};

const Get = {
  moment: () => {
    performanceTest('Moment', () => {
      moment().seconds();
      moment().hours();
    });
  },
  native: () => {
    performanceTest('Native', () => {
      new Date().getSeconds();
      new Date().getHours();
    });
  },
  dateFns: () => {
    performanceTest('DateFns', () => {
      getSeconds(new Date());
      getHours(new Date());
    });
  },
  dayJs: () => {
    performanceTest('DayJs', () => {
      dayjs().second();
      dayjs().hour();
    });
  },
};

runTests(Get);
