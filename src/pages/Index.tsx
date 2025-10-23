import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ExploreCourses } from '@/components/ExploreCourses';
import { HowItWorks } from '@/components/HowItWorks';
import { FAQ } from '@/components/FAQ';
import { EnquiryForm } from '@/components/EnquiryForm';
import { Footer } from '@/components/Footer';
import '@/i18n/config';

const Index = () => {
  useEffect(() => {
    // Initialize any required setup
    document.title = 'Eduverse - Where Learning Meets Innovation';
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <Hero />
      <ExploreCourses />
      <HowItWorks />
      <FAQ />
      <EnquiryForm />
      <Footer />
    </div>
  );
};

export default Index;
