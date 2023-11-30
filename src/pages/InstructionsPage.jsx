import { Container } from 'react-bootstrap';
import PageList from '../components/PageList';
import { exchangeRatesItems, homePageItems, resultsPage, technologiesUsedItems, transactionsPageItems } from '../constants';

const InstructionPage = () => {
  return (
    <Container className="py-4 w-75">
      <h1>How to use this App</h1>

      <PageList
        title="Home Page"
        items={homePageItems}
      />

      <PageList
        title="Transactions"
        items={transactionsPageItems}
      />

      <PageList
        title="Results Page"
        items={resultsPage}
      />

      <PageList
        title="Currency Exchange Rates and Other Data"
        items={exchangeRatesItems}
      />     

      <PageList
        title="Technologies Used"
        items={technologiesUsedItems}
      />      
    </Container>
  );
};

export default InstructionPage;