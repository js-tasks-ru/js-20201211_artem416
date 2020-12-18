/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = "asc") {
    const newArr = arr.concat();

    function smartSort(first, second) {
        return first.localeCompare(second, "ru", { caseFirst: "upper" });
    }

    function smartSortReverse(first, second) {
        return second.localeCompare(first, "ru", { caseFirst: "lower" });
    }

    if (param === "desc") {
        return newArr.sort(smartSortReverse);
    }
    return newArr.sort(smartSort);
}