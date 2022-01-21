function checkNegativeNumbers(tables) {
  let isNegative = false;
  tables.forEach((table) => {
    if (table.seats < 0) {
      isNegative = true;
    }
  });
  return isNegative;
}

export default checkNegativeNumbers;
