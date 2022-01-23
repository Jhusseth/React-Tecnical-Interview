import React, { lazy, Suspense, useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';
import './assets/stylesheets/app.css';

import {
  AuthProvider,
  AuthContext
} from './context/AuthContext';

import AppShell from './AppShell';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import FourOFour from './pages/FourOFour';;

const Products = lazy(() => import('./pages/Products'));


const LoadingFallback = () => (
  <AppShell>
    <div className="p-4">Loading...</div>
  </AppShell>
);


const AppRoutes = () => {

  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route index element={<Home />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products" element={isAuthenticated ? <AppShell><Products/></AppShell> : <Navigate replace to="/login" />} />
          <Route path="/products2" element={isAuthenticated ? <Navigate replace to="/products" /> : <Navigate replace to="/login" />} />
          <Route path="*" element={<FourOFour />}/>   
        </Routes>
      </Suspense>
    </>
  );
};

function App() {
  return (
      <>
        <Router>
          <AuthProvider>
            <div className="dark:bg-zinc-900 h-screen">          
              <AppRoutes />
            </div>
          </AuthProvider>
        </Router>
      </>
  );
}

export default App;
