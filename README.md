# Small Business Website with Google Sheets Integration

## Overview
This is a simple frontend-only website for managing client data and employee commissions for a small business. It integrates with Google Sheets to store and retrieve data using the Google Sheets API and OAuth 2.0 client-side authentication.

## Features
- Client data entry form to record client source, name, payment, payment date, and employee.
- Automatic calculation of employee commission (40 PKR per USD payment).
- Employee information page showing total commissions.
- Data is saved and retrieved from Google Sheets.
- Responsive and modern design using Tailwind CSS, Google Fonts, and Font Awesome.

## Setup Instructions

### 1. Create a Google Cloud Project and Enable APIs
- Go to [Google Cloud Console](https://console.cloud.google.com/).
- Create a new project.
- Enable the Google Sheets API for your project.

### 2. Create OAuth 2.0 Credentials
- In the Cloud Console, go to **APIs & Services > Credentials**.
- Click **Create Credentials > OAuth client ID**.
- Choose **Web application**.
- Add your site URL (e.g., `http://localhost`) to the authorized JavaScript origins.
- Add redirect URIs if needed.
- Save and note your **Client ID**.

### 3. Create an API Key
- In the same Credentials page, click **Create Credentials > API key**.
- Restrict the key as needed.

### 4. Prepare Your Google Sheet
- Create a Google Sheet with two sheets named exactly:
  - `Clients`
  - `Employees`
- The `Clients` sheet columns: Source, Client Name, Payment, Payment Date, Employee
- The `Employees` sheet columns: Employee, Total Commission
- Share the sheet with the email address of the Google account you will use to authenticate.

### 5. Configure the Website
- Open `assets/js/google-sheets.js`.
- Replace the placeholders:
  - `YOUR_GOOGLE_OAUTH_CLIENT_ID`
  - `YOUR_GOOGLE_API_KEY`
  - `YOUR_SPREADSHEET_ID`
  with your actual credentials and spreadsheet ID.

### 6. Run the Website
- Serve the files using a local server (e.g., `python3 -m http.server 8000`).
- Open `http://localhost:8000` in your browser.
- Use the Client Data Entry page to add clients and payments.
- Use the Employee Information page to view commissions.

## Notes
- This is a frontend-only solution; users must authenticate with their Google account to allow access to the Google Sheet.
- Commission is calculated as 40 PKR per USD payment.
- Make sure your Google Sheet is shared properly to allow read/write access.

## Dependencies
- Tailwind CSS (via CDN)
- Google Fonts (Inter)
- Font Awesome (via CDN)
- Google API JavaScript client library
