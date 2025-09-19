import React, { useState } from 'react';
import { Globe2, Loader2 } from 'lucide-react';
import { languages } from '../constants/languages';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../configs/firebaseConfig';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router';

export const LanguageSelector = () => {
  const { user, updateUser, loading: userLoading } = useUser();
  const navigate = useNavigate();
  const [targetLang, setTargetLang] = useState({});
  const [nativeLang, setNativeLang] = useState({});
  const [loading, setLoading] = useState(false);

  // Show loading spinner if user context is still loading
  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to auth if no user is logged in
  if (!user) {
    navigate('/auth');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !targetLang.name || !nativeLang.name) return;

    setLoading(true);
    try {
      const userProfile = {
        id: user.uid,
        targetLanguage: targetLang,
        nativeLanguage: nativeLang,
        createdAt: new Date(),
      };

      await setDoc(doc(db, 'users', user.uid), userProfile);
      updateUser({ nativeLanguage: nativeLang, targetLanguage: targetLang });

      navigate('/profile');
    } catch (error) {
      console.error('Error saving user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex items-center gap-3 mb-6">
          <Globe2 className="h-8 w-8 text-blue-500" />
          <h1 className="text-2xl font-bold">Welcome to GlotSpot</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              I want to learn:
            </label>
            <select
              className="w-full p-2 border rounded-md"
              value={targetLang.code || ""}
              onChange={(e) => {
                const lang = languages.find(l => l.code === e.target.value);
                if (lang) setTargetLang(lang);
              }}
              required
            >
              <option value="">Select a language</option>
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name} ({lang.nativeName})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              I speak:
            </label>
            <select
              className="w-full p-2 border rounded-md"
              value={nativeLang.code || ""}
              onChange={(e) => {
                const lang = languages.find(l => l.code === e.target.value);
                if (lang) setNativeLang(lang);
              }}
              required
            >
              <option value="">Select a language</option>
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name} ({lang.nativeName})
                </option>
              ))}
            </select>
          </div>

          {(targetLang.name || nativeLang.name) && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="text-sm font-medium text-blue-900 mb-2">Preview:</h3>
              <p className="text-sm text-blue-700">
                I will learn <strong>{targetLang.name}</strong> using <strong>{nativeLang.name}</strong> as my base language.
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !targetLang.name || !nativeLang.name}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Start Learning'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}