import React from 'react';
import { AuthCard, Input } from './Commons';
import { ArrowLeft, Mail } from 'lucide-react';

const ForgotPassword = ({ onBack }) => (
    <AuthCard>
      <button 
        onClick={onBack}
        className="flex items-center text-gray-600 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Sign In
      </button>
      <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
      <form className="space-y-4">
        <Input icon={Mail} type="email" placeholder="Email" />
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Send Reset Link
        </button>
      </form>
    </AuthCard>
);

export default ForgotPassword