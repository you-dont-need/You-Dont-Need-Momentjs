const moment = require('moment');
const {
  getSeconds,
  getHours,
  setHours,
  endOfDay,
  startOfMonth,
  setSeconds,
  max,
  min,
  getDate,
  addDays,
  subDays,
  setDate,
  getDay,
  setDay,
  getISOWeeksInYear,
  getDayOfYear,
  setDayOfYear,
  setWeek,
  getWeek,
  getDaysInMonth,
} = require('date-fns');
const dayjs = require('dayjs');
const iterations = 1000000;
const array = [
  new Date(2017, 4, 13),
  new Date(2018, 2, 12),
  new Date(2016, 0, 10),
  new Date(2016, 0, 9),
];

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

// runTests(Get);

const Set = {
  moment: () => {
    performanceTest('Moment', () => {
      moment().seconds(30);
      moment().hours(13);
    });
  },
  native: () => {
    performanceTest('Native', () => {
      new Date(new Date().setSeconds(30));
      new Date(new Date().setHours(13));
    });
  },
  dateFns: () => {
    performanceTest('DateFns', () => {
      setSeconds(new Date(), 30);
      setHours(new Date(), 13);
    });
  },
  dayJs: () => {
    performanceTest('DayJs', () => {
      dayjs().set('second', 30);
      dayjs().set('hour', 13);
    });
  },
};

// runTests(Set);

const DateOfMonth = {
  moment: () => {
    performanceTest('Moment', () => {
      moment().date();
      moment().date(4);
    });
  },
  native: () => {
    performanceTest('Native', () => {
      new Date().getDate();
      new Date().setDate(4);
    });
  },
  dateFns: () => {
    performanceTest('DateFns', () => {
      getDate(new Date());
      setDate(new Date(), 4);
    });
  },
  dayJs: () => {
    performanceTest('DayJs', () => {
      dayjs().date();
      dayjs().set('date', 4);
    });
  },
};

// runTests(DateOfMonth);

const DayOfWeek = {
  moment: () => {
    performanceTest('Moment', () => {
      moment().day();
      moment().day(-14);
    });
  },
  native: () => {
    performanceTest('Native', () => {
      new Date().getDay();
      new Date().setDate(new Date().getDate() - 14);
    });
  },
  dateFns: () => {
    performanceTest('DateFns', () => {
      getDay(new Date());
      setDay(new Date(), -14);
    });
  },
  dayJs: () => {
    performanceTest('DayJs', () => {
      dayjs().day();
      dayjs().set('day', -14);
    });
  },
};

// runTests(DayOfWeek);

const DayOfYear = {
  moment: () => {
    performanceTest('Moment', () => {
      moment().dayOfYear();
      moment().dayOfYear(256);
    });
  },
  native: () => {
    performanceTest('Native', () => {
      Math.floor(
        (new Date() - new Date(new Date().getFullYear(), 0, 0)) /
          1000 /
          60 /
          60 /
          24
      );
    });
  },
  dateFns: () => {
    performanceTest('DateFns', () => {
      getDayOfYear(new Date());
      setDayOfYear(new Date(), 256);
    });
  },
};

// runTests(DayOfYear);

const WeekOfYear = {
  moment: () => {
    performanceTest('Moment', () => {
      moment().week();
      moment().week(24);
    });
  },
  native: () => {
    performanceTest('Native', () => {
      const MILLISECONDS_IN_WEEK = 604800000;
      const firstDayOfWeek = 1;

      const t = new Date();
      const s = new Date(t.getFullYear(), 0, 1);
      s.setDate(s.getDate() + ((firstDayOfWeek - s.getDay()) % 7));
      Math.round((t - s) / MILLISECONDS_IN_WEEK) + 1;

      const d = new Date();
      const f = new Date(d.getFullYear(), 0, 1);
      f.setDate(f.getDate() + ((firstDayOfWeek - f.getDay()) % 7));
      d.setDate(
        d.getDate() - (Math.round((d - f) / MILLISECONDS_IN_WEEK) + 1 - 24) * 7
      );
    });
  },
  dateFns: () => {
    performanceTest('DateFns', () => {
      getWeek(new Date());
      setWeek(new Date(), 24);
    });
  },
};

// runTests(WeekOfYear);

const DaysInMonth = {
  moment: () => {
    performanceTest('Moment', () => {
      moment('2012-02', 'YYYY-MM').daysInMonth();
    });
  },
  native: () => {
    performanceTest('Native', () => {
      new Date(2012, 02, 0).getDate();
    });
  },
  dateFns: () => {
    performanceTest('DateFns', () => {
      getDaysInMonth(new Date(2012, 1));
    });
  },
  dayJs: () => {
    performanceTest('DayJs', () => {
      dayjs('2012-02').daysInMonth();
    });
  },
};

// runTests(DaysInMonth);

const WeeksInYear = {
  moment: () => {
    performanceTest('Moment', () => {
      moment().isoWeeksInYear();
    });
  },
  dateFns: () => {
    performanceTest('DateFns', () => {
      getISOWeeksInYear(new Date());
    });
  },
};

// runTests(WeeksInYear);

const MaximumOfGivenDates = {
  moment: () => {
    performanceTest('Moment', () => {
      moment.max(array.map(a => moment(a)));
    });
  },
  native: () => {
    performanceTest('Native', () => {
      new Date(Math.max.apply(null, array)).toISOString();
    });
  },
  dateFns: () => {
    performanceTest('DateFns', () => {
      max(array);
    });
  },
};

// runTests(MaximumOfGivenDates);

const MinimumOfGivenDates = {
  moment: () => {
    performanceTest('Moment', () => {
      moment.min(array.map(a => moment(a)));
    });
  },
  native: () => {
    performanceTest('Native', () => {
      new Date(Math.min.apply(null, array)).toISOString();
    });
  },
  dateFns: () => {
    performanceTest('DateFns', () => {
      min(array);
    });
  },
};

// runTests(MinimumOfGivenDates);

const Add = {
  moment: () => {
    performanceTest('Moment', () => {
      moment().add(7, 'days');
    });
  },
  native: () => {
    performanceTest('Native', () => {
      const now = new Date();
      now.setDate(now.getDate() + 7);
    });
  },
  dateFns: () => {
    performanceTest('DateFns', () => {
      addDays(new Date(), 7);
    });
  },
  dayJs: () => {
    performanceTest('DayJs', () => {
      dayjs().add(7, 'day');
    });
  },
};

// runTests(Add);

const Subtract = {
  moment: () => {
    performanceTest('Moment', () => {
      moment().subtract(7, 'days');
    });
  },
  native: () => {
    performanceTest('Native', () => {
      new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7);
    });
  },
  dateFns: () => {
    performanceTest('DateFns', () => {
      subDays(new Date(), 7);
    });
  },
  dayJs: () => {
    performanceTest('DayJs', () => {
      dayjs().subtract(7, 'day');
    });
  },
};

// runTests(Subtract);

const StartOfTime = {
  moment: () => {
    performanceTest('Moment', () => {
      moment().startOf('month');
    });
  },
  dateFns: () => {
    performanceTest('DateFns', () => {
      startOfMonth(new Date());
    });
  },
  dayJs: () => {
    performanceTest('DayJs', () => {
      dayjs().startOf('month');
    });
  },
};

// runTests(StartOfTime);

const EndOfTime = {
  moment: () => {
    performanceTest('Moment', () => {
      moment().endOf('day');
    });
  },
  native: () => {
    performanceTest('Native', () => {
      new Date().setHours(23, 59, 59, 999);
    });
  },
  dateFns: () => {
    performanceTest('DateFns', () => {
      endOfDay(new Date());
    });
  },
  dayJs: () => {
    performanceTest('DayJs', () => {
      dayjs().endOf('day');
    });
  },
};

// runTests(EndOfTime);
