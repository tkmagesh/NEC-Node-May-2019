var accFactory = require('./accumulator');

var acc1 = accFactory(1000);
console.log(acc1.getResult());

var acc2 = accFactory(2000);
console.log(acc2.getResult());