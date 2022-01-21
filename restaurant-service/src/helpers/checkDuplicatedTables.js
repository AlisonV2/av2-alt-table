function checkDuplicatedTables(tables) {
  const tableNumbers = tables.map((item) => item.table_number);
  const noDuplicatesNumbers = new Set(tableNumbers);
  if (noDuplicatesNumbers.size !== tableNumbers.length) {
    return true;
  } else {
    return false;
  }
}

export default checkDuplicatedTables;