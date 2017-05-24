/**
 * @class DeepSearch
 */
class DeepSearch {

  /**
   * Creates an instance of DeepSearch.
   * @param {Object} obj - default object to search
   * @memberOf DeepSearch
   */
  constructor(obj) {
    this.obj = obj || {};
  }

  /**
   * validateInput - validate the user's input
   * @param {Any} input - the user's input
   * @param {String} type - type of data type needed
   * @param {Boolean} allowEmpty - to either allow empty field or not
   * @return {Boolean} false if validation error
   */
  static validateInput(input, type, allowEmpty = false) {
    if (type === 'string' && typeof input === 'string' && !allowEmpty) {
      return input.length > 0;
    } else if (type === 'object' && typeof input === 'object' && !allowEmpty) {
      return Object.keys(input).length > 0;
    }
    return true;
  }

  /**
   * searchKey - get the value of the field provided
   * @param {String} field - name of key to search for
   * @param {Object} obj - nested object to search
   * @return {Any} value of the field that was searched
   */
  searchKey(field, obj = this.obj) {
    if (!DeepSearch.validateInput(field, 'string')
      || !DeepSearch.validateInput(obj, 'object')) {
      return 'Input Error';
    }
    try {
      const [first, ...remains] = Object.keys(obj);
      let newObj = {};
      switch (true) {
        case (remains.length > 1):
          remains.forEach((remain) => {
            newObj[remain] = obj[remain];
          });
          break;
        case (remains.length === 0):
          newObj = obj[first];
          break;
        default: {
          newObj[remains] = obj[remains];
        }
      }
      return (first === field) ?
        obj[first] : this.searchKey(field, newObj);
    } catch (error) {
      return 'Not Found';
    }
  }
}

export default DeepSearch;
