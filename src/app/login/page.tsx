"use client"

import React from 'react';
import LoginForm from '@/components/login/LoginForm';


const LoginPage: React.FC = () => {
  const handleSubmit = (username: string, password: string): void => {
    async function submit() {
      // async code here
    }
    submit();
  };

  return (
    <div className="login-page">
      <LoginForm onSubmit={() => handleSubmit}/>
    </div>
  );
};

export default LoginPage;