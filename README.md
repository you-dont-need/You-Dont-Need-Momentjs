# You don't (may not) need Moment.js

[Moment.js](https://momentjs.com/) a fantasic date library with lots of great features and utilities. However, when you are working on a performance sensitive web application, it might have a huge performance overhead becasue of the complex API and large bundle size.

Problems with Moment.js: 
- Hightly based on OOP API, which makes it won't work with tree-shaking, thus leading to a huge bundle size and performance issue.
- Moment.js is mutable due to OOP API and non-pure function, which causes bugs:
  https://github.com/moment/moment/blob/develop/src/test/moment/add_subtract.js#L244-L286

Only use some simple functions from moment.js might be considered overkill, [date-fns](https://github.com/date-fns/date-fns) can be a good replacement in this case. see https://github.com/moment/moment/issues/2373 for more ideas of why and how people switch from moment.js to date-fns.

<img src="./screenshot.png" alt="Screenshot"/>

## Quick Links

**[Parse](#parse)**

1. [String + Date Format](#string-date-format)
1. [String + Time Format](#string-time-format)
1. [String + Format + locale](#string-format-locale)

**[Get + Set](#get-set)**

1. [Millisecond/Second/Minute/Hour](#millisecond-second-minute-hour)
1. [Date of Month](#date-of-month)
1. [Day of Week](#date-of-week)
1. [Day of Year](#date-of-year)
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


## Parse

### String + Date Format

Return the date parsed from date string using the given format string.

```js
// Moment.js
moment("12-25-1995", "MM-DD-YYYY");
// => "1995-12-24T13:00:00.000Z"

// date-fns
import parse from 'date-fns/parse'
parse("12-25-1995", "MM-dd-yyyy", new Date());
// => "1995-12-24T13:00:00.000Z"
```

### String + Time Format

Return the date parsed from time string using the given format string.

```js
// Moment.js
moment("2010-10-20 4:30", "YYYY-MM-DD HH:mm");
// => "2010-10-19T17:30:00.000Z"

// date-fns
import parse from 'date-fns/parse'
parse("2010-10-20 4:30", "yyyy-MM-dd H:mm", new Date());
// => "2010-10-19T17:30:00.000Z"
```

### String + Format + locale

Return the date parsed from string using the given format string and locale.

```js
// Moment.js
moment("2012 mars", "YYYY MMM", "fr");
// => "2012-02-29T13:00:00.000Z"

// date-fns
import parse from 'date-fns/parse';
import fr from 'date-fns/locale/fr';
parse('2012 mars', "yyyy MMMM", new Date(), { locale: fr });
// => "2012-02-29T13:00:00.000Z"
```

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
new Date(new Date().getHours(13));
// => "2018-09-09T03:12:49.695Z"
```

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
```

### Day of Week

Gets or sets the day of the week.

```js
// Moment.js
moment().day();
// => 0
moment().day(-14);
// => "2018-08-26T09:12:49.695Z"

// Native
new Date().getDay();
// => 0
new Date().setDate(new Date().getDate() - 14);
// => "2018-08-26T09:12:49.695Z"
```

### Day of Year

Gets or sets the day of the year.

```js
// Moment.js
moment().dayOfYear();
// => 252
moment().dayOfYear(256);
// => "2018-09-13T09:12:49.695Z"

// date-fns
import getDayOfYear from 'date-fns/getDayOfYear';
getDayOfYear(new Date());
// => 252
import setDayOfYear from 'date-fns/setDayOfYear';
setDayOfYear(new Date(), 256);
// => "2018-09-13T09:12:49.695Z"
```

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
getWeek(new Date());
// => 37
import setWeek from 'date-fns/setWeek';
setWeek(new Date(), 24);
// => "2018-06-10T09:12:49.695Z"
```

### Days in Month

Get the number of days in the current month.

```js
// Moment.js
moment("2012-02", "YYYY-MM").daysInMonth();
// => 29

// date-fns
import getDaysInMonth from 'date-fns/getDaysInMonth';
getDaysInMonth(new Date(2012, 1));
// => 29
```

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
```

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
moment.max(array.map(a => moment(a)))
// => "2018-03-11T13:00:00.000Z"

// date-fns
import max from 'date-fns/max';
max(array);
// => "2018-03-11T13:00:00.000Z"
```

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
moment.min(array.map(a => moment(a)))
// => "2016-01-08T13:00:00.000Z"

// date-fns
import min from 'date-fns/min';
min(array);
// => "2016-01-08T13:00:00.000Z"
```

## Manipulate

### Add

Add the specified number of days to the given date.

```js
// Moment.js
moment().add(7, 'days');
// => "2018-09-16T09:12:49.695Z"

// date-fns
import addDays from 'date-fns/addDays';
addDays(new Date(), 7);
// => "2018-09-16T09:12:49.695Z"
```

### Subtract

Subtract the specified number of days from the given date.

```js
// Moment.js
moment().subtract(7, 'days');
// => "2018-09-02T09:12:49.695Z"

// date-fns
import subDays from 'date-fns/subDays';
subDays(new Date(), 7);
// => "2018-09-02T09:12:49.695Z"
```

### Start of Time

Return the start of a unit of time for the given date.

```js
// Moment.js
moment().startOf('month');
// => "2018-08-31T14:00:00.000Z"

// date-fns
import startOfMonth from 'date-fns/startOfMonth';
startOfMonth(new Date();
// => "2018-08-31T14:00:00.000Z"
```

### End of Time

Return the end of a unit of time for the given date.

```js
// Moment.js
moment().endOf('day');
// => "2018-09-09T13:59:59.999Z"

// date-fns
import endOfDay from 'date-fns/endOfDay';
endOfDay(new Date();
// => "2018-09-09T13:59:59.999Z"
```

## Display

### Format

Return the formatted date string in the given format.

```js
// Moment.js
moment().format("dddd, MMMM Do YYYY, h:mm:ss A");
// => "Sunday, September 9th 2018, 7:12:49 PM"
moment().format("ddd, hA");
// => "Sun, 7PM"

// date-fns
import format from 'date-fns/format';
format(new Date(), "eeee, MMMM do YYYY, h:mm:ss aa");
// => "Sunday, September 9th 2018, 7:12:49 PM"
format(new Date(), "eee, ha");
// => "Sun, 7PM"
```

### Time from now

Return time from now.

```js
// Moment.js
moment().fromNow();
// => "about 4 hours ago"

// date-fns
import formatDistance from 'date-fns/formatDistance';
formatDistance(new Date(2018, 8, 9), new Date(), { addSuffix: true });
// => "4 hours ago"
```

### Time from x

Return time from x.

```js
// Moment.js
moment([ 2007, 0, 27 ]).to(moment([ 2007, 0, 29 ]));
// => "in 2 days"

// date-fns
import formatDistance from 'date-fns/formatDistance';
formatDistance(new Date(2007, 0, 27), new Date(2007, 0, 29));
// => "2 days"
```

### Difference

Get the unit of time between the given dates.

```js
// Moment.js
moment([ 2007, 0, 27 ]).diff(moment([ 2007, 0, 29 ]));
// => -172800000
moment([ 2007, 0, 27 ]).diff(moment([ 2007, 0, 29 ]), 'days');
// => -2

// date-fns
import differenceInMilliseconds from 'date-fns/differenceInMilliseconds';
differenceInMilliseconds(new Date(2007, 0, 27), new Date(2007, 0, 29));
// => -172800000
import differenceInDays from 'date-fns/differenceInDays';
differenceInDays(new Date(2007, 0, 27), new Date(2007, 0, 29));
// => -2
```


## Query

### Is Before

Check if a date is before another date.

```js
// Moment.js
moment('2010-10-20').isBefore('2010-10-21');
// => true

// date-fns
import isBefore from 'date-fns/isBefore';
isBefore(new Date(2010, 9, 20), new Date(2010, 9, 21));
// => true
```

### Is Same

Check if a date is same another date.

```js
// Moment.js
moment('2010-10-20').isSame('2010-10-21');
// => false
moment('2010-10-20').isSame('2010-10-20');
// => true

// date-fns
import isSameDay from 'date-fns/isSameDay';
isSameDay(new Date(2010, 9, 20), new Date(2010, 9, 21))
// => false
isSameDay(new Date(2010, 9, 20), new Date(2010, 9, 20))
// => true
```

### Is After

Check if a date is after another date.

```js
// Moment.js
moment('2010-10-20').isAfter('2010-10-19')
// => true

// date-fns
import isAfter from 'date-fns/isAfter';
isAfter(new Date(2010, 9, 20), new Date(2010, 9, 19));
// => true
```

### Is Between

Check if a date is between two other dates.

```js
// Moment.js
moment('2010-10-20').isBetween('2010-10-19', '2010-10-25');
// => true

// date-fns
import isWithinInterval from 'date-fns/isWithinInterval';
isWithinInterval(new Date(2010, 9, 20),
      { start: new Date(2010, 9, 19), end: new Date(2010, 9, 25) }
    )
// => true
```

### Is Leap Year

Check if a year is a leap year.

```js
// Moment.js
moment([ 2000 ]).isLeapYear();
// => true

// date-fns
import isLeapYear from 'date-fns/isLeapYear';
isLeapYear(new Date(2000, 0, 1))
// => true
```

### Is a Date

Check if a variable is a native js Date object.

```js
// Moment.js
moment.isDate(new Date())
// => true

// date-fns
import isDate from 'date-fns/isDate';
isDate(new Date())
// => true
```