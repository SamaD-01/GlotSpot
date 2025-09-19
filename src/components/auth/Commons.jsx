import React from 'react';
import { motion } from 'framer-motion';
import { googleSignIn } from '../../services/authService';
import toast from 'react-hot-toast';
import { useUser } from '../../contexts/UserContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../configs/firebaseConfig';
import { LogOutIcon } from 'lucide-react';
import { useNavigate } from 'react-router';

const Input = ({ icon: Icon, ...props }) => (
  <div className="relative">
    <Icon className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
    <input
      {...props}
      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const AuthCard = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="w-full max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg"
  >
    {children}
  </motion.div>
);

const GoogleSignInButton = () => {
  const navigate = useNavigate();
  
  const handleGoogleSignIn = async () => {
    try {
      const user = await googleSignIn();
      toast.success(`Welcome, ${user.displayName}`);
      navigate("/profile");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return <button 
            onClick={handleGoogleSignIn}
            className='text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2 w-full gap-2'
          >
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
            <path fill-rule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clip-rule="evenodd"/>
            </svg>
            Sign in with Google
          </button>;
};


const LogoutButton = () => {
  const { setUser } = useUser();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      toast.error("Logout error: " + error.message);
      console.error("Logout error:", error.message);
    }
  };

  return <button 
    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex gap-2" 
    onClick={handleLogout}>Log Out <LogOutIcon/> </button>;
};

export { Input, AuthCard, GoogleSignInButton, LogoutButton };
