import { v4 as uuidv4 } from 'uuid';

export const personalProfile = `
  As a skilled Frontend Developer, I specialize in building robust React applications and collaborating with cross-functional teams. My expertise in web development is bolstered by my proficiency in JavaScript, Typescript, HTML5, and CSS3, as well as my hands-on experience with REST API, Git/Github, and Figma. Additionally, my diverse background, which includes law, sales management, and customer service, brings a unique perspective to my work in IT. With my previous experience, technical skills, and an Upper-Intermediate English speaker, I am well-equipped to tackle any challenge in the field of Frontend Development.
`;

export const skillsSummary = [
  'Typescript, JavaScript (ES2015 - 2019)',
  'React, Redux, React Native, Vue, Angular, Node.js, Express.js, Next.js',
  'HTML5, CSS3, Sass (SCSS), BEM, Bootstrap, Bulma, Tailwind',
  'Fetch, REST API, AJAX',
  'SQL Basic, MongoDB, GraphQL',
  'Figma',
  'Git/Github, VS Code, Chrome Developer Tools (incl. React, Redux), NPM, Webpack',
  'Algorithms: Solved 150 katas on CodeWars',
  'Basic OOP understanding',
  'Knowledge of SDLC, Waterfall, Agile concepts (Scrum, Kaban)',
  '1C, Plektan, AmoCRM, Bitrix24',
  'English: Upper-Intermediate'
];

export const workExperience = {
  position: 'Frontend Developer',
  date: 'Oct 2022 – Present',
  responsibilities: [
    'Building React applications using JSX, hooks, router, class, and functional components, adhering to best coding practices and coding standards.',
    'Collaborating with the design team to create pixel-perfect, responsive webpages based on Figma grid layout design, using HTML, CSS, SASS, and JS.',
    'Handling code reviews, investigating, reproducing, and fixing bugs to ensure smooth functionality and optimal performance of web applications.',
    'Collaborating with the backend team to integrate frontend components with API endpoints and ensure seamless data flow.',
    'Keeping up-to-date with the latest web development trends and technologies, and proactively suggesting improvements and optimizations to existing codebase.',
    'Contributing to the development of reusable UI components and libraries to improve development efficiency and maintain consistency across applications.'
  ]
};

export const buttonsData = [
  {
    id: uuidv4(),
    label: 'Resume',
    link: 'https://drive.google.com/file/d/1Q4szSROavKWttGMQ745EqMn1wBw6ERE2/view'
  },
  {
    id: uuidv4(),
    label: 'Github',
    link: 'https://github.com/Vasyl-Pavlenko'
  },
  {
    id: uuidv4(),
    label: 'Portfolio',
    link: 'https://v1-lac.vercel.app/'
  }
];

export const homePageItems = [
  'Overview of financial information.',
  'Log in to the application.',
  'Information about the developer, including experience, skills, and portfolio.',
  'Guidelines on how to use the application and details about the technologies employed.',
  'Add income and expense transactions, categorized by type. View the latest transactions in a table.',
  'Display financial statistics, including current savings in UAH, USD, and EUR, a monthly breakdown.',
];

export const transactionsPageItems = [
  'Add transactions by specifying the type (income or expense) and category.',
  'View the latest transactions in a table format.',
  'Modify or delete information for a specific reporting month.',
];

export const exchangeRatesItems = [
  'Exchange rates and additional data are fetched through the API from the National Bank of Ukraine.',
];

export const technologiesUsedItems = [
  'React',
  'React Router for navigation',
  'Redux Toolkit',
  'Bootstrap for styling',
  'React-Bootstrap for UI components',
  'React-Redux for state management',
  'Axios for API requests',
  'React-toastify for notifications',
  'Uuidv4 for unique id',
];

export const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'
];

export const incomeCategories = ['Salary', 'Gift', 'Credit', 'Other'];
export const expenseCategories = ['Food', 'Utilities', 'Rent', 'Entertainment', 'Other'];
export const resultsPage = [
    'The Financial Results page provides a comprehensive view of your financial information, including savings and monthly summaries.',
    'The "Savings" section displays your accumulated savings in UAH, USD, and EUR. These values are calculated based on your monthly income and expenses.',
    'The "Monthly Summary" table provides a detailed breakdown of your income, expenses, and savings for each month. Positive values indicate income, and negative values represent expenses. You can update, delete, or add information for a specific month by using the provided buttons in each row.',
    'If you have questions about how to use this page, please visit our How to Use page. For developer-related inquiries or to learn more about the development process, you can visit our Developer Info page.',
];