"use strict";
// Print all entries, across all of the sources, in chronological order.
const sortTwoArr = require("./sort-two-array");

module.exports = (logSources, printer) => {
  const allLogs = [];
  let sorted = [];

  for(let i=0; i<logSources.length; i++){
    // Take each log source
    // Pop logs until the end
    // and place them as one single array
    const currentLogSource = logSources[i];
    const currentArr = [];
    let currentLog = currentLogSource.pop();
    while(currentLog) {
      currentArr.push(currentLog);
      currentLog = currentLogSource.pop();
    }
    allLogs.push(currentArr);
  }

  for (let i=0; i<allLogs.length;i++){
    // Cumulatively sort here
    sorted = sortTwoArr(sorted, allLogs[i]);
  }

  sorted.forEach(a => printer.print(a));
  printer.done();
  return console.log("Sync sort complete.");
};
