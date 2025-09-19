import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../configs/firebaseConfig';
import { Mistral } from '@mistralai/mistralai';

async function generateIllustration(word, translation, theme, illustrationPrompt) {
  try {
    const unsplashAccessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
    
    if (!unsplashAccessKey) {
      return `https://picsum.photos/300/200?random=${Math.random()}`;
    }
    
    const searchQueries = [];
    
    if (illustrationPrompt && illustrationPrompt !== 'null' && illustrationPrompt.trim()) {
      searchQueries.push(illustrationPrompt.trim());
    }
    
    if (translation && translation.trim()) {
      searchQueries.push(translation.trim());
    }
    
    if (word && word.trim()) {
      searchQueries.push(word.trim());
    }
    const themeContext = {
      'Greetings': 'people smiling waving hello',
      'Food': 'food meal dining',
      'Travel': 'travel vacation journey',
      'Business': 'business office work',
      'Family': 'family relatives',
      'Hobbies': 'hobby activity fun',
      'Weather': 'weather nature sky',
      'Shopping': 'shopping store market'
    };
    
    if (theme && themeContext[theme]) {
      searchQueries.push(themeContext[theme]);
    }
    
    const wordFallbacks = {
      'brother': 'man male person family',
      'sister': 'woman female person family',
      'mother': 'woman mother parent family',
      'father': 'man father parent family',
      'hello': 'person waving greeting',
      'goodbye': 'person waving leaving',
      'thank you': 'person smiling grateful',
      'please': 'person polite request',
      'water': 'water glass liquid',
      'food': 'food meal plate',
      'house': 'house home building',
      'car': 'car vehicle automobile',
      'book': 'book reading education',
      'phone': 'phone mobile telephone'
    };
    
    const lowerWord = word.toLowerCase();
    const lowerTranslation = translation.toLowerCase();
    
    if (wordFallbacks[lowerWord]) {
      searchQueries.push(wordFallbacks[lowerWord]);
    }
    if (wordFallbacks[lowerTranslation]) {
      searchQueries.push(wordFallbacks[lowerTranslation]);
    }
    
    for (const query of searchQueries) {
      try {
        const cleanQuery = query.replace(/[^a-zA-Z0-9\s]/g, '').trim();
        if (!cleanQuery) continue;
        
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(cleanQuery)}&per_page=10&orientation=landscape`,
          {
            headers: {
              'Authorization': `Client-ID ${unsplashAccessKey}`
            }
          }
        );
        
        if (response.ok) {
          const data = await response.json();
          if (data.results && data.results.length > 0) {
            return data.results[0].urls.regular;
          }
        }
      } catch (queryError) {
        continue;
      }
    }
    
    return `https://picsum.photos/300/200?random=${Math.random()}`;
  } catch (error) {
    return `https://picsum.photos/300/200?random=${Math.random()}`;
  }
}

const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;
const client = new Mistral({ apiKey });

export async function generateFlashcards(theme, user) {
  try {
    const existingCards = await getUserFlashcards(user.uid, theme);
    const existingWords = existingCards.map(card => card.face.word.toLowerCase());
    
    const prompt = `Generate 5 NEW and UNIQUE flashcards for learning ${user.targetLanguage.name} with ${user.nativeLanguage.name} translations. 
    Theme: ${theme}.
    
    IMPORTANT: Avoid these already existing words: ${existingWords.join(', ') || 'none yet'}
    
    Make sure to provide:
    - Common, practical vocabulary for ${theme}
    - Different difficulty levels (beginner to intermediate)
    - Varied parts of speech (nouns, verbs, adjectives, etc.)
    - Real-world examples and context
    - For illustrationPrompt: Provide concrete, visual descriptions that would work well for image searches (e.g., "person cooking" not just "cooking", "two people shaking hands" not just "business")
    
    Return only a JSON array with this exact structure, no additional text or explanations:
    [
      {
        "face": {
          "word": "<word in ${user.targetLanguage.name}>",
          "translation": "<translation in ${user.nativeLanguage.name}>",
          "example": "<example sentence in ${user.targetLanguage.name}>",
          "difficulty": "<beginner|intermediate|advanced>",
          "partOfSpeech": "<noun|verb|adjective|adverb|phrase>"
        },
        "back": {
          "image": "null",
          "theme": "${theme}",
          "illustrationPrompt": "<specific, visual description for an image search - be concrete and descriptive. For example: 'young man smiling' for 'brother', 'red apple on white background' for 'apple', 'handshake business meeting' for 'negotiate'>"
        }
      }
    ]`;

    const response = await client.chat.complete({
      model: 'open-mixtral-8x22b',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful language learning assistant. Always respond with valid JSON arrays containing flashcard data in the exact format specified.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
    });

    const responseText = response.choices[0].message.content;
    
    const cleanedResponse = responseText.trim()
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    try {
      const cards = JSON.parse(cleanedResponse);
      
      if (!Array.isArray(cards)) {
        throw new Error('Response is not an array');
      }

      for (const card of cards) {
        if (!card.face || !card.back) {
          continue;
        }
        
        const illustrationUrl = await generateIllustration(
          card.face.word,
          card.face.translation,
          theme,
          card.back.illustrationPrompt
        );
        
        await addDoc(collection(db, 'flashcards'), {
          ...card,
          back: {
            ...card.back,
            image: illustrationUrl
          },
          userId: user.uid,
          createdAt: new Date(),
        });
      }

      return cards;
    } catch (parseError) {
      throw new Error(`Failed to parse API response: ${parseError.message}`);
    }
  } catch (error) {
    throw error;
  }
}


export async function getUserFlashcards(userId, theme) {
    const flashcardsRef = collection(db, 'flashcards');
    const constraints = [where('userId', '==', userId)];
    
    if (theme) {
      constraints.push(where('back.theme', '==', theme));
    }
    
    const q = query(flashcardsRef, ...constraints);
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
  