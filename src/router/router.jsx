import { createBrowserRouter } from "react-router-dom";
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import TransactionsPage from '../pages/TransactionsPage';
import ErrorPage from '../pages/ErrorPage';
import MainLayout from '../layouts/MainLayout'
import DevPage from '../pages/DevPage';
import InstructionsPage from '../pages/InstructionsPage';
import ResultsPage from '../pages/ResultsPage';
import { ProtectedRoute } from '../components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/transactions",
        element: (
          <ProtectedRoute>
            <TransactionsPage />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: "/results",
        element: (
          <ProtectedRoute>
            <ResultsPage />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: "/instructions",
        element: <InstructionsPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/dev",
        element: <DevPage />,
        errorElement: <ErrorPage />,
      },
    ]
  },
  
]);