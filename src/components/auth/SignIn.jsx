import React, { useState } from 'react';
import { AuthCard, GoogleSignInButton, Input } from './Commons';
import { LoaderCircle, Lock, Mail } from 'lucide-react';
import { logIn } from '../../services/authService';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const SignIn = ({ onToggle, onForgotPassword }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlelogIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
        await logIn(email, password);
        toast.success("Login successful!");
        navigate("/profile");
    } catch (err) {
        const errorMessage = err.message;
        setError(errorMessage);
        toast.error(errorMessage);
    } finally {
        setLoading(false);
    }
};

  return (
    <AuthCard>
      <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>
      <form className="space-y-4" onSubmit={handlelogIn}>
        <Input icon={Mail} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input icon={Lock} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <LoaderCircle className='animate-spin h-5 w-5' />
              Signing In...
            </>
          ) : (
            "Log In"
          )}
        </button>
      </form>
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <p className='text-center mt-4'>OR</p>
      <GoogleSignInButton />
      <div className="mt-4 text-center">
        <button 
          onClick={onForgotPassword}
          className="text-blue-600 hover:underline"
        >
          Forgot password?
        </button>
      </div>
      <div className="mt-6 text-center">
        <span className="text-gray-600">Don't have an account? </span>
        <button 
          onClick={onToggle}
          className="text-blue-600 hover:underline"
        >
          Sign Up
        </button>
      </div>
    </AuthCard>
)};

export default SignIn