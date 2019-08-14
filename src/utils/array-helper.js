  
/**
 * Get Value for a given key
 * @param {Array} inputArray to operate on
 *  @param {String} key to operate on
 * @returns {object} value for the particular key by applying filter on the Array
 */
  export function getValueOf (inputArray, key) {
    const result = inputArray.filter(element => element.key === key.valueOf());
    if (result != undefined && result.length > 0) {
     return result[0].value; 
    }
    else return null;
  }

/**
 * Get Values for a given range
 * @param {Array} inputArray to operate on
 *  @param {start} start key inclusive
 * @param {end} end key exclusive
 * @returns [{object}] array of objects for the particular start end
 */
  export function getValuesInRangeOf (inputArray, start, end) {

    const result = inputArray.filter(function (element) {
        return element.key >= start.valueOf() &&  element.key < end.valueOf() ;
      });
    return result
}