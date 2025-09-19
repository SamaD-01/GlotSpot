import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../configs/firebaseConfig';
import { Mistral } from '@mistralai/mistralai';
// import { useUser } from '../contexts/UserContext';
// import { HfInference } from '@huggingface/inference';

// const hf = new HfInference(import.meta.env.VITE_HUGGINGFACE_API_KEY);
const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;
const client = new Mistral({apiKey: apiKey});

export async function generateFlashcards(theme, user) {
  // const { user } = useUser();
  try {
    
  } catch (error) {
    
  }
  const prompt = ` Generate 5 vocabulary flashcards for learning ${user.targetLanguage.name} with ${user.nativeLanguage.name} translations. Theme: ${theme}. 
    stick with this format and no extra talk : 
    {face : {word: 'word in ${user.targetLanguage.name}',translation: 'translation in ${user.nativeLanguage.name}',example: 'example sentence in ${user.targetLanguage.name}'},back :{image : 'null',theme : ${theme}}},{face : {word: 'word in ${user.targetLanguage.name}',translation: 'translation in ${user.nativeLanguage.name}',example: 'example sentence in ${user.targetLanguage.name}'},back :{image : 'null',theme : ${theme}}}...`;

//   const response = await hf.textGeneration({
//     model: 'mistralai/Mistral-7B-Instruct-v0.3',
//     inputs: prompt,
//     parameters: {
//       max_new_tokens: 500,
//       temperature: 0.7,
//     },
//   });

    const response = await client.chat.complete({
        model: 'open-mixtral-8x22b',
        messages: [{role: 'user', content: prompt}],
    });
    const responseCards = response.choices[0].message.content;
    const cards = JSON.parse(responseCards);

    // Save cards to Firebase
    for (const card of cards) {
        await addDoc(collection(db, 'flashcards'), {
        ...card,
        userId: user.uid,
        createdAt: new Date(),
        });
    }

    return cards;
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





// ? ___/-\___
// Generate 5 vocabulary flashcards for learning german with english translations. Theme: greetings. 
// stick with this format and no extra talk : 
// [{
//     face : {
//       word: 'word in german',
//       translation: 'translation in english',
//       example: 'example sentence in german'
//     },
//     back :{
//       image : 'null',
//       theme : 'theme'
//     }
//   },{
//     face : {
//       word: 'word in german',
//       translation: 'translation in english',
//       example: 'example sentence in german'
//     },
//     back :{
//       image : 'null',
//       theme : 'theme'
//     }
// }...]