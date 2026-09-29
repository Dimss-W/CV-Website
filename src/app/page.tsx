import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import ServicesSection from '@/components/ServicesSection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import EducationSection from '@/components/EducationSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ScrollObserver from '@/components/ScrollObserver';
import ParticleCanvas from '@/components/ParticleCanvas';
import RecruiterQuickBar from '@/components/RecruiterQuickBar';
import {
  getProfileData,
  getExperiencesData,
  getProjectsData,
  getSkillsData,
  getEducationsData,
} from '@/lib/data';

export const revalidate = 60; // Revalidate data every 60s

export default async function HomePage() {
  const [profile, experiences, projects, skills, educations] = await Promise.all([
    getProfileData(),
    getExperiencesData(),
    getProjectsData(),
    getSkillsData(),
    getEducationsData(),
  ]);

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Living Responsive Cyber Tech Grid Layer */}
      <div className="cyber-grid-bg" />

      {/* Scroll Progress Bar & Mouse Spotlight Observer */}
      <ScrollObserver />

      {/* Interactive Constellation & Aurora Particle Canvas */}
      <ParticleCanvas />

      {/* Navigation Header in Bedimcode Style */}
      <Navbar resumeUrl={profile.resume_url} />

      {/* 01. Home Section */}
      <Hero profile={profile} />
      
      {/* 02. About Section */}
      <AboutSection profile={profile} />

      {/* 03. Works Section (featuring Otokeep, FindIt, Sistem-Input-Realisasi) */}
      <ProjectsSection projects={projects} />

      {/* 04. Services Section */}
      <ServicesSection />

      {/* 05. Skills Section */}
      <SkillsSection skills={skills} />

      {/* 06. Experience & Education Timeline */}
      <ExperienceSection experiences={experiences} />
      <EducationSection educations={educations} />

      {/* 07. Contact Section */}
      <ContactSection profile={profile} />

      {/* Floating 1-Click Action Dock */}
      <RecruiterQuickBar profile={profile} />

      {/* 08. Footer in Bedimcode Style */}
      <Footer />
    </main>
  );
}
