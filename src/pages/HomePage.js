import React from 'react';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import MissionSection from '../components/home/MissionSection';
import SolutionsPreview from '../components/home/SolutionsPreview';
import CallToAction from '../components/home/CallToAction';

const HomePage = () => {
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
