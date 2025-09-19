import React, { useState, useEffect } from 'react';
import { getUserFlashcards } from '../../services/flashcardService';
import Flashcard from './Flashcard';
import { useUser } from '../../contexts/UserContext';

const FlashcardDeck = ({ theme }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    async function loadCards() {
      if (!user) return;
      
      try {
        const userCards = await getUserFlashcards(user.uid, theme);
        setCards(userCards);
      } catch (error) {
        console.error('Error loading flashcards:', error);
      } finally {
        setLoading(false);
      }
    }

    loadCards();
  }, [user, theme]);

  if (loading) {
    return <div>Loading cards...</div>;
  }

  if (cards.length === 0) {
    return <div>No flashcards found. Generate some new ones!</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card) => (
        <Flashcard key={card.id} card={card} />
      ))}
    </div>
  );
}

export default FlashcardDeck;