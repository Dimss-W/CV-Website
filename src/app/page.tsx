import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import CertificatesSection from '@/components/CertificatesSection';
import EducationSection from '@/components/EducationSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ScrollObserver from '@/components/ScrollObserver';
import ParticleCanvas from '@/components/ParticleCanvas';
import MobileQuickDock from '@/components/MobileQuickDock';
import {
  getProfileData,
  getExperiencesData,
  getProjectsData,
  getSkillsData,
  getEducationsData,
  getCertificatesData,
} from '@/lib/data';

export const revalidate = 60;

export default async function HomePage() {
  const [profile, experiences, projects, skills, educations, certificates] =
    await Promise.all([
      getProfileData(),
      getExperiencesData(),
      getProjectsData(),
      getSkillsData(),
      getEducationsData(),
      getCertificatesData(),
    ]);

  return (
    <>
      {/* Custom Fluid Cursor, Ambient Tracker & Scroll Observer */}
      <ScrollObserver />

      {/* Living Interactive Constellation Canvas & Ambient Ripples */}
      <ParticleCanvas />

      {/* Floating Dynamic Island Header */}
      <Navbar resumeUrl={profile.resume_url} />

      {/* Main Sections */}
      <main className="main pb-16 lg:pb-0">
        {/*==================== HERO / HOME ====================*/}
        <Hero profile={profile} />

        {/*==================== ABOUT ====================*/}
        <AboutSection profile={profile} />

        {/*==================== PROJECTS ====================*/}
        <ProjectsSection projects={projects} />

        {/*==================== SKILLS ====================*/}
        <SkillsSection skills={skills} />

        {/*==================== EXPERIENCE ====================*/}
        <ExperienceSection experiences={experiences} />

        {/*==================== CERTIFICATES ====================*/}
        <CertificatesSection certificates={certificates} />

        {/*==================== EDUCATION ====================*/}
        <EducationSection educations={educations} />

        {/*==================== CONTACT ====================*/}
        <ContactSection profile={profile} />
      </main>

      {/* Mobile Floating Quick Action Dock */}
      <MobileQuickDock />

      {/* Footer */}
      <Footer />
    </>
  );
}
