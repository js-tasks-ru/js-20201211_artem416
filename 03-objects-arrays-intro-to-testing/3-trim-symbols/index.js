/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
    let answer = "";
    for (let i = 0; i < string.length; i++) {
        if (string[i] != string[i - size]) {
            answer += string[i];
        }
    }
    return answer;
}