# How to Get Google API Credentials and Spreadsheet ID for Your Website

## Step 1: Create a Google Cloud Project and Enable Sheets API
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Sign in with your Google account.
3. Click on the project dropdown at the top and select **New Project**.
4. Enter a project name (e.g., "Duo Friends Project") and click **Create**.
5. After the project is created, go to **APIs & Services > Library**.
6. Search for **Google Sheets API** and click on it.
7. Click **Enable** to enable the API for your project.

## Step 2: Create OAuth 2.0 Client ID
1. In the Cloud Console, go to **APIs & Services > Credentials**.
2. Click **Create Credentials > OAuth client ID**.
3. If prompted, configure the consent screen by providing an app name and email.
4. Choose **Web application** as the application type.
5. Under **Authorized JavaScript origins**, add the URL where you will run your site, e.g., `http://localhost:8000`.
6. Click **Create**.
7. Copy the **Client ID** shown. You will use this in your website.

## Step 3: Create an API Key
1. In the **Credentials** page, click **Create Credentials > API key**.
2. Copy the API key shown. You will use this in your website.

## Step 4: Prepare Your Google Sheet
1. Create a new Google Sheet.
2. Rename the first sheet to `Clients`.
3. Add columns in the first row: Source, Client Name, Payment, Payment Date, Employee.
4. Add a second sheet named `Employees`.
5. Add columns in the first row: Employee, Total Commission.
6. Share the Google Sheet with your Google account email (the one you will use to authenticate).

## Step 5: Get Your Spreadsheet ID
1. Open your Google Sheet.
2. The URL will look like: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit#gid=0`
3. Copy the part labeled `SPREADSHEET_ID` from the URL.

## Step 6: Update Your Website Code
1. Open the file `assets/js/google-sheets.js` in your code editor.
2. Replace the placeholders with your actual values:
   - `YOUR_GOOGLE_OAUTH_CLIENT_ID` with the Client ID from Step 2.
   - `YOUR_GOOGLE_API_KEY` with the API key from Step 3.
   - `YOUR_SPREADSHEET_ID` with the Spreadsheet ID from Step 5.
3. Save the file.

## Step 7: Run Your Website
1. Serve your website files using a local server, e.g., run:
   ```
   python3 -m http.server 8000
   ```
2. Open your browser and go to `http://localhost:8000`.
3. Use the Client Data Entry and Employee Information pages as needed.

---

If you need help with any of these steps, please let me know!
