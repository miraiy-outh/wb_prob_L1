const formatModule = require('./16moduledate.js');

const now = new Date();
const futureDate = new Date(now.getFullYear() + 1, now.getMonth() + 5, now.getDate() + 10);

const formattedDate = formatModule.formatDate(now, 'YYYY-MM-DD');
console.log(`Current date: ${formattedDate}`);

let type = 'days';
const countedDate = formatModule.countDate(futureDate, now, type);
console.log(`Difference between two dates in ${type}: ${countedDate}`);