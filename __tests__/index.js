const moment = require("moment");
const date = require("date-fns");
const fr = require("date-fns/locale/fr");

const time = 1536484369695;

describe("Parse", () => {
  it("String + Date Format", () => {
    const m = moment("12-25-1995", "MM-DD-YYYY");
    const d = date.parse("12-25-1995", "MM-dd-yyyy", new Date());
    expect(m.valueOf()).toBe(d.getTime());
  });
  it("String + Time Format", () => {
    const m = moment("2010-10-20 4:30", "YYYY-MM-DD HH:mm");
    const d = date.parse("2010-10-20 4:30", "yyyy-MM-dd H:mm", new Date());
    expect(m.valueOf()).toBe(d.getTime());
  });
  it("String + Format + locale", () => {
    const m = moment("2012 mars", "YYYY MMM", "fr");
    const d = date.parse("2012 mars", "yyyy MMMM", new Date(), { locale: fr });
    expect(m.valueOf()).toBe(d.getTime());
  });
});

describe("Get + Set", () => {
  it("get Second", () => {
    const m = moment(time).seconds();
    const d = new Date(time).getSeconds();
    expect(m).toBe(d);
  });
  it("set Second", () => {
    const m = moment(time)
      .seconds(30)
      .valueOf();
    const d = new Date(time).setSeconds(30);
    expect(m).toBe(d);
  });

  it("get Hour", () => {
    const m = moment(time).hours();
    const d = new Date(time).getHours();
    expect(m).toBe(d);
  });
  it("set Hour", () => {
    const m = moment(time)
      .hour(13)
      .valueOf();
    const d = new Date(time).setHours(13);
    expect(m).toBe(d);
  });

  it("get Date of Month", () => {
    const m = moment(time).date();
    const d = new Date(time).getDate();
    expect(m).toBe(d);
  });

  it("set Date of Month", () => {
    const m = moment(time)
      .date(4)
      .valueOf();
    const d = new Date(time).setDate(4);
    expect(m).toBe(d);
  });

  it("get Day of Week", () => {
    const m = moment(time).day();
    const d = new Date(time).getDay();
    expect(m).toBe(d);
  });

  it("set Day of Week", () => {
    const m = moment(time)
      .day(-14)
      .valueOf();
    const d = new Date(time).setDate(new Date(time).getDate() - 14);
    expect(m).toBe(d);
  });

  it("get Day of Year", () => {
    const m = moment(time).dayOfYear();
    const d = date.getDayOfYear(new Date(time));
    expect(m).toBe(d);
  });

  it("set Day of Year", () => {
    const m = moment(time)
      .dayOfYear(256)
      .valueOf();
    const d = date.setDayOfYear(new Date(time), 256).getTime();
    expect(m).toBe(d);
  });

  it("get Week of Year", () => {
    const m = moment(time).week();
    const d = date.getWeek(new Date(time));
    expect(m).toBe(d);
  });

  it("set Week of Year", () => {
    const m = moment(time)
      .week(24)
      .valueOf();
    const d = date.setWeek(new Date(time), 24).getTime();
    expect(m).toBe(d);
  });

  it("Days in Month", () => {
    const m = moment("2012-02", "YYYY-MM").daysInMonth();
    const d = date.getDaysInMonth(new Date(2012, 1));
    expect(m).toBe(d);
  });

  it("get Weeks In Year", () => {
    const m = moment(time).isoWeeksInYear();
    const d = date.getISOWeeksInYear(new Date(time));
    expect(m).toBe(d);
  });

  it("Maximum of the given dates", () => {
    const array = [
      new Date(2017, 4, 13),
      new Date(2018, 2, 12),
      new Date(2016, 0, 10),
      new Date(2016, 0, 9)
    ];
    const m = moment.max(array.map(a => moment(a)));
    const d = date.max(array);
    expect(m.valueOf()).toBe(d.getTime());
    expect(d).toEqual(new Date(2018, 2, 12));
  });

  it("Minimum of the given dates", () => {
    const array = [
      new Date(2017, 4, 13),
      new Date(2018, 2, 12),
      new Date(2016, 0, 10),
      new Date(2016, 0, 9)
    ];
    const m = moment.min(array.map(a => moment(a)));
    const d = date.min(array);
    expect(m.valueOf()).toBe(d.getTime());
    expect(d).toEqual(new Date(2016, 0, 9));
  });
});

describe("Manipulate", () => {
  it("Add", () => {
    const m = moment(time).add(7, "days");
    const d = date.addDays(new Date(time), 7);
    expect(m.valueOf()).toBe(d.getTime());
  });

  it("Subtract", () => {
    const m = moment(time).subtract(7, "days");
    const d = date.subDays(new Date(time), 7);
    expect(m.valueOf()).toBe(d.getTime());
  });

  it("Start of Time", () => {
    const m = moment(time).startOf("month");
    const d = date.startOfMonth(new Date(time));
    expect(m.valueOf()).toBe(d.getTime());
  });

  it("End of Time", () => {
    const m = moment(time).endOf("day");
    const d = date.endOfDay(new Date(time));
    expect(m.valueOf()).toBe(d.getTime());
  });
});

describe("Display", () => {
  it("Format", () => {
    const m = moment(time).format("dddd, MMMM Do YYYY, h:mm:ss A");
    const d = date.format(new Date(time), "eeee, MMMM do YYYY, h:mm:ss aa");
    expect(m).toBe(d);

    const m2 = moment(time).format("ddd, hA");
    const d2 = date.format(new Date(time), "eee, ha");
    expect(m2).toBe(d2);
  });

  it("Time from now", () => {
    const m = moment(time).fromNow();
    const d = date.formatDistance(new Date(time), new Date(), {
      addSuffix: true
    });
    expect(d).toContain(m);
  });

  it("Time from X", () => {
    const m = moment([ 2007, 0, 27 ]).to(moment([ 2007, 0, 29 ]));
    const d = date.formatDistance(new Date(2007, 0, 27), new Date(2007, 0, 29));
    expect(m).toContain(d);
  });

  it("Difference", () => {
    const m = moment([ 2007, 0, 27 ]).diff(moment([ 2007, 0, 29 ]));
    const d = date.differenceInMilliseconds(
      new Date(2007, 0, 27),
      new Date(2007, 0, 29)
    );
    expect(m).toBe(d);

    const m2 = moment([ 2007, 0, 27 ]).diff(moment([ 2007, 0, 29 ]), "days");
    const d2 = date.differenceInDays(
      new Date(2007, 0, 27),
      new Date(2007, 0, 29)
    );
    expect(m2).toBe(d2);
  });

});

describe("Query", () => {
  it("Is Before", () => {
    const m = moment("2010-10-20").isBefore("2010-10-21");
    const d = date.isBefore(new Date(2010, 9, 20), new Date(2010, 9, 21));
    expect(m).toBeTruthy();
    expect(d).toBeTruthy();
  });

  it("Is Same", () => {
    expect(moment("2010-10-20").isSame("2010-10-21")).toBeFalsy();
    expect(
      date.isSameDay(new Date(2010, 9, 20), new Date(2010, 9, 21))
    ).toBeFalsy();

    expect(moment("2010-10-20").isSame("2010-10-21", "month")).toBeTruthy();
    expect(
      date.isSameMonth(new Date(2010, 9, 20), new Date(2010, 9, 21))
    ).toBeTruthy();
  });

  it("Is After", () => {
    const m = moment("2010-10-20").isAfter("2010-10-19");
    const d = date.isAfter(new Date(2010, 9, 20), new Date(2010, 9, 19));
    expect(m).toBeTruthy();
    expect(d).toBeTruthy();
  });

  it("Is Between", () => {
    const m = moment("2010-10-20").isBetween("2010-10-19", "2010-10-25");
    const d = date.isWithinInterval(new Date(2010, 9, 20), {
      start: new Date(2010, 9, 19),
      end: new Date(2010, 9, 25)
    });
    expect(m).toBeTruthy();
    expect(d).toBeTruthy();
  });

  it("Is Leap Year", () => {
    expect(moment([ 2000 ]).isLeapYear()).toBeTruthy();
    expect(date.isLeapYear(new Date(2000, 0, 1))).toBeTruthy();
    expect(date.isLeapYear(new Date(2001, 0, 1))).toBeFalsy();
  });

  it("Is a Date", () => {
    expect(moment.isDate(new Date())).toBeTruthy();
    expect(date.isDate(new Date())).toBeTruthy();
  });
});
