// Sort Two Arrays
// takes 2 arrays and sorts them

module.exports = (arr1, arr2) => {
    const result = [];

    // Some validation check here
    if(!arr1.length && arr2.length) return [...arr2];
    if(arr1.length && !arr2.length) return [...arr1];
    if(!arr1.length && !arr2.length) return [];

    // Because we know all arrays from same log source are ordered
    // I check here in case one Log source is completely out of range from the other
    if(arr1 && arr1[0].date <= arr2[0].date && arr1[arr1.length-1].date <= arr2[arr2.length-1]) {
        result.push(...arr1, ...arr2);
    } else if(arr1[0].date >= arr2[0].date && arr1[arr1.length-1].date >= arr2[arr2.length-1]) {
        result.push(...arr2, ...arr1);
    } else {
        // If not, then we do the hard work here
        while(arr1.length && arr2.length) {
            if(arr1[0].date <= arr2[0].date) {
                result.push(arr1.shift());
            }else if(arr1[0].date >= arr2[0].date) {
                result.push(arr2.shift());
            }
        }
        if(arr1.length) result.push(...arr1);
        if(arr2.length) result.push(...arr2);
    }
    return result;
}