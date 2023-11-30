import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction, deleteTransaction } from '../redux/slices/transactionsSlice';
import { toast } from 'react-toastify';
import { Form, Button, Container, Table, Pagination } from 'react-bootstrap';
import { AiFillEdit } from 'react-icons/ai'
import { FaTrash } from 'react-icons/fa'

import { v4 as uuidv4 } from 'uuid';
import { formatDate, formatToUAH } from '../helpers';
import { expenseCategories, incomeCategories, months } from '../constants';

const rowsCount = [3, 5, 10]

const TransactionsPage = () => {
  const { transactions } = useSelector((state) => state.transactions);
  const dispatch = useDispatch();

  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [month, setMonth] = useState('');
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState('');
  const [type, setType] = useState('');
  const [сategory, setCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}, [transactions]);

  const clearForm = () => {
    setSelectedTransaction(null);
    setMonth('');
    setIncome('');
    setExpenses('');
    setType('');
    setCategory('');
  };

  const handleSaveTransactions = () => {
    try {
      if (
        !month ||
        (type === 'Income' && (isNaN(Number(income)) || income <= 0)) ||
        (type === 'Expense' && (isNaN(Number(expenses)) || expenses <= 0)) ||
        !сategory
      ) {
        throw new Error('Please provide valid input for all fields.');
      }

      const newTransaction = {
        id: selectedTransaction ? selectedTransaction.id : uuidv4(),
        month,
        income: type === 'Income' ? parseFloat(income) : 0,
        expenses: type === 'Expense' ? parseFloat(expenses) : 0,
        type,
        сategory,
        createdAt: selectedTransaction ? selectedTransaction.createdAt : Date.now(),
      };

      if (selectedTransaction) {
        dispatch(addTransaction(newTransaction));
        toast.success('✨ Transaction updated successfully!');
      } else {
        dispatch(addTransaction(newTransaction));
        toast.success('✨ New transaction added successfully!');
      }

      clearForm();
    } catch (error) {
      console.error('Transaction saving error:', error);
      toast.error('❌ An error occurred while saving the transaction. Please try again.');
    }
  };

  const handleEditTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setMonth(transaction.month);
    setIncome(transaction.income);
    setExpenses(transaction.expenses);
    setType(transaction.type);
    setCategory(transaction.сategory);
  };

  const handleDeleteTransaction = (transaction) => {
    if (window.confirm(`Are you sure you want to delete transaction?`)) {
      dispatch(deleteTransaction(transaction));
      toast.success('✨ Transaction deleted successfully!');
      clearForm();
    }
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = transactions.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container className='py-4 d-flex flex-column align-items-center'>
      <h2>Transactions Page</h2>

      <Form className="mb-3 w-50">
        <Form.Group
          className="mb-2"
          controlId="formReportMonth"
        >
          <Form.Label>
            Report Month:
          </Form.Label>

          <Form.Select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option
              value=""
              disabled
            >
              Select month
            </option>

            {months.map((month) => (
              <option
                key={uuidv4()}
                value={month}
              >
                {month}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group
          className="mb-2"
          controlId="formType"
          disabled
        >
          <Form.Label>
            Transaction Type
          </Form.Label>

          <Form.Select
            value={type}
            onChange={(e) => setType(e.target.value)}
            disabled={!month}
          >
            <option
              value=""
              disabled
            >
              Select transaction
            </option>

            <option value="Income">
              Income
            </option>

            <option value="Expense">
              Expense
            </option>
          </Form.Select>
        </Form.Group>

        <Form.Group
          className="mb-2"
          controlId="formExpenseCategory"
        >
          <Form.Label>
            Category
          </Form.Label>

          <Form.Select
            value={сategory}
            onChange={(e) => setCategory(e.target.value)}
            disabled={!type}
          >
            <option
              value=""
              disabled
            >
              Select category
            </option>

            {type === 'Income' ? (
              incomeCategories.map((cat) => (
                <option
                  key={uuidv4()}
                  value={cat}
                >
                  {cat}
                </option>
              ))
            ) : (
              expenseCategories.map((cat) => (
                <option
                  key={uuidv4()}
                  value={cat}
                >
                  {cat}
                </option>
              ))
            )}
          </Form.Select>
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="formIncome"
        >
          <Form.Label>
            Amount
          </Form.Label>

          <Form.Control
            type="number"
            placeholder={`Enter your ${type.toLowerCase()} amount`}
            value={type === 'Income' ? income : expenses}
            disabled={!сategory}
            onChange={
              (e) => (type === 'Income'
                ? setIncome(e.target.value)
                : setExpenses(e.target.value)
              )
            }
          />
        </Form.Group>

        <Button
          variant="success"
          type="button"
          onClick={handleSaveTransactions}
          disabled={!сategory}
        >
          {selectedTransaction ? 'Update Transaction' : 'Save Transaction'}
        </Button>
      </Form>

      {!!transactions.length && (
        <>
          <h3>Your last transactions</h3>

          <Form.Group controlId="formRowsPerPage">
            <Form.Label>
              Rows per Page
            </Form.Label>

            <Form.Select
              value={rowsPerPage}
              className='w-75 ms-2 mb-2'
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              {rowsCount.map((row, index) => (
                <option
                  key={index + row}
                  value={row}
                >
                  {row}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Table
            striped
            bordered
            hover
            className='w-75 rounded text-center'
          >
            <thead>
              <tr>
                <th>#</th>

                <th>Month</th>

                <th>Amount ($)</th>

                <th>Type</th>

                <th>Category</th>

                <th>Date</th>
                
                <th>Action</th>
              </tr>
            </thead>
            
            <tbody>
              {currentRows.map((transaction, index) => (
                <tr key={transaction.id}>
                  <td>{index + 1}</td>

                  <td>{transaction.month}</td>

                  <td
                    style={
                      {
                      color: transaction.type.toLowerCase() === 'income'
                        ? 'green'
                        : 'red'
                      }
                    }
                  >
                    {transaction.type.toLowerCase() === 'income'
                      ? `+${formatToUAH.format(+transaction.income)}`
                      : `-${formatToUAH.format(+transaction.expenses)}`
                    }
                  </td>

                  <td
                    style={
                      {
                      color: transaction.type.toLowerCase() === 'income'
                        ? 'green'
                        : 'red'
                      }
                    }
                  >
                    {transaction.type}
                  </td>

                  <td>
                    {transaction.сategory}
                  </td>

                  <td>
                    {formatDate(transaction.createdAt)}
                  </td>
                
                  <td>
                    <AiFillEdit
                      className='text-primary cursor-pointer'
                      onClick={() => handleEditTransaction(transaction)}
                    />

                    <FaTrash
                      className='ms-4 text-danger cursor-pointer'
                      onClick={() => handleDeleteTransaction(transaction)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Pagination className='mt-3'>
            <Pagination.Prev
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            />
            
            {Array.from({ length: Math.ceil(transactions.length / rowsPerPage) }, (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}

            <Pagination.Next
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === Math.ceil(transactions.length / rowsPerPage)}
            />
          </Pagination>
        </>
      )}
    </Container>
  );
};

export default TransactionsPage;
