'use client';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Hero from '../../components/Hero';
import Portfolio from '../../components/portfolio';
import FAQ from '../../components/FAQ';
import Testimonials from '../../components/Testimonials';
import WhyChooseUs from '../../components/WhyChooseUs';
import ProblemsWeSolve from '../../components/ProblemsWeSolve';

const Page = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <div>
      <Hero />
      <ProblemsWeSolve />
      <WhyChooseUs />
      <Portfolio />
      <FAQ />
      <Testimonials />
    </div>
  );
};

export default Page;
