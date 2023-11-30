## Financial Management App

### Overview
This financial management app provides users with tools to track their income, expenses, and savings, offering a comprehensive view of their financial situation. The application consists of several pages, each serving a specific purpose.

## Pages
### Home Page
- Overview of financial information.
- Log in to the application.
- Information about the developer, including experience, skills, and portfolio.
- Guidelines on how to use the application and details about the technologies employed.
- Add income and expense transactions, categorized by type.
- View the latest transactions in a table.
- Display financial statistics, including current savings in UAH, USD, and EUR, and a monthly breakdown.

## Transactions
- Add transactions by specifying the type (income or expense) and category.
- View the latest transactions in a table format.
- Modify or delete information for a specific reporting month.

## Results Page
The Financial Results page provides a comprehensive view of your financial information, including savings and monthly summaries.

- The "Savings" section displays accumulated savings in UAH, USD, and EUR, calculated based on monthly income and expenses.
- The "Monthly Summary" table breaks down income, expenses, and savings for each month. Positive values indicate income, and negative values represent expenses.
- Update, delete, or add information for a specific month using the provided buttons in each row.
- Additional information is available with links to the "How to Use" page and the "Developer Info" page.


## Instructions
- Guidelines on how to use the application effectively.

## Developer Page
- Information about the developer, including experience, skills, and portfolio.

[Live Demo](https://budget-app-delta-six.vercel.app/) 

## Technologies
- React
- React Router for navigation
- Redux Toolkit for state management
- Bootstrap for styling
- React-Bootstrap for UI components
- React-Redux for state management
- Axios for API requests
- React-toastify for notifications
- Uuidv4 for unique id

## Currency Exchange Rates and Other Data
 Exchange rates and additional data are fetched through the API from the National Bank of Ukraine.

## Getting Started
To run the Users App locally on your machine, follow these steps:

1. Clone the GitHub repository:
 
```sh
git clone https://github.com/Vasyl-Pavlenko/budget-app.git
cd login-next
```

2. Install dependencies:
```sh
npm install
# or
yarn install
```
3. Run the application:
```sh
npm run start
# or
yarn run start
```
The application should now be running locally at http://localhost:3000

## API Reference
Currency exchange rates and other data are obtained from the National Bank of Ukraine API: NBU API

## Contributing
Feel free to contribute by opening issues or submitting pull requests.
## Author
The author of this project is:  **Vasyl Pavlenko**
