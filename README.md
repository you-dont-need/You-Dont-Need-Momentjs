# You don't (may not) need Moment.js

[Moment.js](https://momentjs.com/) is a fantastic time & date library with lots of great features and utilities. However, if you are working on a performance sensitive web application, it might cause a huge performance overhead because of its complex APIs and large bundle size.

![Large bundle size](./screenshot.png)

Problems with Moment.js:

- It is highly based on OOP APIs, which makes it fail to work with tree-shaking, thus leading to a huge bundle size and performance issues.
- It is mutable due to OOP APIs and non-pure functions, which cause bugs:
  https://github.com/moment/moment/blob/develop/src/test/moment/add_subtract.js#L244-L286

If you are not using timezone but only a few simple functions from moment.js, this might bloat your app, and therefore is considered overkill. [dayjs](https://github.com/iamkun/dayjs) has a smaller core and has very similar APIs so it makes it very easy to migrate. [date-fns](https://github.com/date-fns/date-fns) enables [tree-shaking and other benefits](https://github.com/date-fns/date-fns/issues/275#issuecomment-264934189) so that it works great with React, Sinon.js, and webpack, etc. See https://github.com/moment/moment/issues/2373 for more ideas on why and how people switch from moment.js to other solutions.

## Brief Comparison

| Name                                     | Size(gzip)                        | Tree-shaking | Popularity | Methods richness | Pattern    | Timezone Support      | Locale |
| ---------------------------------------- | --------------------------------- | ------------ | ---------- | ---------------- | ---------- | --------------------- | ------ |
| [Moment.js](https://momentjs.com/)       | 329K(69.6K)                       | No           | 38k        | High             | OO         | Good(moment-timezone) | 123    |
| [date-fns](https://date-fns.org)         | 78.4k(13.4k) without tree-shaking | Yes          | 13k        | High             | Functional | Not yet               | 32     |
| [dayjs](https://github.com/iamkun/dayjs) | 6.5k(2.6k) without plugins        | No           | 14k        | Medium           | OO         | Not yet               | 23     |

## Voice of Developers

> [Removed moment.js to replace with date-fns - build output reduced by 40%](https://github.com/oysterprotocol/webnode/pull/116)

> &mdash;<cite>Jared Farago from [webnode](https://github.com/oysterprotocol/webnode/pull/116) project.</cite>

> [Make use of native JavaScript object and array utilities before going big. Good library if you’re looking to replace Moment.js for one reason or another. Immutable too.](https://twitter.com/dan_abramov/status/805030922785525760)

> &mdash;<cite>Dan Abramov, Author of [Redux](https://github.com/reduxjs/redux) and co-author of [Create React App](https://github.com/facebook/create-react-app). Building tools for humans.</cite>

> [I strongly recommend using date-fns over Moment.js, it's has a nicer API and you can include only parts you need!](https://twitter.com/silvenon/status/804946772690923520)

> &mdash;<cite>Matija Marohnić, a design-savvy frontend developer from Croatia.</cite>

> [Just yesterday changed momentjs to this lib in out project. Cut the size of our js bundle almost in half 😱](https://twitter.com/gribnoysup/status/805061630752997377)

> &mdash;<cite>Sergey Petushkov, a javaScript developer from Moscow, Russia • Currently in Berlin, Germany.</cite>

## ESLint Plugin

<p align="center">
  <a href="https://www.npmjs.com/package/eslint-plugin-you-dont-need-momentjs">
    <img src="https://img.shields.io/npm/v/eslint-plugin-you-dont-need-momentjs.svg?style=flat-square"
      alt="NPM Version">
  </a>
  <a href="https://www.npmjs.org/package/eslint-plugin-you-dont-need-momentjs">
    <img src="http://img.shields.io/npm/dm/eslint-plugin-you-dont-need-momentjs.svg?style=flat-square?style=flat-square"
      alt="Downloads">
  </a>
  <a href="https://travis-ci.org/you-dont-need/You-Dont-Need-Momentjs">
    <img src="https://img.shields.io/travis/you-dont-need/You-Dont-Need-Momentjs/master.svg?style=flat-square"
      alt="Build Status">
  </a>
  <a href="https://coveralls.io/github/you-dont-need/You-Dont-Need-Momentjs?branch=master">
    <img src="https://img.shields.io/coveralls/you-dont-need/You-Dont-Need-Momentjs/master.svg?style=flat-square"
      alt="Coverage Status" />
  </a>
  <a href="https://david-dm.org/you-dont-need/You-Dont-Need-Momentjs">
    <img src="https://img.shields.io/david/you-dont-need/You-Dont-Need-Momentjs.svg?style=flat-square"
         alt="Dependency Status">
  </a>
</p>

If you're using [ESLint](http://eslint.org/), you can install a
[plugin](http://eslint.org/docs/user-guide/configuring#using-the-configuration-from-a-plugin) that
will help you identify places in your codebase where you don't (may not) need Moment.js.

Install the plugin...

```sh
npm install --save-dev eslint-plugin-you-dont-need-momentjs
```

...then update your config

```js
"extends" : ["plugin:you-dont-need-momentjs/recommended"],
```

## Quick Links

**[Parse](#parse)**

1. [String + Date Format](#string--date-format)
1. [String + Time Format](#string--time-format)
1. [String + Format + locale](#string--format--locale)

**[Get + Set](#get-set)**

1. [Millisecond/Second/Minute/Hour](#millisecond--second--minute--hour)
1. [Date of Month](#date-of-month)
1. [Day of Week](#day-of-week)
1. [Day of Year](#day-of-year)
1. [Week of Year](#week-of-year)
1. [Days in Month](#days-in-month)
1. [Weeks in Year](#weeks-in-year)
1. [Maximum of the given dates](#maximum-of-the-given-dates)
1. [Minimum of the given dates](#minimum-of-the-given-dates)

**[Manipulate](#manipulate)**

1. [Add](#add)
1. [Subtract](#subtract)
1. [Start of Time](#start-of-time)
1. [End of Time](#end-of-time)

**[Display](#display)**

1. [Format](#format)
1. [Time from now](#time-from-now)
1. [Time from X](#time-from-x)
1. [Difference](#difference)

**[Query](#query)**

1. [Is Before](#is-before)
1. [Is Same](#is-same)
1. [Is After](#is-after)
1. [Is Between](#is-between)
1. [Is Leap Year](#is-leap-year)
1. [Is a Date](#is-a-date)

⚠️ _Note that the provided examples of date-fns are for [v2](https://date-fns.org/v2.0.0-alpha.16/docs/Getting-Started) which is in pre-release right now. [See v1 docs](https://date-fns.org/docs/Getting-Started) for the current release._

## Parse

### String + Date Format

Return the date parsed from date string using the given format string.

```js
// Moment.js
moment('12-25-1995', 'MM-DD-YYYY');
// => "1995-12-24T13:00:00.000Z"

// date-fns
import parse from 'date-fns/parse';
parse('12-25-1995', 'MM-dd-yyyy', new Date());
// => "1995-12-24T13:00:00.000Z"

// dayjs
dayjs('12-25-1995');
// => "1995-12-24T13:00:00.000Z"
```

**[⬆ back to top](#quick-links)**

### String + Time Format

Return the date parsed from time string using the given format string.

```js
// Moment.js
moment('2010-10-20 4:30', 'YYYY-MM-DD HH:mm');
// => "2010-10-19T17:30:00.000Z"

// date-fns
import parse from 'date-fns/parse';
parse('2010-10-20 4:30', 'yyyy-MM-dd H:mm', new Date());
// => "2010-10-19T17:30:00.000Z"

// dayjs ❌ does not support custom format parse
```

**[⬆ back to top](#quick-links)**

### String + Format + locale

Return the date parsed from string using the given format string and locale.

```js
// Moment.js
moment('2012 mars', 'YYYY MMM', 'fr');
// => "2012-02-29T13:00:00.000Z"

// date-fns
import parse from 'date-fns/parse';
import fr from 'date-fns/locale/fr';
parse('2012 mars', 'yyyy MMMM', new Date(), { locale: fr });
// => "2012-02-29T13:00:00.000Z"

// dayjs ❌ does not support custom format parse
```

**[⬆ back to top](#quick-links)**

## Get + Set

### Millisecond / Second / Minute / Hour

Get the `Millisecond/Second/Minute/Hour` of the given date.

```js
// Moment.js
moment().seconds();
// => 49
moment().hours();
// => 19

// Native
new Date().getSeconds();
// => 49
new Date().getHours();
// => 19

// date-fns
import getSeconds from 'date-fns/getSeconds';
import getHours from 'date-fns/getHours';
getSeconds(new Date());
// => 49
getHours(new Date());
// => 19

// dayjs
dayjs().second();
// => 49
dayjs().hour();
// => 19
```

Set the `Millisecond/Second/Minute/Hour` of the given date.

```js
// Moment.js
moment().seconds(30);
// => "2018-09-09T09:12:30.695Z"
moment().hours(13);
// => "2018-09-09T03:12:49.695Z"

// Native
new Date(new Date().setSeconds(30));
// => "2018-09-09T09:12:30.695Z"
new Date(new Date().setHours(13));
// => "2018-09-09T03:12:49.695Z"

// date-fns
import setSeconds from 'date-fns/setSeconds';
import setHours from 'date-fns/setHours';
setSeconds(new Date(), 30);
// => "2018-09-09T09:12:30.695Z"
setHours(new Date(), 13);
// => "2018-09-09T03:12:49.695Z"

// dayjs
dayjs().set('second', 30);
// => "2018-09-09T09:12:30.695Z"
dayjs().set('hour', 13);
// => "2018-09-09T03:12:49.695Z"
```

**[⬆ back to top](#quick-links)**

### Date of Month

Gets or sets the day of the month.

```js
// Moment.js
moment().date();
// => 9
moment().date(4);
// => "2018-09-04T09:12:49.695Z"

// Native
new Date().getDate();
// => 9
new Date().setDate(4);
// => "2018-09-04T09:12:49.695Z"

// date-fns
import getDate from 'date-fns/getDate';
import setDate from 'date-fns/setDate';
getDate(new Date());
// => 9
setDate(new Date(), 4);
// => "2018-09-04T09:12:49.695Z"

// dayjs
dayjs().date();
// => 9
dayjs().set('date', 4);
// => "2018-09-04T09:12:49.695Z"
```

**[⬆ back to top](#quick-links)**

### Day of Week

Gets or sets the day of the week.

```js
// Moment.js
moment().day();
// => 0 (Sunday)
moment().day(-14);
// => "2018-08-26T09:12:49.695Z"

// Native
new Date().getDay();
// => 0 (Sunday)
new Date().setDate(new Date().getDate() - 14);
// => "2018-08-26T09:12:49.695Z"

// date-fns
import getDay from 'date-fns/getDay';
import setDay from 'date-fns/setDay';
getDay(new Date());
// => 0 (Sunday)
setDay(new Date(), -14);
// => "2018-08-26T09:12:49.695Z"

// dayjs
dayjs().day();
// => 0 (Sunday)
dayjs().set('day', -14);
// => "2018-08-26T09:12:49.695Z"
```

**[⬆ back to top](#quick-links)**

### Day of Year

Gets or sets the day of the year.

```js
// Moment.js
moment().dayOfYear();
// => 252
moment().dayOfYear(256);
// => "2018-09-13T09:12:49.695Z"

// Native
Math.round(
  (new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
);
// => 252

// date-fns
import getDayOfYear from 'date-fns/getDayOfYear';
import setDayOfYear from 'date-fns/setDayOfYear';
getDayOfYear(new Date());
// => 252
setDayOfYear(new Date(), 256);
// => "2018-09-13T09:12:49.695Z"

// dayjs ❌ does not support day of year
```

**[⬆ back to top](#quick-links)**

### Week of Year

Gets or sets the week of the year.

```js
// Moment.js
moment().week();
// => 37
moment().week(24);
// => "2018-06-10T09:12:49.695Z"

// date-fns
import getWeek from 'date-fns/getWeek';
import setWeek from 'date-fns/setWeek';
getWeek(new Date());
// => 37
setWeek(new Date(), 24);
// => "2018-06-10T09:12:49.695Z"

// dayjs ⚠️ requires weekOfYear plugin
import weekOfYear from 'dayjs/plugin/weekOfYear';
dayjs.extend(weekOfYear);
dayjs().week();
// => 37
// dayjs ❌ does not support set week of year
```

**[⬆ back to top](#quick-links)**

### Days in Month

Get the number of days in the current month.

```js
// Moment.js
moment('2012-02', 'YYYY-MM').daysInMonth();
// => 29

// Native
new Date(2012, 02, 0).getDate();
// => 29

// date-fns
import getDaysInMonth from 'date-fns/getDaysInMonth';
getDaysInMonth(new Date(2012, 1));
// => 29

// dayjs
dayjs('2012-02').daysInMonth();
// => 29
```

**[⬆ back to top](#quick-links)**

### Weeks in Year

Gets the number of weeks in the current year, according to ISO weeks.

```js
// Moment.js
moment().isoWeeksInYear();
// => 52

// date-fns
import getISOWeeksInYear from 'date-fns/getISOWeeksInYear';
getISOWeeksInYear(new Date());
// => 52

// dayjs ❌ does not support weeks in the year
```

**[⬆ back to top](#quick-links)**

### Maximum of the given dates

Returns the maximum (most distant future) of the given date.

```js
const array = [
  new Date(2017, 4, 13),
  new Date(2018, 2, 12),
  new Date(2016, 0, 10),
  new Date(2016, 0, 9),
];
// Moment.js
moment.max(array.map(a => moment(a)));
// => "2018-03-11T13:00:00.000Z"

// Native
new Date(Math.max.apply(null, array)).toISOString();
// => "2018-03-11T13:00:00.000Z"

// date-fns
import max from 'date-fns/max';
max(array);
// => "2018-03-11T13:00:00.000Z"

// dayjs ❌ does not support the maximum of the given dates
```

**[⬆ back to top](#quick-links)**

### Minimum of the given dates

Returns the minimum (most distant future) of the given date.

```js
const array = [
  new Date(2017, 4, 13),
  new Date(2018, 2, 12),
  new Date(2016, 0, 10),
  new Date(2016, 0, 9),
];
// Moment.js
moment.min(array.map(a => moment(a)));
// => "2016-01-08T13:00:00.000Z"

// Native
new Date(Math.min.apply(null, array)).toISOString();
// => "2016-01-08T13:00:00.000Z"

// date-fns
import min from 'date-fns/min';
min(array);
// => "2016-01-08T13:00:00.000Z"

// dayjs ❌ does not support the minimum of the given dates
```

**[⬆ back to top](#quick-links)**

## Manipulate

### Add

Add the specified number of days to the given date.

```js
// Moment.js
moment().add(7, 'days');
// => "2018-09-16T09:12:49.695Z"

// Native
new Date(
  new Date().getFullYear(),
  new Date().getMonth() + 1,
  new Date().getDate() + 7,
  new Date().getHours(),
  new Date().getMinutes(),
  new Date().getSeconds(),
  new Date().getMilliseconds()
);
// => "Sun Sep 16 2018 09:12:49"

// date-fns
import addDays from 'date-fns/addDays';
addDays(new Date(), 7);
// => "2018-09-16T09:12:49.695Z"

// dayjs
dayjs().add(7, 'day');
// => "2018-09-16T09:12:49.695Z"
```

**[⬆ back to top](#quick-links)**

### Subtract

Subtract the specified number of days from the given date.

```js
// Moment.js
moment().subtract(7, 'days');
// => "2018-09-02T09:12:49.695Z"

// Native
new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7);
// => Sun Sep 09 2018 09:12:49

// date-fns
import subDays from 'date-fns/subDays';
subDays(new Date(), 7);
// => "2018-09-02T09:12:49.695Z"

// dayjs
dayjs().subtract(7, 'day');
// => "2018-09-02T09:12:49.695Z"
```

**[⬆ back to top](#quick-links)**

### Start of Time

Return the start of a unit of time for the given date.

```js
// Moment.js
moment().startOf('month');
// => "2018-08-31T14:00:00.000Z"

// date-fns
import startOfMonth from 'date-fns/startOfMonth';
startOfMonth(new Date());
// => "2018-08-31T14:00:00.000Z"

// dayjs
dayjs().startOf('month');
// => "2018-08-31T14:00:00.000Z"
```

**[⬆ back to top](#quick-links)**

### End of Time

Return the end of a unit of time for the given date.

```js
// Moment.js
moment().endOf('day');
// => "2018-09-09T13:59:59.999Z"

// date-fns
import endOfDay from 'date-fns/endOfDay';
endOfDay(new Date());
// => "2018-09-09T13:59:59.999Z"

// dayjs
dayjs().endOf('day');
// => "2018-09-09T13:59:59.999Z"
```

**[⬆ back to top](#quick-links)**

## Display

### Format

Return the formatted date string in the given format.

```js
// Moment.js
moment().format('dddd, MMMM Do YYYY, h:mm:ss A');
// => "Sunday, September 9th 2018, 7:12:49 PM"
moment().format('ddd, hA');
// => "Sun, 7PM"

// date-fns
import format from 'date-fns/format';
format(new Date(), 'eeee, MMMM do YYYY, h:mm:ss aa');
// => "Sunday, September 9th 2018, 7:12:49 PM"
format(new Date(), 'eee, ha');
// => "Sun, 7PM"

// dayjs
dayjs().format('dddd, MMMM D YYYY, h:mm:ss A');
// => "Sunday, September 9 2018, 7:12:49 PM" ⚠️  not support 9th
dayjs().format('ddd, hA');
// => "Sun, 7PM"
```

**[⬆ back to top](#quick-links)**

### Time from now

Return time from now.

```js
// Moment.js
moment(1536484369695).fromNow();
// => "4 days ago"

// date-fns
import formatDistance from 'date-fns/formatDistance';
formatDistance(new Date(1536484369695), new Date(), { addSuffix: true });
// => "4 days ago"

// dayjs ⚠️ requires relativeTime plugin
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

dayjs(1536484369695).fromNow();
// => "5 days ago" ⚠️  the rounding method of this plugin is different from moment.js and date-fns, use with care.
```

**[⬆ back to top](#quick-links)**

### Time from x

Return time from x.

```js
// Moment.js
moment([2007, 0, 27]).to(moment([2007, 0, 29]));
// => "in 2 days"

// date-fns
import formatDistance from 'date-fns/formatDistance';
formatDistance(new Date(2007, 0, 27), new Date(2007, 0, 29));
// => "2 days"

// dayjs ⚠️ requires relativeTime plugin
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
dayjs('2007-01-27').to(dayjs('2007-01-29'));
// => "in 2 days"
```

**[⬆ back to top](#quick-links)**

### Difference

Get the unit of time between the given dates.

```js
// Moment.js
moment([2007, 0, 27]).diff(moment([2007, 0, 29]));
// => -172800000
moment([2007, 0, 27]).diff(moment([2007, 0, 29]), 'days');
// => -2

// Native
new Date(2007, 0, 27) - new Date(2007, 0, 29);
// => -172800000
Math.ceil(
  (new Date(2007, 0, 27) - new Date(2007, 0, 29)) / 1000 / 60 / 60 / 24
);
// => -2

// date-fns
import differenceInMilliseconds from 'date-fns/differenceInMilliseconds';
differenceInMilliseconds(new Date(2007, 0, 27), new Date(2007, 0, 29));
// => -172800000
import differenceInDays from 'date-fns/differenceInDays';
differenceInDays(new Date(2007, 0, 27), new Date(2007, 0, 29));
// => -2

// dayjs
dayjs('2007-01-27').diff(dayjs('2007-01-29'), 'milliseconds');
// => -172800000
dayjs('2007-01-27').diff(dayjs('2007-01-29'), 'days');
// => -2
```

**[⬆ back to top](#quick-links)**

## Query

### Is Before

Check if a date is before another date.

```js
// Moment.js
moment('2010-10-20').isBefore('2010-10-21');
// => true

// Native
new Date(2010, 10, 20) < new Date(2010, 10, 21);
// => true

// date-fns
import isBefore from 'date-fns/isBefore';
isBefore(new Date(2010, 9, 20), new Date(2010, 9, 21));
// => true

// dayjs
dayjs('2010-10-20').isBefore('2010-10-21');
// => true
```

**[⬆ back to top](#quick-links)**

### Is Same

Check if a date is same another date.

```js
// Moment.js
moment('2010-10-20').isSame('2010-10-21');
// => false
moment('2010-10-20').isSame('2010-10-20');
// => true
moment('2010-10-20').isSame('2010-10-21', 'month');
// => true

// Native
new Date(2010, 9, 20) === new Date(2010, 9, 21);
// => false
new Date(2010, 9, 20) === new Date(2010, 9, 20);
// => true
new Date(2010, 9, 20).toDateString().substring(4, 7) ===
  new Date(2010, 9, 21).toDateString().substring(4, 7);
// => true

// date-fns
import isSameDay from 'date-fns/isSameDay';
import isSameMonth from 'date-fns/isSameMonth';
isSameDay(new Date(2010, 9, 20), new Date(2010, 9, 21));
// => false
isSameDay(new Date(2010, 9, 20), new Date(2010, 9, 20));
// => true
isSameMonth(new Date(2010, 9, 20), new Date(2010, 9, 21));
// => true

// dayjs
dayjs('2010-10-20').isSame('2010-10-21');
// => false
dayjs('2010-10-20').isSame('2010-10-20');
// => true
// dayjs ❌ does not support is same month
```

**[⬆ back to top](#quick-links)**

### Is After

Check if a date is after another date.

```js
// Moment.js
moment('2010-10-20').isAfter('2010-10-19');
// => true

// Native
new Date(2010, 9, 20) > new Date(2010, 9, 19);
// => true

// date-fns
import isAfter from 'date-fns/isAfter';
isAfter(new Date(2010, 9, 20), new Date(2010, 9, 19));
// => true

// dayjs
dayjs('2010-10-20').isAfter('2010-10-19');
// => true
```

**[⬆ back to top](#quick-links)**

### Is Between

Check if a date is between two other dates.

```js
// Moment.js
moment('2010-10-20').isBetween('2010-10-19', '2010-10-25');
// => true

// date-fns
import isWithinInterval from 'date-fns/isWithinInterval';
isWithinInterval(new Date(2010, 9, 20), {
  start: new Date(2010, 9, 19),
  end: new Date(2010, 9, 25),
});
// => true

// dayjs ⚠️ requires isBetween plugin
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);
dayjs('2010-10-20').isBetween('2010-10-19', '2010-10-25');
// => true
```

**[⬆ back to top](#quick-links)**

### Is Leap Year

Check if a year is a leap year.

```js
// Moment.js
moment([2000]).isLeapYear();
// => true

// Native
new Date(2000, 1, 29).getDate() === 29;
// => true

// date-fns
import isLeapYear from 'date-fns/isLeapYear';
isLeapYear(new Date(2000, 0, 1));
// => true

// dayjs ⚠️ requires isLeapYear plugin
import isLeapYear from 'dayjs/plugin/isLeapYear';
dayjs.extend(isLeapYear);
dayjs('2000').isLeapYear();
// => true
```

**[⬆ back to top](#quick-links)**

### Is a Date

Check if a variable is a native js Date object.

```js
// Moment.js
moment.isDate(new Date());
// => true

// Native
new Date() instanceof Date;
// => true

// date-fns
import isDate from 'date-fns/isDate';
isDate(new Date());
// => true

// dayjs ❌ does not support is date
```

**[⬆ back to top](#quick-links)**

# License

MIT
