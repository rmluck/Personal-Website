"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import ScrollHint from "@/components/ScrollHint";
import GithubStats from "@/components/GithubStats";
import ProjectCard from "@/components/ProjectCard";
import ExperienceItem from "@/components/ExperienceItem";
import EducationItem from "@/components/EducationItem";
import SkillCategory from "@/components/SkillCategory";
import { motion } from "framer-motion";
import { Twitter } from "lucide-react";
import LetterboxdIcon from "@/components/LetterboxdIcon";
import FableIcon from "@/components/FableIcon";
import { SquarePen } from "lucide-react";
import { Tv } from "lucide-react";
import { Map } from "lucide-react";
import { Camera } from "lucide-react";
import { projects } from "@/data/projects";
import { experience } from "@/data/experience";
import { education } from "@/data/education";
import { skills } from "@/data/skills";

export default function Home() {
  // Navigation items
  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Education", href: "#education" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  // Framer Motion variants for experience and education items
  const container = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        type: "spring" as const,
        staggerChildren: 0.5,
        delayChildren: 0.2,
      },
    },
  };

  // Variants for individual items
  const item = {
    hidden: {
      opacity: 0,
      x: -30,
    },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 60,
      },
    },
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar items={navItems} />

      <main className="flex-1 snap">
        {/* Page Header */}
        <section
          id="home"
          className={`
            flex items-center justify-center
            min-h-[calc(90vh)]
            px-4 sm:px-6 lg:px-12
            py-8 sm:py-12 lg:py-16
            m-4 sm:m-8 lg:m-24 mt-0
          `}
        >
          <div className="max-w-6xl">
            <p className="p-1 pb-2 text-md text-accent font-text">Hi, my name is</p>
            <h1
              className={`
                p-1 text-7xl
                text-pro900 dark:text-pro200
                font-heading font-bold
                shadow-[inset_0_-0.4em_var(--color-accent)]
              `}
            >
              ROHAN MISTRY
              <span className="blink">_</span>
            </h1>
            <h2 className="p-1 pt-5 text-4xl text-pro800 dark:text-pro300 font-regular font-bold">
              Aspiring Software Engineer
            </h2>
          </div>
        </section>

        <ScrollHint />

        {/* About Section */}
        <Section>
          <section
            id="about"
            className={`
              flex items-center justify-center
              px-6 sm:px-12
              py-16
              m-4 sm:m-18 lg:m-24 mt-0
            `}
          >
            <div 
              className={`
                grid grid-cols-1
                min-[1050px]:grid-cols-[2fr_1fr]
                items-center gap-6
                max-w-6xl mx-auto w-full
              `}
            >
              {/* Left Column - About Me */}
              <div className="space-y-6 order-2 min-[1050px]:order-1">
                <div className="flex items-center space-x-4">
                  <h2
                    className={`
                      text-4xl sm:text-5xl text-pro900 dark:text-pro200
                      font-heading font-bold
                      whitespace-nowrap
                    `}
                    style={{ textShadow: "-3px 2px 0 var(--accent)" }}
                  >
                    ABOUT ME
                  </h2>

                  {/* Horizontal line */}
                  <div className="flex-1 h-px bg-pro600 dark:bg-pro400"></div>
                </div>

                {/* Personal Info Badges */}
                <div className="flex flex-wrap gap-3 mb-4">
                  <div className={`
                    inline-flex items-center
                    px-3 py-2
                    bg-accent/30 border border-accent/70
                    rounded-full text-sm
                    text-pro900 dark:text-pro200 font-medium
                    cursor-hover cursor-none
                  `}>
                    <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                    22 years old
                  </div>

                  <div className={`
                    inline-flex items-center
                    px-3 py-2
                    bg-accent/30 border border-accent/70
                    rounded-full text-sm
                    text-pro900 dark:text-pro200 font-medium
                    cursor-hover cursor-none
                  `}>
                    <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                    Chino Hills, CA
                  </div>

                  <div className={`
                    inline-flex items-center
                    px-3 py-2
                    bg-accent/30 border border-accent/70
                    rounded-full text-sm
                    text-pro900 dark:text-pro200 font-medium
                    cursor-hover cursor-none
                  `}>
                    <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                    Open to Work
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs sm:text-sm text-pro800 dark:text-pro300 font-text">
                  Graduated from the <a href="https://www.ics.uci.edu/" target="_blank" rel="noopener noreferrer" className="relative text-pro900 dark:text-pro200 font-semibold bg-gradient-to-r from-accent to-accent bg-[length:0%_2px] bg-left-bottom bg-no-repeat hover:bg-[length:100%_2px] hover:text-accent transition-all duration-300 cursor-hover cursor-none">Donald Bren School of Information and Computer Sciences</a> at <a href="https://www.uci.edu/" target="_blank" rel="noopener noreferrer" className="relative text-pro900 dark:text-pro200 font-semibold bg-gradient-to-r from-accent to-accent bg-[length:0%_2px] bg-left-bottom bg-no-repeat hover:bg-[length:100%_2px] hover:text-accent transition-all duration-300 cursor-hover cursor-none">University of California, Irvine</a> with a B.S. in Computer Science and specialization in Intelligent Systems. I am passionate about leveraging software development, data analysis, and intelligent systems to solve complex problems.<br /><br />Experienced in full-stack development, artificial intelligence, machine learning, information retrieval, data visualization, and backend data integration through internships, research projects, and academic coursework, with success in creating web applications, data analysis tools, and high-performance search engines.<br /><br />Strong analytical, programming, communication, and leadership skills with a collaborative mindset and proactive learning approach. Eager to tackle new challenges and collaborate in professional settings.
                </p>
              </div>

              {/* Right Column - Profile Photo */}
              <div
                className={`
                  relative inline-block shrink-0
                  items-center justify-center
                  w-48 h-48 mx-auto
                  min-[1050px]:w-64 min-[1050px]:h-64
                  sm:w-72 sm:h-72 sm:mt-10
                  order-1 min-[1050px]:order-2
                `}
              >
                <div
                  className={`
                    relative w-full h-full
                    border-[6px] border-accent
                    rounded-full shadow-xl shadow-accent/25
                  `}
                >
                  <Image
                    src="/profile_photo.jpg"
                    alt="Profile photo"
                    fill
                    className={`
                      object-cover rounded-full hover:scale-105
                      transition-transform duration-300 ease-out
                      cursor-hover cursor-none clickable
                    `}
                  />
                </div>
              </div>

              {/* <div className="flex justify-center lg:justify-end">
                <div className="img-wrapper inline-block shrink-0 w-48 h-48 lg:w-64 lg:h-64 sm:w-72 sm:h-72 sm:mt-10 relative hover:scale-105 transition-transform duration-300 ease-out cursor-hover cursor-none clickable">
                  <Image
                    src="/profile_photo.jpg"
                    alt="Profile photo"
                    fill
                    className="object-cover relative w-full h-full rounded-full shadow-lg transition-all duration-300 ease-out"
                  />
                </div>
              </div> */}

              {/* Links */}
              <div className="col-span-full order-3">
                <div className="flex flex-wrap gap-5 mt-2">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a
                      href="/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                        px-6 py-3
                        border border-accent
                        rounded-md
                        text-accent font-bold
                        bg-accent/30 shadow-[2px_2px_0px_0px_var(--color-accent)]
                        sm:bg-transparent sm:shadow-md
                        sm:font-medium
                        transition-all duration-300 
                        hover:bg-accent/30 hover:border-accent
                        hover:shadow-[4px_4px_0px_0px_var(--color-accent)]
                        hover:font-bold
                        cursor-hover cursor-none clickable
                      `}
                    >
                      Download Resume
                    </a>
                  </motion.div>

                  <div className="flex flex-row space-x-4 pt-5 md:pt-0">
                    {/* <a
                      href="/blog"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                        inline-block text-pro600 dark:text-pro400
                        transition-all transform duration-200
                        hover:-translate-y-1 hover:text-accent
                        cursor-hover cursor-none clickable
                      `}
                      title="Blog"
                    >
                      <SquarePen className="h-7 w-7" />
                    </a> */}

                    <a
                      href="https://x.com/rohandm99"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                        inline-block text-pro600 dark:text-pro400
                        transition-all transform duration-200
                        hover:-translate-y-1 hover:text-accent
                        cursor-hover cursor-none clickable
                      `}
                      title="Twitter"
                    >
                      <Twitter className="h-7 w-7" />
                    </a>

                    <a
                      href="https://letterboxd.com/rohandm99/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                        inline-block text-pro600 dark:text-pro400
                        transition-all transform duration-200
                        hover:-translate-y-1 hover:text-accent
                        cursor-hover cursor-none clickable
                      `}
                      title="Letterboxd"
                    >
                      <LetterboxdIcon className="h-7 w-7" />
                    </a>

                    <a
                      href="https://www.serializd.com/user/rohandm99/profile"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                        inline-block text-pro600 dark:text-pro400
                        transition-all transform duration-200
                        hover:-translate-y-1 hover:text-accent
                        cursor-hover cursor-none clickable
                      `}
                      title="Serializd"
                    >
                      <Tv className="h-7 w-7" />
                    </a>

                    <a
                      href="https://www.fable.co/rohandm99-140100780483"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                        inline-block text-pro600 dark:text-pro400
                        transition-all transform duration-200
                        hover:-translate-y-1 hover:text-accent
                        cursor-hover cursor-none clickable
                      `}
                      title="Fable"
                    >
                      <FableIcon className="h-7 w-7" />
                    </a>

                    <a
                      href="/travel"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                        inline-block text-pro600 dark:text-pro400
                        transition-all transform duration-200
                        hover:-translate-y-1 hover:text-accent
                        cursor-hover cursor-none clickable
                      `}
                      title="Travel"
                    >
                      <Map className="h-7 w-7" />
                    </a>

                    <a
                      href="/photography"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                        inline-block text-pro600 dark:text-pro400
                        transition-all transform duration-200
                        hover:-translate-y-1 hover:text-accent
                        cursor-hover cursor-none clickable
                      `}
                      title="Photography"
                    >
                      <Camera className="h-7 w-7" />
                    </a>
                  </div>

                  {/* <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}>
                    <a href="/personal" target="_blank" rel="noopener noreferrer" className="px-5 py-2 rounded-md shadow-md border border-accent font-medium text-accent transition-all hover:shadow-[4px_4px_0px_0px_var(--color-accent)] hover:bg-accent/30 hover:text-accent hover:font-bold hover:border-accent duration-300 cursor-hover cursor-none clickable">
                      Learn More
                    </a>
                  </motion.div> */}
                </div>
              </div>

              {/* Github Stats */}
              <div className="p-2 mt-4 sm:mt-6 col-span-full overflow-x-auto w-full order-4">
                {/* <img src="https://github-readme-stats.vercel.app/api?username=rmluck&show_icons=true&hide=stars,prs,issues,contribs&commits_year=2025&theme=transparent&title_color=10B981&text_color=10B981&hide_border=true&icon_color=10B981&custom_title=Github%20Stats" /> */}
                {/* <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=rmluck&langs_count=10&size_weight=0.5&count_weight=0.5&hide=jupyter%20notebook,mako,dockerfile&exclude_repo=Nano-GPT-Development,Microsoft_Intro-Machine-Learning-Course&theme=transparent&title_color=10B981&text_color=10B981&hide_border=true&icon_color=10B981&custom_title=Top%20Languages" /> */}
                <p
                  className={`
                    mb-5
                    text-xl text-center
                    text-pro900 dark:text-pro100
                    font-semibold font-regular
                  `}
                >
                  Github Activity
                </p>
                <GithubStats />
                {/* <img src="https://leetcard.jacoblin.cool/rmluck?theme=light&font=Inter" /> */}
                {/* <img src="https://leetgraph.vercel.app/?user=rmluck&theme=light" /> */}
              </div>
            </div>
          </section>
        </Section>

        {/* Projects Section */}
        <Section>
          <section id="projects" className="px-6 sm:px-12 py-16 m-4 sm:m-18 lg:m-24 mt-0">
            {/* Section Header */}
            <div className="flex items-center space-x-4 mb-8">
              <h2
                className={`
                  text-4xl sm:text-5xl text-center
                  text-pro900 dark:text-pro200
                  font-heading font-bold
                  whitespace-nowrap
                `}
                style={{ textShadow: "-3px 2px 0 var(--accent)" }}
              >
                PROJECTS
              </h2>

              {/* Horizontal line */}
              <div className="flex-1 h-px bg-pro600 dark:bg-pro400"></div>
            </div>

            {/* Project Cards */}
            <ul className="space-y-24">
              {projects
                .filter((p) => p.featured)
                .map((project, i) => (
                  <ProjectCard
                    key={project.name}
                    side={i % 2 === 0 ? "right" : "left"}
                    {...project}
                  />
                ))}
            </ul>

            {/* View All Projects Button */}
            <div className="flex justify-center mt-16">
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href="/projects"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    px-6 py-3
                    border border-accent
                    rounded-md
                    text-accent font-bold
                    bg-accent/30 shadow-[2px_2px_0px_0px_var(--color-accent)]
                    sm:bg-transparent sm:shadow-md sm:font-medium
                    transition-all transform duration-300
                    hover:-translate-y-1 hover:-translate-x-1
                    hover:bg-accent/30 hover:border-accent
                    hover:text-accent hover:font-bold
                    hover:shadow-[4px_4px_0px_0px_var(--color-accent)]
                    cursor-hover cursor-none clickable
                  `}
                >
                  View All Projects
                </a>
              </motion.div>
            </div>
          </section>
        </Section>

        {/* Experience Section */}
        <Section>
          <section id="experience" className="px-6 sm:px-12 py-16 m-4 sm:m-18 lg:m-24 mt-0">
            {/* Section Header */}
            <div className="flex items-center space-x-4 mb-8">
              {/* Horizontal line */}
              <div className="flex-1 h-px bg-pro600 dark:bg-pro400"></div>

              <h2
                className={`
                  text-4xl sm:text-5xl text-center
                  text-pro900 dark:text-pro200
                  font-heading font-bold
                  whitespace-nowrap
                `}
                style={{ textShadow: "-3px 2px 0 var(--accent)" }}
              >
                EXPERIENCE
              </h2>
            </div>

            {/* Experience Items */}
            <motion.div 
              className="relative space-y-12"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* Vertical line */}
              <div className="absolute left-10 top-0 bottom-0 w-px bg-pro600 dark:bg-pro400"></div>
              
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
          <section id="education" className="px-6 sm:px-12 py-16 m-4 sm:m-18 lg:m-24 mt-0">
            {/* Section Header */}
            <div className="flex items-center space-x-4 mb-8">
              <h2
                className={`
                  text-4xl sm:text-5xl text-center
                  text-pro900 dark:text-pro200
                  font-heading font-bold
                  whitespace-nowrap
                `}
                style={{ textShadow: "-3px 2px 0 var(--accent)" }}
              >
                EDUCATION
              </h2>

              {/* Horizontal line */}
              <div className="flex-1 h-px bg-pro600 dark:bg-pro400"></div>
            </div>

            {/* Education Items */}
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
          <section id="skills" className="px-6 sm:px-12 py-16 m-4 sm:m-18 lg:m-24 mt-0">
            {/* Section Header */}
            <div className="flex items-center space-x-4 mb-8">
              {/* Horizontal line */}
              <div className="flex-1 h-px bg-pro600 dark:bg-pro400"></div>

              <h2
                className={`
                  text-4xl sm:text-5xl text-center
                  text-pro900 dark:text-pro200
                  font-heading font-bold
                  whitespace-nowrap
                `}
                style={{ textShadow: "-3px 2px 0 var(--accent)" }}
              >
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
          <section id="contact" className="px-6 sm:px-12 pt-16 pb-8 m-4 sm:m-18 lg:m-24 mt-0 mb-0">
            <div
              className={`
                p-8 max-w-2xl mx-auto
                bg-pro100 dark:bg-pro850
                border border-pro800 dark:border-pro300
                rounded-lg shadow-lg
              `}
            >
              {/* Section Header */}
              <div className="flex items-center space-x-4 mb-8">
                <h2
                  className={`
                    text-4xl sm:text-5xl text-center
                    text-pro900 dark:text-pro200
                    font-heading font-bold
                    whitespace-nowrap
                  `}
                  style={{ textShadow: "-3px 2px 0 var(--accent)" }}
                >
                  CONTACT
                </h2>

                {/* Horizontal line */}
                <div className="flex-1 h-px bg-pro600 dark:bg-pro400"></div>
              </div>

              <p className="mb-6 text-sm text-pro800 dark:text-pro300 font-text text-center">
                Have a question or want to work together? Fill out the form below and I&apos;ll get back to you!
              </p>

              {/* Contact Form */}
              <form
                action="https://formspree.io/f/xzzaqalq"
                method="POST"
                className="space-y-6"
              >
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className={`
                      block mb-1
                      text-sm text-left
                      text-pro900 dark:text-pro200
                      font-regular cursor-none
                    `}
                  >
                    Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    className={`
                      w-full px-4 py-2
                      border border-pro700 dark:border-pro400
                      rounded-md shadow-sm
                      text-sm text-pro800 dark:text-pro300 font-text
                      transition focus:outline-none
                      focus:ring-2 focus:ring-accent
                      cursor-hover cursor-none
                    `}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className={`
                      block mb-1
                      text-sm text-left
                      text-pro900 dark:text-pro200
                      font-regular cursor-none
                    `}
                  >
                    Email
                  </label>
                  
                  <input
                    type="email"
                    name="_replyto"
                    id="email"
                    required
                    className={`
                      w-full px-4 py-2
                      border border-pro700 dark:border-pro400
                      rounded-md shadow-sm
                      text-sm text-pro800 dark:text-pro300 font-text
                      transition focus:outline-none
                      focus:ring-2 focus:ring-accent
                      cursor-hover cursor-none
                    `}
                  />
                </div>
                
                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className={`
                      block mb-1
                      text-sm text-left
                      text-pro900 dark:text-pro200
                      font-regular cursor-none
                    `}
                  >
                    Message
                  </label>

                  <textarea
                    name="message"
                    id="message"
                    rows={5}
                    required
                    className={`
                      w-full px-4 py-2
                      border border-pro700 dark:border-pro400
                      rounded-md shadow-sm
                      text-sm text-pro800 dark:text-pro300 font-text
                      transition focus:outline-none
                      focus:ring-2 focus:ring-accent
                      cursor-hover cursor-none
                    `}
                  />
                </div>

                {/* Submit Button */}
                <div className="text-right">
                  <button
                    type="submit"
                    className={`
                      px-6 py-3
                      border border-accent
                      rounded-md
                      text-accent font-bold
                      bg-accent/30 shadow-[2px_2px_0px_0px_var(--color-accent)]
                      sm:bg-transparent sm:shadow-md sm:font-medium
                      transition-all transform duration-300 
                      hover:-translate-y-1 hover:-translate-x-1
                      hover:bg-accent/30 hover:border-accent
                      hover:text-accent hover:font-bold 
                      hover:shadow-[4px_4px_0px_0px_var(--color-accent)]
                      cursor-hover cursor-none clickable
                    `}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </section>
        </Section>

        <section className="mt-0">
          <Footer />
        </section>
      </main>
    </div>
  );
}
