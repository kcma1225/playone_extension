const displaytable = document.getElementById("dynamic-table-body");

export function form3_f(time, name, quantity, nickname) {
    var newRow = displaytable.insertRow(); // Insert a new row
    var timeCell = newRow.insertCell(0); // Insert cells into the row
    var nameCell = newRow.insertCell(1);
    var quantityCell = newRow.insertCell(2);
    var nicknameCell = newRow.insertCell(3);
    // Set the text content of each cell with the data
    timeCell.textContent = time;
    nameCell.textContent = name;
    quantityCell.textContent = quantity;
    nicknameCell.textContent = nickname;
  }

  export function updateTopDate() {
    var currentDate = new Date().toLocaleDateString(); // Get the current date
    if (displaytable.rows.length === 0) { // If the table is empty, insert a new row
      var newRow = displaytable.insertRow(0);
      var dateCell = newRow.insertCell(0);
      dateCell.colSpan = 4; // Span across all columns
      dateCell.textContent = currentDate;
    } else { // If the table has rows, update the first row's date
      displaytable.rows[0].cells[0].textContent = currentDate;
    }
  }

