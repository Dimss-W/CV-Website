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
      {/* Custom Cursor, Scroll Up & ScrollReveal Observer */}
      <ScrollObserver />

      {/*==================== HEADER & NAV ====================*/}
      <Navbar resumeUrl={profile.resume_url} />

      {/*==================== MAIN ====================*/}
      <main className="main">
        {/*==================== HOME SECTION ====================*/}
        <Hero profile={profile} />

        {/*==================== ABOUT SECTION ====================*/}
        <AboutSection profile={profile} />

        {/*==================== WORK / PROJECTS SECTION ====================*/}
        <ProjectsSection projects={projects} />

        {/*==================== SKILLS SECTION ====================*/}
        <SkillsSection skills={skills} />

        {/*==================== EXPERIENCE SECTION ====================*/}
        <ExperienceSection experiences={experiences} />

        {/*==================== CERTIFICATES SECTION ====================*/}
        <CertificatesSection certificates={certificates} />

        {/*==================== ACADEMIC BACKGROUND ====================*/}
        <EducationSection educations={educations} />

        {/*==================== CONTACT SECTION ====================*/}
        <ContactSection profile={profile} />
      </main>

      {/*==================== FOOTER ====================*/}
      <Footer />
    </>
  );
}
