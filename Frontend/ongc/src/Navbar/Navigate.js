import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../Spinners/Spinner';

function Navigation() {
  const [isLoading, setIsLoading] = useState(1);

  // Simulating an asynchronous operation
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(0);
    }, 2000); // Simulating a 2-second loading time

    return () => clearTimeout(timeout);
  }, []);

  const navigationLinks = [
    { to: '/StaticTable', text: 'Report' },
    { to: '/LiveReports', text: 'LIVE_REPORTS' },
    { to: '/Report', text: '7_REPORTS' },
    { to: '/TemperatureLineChart', text: 'TemperatureLineChart' },
  ];

  if (isLoading === 1) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex1 items-Left">
      <ul className="flex flex-row font-medium mt-3 space-x-8 rtl:space-x-reverse text-sm">
        {navigationLinks.map((link, index) => (
          <li key={index}>
            <Link to={link.to} className="text-gray-900 dark:text-white hover:blink" aria-current="page">
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Navigation;
