const CLIENT_ID = 'YOUR_GOOGLE_OAUTH_CLIENT_ID';
const API_KEY = 'YOUR_GOOGLE_API_KEY';
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
const SCOPES = "https://www.googleapis.com/auth/spreadsheets";

const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';
const CLIENTS_SHEET_NAME = 'Clients';
const EMPLOYEES_SHEET_NAME = 'Employees';

function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(() => {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
  }, (error) => {
    console.error(JSON.stringify(error, null, 2));
  });
}

function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    // User signed in
    if (document.getElementById('client-form')) {
      setupClientForm();
    }
    if (document.getElementById('employee-table-body')) {
      loadEmployeeData();
    }
  } else {
    gapi.auth2.getAuthInstance().signIn();
  }
}

function setupClientForm() {
  const form = document.getElementById('client-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const source = form.source.value.trim();
    const clientName = form.clientName.value.trim();
    const payment = parseFloat(form.payment.value);
    const paymentDate = form.paymentDate.value;
    const employee = form.employee.value.trim();

    if (!source || !clientName || isNaN(payment) || !paymentDate || !employee) {
      alert('Please fill all fields correctly.');
      return;
    }

    // Calculate commission
    const commission = payment * 40; // 40 PKR per dollar

    try {
      // Append client data to Clients sheet
      await appendRowToSheet(CLIENTS_SHEET_NAME, [source, clientName, payment, paymentDate, employee]);

      // Update employee commission in Employees sheet
      await updateEmployeeCommission(employee, commission);

      form.reset();
      document.getElementById('message').textContent = 'Client payment and commission recorded successfully.';
    } catch (error) {
      console.error(error);
      alert('Error saving data. Please try again.');
    }
  });
}

async function appendRowToSheet(sheetName, rowData) {
  const params = {
    spreadsheetId: SPREADSHEET_ID,
    range: `${sheetName}!A1`,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
  };
  const valueRangeBody = {
    values: [rowData],
  };
  const request = gapi.client.sheets.spreadsheets.values.append(params, valueRangeBody);
  return request.then(response => response.result);
}

async function updateEmployeeCommission(employeeName, commissionToAdd) {
  // Get all employee data
  const params = {
    spreadsheetId: SPREADSHEET_ID,
    range: `${EMPLOYEES_SHEET_NAME}!A:B`,
  };
  const response = await gapi.client.sheets.spreadsheets.values.get(params);
  const rows = response.result.values || [];

  // Find employee row
  let employeeRowIndex = -1;
  for (let i = 0; i < rows.length; i++) {
    if (rows[i][0] && rows[i][0].toLowerCase() === employeeName.toLowerCase()) {
      employeeRowIndex = i + 1; // 1-based index for Sheets API
      break;
    }
  }

  if (employeeRowIndex === -1) {
    // Employee not found, add new employee with commission
    await appendRowToSheet(EMPLOYEES_SHEET_NAME, [employeeName, commissionToAdd]);
  } else {
    // Employee found, update commission
    const currentCommission = parseFloat(rows[employeeRowIndex - 1][1]) || 0;
    const newCommission = currentCommission + commissionToAdd;

    const updateParams = {
      spreadsheetId: SPREADSHEET_ID,
      range: `${EMPLOYEES_SHEET_NAME}!B${employeeRowIndex}`,
      valueInputOption: 'USER_ENTERED',
    };
    const valueRangeBody = {
      values: [[newCommission]],
    };
    await gapi.client.sheets.spreadsheets.values.update(updateParams, valueRangeBody);
  }
}

async function loadEmployeeData() {
  const params = {
    spreadsheetId: SPREADSHEET_ID,
    range: `${EMPLOYEES_SHEET_NAME}!A:B`,
  };
  const response = await gapi.client.sheets.spreadsheets.values.get(params);
  const rows = response.result.values || [];

  const tbody = document.getElementById('employee-table-body');
  tbody.innerHTML = '';

  rows.forEach((row, index) => {
    if (index === 0) return; // Skip header row if present
    const tr = document.createElement('tr');
    tr.classList.add(index % 2 === 0 ? 'bg-white' : 'bg-gray-50');

    const tdName = document.createElement('td');
    tdName.className = 'border border-gray-300 px-4 py-2';
    tdName.textContent = row[0] || '';

    const tdCommission = document.createElement('td');
    tdCommission.className = 'border border-gray-300 px-4 py-2';
    tdCommission.textContent = row[1] ? parseFloat(row[1]).toFixed(2) : '0.00';

    tr.appendChild(tdName);
    tr.appendChild(tdCommission);
    tbody.appendChild(tr);
  });
}

// Load client API on window load
window.onload = () => {
  handleClientLoad();
};
