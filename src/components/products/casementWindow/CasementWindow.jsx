import React from 'react';
import AboutCasementWindow from './AboutCasementWindow';
import PageBanner from '../../PageBanner';
import CasementWindowAdv from './CasementWindowAdv';
import CasementWindowFaq from './CasementWindowFaq';
import HeaderSection from '../../../components/HeaderSection';
import Footer from '../../footer/Footer';
import Breadcrumb from '../../Breadcrumb';
import { path } from 'framer-motion/client';

const CasementWindow = () => {
  return (
    <div>
      <HeaderSection />
      <PageBanner
        title="Casement Windows"
        subtitle="Leading the industry with innovation and quality"
      />
      <Breadcrumb items={[{ label: "Home", path: "/" }, { label: "Casement Windows", path: "/products/casement-windows" }]} />
      <AboutCasementWindow />
      <CasementWindowAdv />
      <CasementWindowFaq />
      <Footer />
    </div>
  );
};

export default CasementWindow;