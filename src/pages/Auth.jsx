import React, { useState } from 'react';
import SignIn from '../components/auth/SignIn';
import SignUp from '../components/auth/SignUp';
import ForgotPassword from '../components/auth/ForgotPassword';


const Auth = () => {
  const [view, setView] = useState('signin');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {view === 'signin' && (
        <SignIn 
          onToggle={() => setView('signup')}
          onForgotPassword={() => setView('forgot')}
        />
      )}
      {view === 'signup' && (
        <SignUp onToggle={() => setView('signin')} />
      )}
      {view === 'forgot' && (
        <ForgotPassword onBack={() => setView('signin')} />
      )}
    </div>
  );
};

export default Auth;