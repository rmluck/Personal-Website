"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import SocialSidebar from "@/components/SocialSidebar";
import EmailSidebar from "@/components/EmailSidebar";
import Section from "@/components/Section";
import ScrollHint from "@/components/ScrollHint";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import ExperienceItem from "@/components/ExperienceItem";
import EducationItem from "@/components/EducationItem";
import SkillCategory from "@/components/SkillCategory";
import { projects } from "@/data/projects";
import { experience } from "@/data/experience";
import { education } from "@/data/education";
import { skills } from "@/data/skills";
import { motion } from "framer-motion";

export default function Home() {
  const container = {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      x: -30
    },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 60,
      },
    },
  };

  return (
    <div className="flex flex-col min-h-screen ">
      {/* Navigation Bar */}
      <Navbar />

      {/* Sidebars */}
      <SocialSidebar />
      <EmailSidebar />

      {/* Main Content */}
      <main className="flex-1">
        {/* Page Header */}
        <section id="home" className="flex items-center justify-center min-h-[calc(90vh)] px-6 sm:px-12 py-16 m-24 mt-0">
          <div className="max-w-6xl">
            <p className="p-1 pb-2 text-md text-accent font-text">Hi, my name is</p>
            <h1 className="p-1 text-7xl text-pro900 font-heading font-bold shadow-[inset_0_-0.4em_var(--color-pro500)]">ROHAN MISTRY<span className="blink">_</span></h1>
            <h2 className="p-1 pt-5 text-4xl text-pro800 font-regular font-bold">Aspiring Software Engineer</h2>
          </div>
        </section>

        <ScrollHint />

        {/* About Section */}
        <Section>
          <section id="about" className="flex items-center justify-center px-6 sm:px-12 py-16 m-24 mt-0 rounded-lg outline-border outline-2 shadow-lg">
            <div className="grid grid-cols-1 min-[950px]:grid-cols-[2fr_1fr] gap-6 items-center max-w-6xl mx-auto">
              {/* Left Column */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <h2 className="text-5xl text-pro900 font-heading font-bold whitespace-nowrap">
                    ABOUT ME
                  </h2>
                  <div className="flex-1 h-px bg-pro600"></div>
                </div>
                <p className="text-sm text-pro800 font-text">
                  Graduated from the <a href="https://www.ics.uci.edu/" target="_blank" rel="noopener noreferrer" className="text-pro900 font-semibold relative transition-all hover:text-accent after:absolute after:left-0 after:-bottom-0.25 after:h-[1px] after:w-0 after:bg-accent after:transition-all hover:after:w-full cursor-hover cursor-none">Donald Bren School of Information and Computer Sciences</a> at <a href="https://www.uci.edu/" target="_blank" rel="noopener noreferrer" className="text-pro900 font-semibold relative transition-all hover:text-accent after:absolute after:left-0 after:-bottom-0.25 after:h-[1px] after:w-0 after:bg-accent after:transition-all hover:after:w-full cursor-hover cursor-none">University of California, Irvine</a> with a B.S. in Computer Science and specialization in Intelligent Systems. I am passionate about leveraging software development, data analysis, and intelligent systems to solve complex problems.<br /><br />Experienced in full-stack development, artificial intelligence, machine learning, information retrieval, data visualization, and backend data integration through internships, research projects, and academic coursework, with success in creating web applications, data analysis tools, and high-performance search engines.<br /><br />Strong analytical, programming, communication, and leadership skills with a collaborative mindset and proactive learning approach. Eager to tackle new challenges and collaborate in professional settings.
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4 mt-8">
                  <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}>
                    <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="px-5 py-2 rounded-md shadow-md border border-accent font-medium font-regular text-accent transition-all  hover:shadow-[4px_4px_0px_0px_var(--color-accent)] duration-300 cursor-hover cursor-none clickable">
                      Download Resume
                    </a>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}>
                    <a href="/" target="_blank" rel="noopener noreferrer" className="px-5 py-2 rounded-md shadow-md border border-accent font-medium font-regular text-accent transition-all hover:shadow-[4px_4px_0px_0px_var(--color-accent)] duration-300 cursor-hover cursor-none clickable">
                      Learn More
                    </a>
                  </motion.div>
                </div>
              </div>

              {/* Right Column - Profile Photo */}
              <div className="flex justify-center lg:justify-end">
                <div className="img-wrapper inline-block shrink-0 w-48 h-48 lg:w-64 lg:h-64 sm:w-72 sm:h-72 relative hover:scale-105 transition-transform duration-300 ease-out cursor-hover cursor-none clickable">
                  {/* Profile Photo */}
                  <Image
                    src="/profile_photo.jpg"
                    alt="Profile photo"
                    fill
                    className="object-cover relative w-full h-full rounded-full shadow-lg transition-all duration-300 ease-out"
                  />
                </div>
              </div>
            </div>
          </section>
        </Section>

        {/* Projects Section */}
        <Section>
          <section id="projects" className="px-6 sm:px-12 py-16 m-24 mt-0 rounded-lg outline-2 outline-pro900 shadow-lg">
            <div className="flex items-center space-x-4 mb-8">
              <h2 className="text-4xl text-center text-pro900 font-heading font-bold whitespace-nowrap">
                PROJECTS
              </h2>
              <div className="flex-1 h-px bg-pro600"></div>
            </div>

            {/* Projects Grid */}
            <ul className="space-y-24">
              {projects
                .filter((p) => p.featured)
                .map((project, i) => (
                  <ProjectCard key={i} side={i % 2 === 0 ? "right" : "left"} {...project} />
                ))}
            </ul>

            {/* View All Projects Button */}
            <div className="flex justify-center mt-16">
              <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}>
                  <a href="/projects" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-xl shadow-md border border-accent font-medium font-regular text-accent transition-all transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0px_0px_var(--color-accent)] duration-300 cursor-hover cursor-none clickable">
                    View All Projects
                  </a>
                </motion.div>
            </div>
          </section>
        </Section>

        {/* Experience Section */}
        <Section>
          <section id="experience" className="px-6 sm:px-12 py-16 m-24 mt-0 rounded-lg outline-pro900 outline-2 shadow-lg">
            <div className="flex items-center space-x-4 mb-8">
              <div className="flex-1 h-px bg-pro600"></div>
              <h2 className="text-4xl text-center text-pro900 font-heading font-bold whitespace-nowrap">
                EXPERIENCE
              </h2>
            </div>

            <motion.div 
              className="relative space-y-12"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="absolute left-10 top-0 bottom-0 w-px bg-pro600"></div>
              {experience.map((exp, index) => (
                <motion.div key={index} variants={item}>
                  <ExperienceItem {...exp} />
                </motion.div>
              ))}
            </motion.div>
          </section>
        </Section>

        {/* Education Section */}
        <Section>
          <section id="education" className="px-6 sm:px-12 py-16 m-24 mt-0 rounded-lg outline-2 outline-pro900 shadow-lg">
            <div className="flex items-center space-x-4 mb-8">
              <h2 className="text-4xl text-center text-pro900 font-heading font-bold whitespace-nowrap">
                EDUCATION
              </h2>
              <div className="flex-1 h-px bg-pro600"></div>
            </div>
            
            <motion.div
              className="space-y-8 relative"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              {education.map((edu, index) => (
                <motion.div key={index} variants={item}>
                  <EducationItem {...edu} />
                </motion.div>
              ))}
            </motion.div>
          </section>
        </Section>

        {/* Skills Section */}
        <Section>
          <section id="skills" className="px-6 sm:px-12 py-16 m-24 mt-0 rounded-lg outline-pro900 outline-2 shadow-lg">
            <div className="flex items-center space-x-4 mb-8">
              <div className="flex-1 h-px bg-pro600"></div>
              <h2 className="text-4xl text-center text-pro900 font-heading font-bold whitespace-nowrap">
                SKILLS
              </h2>
            </div>

            {/* Skills Grid */}
            <div className="flex flex-col gap-8">
              {skills.slice(0, 3).map((category) => (
                <SkillCategory key={category.category} {...category} />
              ))}
            </div>
          </section>
        </Section>

        {/* Contact Section */}
        <Section>
          <section id="contact" className="px-6 sm:px-12 py-16 m-24 mt-0 rounded-lg outline-pro900 outline-2 shadow-lg">
            <div className="max-w-2xl mx-auto bg-pro100 border border-pro800 rounded-lg shadow-lg p-8">
              <div className="flex items-center space-x-4 mb-8">
                <h2 className="text-4xl text-center text-pro900 font-heading font-bold whitespace-nowrap">
                  CONTACT
                </h2>
                <div className="flex-1 h-px bg-pro600"></div>
              </div>
              <p className="text-center mb-6 text-pro800 font-text text-sm">
                Have a question or want to work together? Fill out the form below and I'll get back to you!
              </p>
              <form
                action="https://formspree.io/f/xzzaqalq"
                method="POST"
                className="space-y-6"
              >
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-left text-sm font-regular text-pro900 mb-1">Name</label>
                  <input type="text" name="name" id="name" required className="w-full px-4 py-2 border border-pro700 rounded-md shadow-sm text-sm font-text text-pro800 focus:outline-none focus:ring-2 focus:ring-accent transition cursor-hover cursor-none" />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-left text-sm font-regular text-pro900 mb-1">Email</label>
                  <input type="email" name="_replyto" id="email" required className="w-full px-4 py-2 border border-pro700 rounded-md shadow-sm text-sm font-text text-pro800 focus:outline-none focus:ring-2 focus:ring-accent transition cursor-hover cursor-none" />
                </div>
                
                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-left text-sm font-regular text-pro900 mb-1">Message</label>
                  <textarea name="message" id="message" rows={5} required className="w-full px-4 py-2 border border-pro700 rounded-md shadow-sm text-sm font-text text-pro800 focus:outline-none focus:ring-2 focus:ring-accent transition cursor-hover cursor-none" />
                </div>

                {/* Submit Button */}
                <div className="text-right">
                  <button type="submit" className="px-6 py-3 rounded-xl shadow-md  border border-accent font-medium font-regular text-accent transition-all transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0px_0px_var(--color-accent)] duration-300 cursor-hover cursor-none clickable">Submit</button>
                </div>
              </form>
            </div>
          </section>
        </Section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
