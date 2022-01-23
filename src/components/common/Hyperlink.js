import React from 'react';
import { Link } from 'react-router-dom';

const Hyperlink = ({ text, to }) => (
  <Link
    to={to}
    className="font-medium dark:text-cyan-300 dark:hover:text-cyan-500 text-blue-600 hover:text-blue-700 focus:outline-none focus:underline transition ease-in-out duration-150"
  >
    {text}
  </Link>
);

export default Hyperlink;
