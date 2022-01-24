function checkDuplicatedTables(tables) {
    let isDuplicated = false;
    const tableNumbers = tables.map((item) => item.table_number);
    const noDuplicatesNumbers = new Set(tableNumbers);
    if (noDuplicatesNumbers.size !== tableNumbers.length) {
      isDuplicated = true;
    }
    return isDuplicated;
  }
  
  export default checkDuplicatedTables;
  