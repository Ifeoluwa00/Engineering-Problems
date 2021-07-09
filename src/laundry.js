/**
 * Laundry Problem
 * Question 2
 *
 * @returns {any} Trip data analysis
 */
function getMaxPairs(noOfWashes, cleanPile, dirtyPile) {
  let cleanSocks = 0;
  for (let index = 0; index < cleanPile.length; index++) {
    if (
      cleanPile.includes(cleanPile[index], index + 1) &&
      cleanPile.length !== index + 1
    ) {
      let value = cleanPile.lastIndexOf(cleanPile[index]);
      cleanPile.splice(value, 1);
      cleanSocks += 1;
    } else if (dirtyPile.includes(cleanPile[index])) {
      if (noOfWashes > 0) {
        let value = dirtyPile.indexOf(cleanPile[index]);
        dirtyPile.splice(value, 1);
        cleanSocks += 1;
        noOfWashes -= 1;
      }
    }
  }

  for (let item = 0; item < dirtyPile.length; item++) {
    if (noOfWashes > 1) {
      if (
        dirtyPile.includes(dirtyPile[item], item + 1) &&
        dirtyPile.length !== item + 1
      ) {
        let value = dirtyPile.lastIndexOf(dirtyPile[item]);
        dirtyPile.splice(value, 1);
        cleanSocks += 1;
        noOfWashes -= 2;
      }
    }
  }
  return cleanSocks;
}

module.exports = getMaxPairs;
