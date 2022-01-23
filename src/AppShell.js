import React from 'react';
import GradientBar from './components/common/GradientBar';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

const AppShell = ({ children }) => {

  return (
    <>
      <GradientBar />
      <div className="flex">
        <div className="sm:w-64 px-4 sm:px-8 pt-6 bg-white dark:bg-zinc-900 shadow dark:shadow-lg">
          <Sidebar />
        </div>
        <div className="flex flex-col w-full border-l dark:border-b border-gray-200 dark:border-zinc-700">
          <div className="p-4 border-b border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-lg">
            <Navbar />
          </div>
          <div className="bg-gray-100 dark:bg-zinc-900 h-screen">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default AppShell;
