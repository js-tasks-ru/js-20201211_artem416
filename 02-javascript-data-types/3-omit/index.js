/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */

export const omit = function(obj, ...fields) {
    let answer = obj;
    const keys = Object.keys(obj);
    for (let i = 0; i < fields.length; i++) {
        if (keys.indexOf(fields[i]) != -1) {
            delete answer[[fields[i]]];
        }
    }
    return answer;
};