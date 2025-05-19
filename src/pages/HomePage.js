import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import MissionSection from '../components/home/MissionSection';
import SolutionsPreview from '../components/home/SolutionsPreview';
import CallToAction from '../components/home/CallToAction';

const HomePage = () => {
  const { /* translations, */ otherVariables } = useContext(LanguageContext);
  
  return (
    <>
      <Hero />
      <Features />
      <MissionSection />
      <SolutionsPreview />
      <CallToAction />
    </>
  );
};

export default HomePage;
