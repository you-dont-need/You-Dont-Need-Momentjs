# You don't (may not) need Moment.js

Moment.js a fantasic date library with lots of great features and utilities. However, when you are working on a performance sensitive web application, it might have a huge performance overhead becasue of the complex API and large bundle size.

Problems with Moment.js: 
- Hightly based on OOP API, which makes it won't work with tree-shaking, thus leading to a huge bundle size and performance issue.
- Moment.js is mutable due to OOP API and non-pure function, which causes bugs:
  https://github.com/moment/moment/blob/develop/src/test/moment/add_subtract.js#L244-L286

Only use some simple functions from moment.js might be considered overkill, [date-fns](https://github.com/date-fns/date-fns) can be a good replacement in this case. see https://github.com/moment/moment/issues/2373 for more ideas of why and how people switch from moment.js to date-fns.
