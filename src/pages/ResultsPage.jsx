import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchExchangeRates } from '../redux/slices/exchangeRatesSlice';
import { deleteTransactionByMonth } from '../redux/slices/transactionsSlice';
import { Link, useNavigate } from 'react-router-dom'; 

import {
  formatToEUR,
  formatToUAH,
  formatToUSD,
  getIncomeColorAndSign,
  getMonthlySummary
} from '../helpers';
import { Container, Table, Card, Spinner, ProgressBar } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify';
import { months } from '../constants';
import { AiFillEdit } from 'react-icons/ai';

const goalAmount = 10000;

const ResultsPage = () => {
  const dispatch = useDispatch();
  const { transactions } = useSelector((state) => state.transactions);
  const { rates } = useSelector((state) => state.exchangeRates);
  const { status } = useSelector((state) => state.exchangeRates);
  const loading = status === 'loading'
  const [isLoading, setIsLoading] = useState(false)
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const navigate = useNavigate()
  
  const [savings, setSavings] = useState({
    UAH: 0,
    USD: 0,
    EUR: 0,
  });

  const progressPercentage = (savings.USD / goalAmount) * 100;
  const remainingAmount = goalAmount - savings.USD;

  const monthlySummary = getMonthlySummary(transactions); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const storedRates = JSON.parse(localStorage.getItem('exchangeRates'));

        if (storedRates) {
          dispatch(fetchExchangeRates(storedRates));
        } else {
          await dispatch(fetchExchangeRates());
        }
        calculateTotalSavings();
        calculateTotalIncomeAndExpenses();
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error.message);
        toast.error("Error fetching data:", error.message)
        setIsLoading(false)
      }
    };

    fetchData();
  }, [dispatch, transactions]);

  useEffect(() => {
    localStorage.setItem('exchangeRates', JSON.stringify(rates));
  }, [rates]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(fetchExchangeRates());
    }, 3600000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  const ratesArray = Object.values(rates);
  const rateUSD = ratesArray.find((rate) => rate.cc === 'USD')?.rate;
  const rateEUR = ratesArray.find((rate) => rate.cc === 'EUR')?.rate;

  const calculateTotalSavings = () => {
    try {
      let totalUAH = 0;
      let totalUSD = 0;
      let totalEUR = 0;

      Object.values(monthlySummary).forEach(({ totalIncome, totalExpenses }) => {
        totalUAH += totalIncome - totalExpenses;
        totalUSD += (totalIncome - totalExpenses) / rateUSD;
        totalEUR += (totalIncome - totalExpenses) / rateEUR;
      });

      setSavings({
        UAH: totalUAH,
        USD: totalUSD,
        EUR: totalEUR,
      });
    } catch (error) {
      console.error("Error calculating total savings:", error.message);
      toast.error("Error calculating total savings:", error.message)
    }
  };

  const calculateTotalIncomeAndExpenses = () => {
    try {
      let totalIncome = 0;
      let totalExpenses = 0;

      Object.values(monthlySummary).forEach(({ totalIncome: income, totalExpenses: expenses }) => {
        totalIncome += income;
        totalExpenses += expenses;
      });

      setTotalIncome(totalIncome);
      setTotalExpenses(totalExpenses);
    } catch (error) {
      console.error('Error calculating total income and expenses:', error.message);
      toast.error('Error calculating total income and expenses:', error.message);
    }
  };

  const handleDeleteTransactions = (selectedMonth) => {
  if (window.confirm(`Are you sure you want to delete all transactions for ${selectedMonth}?`)) {
    dispatch(deleteTransactionByMonth(selectedMonth));
    toast.success('✨ Transaction deleted successfully!');
  }
};

  return (
    <Container>
      <h2 className="mt-4">
        Financial Results
      </h2>

      {loading || isLoading
        ? (
          <Spinner
            animation="border"
            variant="primary"
          />
        ) : (
          <>
            <Card className="my-4">
              <Card.Body>
                <h3>Savings</h3>

                <Card.Text>UAH: {formatToUAH.format(savings.UAH)}</Card.Text>

                <Card.Text>USD: {formatToUSD.format(savings.USD)}</Card.Text>

                <Card.Text>EUR: {formatToEUR.format(savings.EUR)}</Card.Text>

                <Card.Text className="mb-4">
                  <h4>Your Savings Goal</h4>

                  <p>Your goal is to buy a new car for {formatToUSD.format(goalAmount)}.</p>

                  {remainingAmount > 0 ? (
                    <p>
                      You still need to save {formatToUSD.format(remainingAmount)} to reach your goal.
                    </p>
                  ) : (
                    <p>Congratulations! You have achieved your savings goal for a new car.</p>
                  )}
                </Card.Text>

                <ProgressBar
                  variant={progressPercentage < 0 ? 'danger' : 'success'}
                  now={progressPercentage}
                  label={`${progressPercentage.toFixed(2)}%`}
                />

                <Card.Text className="mt-4">
                  <h4>Your Monthly Financial Overview</h4>

                  <p>Here's a summary of your total incomes and expenses:</p>
                </Card.Text>

                <ProgressBar>
                  <ProgressBar
                    variant="success"
                    now={totalIncome}
                    key={1}
                    label={`Total Incomes: ${formatToUSD.format(totalIncome / rateUSD)}`}
                  />

                  <ProgressBar
                    variant="danger"
                    now={totalExpenses}
                    key={2}
                    label={`Total Expenses: ${formatToUSD.format(totalExpenses / rateUSD)}`}
                  />
                </ProgressBar>
              </Card.Body>
            </Card>

            <Card className="my-4">
              <Card.Body>
                <h3>Monthly Summary</h3>

                <Table
                  striped
                  bordered
                  hover
                  className="text-center"
                >
                  <thead>
                    <tr>
                      <th>#</th>

                      <th>Month</th>

                      <th>Total Income</th>

                      <th>Total Expenses</th>

                      <th>Result UAH</th>

                      <th>Result USD</th>

                      <th>Result EUR</th>

                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {months.map((month, index) => {
                      const monthlyData = monthlySummary[month] || { totalIncome: 0, totalExpenses: 0 };
                      const { totalIncome, totalExpenses } = monthlyData;
                      const { color } = getIncomeColorAndSign(totalIncome, totalExpenses);

                      return (
                        <tr key={month}>
                          <td>{index + 1}</td>

                          <td>{month}</td>

                          <td className="text-success">
                            + {formatToUAH.format(Math.abs(totalIncome))}
                          </td>

                          <td className="text-danger">
                            - {formatToUAH.format(Math.abs(totalExpenses))}
                          </td>

                          <td className={color}>
                            {formatToUAH.format(totalIncome - totalExpenses)}
                          </td>

                          <td className={color}>
                            {formatToUSD.format((totalIncome - totalExpenses) / rateUSD)}
                          </td>

                          <td className={color}>
                            {formatToEUR.format((totalIncome - totalExpenses) / rateEUR)}
                          </td>

                          <td>
                            <AiFillEdit
                              className='text-primary cursor-pointer'
                              onClick={() => navigate('/transactions')}
                            />
                            
                            <FaTrash
                              className='ms-4 text-danger cursor-pointer'
                              onClick={() => handleDeleteTransactions(month)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>

            <Card className="my-4">
              <Card.Body>
                <h3>Information</h3>

                <Card.Text className="mb-4">
                  If you have any questions about the functionality or need assistance, please visit our{' '}
                  <Link to="/instructions">How to Use</Link> page.
                </Card.Text>

                <Card.Text>
                  For developer-related inquiries or to learn more about the development process, you can visit
                  our <Link to="/dev">Developer Info</Link> page.
                </Card.Text>
              </Card.Body>
            </Card>
          </>
        )}
    </Container>
  );
};

export default ResultsPage;