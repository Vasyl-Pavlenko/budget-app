// Local storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

// AuthUtils.js
export const setAuth = () => {
  localStorage.setItem('isAuth', true);
};

export const removeAuth = () => {
  localStorage.removeItem('isAuth');
};

// Format to USD
export const formatToUSD = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

// Format to UAH
export const formatToUAH = new Intl.NumberFormat('uk-UA', {
  style: 'currency',
  currency: 'UAH',
});

// Format to EUR
export const formatToEUR = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'EUR',
});

// Format date
export const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const getIncomeColorAndSign = (income = 0, expenses = 0) => {
    const total = income - expenses;
    const color = total >= 0 ? 'text-success' : 'text-danger';
    const sign = total >= 0 ? '+' : '-';

    return { color, sign };
};
  
export const getMonthlySummary = (transactions) => {
    const monthlySummary = {};

    transactions?.forEach((transaction) => {
      const { month, type, income, expenses } = transaction;

      if (!monthlySummary[month]) {
        monthlySummary[month] = { totalIncome: 0, totalExpenses: 0 };
      }

      if (type === 'Income') {
        monthlySummary[month].totalIncome += income;
      } else if (type === 'Expense') {
        monthlySummary[month].totalExpenses += expenses;
      }
    });

    return monthlySummary;
  };