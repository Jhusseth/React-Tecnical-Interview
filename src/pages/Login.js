import React, { useState, useContext, useEffect } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Card from '../components/common/Card';
import Hyperlink from './../components/common/Hyperlink';
import Label from './../components/common/Label';
import FormInput from './../components/FormInput';
import FormSuccess from './../components/FormSuccess';
import FormError from './../components/FormError';
import GradientBar from './../components/common/GradientBar';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import GradientButton from '../components/common/GradientButton';
import logo from '../assets/images/logo.png';
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../util/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaperPlane
} from '@fortawesome/free-solid-svg-icons';

const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required')
});

const Login = () => {
  const authContext = useContext(AuthContext);
  const [loginSuccess, setLoginSuccess] = useState();
  const [loginError, setLoginError] = useState();
  const [redirectOnLogin, setRedirectOnLogin] = useState(
    false
  );
  const [loginLoading, setLoginLoading] = useState(false);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {

    let logIn = async () => {

      if (loading) {
        return;
      }
      if (user){
        authContext.setAuthState(user);
        setLoginSuccess("Login exitoso");
        setLoginError(null);
        setTimeout(() => {
          setRedirectOnLogin(true);
          window.location.reload();
        }, 500);       
      }
    }

    logIn();
    
  }, [user, loading, authContext]);

  const submitCredentials = async credentials => {
    try {
      setLoginLoading(true);
      logInWithEmailAndPassword(credentials.email, credentials.password)
    } 
    catch (err) {
      setLoginLoading(false);
      setLoginError(error);
      setLoginSuccess(null);
    }
  };

  return (
    <>
      {redirectOnLogin && <Navigate replace to="/products" />}
      <section className="w-full sm:w-1/2 h-screen m-auto p-8 sm:pt-10">
        <GradientBar />
        <Card>
          <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 dark:bg-zinc-700">
            <div className="max-w-md w-full">
              <div>
                <div className="w-48 m-auto mb-6">
                  <a href="/">
                    <img src={logo} alt="Logo" />
                  </a>
                </div>
                <h2 className="mb-2 text-center text-3xl leading-9 font-extrabold text-gray-900 dark:text-white">
                  Log in to your account
                </h2>
                <p className="text-gray-600 text-center dark:text-gray-200">
                  Don't have an account?{' '}
                  <Hyperlink
                    to="/signup"
                    text="Sign up now"
                  />
                </p>
              </div>

              <Formik
                initialValues={{
                  email: '',
                  password: ''
                }}
                onSubmit={values =>
                  submitCredentials(values)
                }
                validationSchema={LoginSchema}
              >
                {() => (
                  <Form className="mt-8">
                    {loginSuccess && (
                      <FormSuccess text={loginSuccess} />
                    )}
                    {loginError && (
                      <FormError text={loginError} />
                    )}
                    <div>
                      <div className="mb-2">
                        <div className="mb-1">
                          <Label text="Email" />
                        </div>
                        <FormInput
                          ariaLabel="Email"
                          name="email"
                          type="text"
                          placeholder="Email"
                        />
                      </div>
                      <div>
                        <div className="mb-1">
                          <Label text="Password" />
                        </div>
                        <FormInput
                          ariaLabel="Password"
                          name="password"
                          type="password"
                          placeholder="Password"
                        />
                      </div>
                    </div>

                    <div className="mt-6 flex justify-start">
                      <div className="text-sm leading-5">
                        <Hyperlink
                          to="forgot-password"
                          text="Forgot your password?"
                        />
                      </div>
                    </div>

                    <div className="mt-6 float-left">
                      <button className="rounded-full bg-gradient shadow flex items-center px-2 py-2" onClick={signInWithGoogle}>
                         <label className="mr-4 text-white hover:text-app">Google</label> <FontAwesomeIcon icon={faPaperPlane} className="text-white hover:text-app" />
                      </button>
                    </div>
                    <div className="mt-6 float-right">
                      <GradientButton
                        type="submit"
                        text="Log In"
                        loading={loginLoading}
                      />
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;
