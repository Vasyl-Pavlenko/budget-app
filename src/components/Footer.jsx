import React from 'react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-center  py-3">
      <p className='m-0'>
        Developed by Vasyl Pavlenko | All rights protected &copy; {currentYear}
      </p>
    </footer>
  );
};
