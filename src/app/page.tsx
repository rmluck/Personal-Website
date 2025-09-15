import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import ExperienceItem from "@/components/ExperienceItem";
import EducationItem from "@/components/EducationItem";
import SkillCategory from "@/components/SkillCategory";
import { Github, Linkedin, Instagram, ExternalLink } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
      <Navbar />

      <main className="flex-1">
        {/* Page Header */}
        <section id="home" className="min-h-[calc(40vh)] flex items-center justify-center">
          <h1 className="text-6xl font-heading font-bold text-center shadow-[inset_0_-0.4em_var(--color-light-sbg)] p-1">ROHAN MISTRY</h1>
        </section>

        {/* About Section */}
        <section id="about" className="flex items-center justify-center bg-light-sbg px-6 sm:px-12 py-16 m-24 mt-0 rounded-lg outline-border outline-2 shadow-lg">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Left Column */}
            <div className="space-y-6">
              <h2 className="text-4xl sm:text-5xl font-heading font-bold">
                ABOUT ME
              </h2>
              <p className="text-light-stxt font-text text-xl">
                A short tagline goes here - something about your role, specialties, or passions.
              </p>
              <p className="text-light-stxt font-text">
                This is a placeholder for a professional introduction and background. You can describe your skills, experiences, or career focus here.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4">
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="px-5 py-2 rounded-md bg-blue-600/60 text-dark-ptxt font-medium font-text hover:bg-blue-700/80 transition">
                  Download Resume
                </a>

                {/* Quick Links */}
                <div className="flex items-center space-x-4">
                  <a
                    href="https://github.com/rmluck" target="_blank"
                    rel="noopener noreferrer"
                    className="text-light-stxt hover:text-light-ptxt transition-colors"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/rohan-dilan-mistry/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-light-stxt hover:text-light-ptxt transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.instagram.com/rohandm99/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-light-stxt hover:text-light-ptxt transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Profile Photo */}
            <div className="flex justify-center md:justify-end">
              <div className="w-48 h-48 sm:w-64 sm:h-64 relative rounded-full overflow-hidden shadow-lg">
                <Image
                  src="/profile_photo.jpg"
                  alt="Profile photo"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="bg-light-sbg px-6 sm:px-12 py-16 m-24 mt-0 rounded-lg outline-border outline-2 shadow-lg">
          <h2 className="text-4xl font-heading font-bold text-center mb-8">PROJECTS</h2>

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
            <a href="/projects" className="px-6 py-3 bg-blue-600/60 text-light-pbg rounded-xl shadow-md hover:bg-blue-700/80">View All Projects</a>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="bg-light-sbg px-6 sm:px-12 py-16 m-24 mt-0 rounded-lg outline-border outline-2 shadow-lg">
          <h2 className="text-4xl font-heading font-bold text-center mb-8">EXPERIENCE</h2>

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
        <section id="education" className="bg-light-sbg px-6 sm:px-12 py-16 m-24 mt-0 rounded-lg outline-border outline-2 shadow-lg">
          <h2 className="text-4xl font-heading font-bold text-center mb-8">EDUCATION</h2>

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
        <section id="skills" className="bg-light-sbg px-6 sm:px-12 py-16 m-24 mt-0 rounded-lg outline-border outline-2 shadow-lg">
          <h2 className="text-4xl font-heading font-bold text-center mb-8">SKILLS</h2>

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
        <section id="contact" className="bg-light-sbg px-6 sm:px-12 py-16 m-24 mt-0 rounded-lg outline-border outline-2 shadow-lg">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-center mb-8">CONTACT</h2>
            <p className="text-light-stxt font-text">
              Have a question or want to work together? Fill out the form below and I'll get back to you!
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto bg-white border border-border rounded-2xl shadow-lg p-8">
            <form
              action="https://formspree.io/f/xzzaqalq"
              method="POST"
              className="space-y-6"
            >
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-left text-sm font-regular text-light-stxt mb-1">Name</label>
                <input type="text" name="name" id="name" required className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-left text-sm font-regular text-light-stxt mb-1">Email</label>
                <input type="email" name="_replyto" id="email" required className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" />
              </div>
              
              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-left text-sm font-regular text-border mb-1">Message</label>
                <textarea name="message" id="message" rows={5} required className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" />
              </div>

              {/* Submit Button */}
              <div className="text-right">
                <button type="submit" className="px-6 py-2 bg-blue-600/60 text-light-pbg font-semibold font-regular rounded-xl shadow-md hover:bg-blue-700/80 transition-colors">Submit</button>
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
