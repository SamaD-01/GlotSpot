import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import logo from '../../assets/glotspotlogo.png';
import { useUser } from '../../contexts/UserContext';

const Flashcard = ({ card }) => { 
    const [isFlipped, setIsFlipped] = useState(false);
    const [showTranslation, setShowTranslation] = useState(false);
    const { user } = useUser();
  
    const handleSpeak = (text) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = user.targetLanguage.code;
      window.speechSynthesis.speak(utterance);
    };
  
    return (
      <div
        className="relative w-64 h-96 perspective-1000"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          className={`absolute w-full h-full transition-transform duration-500 transform-style-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          <div
            className={`absolute w-full h-full backface-hidden ${
              isFlipped ? 'hidden' : ''
            } rounded-xl shadow-lg overflow-hidden`}
          >
            <img
              src={card.back.image || logo}
              alt={card.face.word}
              className="w-full h-full object-cover"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 rounded-full p-2 shadow-lg">
              <img src={logo} alt="GlotSpot" className="w-full h-full object-contain" />
            </div>
            
            <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 rounded-full shadow-lg">
              <span className="text-sm font-medium text-gray-800">{card.back.theme}</span>
            </div>
            
            <div className="absolute bottom-16 left-4 right-4">
              <div className="bg-white/90 px-4 py-2 rounded-lg shadow-lg">
                <span className="text-lg font-bold text-gray-800">{card.face.translation}</span>
              </div>
            </div>
          </div>
  
          <div
            className={`absolute w-full h-full backface-hidden bg-white rotate-y-180 ${
              isFlipped ? '' : 'hidden'
            } rounded-xl shadow-lg p-6`}
          >
            <div className="h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold">{card.face.word}</h3>
                  {card.face.difficulty && (
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      card.face.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                      card.face.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {card.face.difficulty}
                    </span>
                  )}
                </div>
                
                {card.face.partOfSpeech && (
                  <span className="text-sm text-gray-500 italic mb-3 block">
                    {card.face.partOfSpeech}
                  </span>
                )}
                
                <p
                  className="text-lg cursor-pointer border-b border-dotted border-gray-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowTranslation(!showTranslation);
                  }}
                >
                  {card.face.example}
                </p>
                {showTranslation && (
                  <div className="mt-2 p-2 bg-gray-50 rounded">
                    {card.face.translation}
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Click to reveal translation
                </div>
                <button
                  className="p-2 hover:bg-gray-100 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSpeak(card.face.word);
                  }}
                >
                  <Volume2 className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Flashcard