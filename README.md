# GlotSpot - AI-Powered Language Learning Platform

GlotSpot is a modern, interactive language learning application that uses AI to generate personalized flashcards and provide an engaging learning experience.

## 🌐 Live Demo

[**🚀 Try GlotSpot Live**](link) - Experience the full application with AI-generated .

## Features

- 🚀 **AI-Powered Flashcards**: Generate personalized vocabulary flashcards using Mistral AI
- 🔐 **User Authentication**: Secure login with Firebase Auth and Google Sign-in
- 🌍 **Multi-Language Support**: Learn any of 10+ supported languages
- 📱 **Responsive Design**: Beautiful, modern UI that works on all devices
- 🎯 **Personalized Learning**: Adaptive content based on your native and target languages

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS + Framer Motion
- **Authentication**: Firebase Auth
- **Database**: Firestore
- **AI**: Mistral AI API

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn
- Firebase project
- Mistral AI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/SamaD-01/GlotSpot
cd GlotSpot
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
   - Add your Firebase configuration
   - Add your Mistral AI API key

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

1. **Sign Up/Login**: Create an account or sign in with Google
2. **Set Languages**: Choose your native language and target language
3. **Generate Flashcards**: Select a theme and generate AI-powered flashcards
4. **Learn**: Study with interactive flashcards 

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License.
