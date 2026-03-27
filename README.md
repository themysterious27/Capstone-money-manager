## Capstone-money-manager-App

A simple and powerful **Money Manager Web Application** built using **HTML, CSS, and JavaScript (OOP + ES6 Modules)**.
This app helps users track their **income and expenses**, visualize data using charts, and manage transactions efficiently.


## Features

### ✅ Core Functionalities (CRUD)

* ➕ Add new transactions (Income / Expense)
* 📋 View all transactions in a table
* ✏️ Edit existing transactions
* ❌ Delete transactions (with confirmation)
* 💾 Data stored in **localStorage**


### Dashboard & Analytics

* Total Income
* Total Expense
* Net Balance
* Expense Distribution (Pie Chart)
* Income Distribution (Pie Chart)


### Filter & Sort

* Filter by:

  * Income / Expense
* Sort by:

  * Date (Newest / Oldest)
  * Amount (High → Low / Low → High)

### Export Feature

* Download all transactions as **CSV file**


### Form Validations

* Amount must be greater than 0
* Date is required
* Future dates not allowed
* Category must be selected
* Subcategory required
* Description max 100 characters

## Project Structure

```
Money-Manager/
│
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   └── modules/
│       ├── Transaction.js
│       ├── Storage.js
│       ├── UI.js
│       └── Filter.js


##  How to Run the Project

### Important (CORS issue avoid karne ke liye)

Do NOT open using `file://`

### Use local server:

```bash
npx serve
Then open:
http://localhost:YOUR PORT

## How It Works

* Transactions are stored as **objects**
* Saved in **localStorage (JSON format)**
* UI updates dynamically using **DOM manipulation**
* Charts update automatically on:

  * Add
  * Edit
  * Delete
  * Filter
