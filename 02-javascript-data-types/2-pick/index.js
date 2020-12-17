/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = function(obj, ...fields) {
    let answer = {};
    const keys = Object.keys(obj);
    for (let i = 0; i < fields.length; i++) {
        if (keys.indexOf(fields[i]) != -1) {
            answer[fields[i]] = fields[i];
        }
    }
    return answer;
};