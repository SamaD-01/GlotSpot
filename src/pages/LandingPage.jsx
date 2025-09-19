import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Book, Mic, Globe, Trophy } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useUser } from '../contexts/UserContext';
import { Link } from 'react-router';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};


const Hero = () => {
  const { user } = useUser();

  return(
    <motion.section 
      className="pt-32 pb-20 px-4"
      initial="initial"
      animate="animate"
      variants={fadeIn}
    >
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Your Personalized Language Learning Hub
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Master new languages through engaging, personalized, and interactive experiences powered by AI.
        </p>
        <p className="text-lg text-blue-600 font-medium mb-8">
          "Spot the language, speak the world!"
        </p>
        <Link to="/profile" className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 mr-4">
          {user ? `Welcome back ${user.name}, Continue learning` : 'Start Learning Now'}
        </Link>
        {/* <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700">
          Start Learning Now
        </button> */}
      </div>
    </motion.section>
);}

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div 
    className="p-6 rounded-xl border bg-white shadow-sm"
    whileHover={{ y: -5 }}
  >
    <Icon className="w-12 h-12 text-blue-600 mb-4" />
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const Features = () => (
  <section id="features" className="py-20 bg-gray-50 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard 
          icon={MessageCircle}
          title="AI Chat Partner"
          description="Practice real-life conversations with instant feedback from our AI language partner."
        />
        <FeatureCard 
          icon={Book}
          title="Dynamic Lessons"
          description="Adaptive vocabulary and grammar exercises tailored to your progress level."
        />
        <FeatureCard 
          icon={Mic}
          title="Pronunciation Practice"
          description="Get real-time evaluation and guidance to perfect your speaking skills."
        />
        <FeatureCard 
          icon={Globe}
          title="Cultural Immersion"
          description="Learn idioms, slang, and cultural norms for a complete language experience."
        />
        <FeatureCard 
          icon={Trophy}
          title="Gamification"
          description="Stay motivated with challenges, streaks, and rewards as you progress."
        />
      </div>
    </div>
  </section>
);


const LandingPage = () => (
  <div className="min-h-screen bg-white">
    <Navbar />
    <Hero />
    <Features />
    <Footer />
  </div>
);

export default LandingPage;