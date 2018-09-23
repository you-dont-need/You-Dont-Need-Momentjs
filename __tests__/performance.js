const moment = require('moment');
const { getSeconds, getHours } = require('date-fns');
const dayjs = require('dayjs');
const iterations = 1000000;

const performanceTest = testFunction => {
  const start = new Date();
  for (let i = 0; i < iterations; i++) {
    testFunction();
  }
  const time = new Date() - start;
  console.info(`Execution time: ${time}ms`);
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
    console.log('Moment');
    performanceTest(() => {
      moment().seconds();
      moment().hours();
    });
  },
  native: () => {
    console.log('Native');
    performanceTest(() => {
      new Date().getSeconds();
      new Date().getHours();
    });
  },
  dateFns: () => {
    console.log('DateFns');
    performanceTest(() => {
      getSeconds(new Date());
      getHours(new Date());
    });
  },
  dayJs: () => {
    console.log('DayJs');
    performanceTest(() => {
      dayjs().second();
      dayjs().hour();
    });
  },
};

runTests(Get);
