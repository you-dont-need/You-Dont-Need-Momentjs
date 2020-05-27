const moment = require('moment');
const { DateTime, Interval } = require('luxon');
const date = require('date-fns');
const fr = require('date-fns/locale/fr');
const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime'); // load on demand
const weekOfYear = require('dayjs/plugin/weekOfYear'); // load on demand
const isBetween = require('dayjs/plugin/isBetween'); // load on demand
const isLeapYear = require('dayjs/plugin/isLeapYear'); // load on demand
dayjs.extend(relativeTime);
dayjs.extend(weekOfYear);
dayjs.extend(isBetween);
dayjs.extend(isLeapYear);

const time = 1536484369695;

describe('Parse', () => {
  it('String + Date Format', () => {
    const m = moment('12-25-1995', 'MM-DD-YYYY');

    const [, mm, dd, yyyy] = /^(\d{2})-(\d{2})-(\d{4})$/.exec('12-25-1995');
    const n = new Date(`${mm}, ${dd} ${yyyy}`);
    expect(m.valueOf()).toBe(n.getTime());

    const d = date.parse('12-25-1995', 'MM-dd-yyyy', new Date());
    expect(m.valueOf()).toBe(d.getTime());

    const day = dayjs('12-25-1995');
    expect(m.valueOf()).toBe(day.valueOf());

    const luxon = DateTime.fromFormat('12-25-1995', 'MM-dd-yyyy');
    expect(m.valueOf()).toBe(luxon.ts);
  });
  it('String + Time Format', () => {
    const m = moment('2010-10-20 4:30', 'YYYY-MM-DD HH:mm');

    const [
      ,
      yyyy,
      mm,
      dd,
      hh,
      mi,
    ] = /^(\d{4})-(\d{2})-(\d{2})\s(\d{1,2}):(\d{2})$/.exec('2010-10-20 4:30');
    const n = new Date(`${yyyy}-${mm}-${dd}T${('0' + hh).slice(-2)}:${mi}:00`);
    expect(m.valueOf()).toBe(n.getTime());

    const d = date.parse('2010-10-20 4:30', 'yyyy-MM-dd H:mm', new Date());
    expect(m.valueOf()).toBe(d.getTime());

    const luxon = DateTime.fromFormat('2010-10-20 4:30', 'yyyy-MM-dd H:mm');
    expect(m.valueOf()).toBe(luxon.ts);
  });
  it('String + Format + locale', () => {
    const m = moment('2012 mars', 'YYYY MMM', 'fr');

    const d = date.parse('2012 mars', 'yyyy MMMM', new Date(), { locale: fr });
    expect(m.valueOf()).toBe(d.getTime());
  });
});

describe('Get + Set', () => {
  it('get Second', () => {
    const m = moment(time).seconds();

    const n = new Date(time).getSeconds();
    expect(m).toBe(n);

    const d = date.getSeconds(new Date(time));
    expect(m).toBe(d);

    const day = dayjs(time).second();
    expect(m).toBe(day);

    const luxon = DateTime.fromMillis(time).second;
    expect(m).toBe(luxon);
  });
  it('set Second', () => {
    const m = moment(time)
      .seconds(30)
      .valueOf();
    const n = new Date(time).setSeconds(30);
    expect(m).toBe(n);

    const d = date.setSeconds(new Date(time), 30).getTime();
    expect(m).toBe(d);

    const day = dayjs(time)
      .set('second', 30)
      .valueOf();
    expect(m).toBe(day);

    const luxon = DateTime.fromMillis(time).set({ second: 30 });
    expect(m).toBe(luxon.ts);
  });

  it('get Hour', () => {
    const m = moment(time).hours();
    const n = new Date(time).getHours();
    expect(m).toBe(n);

    const d = date.getHours(new Date(time));
    expect(m).toBe(d);

    const day = dayjs(time).hour();
    expect(m).toBe(day);

    const luxon = DateTime.fromMillis(time).hour;
    expect(m).toBe(luxon);
  });
  it('set Hour', () => {
    const m = moment(time)
      .hour(13)
      .valueOf();
    const n = new Date(time).setHours(13);
    expect(m).toBe(n);

    const d = date.setHours(new Date(time), 13).getTime();
    expect(m).toBe(d);

    const day = dayjs(time)
      .set('hour', 13)
      .valueOf();
    expect(m).toBe(day);

    const luxon = DateTime.fromMillis(time).set({ hour: 13 });
    expect(m).toBe(luxon.ts);
  });

  it('get Date of Month', () => {
    const m = moment(time).date();
    const n = new Date(time).getDate();
    expect(m).toBe(n);

    const d = date.getDate(new Date(time));
    expect(m).toBe(d);

    const day = dayjs(time).date();
    expect(m).toBe(day);

    const luxon = DateTime.fromMillis(time).day;
    expect(m).toBe(luxon);
  });

  it('set Date of Month', () => {
    const m = moment(time)
      .date(4)
      .valueOf();
    const n = new Date(time).setDate(4);
    expect(m).toBe(n);

    const d = date.setDate(new Date(time), 4).getTime();
    expect(m).toBe(d);

    const day = dayjs(time)
      .set('date', 4)
      .valueOf();
    expect(m).toBe(day);

    const luxon = DateTime.fromMillis(time).set({ day: 4 });
    expect(m).toBe(luxon.ts);
  });

  it('get Day of Week', () => {
    const m = moment(time).day();
    const n = new Date(time).getDay();
    expect(m).toBe(n);

    const d = date.getDay(new Date(time));
    expect(m).toBe(d);

    const day = dayjs(time).day();
    expect(m).toBe(day);

    const luxon = DateTime.fromMillis(time).weekday;
    expect(m).toBe(luxon % 7);
  });

  it('set Day of Week', () => {
    const m = moment(time)
      .day(-14)
      .valueOf();
    const n = new Date(time).setDate(new Date(time).getDate() - 14);
    expect(m).toBe(n);

    const d = date.setDay(new Date(time), -14).getTime();
    expect(m).toBe(d);

    const day = dayjs(time)
      .set('day', -14)
      .valueOf();
    expect(m).toBe(day);

    const luxon = DateTime.fromMillis(time).minus({ day: 14 });
    expect(m).toBe(luxon.ts);
  });

  it('get Day of Year', () => {
    const m = moment(time).dayOfYear();
    const n = Math.floor(
      (new Date(time) - new Date(new Date(time).getFullYear(), 0, 0)) /
        1000 /
        60 /
        60 /
        24
    );
    expect(m).toBe(n);

    const d = date.getDayOfYear(new Date(time));
    expect(m).toBe(d);

    const luxon = DateTime.fromMillis(time).ordinal;
    expect(m).toBe(luxon);
  });

  it('set Day of Year', () => {
    const m = moment(time)
      .dayOfYear(256)
      .valueOf();
    const d = date.setDayOfYear(new Date(time), 256).getTime();
    expect(m).toBe(d);

    const luxon = DateTime.fromMillis(time).set({ ordinal: 256 }).ts;
    expect(m).toBe(luxon);
  });

  it('get Week of Year', () => {
    const m = moment(time).week();

    const MILLISECONDS_IN_WEEK = 604800000;
    const firstDayOfWeek = 1; // monday as the first day (0 = sunday)
    const t = new Date(time);
    const s = new Date(t.getFullYear(), 0, 1);
    s.setDate(s.getDate() + ((firstDayOfWeek - s.getDay()) % 7));
    const n = Math.round((t - s) / MILLISECONDS_IN_WEEK) + 1;
    expect(m).toBe(n);

    const d = date.getWeek(new Date(time));
    expect(m).toBe(d);

    const day = dayjs(time).week(); // plugin
    expect(m).toBe(day);

    const luxon = DateTime.fromMillis(time).weekNumber + 1;
    expect(m).toBe(luxon);
  });

  it('set Week of Year', () => {
    const MILLISECONDS_IN_WEEK = 604800000;
    const firstDayOfWeek = 1; // monday as the first day (0 = sunday)

    const m = moment(time)
      .week(24)
      .valueOf();
    const n = new Date(time);
    const s = new Date(n.getFullYear(), 0, 1);
    s.setDate(s.getDate() + ((firstDayOfWeek - s.getDay()) % 7));
    const w = Math.round((n - s) / MILLISECONDS_IN_WEEK) + 1;
    n.setDate(n.getDate() - (w - 24) * 7);
    const d = date.setWeek(new Date(time), 24).getTime();
    expect(m).toBe(d);
    expect(m).toBe(n.getTime());
    expect(n.getTime()).toBe(d);

    const luxon = DateTime.fromMillis(time).set({ weekNumber: 23 });
    expect(m).toBe(luxon.ts);
  });

  it('Days in Month', () => {
    const m = moment('2012-02', 'YYYY-MM').daysInMonth();
    const d = date.getDaysInMonth(new Date(2012, 1));
    expect(m).toBe(d);

    const day = dayjs('2012-02').daysInMonth();
    expect(m).toBe(day);

    const n = new Date(2012, 2, 0).getDate();
    expect(m).toBe(n);

    const luxon = DateTime.local(2012, 2).daysInMonth;
    expect(m).toBe(luxon);
  });

  it('get Weeks In Year', () => {
    const m = moment(time).isoWeeksInYear();
    const d = date.getISOWeeksInYear(new Date(time));
    expect(m).toBe(d);

    const luxon = DateTime.fromMillis(time).weeksInWeekYear;
    expect(m).toBe(luxon);
  });

  it('Maximum of the given dates', () => {
    const array = [
      new Date(2017, 4, 13),
      new Date(2018, 2, 12),
      new Date(2016, 0, 10),
      new Date(2016, 0, 9),
    ];
    const m = moment.max(array.map(a => moment(a)));
    const d = date.max(array);
    expect(m.valueOf()).toBe(d.getTime());
    expect(d).toEqual(new Date(2018, 2, 12));

    const n = new Date(Math.max.apply(null, array));
    expect(n).toEqual(new Date(2018, 2, 12));

    const luxon = DateTime.max(
      ...array.map(a => DateTime.fromJSDate(a))
    ).toJSDate();
    expect(luxon).toEqual(new Date(2018, 2, 12));
  });

  it('Minimum of the given dates', () => {
    const array = [
      new Date(2017, 4, 13),
      new Date(2018, 2, 12),
      new Date(2016, 0, 10),
      new Date(2016, 0, 9),
    ];
    const n = new Date(Math.min.apply(null, array));
    expect(n).toEqual(new Date(2016, 0, 9));

    const m = moment.min(array.map(a => moment(a)));
    const d = date.min(array);
    expect(m.valueOf()).toBe(d.getTime());
    expect(d).toEqual(new Date(2016, 0, 9));

    const luxon = DateTime.min(
      ...array.map(a => DateTime.fromJSDate(a))
    ).toJSDate();
    expect(luxon).toEqual(new Date(2016, 0, 9));
  });
});

describe('Manipulate', () => {
  it('Add', () => {
    const m = moment(time).add(7, 'days');
    const d = date.addDays(new Date(time), 7);
    expect(m.valueOf()).toBe(d.getTime());

    const n = new Date(time);
    n.setDate(n.getDate() + 7);
    expect(n.valueOf()).toBe(m.valueOf());

    const day = dayjs(time).add(7, 'day');
    expect(m.valueOf()).toBe(day.valueOf());

    const luxon = DateTime.fromMillis(time).plus({ day: 7 });
    expect(m.valueOf()).toBe(luxon.ts);
  });

  it('Subtract', () => {
    const m = moment(time).subtract(7, 'days');
    const n = new Date(new Date(time).getTime() - 1000 * 60 * 60 * 24 * 7);
    expect(n.valueOf()).toBe(m.valueOf());

    const d = date.subDays(new Date(time), 7);
    expect(m.valueOf()).toBe(d.getTime());

    const day = dayjs(time).subtract(7, 'day');
    expect(m.valueOf()).toBe(day.valueOf());

    const luxon = DateTime.fromMillis(time).minus({ day: 7 });
    expect(m.valueOf()).toBe(luxon.ts);
  });

  it('Start of Time', () => {
    const m = moment(time).startOf('month');
    const d = date.startOfMonth(new Date(time));
    expect(m.valueOf()).toBe(d.getTime());

    const day = dayjs(time).startOf('month');
    expect(m.valueOf()).toBe(day.valueOf());

    const luxon = DateTime.fromMillis(time).startOf('month');
    expect(m.valueOf()).toBe(luxon.ts);
  });

  it('End of Time', () => {
    const m = moment(time).endOf('day');
    const n = new Date(time).setHours(23, 59, 59, 999);
    expect(m.valueOf()).toBe(n);

    const d = date.endOfDay(new Date(time));
    expect(m.valueOf()).toBe(d.getTime());

    const day = dayjs(time).endOf('day');
    expect(m.valueOf()).toBe(day.valueOf());

    const luxon = DateTime.fromMillis(time).endOf('day');
    expect(m.valueOf()).toBe(luxon.ts);
  });
});

describe('Display', () => {
  it('Format', () => {
    const m = moment(time).format('dddd, MMMM D YYYY, h:mm:ss A');
    const d = date.format(new Date(time), 'eeee, MMMM d yyyy, h:mm:ss aa', {
      awareOfUnicodeTokens: true,
    });
    const day = dayjs(time).format('dddd, MMMM D YYYY, h:mm:ss A');
    const l = DateTime.fromMillis(time).toFormat(
      'EEEE, MMMM d yyyy, h:mm:ss a'
    );
    expect(m).toBe(d);
    expect(m).toBe(day);
    expect(m).toBe(l);

    const m2 = moment(time).format('ddd, hA');
    const d2 = date.format(new Date(time), 'eee, ha');
    const day2 = dayjs(time).format('ddd, hA');
    const l2 = DateTime.fromMillis(time).toFormat('EEE, ha');
    expect(m2).toBe(d2);
    expect(m2).toBe(day2);
    expect(m2).toBe(l2);
  });

  it('Time from now', () => {
    const month3 = 1000 * 3600 * 24 * 30 * 3; // ms * hour * day * month * 3
    const timeDistance = new Date().getTime() - month3;

    moment.relativeTimeThreshold(
      'd',
      new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()
    );
    const m = moment(timeDistance).fromNow();
    const n = new Intl.RelativeTimeFormat().format(-3, 'month');
    const d = date.formatDistanceStrict(new Date(timeDistance), new Date(), {
      addSuffix: true,
    });
    const day = dayjs(timeDistance).fromNow(); // plugin
    expect(m).toBe(d);
    expect(m).toBe(day);
    expect(m).toBe(n);
  });

  it('Time from X', () => {
    const m = moment([2007, 0, 27]).to(moment([2007, 0, 29]));
    const d = date.formatDistance(new Date(2007, 0, 27), new Date(2007, 0, 29));
    const day = dayjs('2007-01-27').to(dayjs('2007-01-29'));
    expect(m).toContain(d);
    expect(m).toBe(day);
  });

  it('Difference', () => {
    const m = moment([2007, 0, 27]).diff(moment([2007, 0, 29]));
    const n = new Date(2007, 0, 27) - new Date(2007, 0, 29);
    const d = date.differenceInMilliseconds(
      new Date(2007, 0, 27),
      new Date(2007, 0, 29)
    );
    const day = dayjs('2007-01-27').diff(dayjs('2007-01-29'), 'milliseconds');
    const luxon = DateTime.local(2007, 1, 27).diff(DateTime.local(2007, 1, 29))
      .milliseconds;
    expect(m).toBe(d);
    expect(m).toBe(day);
    expect(n).toBe(d);
    expect(n).toBe(m);
    expect(n).toBe(day);
    expect(n).toBe(luxon);

    const m2 = moment([2007, 0, 27]).diff(moment([2007, 0, 29]), 'days');
    const n2 = Math.ceil(
      (new Date(2007, 0, 27) - new Date(2007, 0, 29)) / 1000 / 60 / 60 / 24
    );
    const d2 = date.differenceInDays(
      new Date(2007, 0, 27),
      new Date(2007, 0, 29)
    );
    const day2 = dayjs('2007-01-27').diff(dayjs('2007-01-29'), 'days');
    const luxon2 = DateTime.local(2007, 1, 27).diff(
      DateTime.local(2007, 1, 29),
      'days'
    ).days;

    expect(m2).toBe(d2);
    expect(m2).toBe(day2);
    expect(n2).toBe(m2);
    expect(n2).toBe(d2);
    expect(n2).toBe(day2);
    expect(n2).toBe(luxon2);
  });
});

describe('Query', () => {
  it('Is Before', () => {
    const m = moment('2010-10-20').isBefore('2010-10-21');
    const n = new Date(2010, 10, 20) < new Date(2010, 10, 21);
    const d = date.isBefore(new Date(2010, 9, 20), new Date(2010, 9, 21));
    const day = dayjs('2010-10-20').isBefore('2010-10-21'); //plugin
    const luxon =
      DateTime.fromISO('2010-10-20') < DateTime.fromISO('2010-10-21');
    expect(m).toBeTruthy();
    expect(d).toBeTruthy();
    expect(day).toBeTruthy();
    expect(n).toBeTruthy();
    expect(luxon).toBeTruthy();
  });

  it('Is Same', () => {
    expect(moment('2010-10-20').isSame('2010-10-21')).toBeFalsy();
    expect(new Date(2010, 9, 20) === new Date(2010, 9, 21)).toBeFalsy();
    expect(
      date.isSameDay(new Date(2010, 9, 20), new Date(2010, 9, 21))
    ).toBeFalsy();
    expect(dayjs('2010-10-20').isSame('2010-10-21')).toBeFalsy();
    expect(
      +DateTime.fromISO('2010-10-20') === +DateTime.fromISO('2010-10-21')
    ).toBeFalsy();

    expect(moment('2010-10-20').isSame('2010-10-21', 'month')).toBeTruthy();
    expect(
      new Date(2010, 9, 20).valueOf() === new Date(2010, 9, 20).valueOf()
    ).toBeTruthy();
    expect(
      new Date(2010, 9, 20).getTime() === new Date(2010, 9, 20).getTime()
    ).toBeTruthy();
    expect(
      new Date(2010, 9, 20).valueOf() === new Date(2010, 9, 20).getTime()
    ).toBeTruthy();
    expect(
      new Date(2010, 9, 20).toDateString().substring(4, 7) ===
        new Date(2010, 9, 21).toDateString().substring(4, 7)
    ).toBeTruthy();
    expect(
      date.isSameMonth(new Date(2010, 9, 20), new Date(2010, 9, 21))
    ).toBeTruthy();
    expect(
      DateTime.fromISO('2010-10-20').hasSame(
        DateTime.fromISO('2010-10-21'),
        'month'
      )
    ).toBeTruthy();
  });

  it('Is After', () => {
    const m = moment('2010-10-20').isAfter('2010-10-19');
    const n = new Date(2010, 10, 20) > new Date(2010, 10, 19);
    const d = date.isAfter(new Date(2010, 9, 20), new Date(2010, 9, 19));
    const day = dayjs('2010-10-20').isAfter('2010-10-19');
    const luxon =
      DateTime.fromISO('2010-10-20') > DateTime.fromISO('2010-10-19');
    expect(m).toBeTruthy();
    expect(n).toBeTruthy();
    expect(d).toBeTruthy();
    expect(day).toBeTruthy();
    expect(luxon).toBeTruthy();
  });

  it('Is Between', () => {
    const m = moment('2010-10-20').isBetween('2010-10-19', '2010-10-25');
    const d = date.isWithinInterval(new Date(2010, 9, 20), {
      start: new Date(2010, 9, 19),
      end: new Date(2010, 9, 25),
    });
    const day = dayjs('2010-10-20').isBetween('2010-10-19', '2010-10-25'); //plugin
    const luxon = Interval.fromDateTimes(
      DateTime.fromISO('2010-10-19'),
      DateTime.fromISO('2010-10-25')
    ).contains(DateTime.fromISO('2010-10-20'));

    expect(m).toBeTruthy();
    expect(d).toBeTruthy();
    expect(day).toBeTruthy();
    expect(luxon).toBeTruthy();
  });

  it('Is Leap Year', () => {
    expect(moment([2000]).isLeapYear()).toBeTruthy();
    expect(moment([2001]).isLeapYear()).toBeFalsy();
    expect(new Date(2000, 1, 29).getDate() === 29).toBeTruthy();
    expect(date.isLeapYear(new Date(2000, 0, 1))).toBeTruthy();
    expect(date.isLeapYear(new Date(2001, 0, 1))).toBeFalsy();
    expect(dayjs('2000-01-01').isLeapYear()).toBeTruthy();
    expect(dayjs('2001-01-01').isLeapYear()).toBeFalsy();
    expect(DateTime.local(2000).isInLeapYear).toBeTruthy();
    expect(DateTime.local(2001).isInLeapYear).toBeFalsy();
  });

  it('Is a Date', () => {
    expect(moment.isDate(new Date())).toBeTruthy();
    expect(new Date() instanceof Date).toBeTruthy();
    expect(date.isDate(new Date())).toBeTruthy();
    expect(dayjs.isDayjs(dayjs())).toBeTruthy();
    expect(DateTime.local().isValid).toBeTruthy();
  });
});
