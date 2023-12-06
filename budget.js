    let button = document.getElementById("button");
    let DESCRIPITION = document.getElementById("descripitionInput");
    let AMOUNT = document.getElementById("amountInput");
    let DATE = document.getElementById("dateInput");
    let TYPE = document.getElementById("type");
    let table = document.getElementById("table");
    let class_name;
    let expense_records = [];

    if (localStorage.getItem("expense_records")) {
      expense_records = JSON.parse(localStorage.getItem("expense_records"));
      renderTable();
    }

    function add_expense(date = 'N/A', type = 'N/A', descripition = 'N/A', amount = 'N/A') {
      let DATE_OBJECT = new Date(DATE.value);
      let FORMATTED_DATE = DATE_OBJECT.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
      date = FORMATTED_DATE;
      type = TYPE.value;
      descripition = DESCRIPITION.value;
      amount = AMOUNT.value;

      switch (TYPE.value) {
        case 'Venue':
          class_name = 'venue';
          break;
        case 'Decoration':
          class_name = 'decoration';
          break;
        // Add cases for other expense types
        default:
          class_name = 'miscellaneous';
      }

      expense_records.push({ type, descripition, amount, date, class_name });
      updateLocalStorage();
      renderTable();
    }

    function delete_expense(index) {
      expense_records.splice(index, 1);
      updateLocalStorage();
      renderTable();
    }

    function renderTable() {
      table.innerHTML = `<tr>
        <th>Type</th>
        <th>Description</th>
        <th>Amount</th>
        <th>Date</th>
        <th>Action</th>
      </tr>`;
      
      expense_records.forEach((expense, index) => {
        table.innerHTML += `<tr>
          <td>${expense.type}</td>
          <td>${expense.descripition}</td>
          <td>${expense.amount}</td>
          <td>${expense.date}</td>
          <td><button onclick="delete_expense(${index})">Delete</button></td>
        </tr>`;
      });
    }

    function updateLocalStorage() {
      localStorage.setItem('expense_records', JSON.stringify(expense_records));
    }

    button.addEventListener('click', add_expense);
  

