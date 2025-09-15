import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Github, Linkedin, Instagram } from "lucide-react";

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
        <section id="about" className="flex items-center justify-center bg-light-sbg px-6 sm:px-12 py-16 m-24 mt-0 rounded-lg outline-border outline-2">
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

        <section id="projects" className="flex items-center justify-center bg-light-sbg">
          <h2 className="text-4xl font-heading font-bold">PROJECTS</h2>
        </section>

        <section id="experience" className="flex items-center justify-center bg-light-sbg">
          <h2 className="text-4xl font-heading font-bold">EXPERIENCE</h2>
        </section>

        <section id="education" className="flex items-center justify-center bg-light-sbg">
          <h2 className="text-4xl font-heading font-bold">EDUCATION</h2>
        </section>

        <section id="skills" className="flex items-center justify-center bg-light-sbg">
          <h2 className="text-4xl font-heading font-bold">SKILLS</h2>
        </section>

        <section id="contact" className="flex items-center justify-center bg-light-sbg">
          <h2 className="text-4xl font-heading font-bold">CONTACT</h2>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
