import React, { useState } from 'react'
import { AuthCard, Input, GoogleSignInButton } from './Commons';
import { LoaderCircle, Lock, Mail, User } from 'lucide-react';
import { signUp } from '../../services/authService';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const SignUp = ({ onToggle }) => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        setLoading(true);
        try {
            await signUp(name, email, password);
            toast.success("Sign-up successful!");
            navigate("/select-languagues");
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthCard>
            <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
            <form className="space-y-4" onSubmit={handleSignUp}>
                <Input icon={User} type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <Input icon={Mail} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <Input icon={Lock} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <Input icon={Lock} type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                {
                    confirmPassword && password !== confirmPassword ? <p className="text-red-500 text-sm">Passwords do not match</p> : <span className='w-full h-0 border-t-2 border-green-700'></span>
                }
                <button type='submit' className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400" disabled={loading || (confirmPassword && password !== confirmPassword)}>
                    {loading ? <LoaderCircle className='animate-spin h-5 w-5' /> : "Sign Up"}
                </button>
            </form>
            
            {error && (
                <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}
            
            <p className='text-center mt-4'>OR</p>
            <GoogleSignInButton />
            <div className="mt-6 text-center">
                <span className="text-gray-600">Already have an account? </span>
                <button 
                onClick={onToggle}
                className="text-blue-600 hover:underline"
                >
                Sign In
                </button>
            </div>
        </AuthCard>
    )
};

export default SignUp