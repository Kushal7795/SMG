import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Globe, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from './ThemeToggle'; 

// FINAL LOGO IMPORT
import LogoImage from '@/assets/EduVerse.png'; 

export const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Check login status
    const loggedIn = localStorage.getItem('eduverse_logged_in') === 'true';
    setIsLoggedIn(loggedIn);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAuth = () => {
    if (isLoggedIn) {
      localStorage.removeItem('eduverse_logged_in');
      localStorage.removeItem('eduverse_user');
      setIsLoggedIn(false);
    } else {
      // Simple dummy login
      const username = prompt('Enter username (any text):');
      if (username) {
        localStorage.setItem('eduverse_logged_in', 'true');
        localStorage.setItem('eduverse_user', username);
        setIsLoggedIn(true);
      }
    }
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      // Fixed styling for background and text
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 bg-white border-b border-border/50 text-black ${
        isScrolled
          ? 'py-3 shadow-lg shadow-primary/10'
          : 'py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        
        {/* LOGO INTEGRATION */}
        <a href="#home" className="flex items-center gap-3"> 
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            {/* Logo Image - UPDATED SIZE: h-9 w-9 -> h-12 w-12 */}
            <img 
              src={LogoImage} 
              alt="Eduverse Logo" 
              className="h-12 w-12" // Increased size to h-12 w-12
            />
            {/* Webpage Name */}
            <span className="text-2xl font-bold gradient-text">
              Eduverse
            </span>
          </motion.div>
        </a>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection('home')}
            className="text-black/80 hover:text-black transition-colors relative group font-medium"
          >
            {t('nav.home')}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </button>
          <button
            onClick={() => scrollToSection('courses')}
            className="text-black/80 hover:text-black transition-colors relative group font-medium"
          >
            {t('nav.about')}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="text-black/80 hover:text-black transition-colors relative group font-medium"
          >
            {t('nav.howItWorks')}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-black/80 hover:text-black transition-colors relative group font-medium"
          >
            {t('nav.contact')}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          
          <ThemeToggle />

          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover-glow text-black">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="glass">
              <DropdownMenuItem onClick={() => changeLanguage('en')}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage('es')}>
                Español
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage('hi')}>
                हिंदी
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Auth Buttons */}
          {isLoggedIn ? (
            <Button
              onClick={handleAuth}
              variant="outline"
              className="hover-glow border-primary/50 text-black"
            >
              <User className="h-4 w-4 mr-2" />
              {t('nav.logout')}
            </Button>
          ) : (
            <>
              <Button
                onClick={handleAuth}
                variant="ghost"
                className="hover-glow text-black"
              >
                {t('nav.signIn')}
              </Button>
              <Button
                onClick={handleAuth}
                className="bg-primary hover:bg-primary/90 hover-glow"
              >
                {t('nav.logIn')}
              </Button>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};