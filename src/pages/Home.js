import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './../context/AuthContext';
import GradientLink from '../components/common/GradientLink';
import GradientBar from './../components/common/GradientBar';
import logo from '../assets/images/logo.png';


const Home = () => {
  const auth = useContext(AuthContext);
  
  return (
    <>
      <GradientBar />
      <div className="w-full top-0 bg-white px-10 py-0">
        <div className="flex justify-between">
          <img
            className="w-48 h-full mt-1 mb-1"
            src={logo}
            alt="Logo"
          />
          <div className="flex items-center mr-6">
            <Link
              to={auth.isAuthenticated()?"/login":"/signup"}
              className="text-black-700 mr-6 font-bold"
            >
              Sign Up
            </Link>
            <GradientLink
              to={
                auth.isAuthenticated()
                  ? '/products2'
                  : '/login'
              }
              text="Log In"
            />
          </div>
        </div>
      </div>
      <div className="dark:bg-slate-900 h-screen">
        <div className="dark:opacity-50 z-0 relative">
          <img
            className="w-full"
            src="https://uhdwallpapers.org/uploads/converted/18/01/19/designer-work-place-1366x768_756-mm-90.jpg"
            alt="Home"
          />
        </div>
        <div className="absolute left-0 top-0 mt-32 lg:mt-48 px-12 nato-sans z-20">
          <div className="w-full lg:w-2/3">
            <h1 className="dark:text-gray-200 text-gray-200 text-2xl lg:text-6xl sm:text-5xl font-bold leading-tight">
              CRUD of product
            </h1>
            <h2 className="dark:text-gray-300 text-gray-300 text-md sm:text-2xl sm:mt-10 mt-4">
              Delete, edit, modify and registered users and products using firebase
            </h2>
            <div className="mt-4 sm:mt-10 w-48">
              <GradientLink
                text="Get Started"
                size="lg"
                to={
                  auth.isAuthenticated()
                    ? '/products2'
                    : '/login'
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
