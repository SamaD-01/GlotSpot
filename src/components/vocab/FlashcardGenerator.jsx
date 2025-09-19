import React, { useState } from 'react';
import { BookOpen, Loader } from 'lucide-react';
import { generateFlashcards } from '../../services/flashcardService';
import { useUser } from '../../contexts/UserContext';
import toast from 'react-hot-toast';
import { themes } from '../../constants/themes';


export function FlashcardGenerator({ onGenerate }) {
  const [selectedTheme, setSelectedTheme] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');
  const { user } = useUser();

  const handleGenerate = async () => {
    if (!user || !selectedTheme) return;
    
    setIsGenerating(true);
    try {
      setGenerationStep('Generating content with AI...');
      const cards = await generateFlashcards(selectedTheme, user);
      
      setGenerationStep('Adding illustrations...');
      onGenerate(cards);    
      
      toast.success('Flashcards generated successfully!');
    } catch (error) {
      console.error('Error generating flashcards:', error);
      toast.error('An error occurred while generating flashcards.');
    } finally {
      setIsGenerating(false);
      setGenerationStep('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <BookOpen className="text-blue-500" />
        Generate New Flashcards
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Theme
          </label>
          <select
            className="w-full p-2 border rounded-md"
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value)}
          >
            <option value="">Choose a theme...</option>
            {themes.map((theme) => (
              <option key={theme.name} value={theme.name}>{theme.ico} {theme.name}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating || !selectedTheme}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <Loader className="animate-spin" />
              {generationStep || 'Generating...'}
            </>
          ) : (
            'Generate Flashcards'
          )}
        </button>
        
        {isGenerating && generationStep && (
          <p className="text-sm text-gray-600 text-center mt-2">
            {generationStep}
          </p>
        )}
      </div>
    </div>
  );
}