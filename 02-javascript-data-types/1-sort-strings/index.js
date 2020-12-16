/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = "asc") {
    const newArr = arr.concat();

    function smartSort(first, second) {
        let fN = first.normalize(),
            sN = second.normalize();
        return fN.localeCompare(sN, "ru", { caseFirst: "upper" });
    }

    if (param === "desc") {
        return newArr.sort(smartSort).reverse();
    }
    return newArr.sort(smartSort);
}