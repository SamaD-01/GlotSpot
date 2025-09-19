import React from 'react'
import { Link } from 'react-router'
import { useUser } from '../../contexts/UserContext';
import { LogoutButton } from '../auth/Commons';

const Navbar = () => {
  const { user } = useUser();

  return (
    <nav className="fixed top-0 w-full bg-white border-b z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
                <div className="text-xl font-bold text-blue-600">GlotSpot</div>
                <div className="hidden md:flex space-x-8">
                  <Link to="/" className="text-gray-600 hover:text-blue-600">Features</Link>
                  <Link to="/" className="text-gray-600 hover:text-blue-600">About</Link>
                  <Link to="/" className="text-gray-600 hover:text-blue-600">Contact</Link>
                  <Link to="/vocabulary" className="text-gray-600 hover:text-blue-600">Vocabulary</Link>
                </div>
                {
                  user 
                  ? <LogoutButton /> 
                  : <Link to="/auth" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"> Get Started </Link>
                }
                {/* <Link to="/auth" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Get Started 
                </Link> */}
                {/* <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Get Started
                </button> */}
            </div>
        </div>
    </nav>
  )
}

export default Navbar