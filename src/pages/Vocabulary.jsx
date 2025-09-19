import React, { useState } from 'react'
import Flashcard from '../components/vocab/Flashcard'
import { FlashcardGenerator } from '../components/vocab/FlashcardGenerator';
import { Book } from 'lucide-react';
import FlashcardDeck from '../components/vocab/FlashcardDeck';
import Navbar from '../components/layout/Navbar';

const Vocabulary = () => {
  const [selectedTheme, setSelectedTheme] = useState();
  const [newCards, setNewCards] = useState([]);

  const handleNewCards = (cards) => {
    setNewCards(cards);
    setSelectedTheme(cards[0]?.back.theme);
  };


  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-20 px-4">
        <div className="max-w-7xl mx-auto py-8">
          <div className="space-y-6">
            <FlashcardGenerator onGenerate={handleNewCards} />
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Book className="text-blue-500" />
                {selectedTheme ? `${selectedTheme} Flashcards` : 'Your Flashcards'}
              </h2>
              
              <FlashcardDeck theme={selectedTheme} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Vocabulary