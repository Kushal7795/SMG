import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Mic, ChevronDown } from 'lucide-react';
import { useState } from 'react';

// === FINAL VIDEO IMPORT AND URL ===
// Video imported from src/assets
import SMGVideo from '@/assets/SMG.mp4'; 
const VIDEO_URL = SMGVideo;
// ========================================

// Animation variants for the staggered entrance effect
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export const Hero = () => {
  const { t } = useTranslation();
  const [isListening, setIsListening] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    setTimeout(() => setIsListening(false), 2000);
  };

  const title1 = t('hero.title1');
  const title2 = t('hero.title2');

  return (
    <section
      id="home"
      // min-h-screen and flex centering ensures the content is aligned nicely vertically
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 1. Full-Screen Video Background (Localized to the Hero Section) */}
      <video
        autoPlay
        muted 
        loop
        id="background-video"
        // ✅ FIX: absolute positioning inside the relative parent section
        className="absolute inset-0 w-full h-full object-cover z-0" 
      >
        <source src={VIDEO_URL} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 2. Dark Overlay for Text Contrast */}
      <div className="absolute inset-0 bg-black/70 z-10"></div>

      {/* Content (Z-INDEX IS NOW CRITICAL) */}
      {/* ✅ FIX: pt-[100px] ensures content starts below the fixed Navbar */}
      <div className="relative z-20 container mx-auto px-4 text-center text-white pt-[100px] pb-8"> 
        
        {/* Title 1 with split text animation */}
        <div className="mb-4 text-5xl md:text-7xl font-bold">
          {title1.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="inline-block"
              style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* Title 2 with gradient */}
        <div className="mb-8 text-4xl md:text-6xl font-bold gradient-text">
          {title2.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (i + title1.length) * 0.05, duration: 0.5 }}
              className="inline-block"
              style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-lg md:text-xl text-gray-200 mb-12 max-w-2xl mx-auto" 
        >
          Experience the future of education with AI-powered learning, personalized courses, and globally recognized certifications.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            onClick={() => scrollToSection('how-it-works')}
            size="lg"
            className="bg-primary hover:bg-primary/90 hover-glow text-lg px-8 py-6"
          >
            {t('hero.getStarted')}
          </Button>
          <Button
            onClick={() => scrollToSection('courses')}
            size="lg"
            variant="outline"
            className="border-primary/50 hover:bg-primary/10 hover-glow text-lg px-8 py-6 text-white"
          >
            {t('hero.exploreCourses')}
          </Button>
          <Button
            onClick={handleVoiceInput}
            size="lg"
            variant="ghost"
            className={`hover-glow text-white ${isListening ? 'bg-primary/20' : ''}`}
          >
            <Mic
              className={`h-5 w-5 ${
                isListening ? 'animate-glow-pulse text-primary' : ''
              }`}
            />
          </Button>
        </motion.div>

        {/* Voice wave animation */}
        {isListening && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="mt-8 flex items-center justify-center gap-1"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scaleY: [1, 2, 1],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
                className="w-1 h-8 bg-primary rounded-full"
              />
            ))}
          </motion.div>
        )}

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          // ✅ FIX: Moved down to bottom-2 for closer placement to the edge
          className="absolute bottom-2 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="h-8 w-8 text-gray-200" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};