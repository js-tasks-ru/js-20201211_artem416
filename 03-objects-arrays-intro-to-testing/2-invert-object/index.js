/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {
    if (obj) {
        const copy = {...obj };
        const keys = Object.keys(copy);
        const values = Object.values(copy);
        let answer = {};
        for (let i = 0; i < keys.length; i++) {
            answer[values[i]] = keys[i];
        }
        return answer;
    }
}