'use client';
import AuthForm from '../components/authForm/AuthForm';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

 const LogIn = () => {
  const {isUser} = useSelector((state) => state.auth)
  
  useEffect(() => {
    if (isUser) {
      navigate('/');
    }
  }, [isUser]);

  const signInInputFields = [
    {
      type: 'email', name: 'email', placeholder: 'E-mail', iconClass: 'bx bx-envelope input-icon',
    },
    {
      type: 'password', name: 'password', placeholder: 'Password', iconClass: 'bx bx-lock-alt input-icon',
    },
  ];

  return (
    <AuthForm
      title="Hello!"
      buttonText="SIGN IN"
      message="Don't have an account? Create"
      inputFields={signInInputFields}
      welcomeMsg="Welcome Back!"
      welcomeDetail="Welcome back! We&apos;re delighted to see you return.
      Your presence means a lot to us!"
      formType="signin"
    />
  );
};

export default LogIn;