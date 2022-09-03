"use strict";

// Print all entries, across all of the *async* sources, in chronological order.
const sortTwoArray = require('./sort-two-array');


// Resolve Each Log Sources' log entries until the end
const resolveLogSource = async (logSource) => {
  let currentLog = await logSource.popAsync();
  const result = [];
  while(currentLog) {
    result.push(currentLog);
    currentLog = await logSource.popAsync();
  }
  return result;
}

module.exports = async (logSources, printer) => {

  const allLogs = [];
  let sorted = [];

  // Have resolveLogSource to do its job for each Log Source
  logSources.forEach(logSource => allLogs.push(resolveLogSource(logSource)));

  // Resolve all entries to make them ready for sorting operation
  let resultArr = await Promise.all(allLogs);

  for(let i=0; i<resultArr.length; i++) {
    // Sort resolved sources' entries
    sorted = sortTwoArray(sorted, resultArr[i]);
  }

  sorted.forEach(log => printer.print(log));
  printer.done();

  return new Promise((resolve, reject) => {
    resolve(console.log("Async sort complete."));
  });
};
