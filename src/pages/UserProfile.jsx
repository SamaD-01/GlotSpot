import React from "react";
import { useUser } from "../contexts/UserContext";
import Navbar from "../components/layout/Navbar";
import { Link } from "react-router";
import { BookOpen, Settings, Trophy, ArrowRight } from "lucide-react";
import { LogoutButton } from "../components/auth/Commons";

const NameInitials = ({ name }) => {
  const initials = name.split(" ").map((n) => n[0].toUpperCase()).join("");
  return (
    <div className="w-32 h-32 rounded-full bg-green-500 text-slate-100 flex justify-center items-center text-6xl mx-auto" >
      {initials}
    </div>
  );
};

const UserProfile = () => {
  const { user } = useUser();
  
  if (!user) {
    return <p>No user is logged in.</p>;
  }
  
  return (
    <>
      <Navbar />
      <div className="flex items-center h-screen w-full justify-center">
        <div className="max-w-xs">
            <div className="bg-slate-200 shadow-xl rounded-lg py-3">
                <div className="photo-wrapper p-2">
                  {user.photoURL 
                  ? <img className="w-32 h-32 rounded-full mx-auto" src={user.photoURL} alt="User Avatar" />
                  : <NameInitials name={user.name} />}
                </div>
                <div className="p-2">
                    <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{ user.name.toUpperCase() }</h3>
                    <div className="text-center text-gray-400 text-xs font-semibold">
                        <p>Welcome,</p>
                    </div>
                    <table className="text-xs my-3">
                        <tbody>
                            <tr className="border-b">
                                <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
                                <td className="px-2 py-2">{user.email}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="px-2 py-2 text-gray-500 font-semibold">Native language</td>
                                <td className="px-2 py-2">{user.nativeLanguage?.name || 'Not set'}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="px-2 py-2 text-gray-500 font-semibold">Target language</td>
                                <td className="px-2 py-2">{user.targetLanguage?.name || 'Not set'}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="space-y-3 mt-6">
                        <Link 
                            to="/vocabulary" 
                            className="flex items-center justify-between w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            <div className="flex items-center gap-2">
                                <BookOpen className="w-4 h-4" />
                                Start Learning
                            </div>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        
                        {(!user.nativeLanguage || !user.targetLanguage) && (
                            <Link 
                                to="/select-languagues" 
                                className="flex items-center justify-center w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
                            >
                                <Settings className="w-4 h-4 mr-2" />
                                Set Languages
                            </Link>
                        )}
                        
                        <div className="pt-2">
                            <LogoutButton />
                        </div>
                    </div>

                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
