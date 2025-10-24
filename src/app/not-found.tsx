import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex flex-1 items-center justify-center px-6 sm:px-12">
        <div className="text-center max-w-2xl mx-auto">
          {/* Large 404 */}
          <div className="mb-8">
            <h1 className="text-9xl md:text-[12rem] text-accent/60 font-bold leading-none">
              404
            </h1>
          </div>
          
          {/* Error Message */}
          <div className="mb-8">
            <h2 className="mb-4 text-3xl md:text-4xl text-pro900 dark:text-pro200 font-bold">
              Page Not Found
            </h2>
            <p className="text-lg text-pro700 dark:text-pro300 mb-8">
              Oops! The page you&apos;re looking for seems to have wandered off.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className={`
                inline-flex items-center
                px-6 py-3
                text-accent font-medium
                border border-accent rounded-xl shadow-md
                transition-all transform duration-300
                hover:-translate-x-1 hover:-translate-y-1 
                hover:bg-accent/30 hover:border-accent
                hover:text-accent hover:font-bold
                hover:shadow-[4px_4px_0px_0px_var(--color-accent)]
                cursor-none cursor-hover clickable
              `}
            >
              ← Back to Home
            </Link>
          </div>

          {/* Helpful Links */}
          {/* <div className="mt-12 pt-8 border-t border-pro300 dark:border-pro700">
            <p className="text-sm text-pro600 dark:text-pro400 mb-4">
              Or try one of these popular pages:
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/projects" className="text-accent hover:underline cursor-hover cursor-none">
                Projects
              </Link>
              <Link href="/photography" className="text-accent hover:underline cursor-hover cursor-none">
                Photography
              </Link>
              <Link href="/travel" className="text-accent hover:underline cursor-hover cursor-none">
                Travel
              </Link>
              <Link href="/blog" className="text-accent hover:underline cursor-hover cursor-none">
                Blog
              </Link>
            </div>
          </div> */}
        </div>
      </main>

      <Footer />
    </div>
  );
}