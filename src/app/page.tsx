import Image from "next/image";
import Navbar from "@/components/Navbar";
import SocialSidebar from "@/components/SocialSidebar";
import EmailSidebar from "@/components/EmailSidebar";
import ScrollHint from "@/components/ScrollHint";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import ExperienceItem from "@/components/ExperienceItem";
import EducationItem from "@/components/EducationItem";
import SkillCategory from "@/components/SkillCategory";
import { Github, Linkedin, Instagram, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
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
                Graduated from University of California, Irvine with a B.S. in Computer Science and specialization in Intelligent Systems. I am passionate about leveraging software development, data analysis, and intelligent systems to solve complex problems.<br /><br />Experienced in full-stack development, artificial intelligence, machine learning, information retrieval, data visualization, and backend data integration through internships, research projects, and academic coursework, with success in creating web applications, data analysis tools, and high-performance search engines.<br /><br />Strong analytical, programming, communication, and leadership skills with a collaborative mindset and proactive learning approach. Eager to tackle new challenges and collaborate in professional settings.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4">
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="px-5 py-2 rounded-md shadow-md border border-accent font-medium font-regular text-accent transition-all transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0px_0px_var(--color-accent)] duration-300">
                  Download Resume
                </a>
                <a href="/" target="_blank" rel="noopener noreferrer" className="px-5 py-2 rounded-md shadow-md border border-accent font-medium font-regular text-accent transition-all transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0px_0px_var(--color-accent)] duration-300">
                  Learn More
                </a>
              </div>
            </div>

            {/* Right Column - Profile Photo */}
            <div className="flex justify-center lg:justify-end">
              <div className="img-wrapper inline-block shrink-0 w-48 h-48 lg:w-64 lg:h-64 sm:w-72 sm:h-72 relative hover:scale-105 transition-transform duration-300 ease-out">
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

        {/* Projects Section */}
        <section id="projects" className="px-6 sm:px-12 py-16 m-24 mt-0 rounded-lg outline-2 outline-pro900 shadow-lg">
          <div className="flex items-center space-x-4 mb-8">
            <h2 className="text-4xl text-center text-pro900 font-heading font-bold whitespace-nowrap">
              PROJECTS
            </h2>
            <div className="flex-1 h-px bg-pro600"></div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard
              title="Portfolio Website"
              description="A personal portfolio built with Next.js, Tailwind, and TypeScript."
              image="/next.svg"
              tags={["Next.js", "Tailwind", "TypeScript"]}
              links={[
                { label: "GitHub", url: "https://github.com", icon: <Github size={16} /> },
                { label: "Live Demo", url: "https://vercel.com", icon: <ExternalLink size={16} /> },
              ]}
            />

            <ProjectCard
              title="Yelp Review Analyzer"
              description="A tool for analyzing Yelp reviews using sentiment analysis."
              image="/next.svg"
              tags={["Python", "Natural Language Processing", "Sentiment Analysis"]}
              links={[
                { label: "Report", url: "#", icon: <ExternalLink size={16} /> },
              ]}
            />

            {/* Add more ProjectCard components as needed */}
          </div>

          {/* View All Projects Button */}
          <div className="flex justify-center mt-10">
            <a href="/projects" className="px-6 py-3 rounded-xl shadow-md border border-accent font-medium font-text text-accent transition">View All Projects</a>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="px-6 sm:px-12 py-16 m-24 mt-0 rounded-lg outline-pro900 outline-2 shadow-lg">
          <h2 className="text-4xl text-center font-heading font-bold text-pro900 mb-8">EXPERIENCE</h2>

          <div className="relative pl-14">
            <ExperienceItem
              company="Tech Corp"
              role="Software Engineer"
              dates="Jan 2022 - Present"
              description="Developed and maintained web applications using React and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions."
              logo="/next.svg"
            />
            <ExperienceItem
              company="Tech Corp"
              role="Software Engineer"
              dates="Jan 2022 - Present"
              description="Developed and maintained web applications using React and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions."
              logo="/next.svg"
            />
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="px-6 sm:px-12 py-16 m-24 mt-0 rounded-lg outline-2 outline-pro900 shadow-lg">
          <h2 className="text-4xl text-center font-heading font-bold text-pro900 mb-8">EDUCATION</h2>

          <div className="space-y-8 max-w-3xl mx-auto">
            <EducationItem 
              school="State University"
              degree="Bachelor of Science in Computer Science"
              dates="2018 - 2022"
              coursework={[
                "Data Structures and Algorithms",
                "Operating Systems",
                "Database Management Systems",
                "Web Development",
              ]}
              extras={[
                "Graduated with Honors",
                "Dean's List for 6 semesters",
              ]}
              logo="/next.svg"
            />

            <EducationItem 
              school="Online Learning"
              degree="Additional Certifications"
              dates="Ongoing"
              coursework={[
                "FreeCodeCamp: Full Stack Development",
                "Coursera: Machine Learning",
              ]}
              extras={[
                "Graduated with Honors",
                "Dean's List for 6 semesters",
              ]}
              logo="/next.svg"
            />
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="px-6 sm:px-12 py-16 m-24 mt-0 rounded-lg outline-pro900 outline-2 shadow-lg">
          <h2 className="text-4xl text-center font-heading font-bold text-pro900 mb-8">SKILLS</h2>

          <SkillCategory 
            title="Languages"
            color="text-yellow-500"
            skills={[
              {
                name: "TypeScript",
                logo: "/next.svg",
                projects: [
                  { name: "Portfolio Website", link: "/projects/portfolio" },
                  { name: "E-commerce Platform", link: "/projects/ecommerce" },
                ],
              },
              {
                name: "Python",
                logo: "/next.svg",
                projects: [
                  { name: "Data Analysis Tool", link: "/projects/data-analysis" },
                  { name: "Machine Learning Model", link: "/projects/ml-model" },
                ],
              },
            ]}
          />

          <SkillCategory 
            title="Softwares"
            color="text-blue-500"
            skills={[
              {
                name: "GitHub",
                logo: "/next.svg",
                projects: [
                  { name: "Portfolio Website", link: "/projects/portfolio" },
                ],
              },
            ]}
          />

          <SkillCategory 
            title="Packages & Libraries"
            color="text-green-500"
            skills={[
              {
                name: "React",
                logo: "/next.svg",
                projects: [
                  { name: "Portfolio Website", link: "/projects/portfolio" },
                  { name: "Social Media App", link: "/projects/social-media" },
                ],
              },
            ]}
          />
        </section>

        {/* Contact Section */}
        <section id="contact" className="px-6 sm:px-12 py-16 m-24 mt-0 rounded-lg outline-pro900 outline-2 shadow-lg">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-center text-pro900 mb-8">CONTACT</h2>
            <p className="text-pro800 font-text">
              Have a question or want to work together? Fill out the form below and I'll get back to you!
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto bg-pro100 border border-pro500 rounded-2xl shadow-lg p-8">
            <form
              action="https://formspree.io/f/xzzaqalq"
              method="POST"
              className="space-y-6"
            >
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-left text-sm font-regular text-pro900 mb-1">Name</label>
                <input type="text" name="name" id="name" required className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-accent" />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-left text-sm font-regular text-pro900 mb-1">Email</label>
                <input type="email" name="_replyto" id="email" required className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-accent" />
              </div>
              
              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-left text-sm font-regular text-pro900 mb-1">Message</label>
                <textarea name="message" id="message" rows={5} required className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-accent" />
              </div>

              {/* Submit Button */}
              <div className="text-right">
                <button type="submit" className="px-6 py-2 text-accent font-text rounded-xl shadow-md border border-accent transition-colors">Submit</button>
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
