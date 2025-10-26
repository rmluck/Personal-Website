# Personal Website

<div align="center">

![Site Logo](/public/web-app-manifest-192x192.png)

</div>

*By Rohan Mistry - Last updated October 25, 2025*

---

## 📖 Overview

Personal website and portfolio showcasing my projects, experience, and interests. Built with Next.js and TypeScript, featuring a modern, responsive design and interactive elements. Styled with Tailwind CSS and deployed on Vercel.

**Target Users** are potential employers, collaborators, clients, and anyone interested in my professional work and personal interests.

🔗 **Try it live**: [https://rohanmistry.me](https://rohanmistry.me)

<br>

![Home Page](/public/site/home_page.png)

---

## 📁 Contents

```bash
|── public/
│   └── data/
│       └── photos.json                 # Generated photo index
│       └── countries.geo.json          # GeoJSON for travel map
│   └── images/                         # Static images
│   └── logos/                          # Static logos
|── scripts/
│   └── generate_photo_index.ts         # Photo index generation script
|── src/
│   └── app/
│       └── blog
│           └── [slug]/
│               └── page.tsx            # Individual blog post
│           └── category/
│               └── page.tsx            # Blog category page
│           └── page.tsx                # Main blog page
│       └── photography
│           └── page.tsx                # Photography gallery
│       └── projects
│           └── page.tsx                # Full projects page
│       └── studio
│           └── [[...tool]]/
│               └── page.tsx            # Sanity Studio
│       └── travel
│           └── page.tsx                # Interactive travel map
│       └── globals.css                 # Global styles
│       └── layout.tsx                  # Root layout
│       └── not-found.tsx               # 404 page
│       └── page.tsx                    # Home page
│       └── vanta-background.tsx        # Animated background
│   └── components/
│       └── BlogCategoryPage.tsx        # Blog category page client
│       └── BlogPage.tsx                # Main blog page client
│       └── BlogSearch.tsx              # Blog search functionality
│       └── ClientLayout.tsx            # Client-side layout wrapper
│       └── Cursor.tsx                  # Custom cursor
│       └── EducationItem.tsx           # Education item component
│       └── EmailSidebar.tsx            # Fixed email sidebar
│       └── ExperienceItem.tsx          # Experience item component
│       └── Footer.tsx                  # Site footer
│       └── FullProjectCard.tsx         # Full project card component
│       └── GamePicks.tsx               # Game picks component
│       └── GithubStats.tsx             # GitHub activity calendar
│       └── Loading.tsx                 # Loading spinner
│       └── Modal.tsx                   # Photography modal
│       └── Navbar.tsx                  # Navigation bar
│       └── PortableTextComponents.tsx  # Sanity content rendering
│       └── PostCard.tsx                # Blog post preview card
│       └── PowerRankings.tsx           # Rankings component
│       └── ScrollHint.tsx              # Scroll indicator
│       └── Section.tsx                 # Animated section wrapper
│       └── SharedModal.tsx             # Photography modal content
│       └── SiteLogo.tsx                # Site logo component
│       └── SkillCategory.tsx           # Skills category component
│       └── SocialSidebar.tsx           # Fixed social links sidebar
│       └── ThemeToggle.tsx             # Dark/light mode toggle
│   └── data/
│       └── education.ts                # Education data
│       └── experience.ts               # Experience data
│       └── projects.ts                 # Projects data
│       └── skills.ts                   # Skills data
│       └── travel.ts                   # Travel data
│   └── hooks/
│       └── useSearchPosts.tsx          # Blog search hook
│   └── sanity/
│       └── lib/
│           └── client.ts               # Sanity client configuration
│           └── image.ts                # Image URL builder
│           └── live.ts                 # Live content updates
│           └── queries.ts              # GROQ queries
│       └── schemaTypes/
│           └── authorType.ts           # Blog author schema
│           └── blockContentType.ts     # Rich text content schema
│           └── categoryType.ts         # Blog category schema
│           └── gamePicksType.ts        # Game picks schema
│           └── gameType.ts             # Game schema
│           └── index.ts                # Schema exports
│           └── postType.ts             # Blog post schema
│           └── rankingsType.ts         # Rankings schema
│           └── teamType.ts             # Team schema
│       └── env.ts                      # Sanity environment configuration
│       └── structure.ts                # Studio structure
│   └── types/
│       └── blog.ts                     # Blog type definitions
│   └── utils/
│       └── cloudinary.ts               # Cloudinary integration
│       └── photography_utils.ts        # Photography utilities
|── eslint.config.mjs                   # ESLint configuration
|── LICENSE                             # MIT License
|── next-env.d.ts                       # Next.js type definitions
|── next.config.ts                      # Next.js configuration
|── package.json                        # Project dependencies
|── postcss.config.mjs                  # PostCSS configuration
|── README.md                           # Project documentation
|── sanity.cli.ts                       # Sanity CLI configuration
|── sanity.config.ts                    # Sanity Studio configuration
|── tailwind.config.ts                  # Tailwind configuration
|── tsconfig.json                       # TypeScript configuration
```

---

## 🌟 Features

### Core Features
* **Responsive Design**: Desktop-first design that adapts seamlessly across all devices.
* **Dark/Light Mode**: Toggle between themes with smooth transitions and persistent preferences.
* **Custom Cursor**: Interactive cursor that changes on hover for desktop users.
* **Smooth Animations**: Framer Motion animations throughout including scroll-triggered reveals.
* **Loading States**: Custom loading spinner with branded styling.

### Navigation Styling
* **Sticky Navigation**: Context-aware navigation with smooth scrolling to sections.
* **Mobile Menu**: Hamburger menu with slide-out panel for mobile devices.
* **Social Sidebars**: Fixed social media links and email contact on desktop.
* **Footer**: Consistent footer with copyright and mobile social links.

### Home Page
The home page serves as the central hub of the portfolio. Use the sticky navigation bar to jump to different sections or scroll naturally through the content.
* **Hero Section**: Animated introduction with typewriter effect and scroll hint.
* **About Me**: Professional background with profile image, downloadable resume, personal social media links, and GitHub activity calendar.
![About Me](/public/site/about_me.png)
* **Projects**: Featured project showcase with detailed cards, tech stack tags, and links to live demos, repositories, reports. 
![Projects](/public/site/projects.png)
* **Experience**: Interactive timeline with expandable job responsibilities and company logos.
![Experience](/public/site/experience.png)
* **Education**: Educational background with expandable details including coursework, extracurriculars, and honors.
![Education](/public/site/education.png)
* **Skills**: Categorized skill display with official technology logos.
![Skills](/public/site/skills.png)
* **Contact**: Functional contact form powered by Formspree.
![Contact](/public/site/contact.png)

### Photography Gallery
![Photography Page](/public/site/photography.png)
* **Image Grid**: Responsive masonry-style grid layout.
* **Modal Viewer**: Full-screen image viewer with navigation and zoom.
* **Keyboard Navigation**: Arrow key navigation through images.
* **Carousel Navigation**: Thumbnail carousel for quick image browsing.
* **Image Optimization**: Cloudinary CDN integration with blur placeholders.
* **Metadata Display**: Photo information including location and date details.
* **High-Resolution**: Download high-resolution versions of photos.

### Travel Map
![Travel Page](/public/site/travel.png)
* **Interactive Map**: Leaflet-powered world map showing visited countries and cities.
* **Country Highlighting**: Visual distinction between visited and unvisited countries.
* **Pinned Cities**: Pin visuals to highlight visited cities.
* **Popup Information**: Detailed country information with visited years.
* **Map Controls**: Zoom, pan, and click interactions.
* **Responsive Design**: Map adapts to different screen sizes.

### Blog System
[Note: Blog is a work in progress and currently unavailable.]
* **Content Management**: Sanity CMS integration for easy content creation.
* **Rich Text Support**: Full rich text editing with custom components.
* **Category Navigation**: Organized content with filterable categories.
* **Search Functionality**: Real-time search across posts with result counts.
* **Sports Content**: Custom components for power rankings and game picks.
* **Image Support**: Optimized images with captions.

### Technical Features
* **TypeScript**: Full type safety throughout application.
* **Server-Side Rendering**: Next.js App Router for optimal performance.
* **Image Optimization**: Next.js Image component with Cloudinary integration.
* **SEO Optimized**: Proper meta tags and structured data.
* **Performance**: Optimized bundle sizes and lazy loading.
* **Error Handling**: Custom 404 page and error boundaries.

---

## 🚧 Future Improvements

### Design Enhancements
* More micro-animations and interactions
* Advanced typography and layout improvements
* Enhanced mobile design optimizations
* Custom illustrations and graphics

### Technical Improvements
* Enhanced SEO with structured data
* Google Analytics integration
* Automated sitemap generation
* Progressive Web App features
* Enhanced accessibility features

### Photography Features
* Advanced filtering by location, date, or tags
* Photo stories and collections
* Timeline view of photos
* EXIF data display
* Lightbox improvements with better touch gestures

### Blog Enhancements
* Social sharing buttons for blog posts
* Related posts recommendations
* Reading progress indicators
* Post view analytics
* Table of contents for long posts
* Comment system integration
* Newsletter subscription

### Performance Optimizations
* Further image optimization and lazy loading
* Bundle size reduction
* Core Web Vitals improvements
* Enhanced caching strategies

---

## 🧰 Tech Stack

### Frontend Technologies
* **TypeScript**: Type-safe JavaScript development
* **React 19**: User interface library
* **Next.js 15**: Full-stack React framework with App Router
* **Tailwind CSS 4**: Utility-first CSS framework
* **Framer Motion**: Animation and gesture library

### Backend & Content Management
* **Sanity CMS**: Headless content management system
* **Sanity Studio**: Content editing interface
* **GROQ**: Query language for Sanity
* **Portable Text**: Rich text format for structured content
* **Formspree**: Contact form handling

### Image & Media Management
* **Cloudinary**: Image and video management service
* **Next.js Image**: Optimized image component
* **Sharp**: High-performance image processing

### Maps & Visualization
* **Leaflet**: Interactive map library
* **React Leaflet**: React components for Leaflet
* **GeoJSON**: Geographic data format

### UI Components & Icons
* **Lucide React**: Beautiful icon library
* **Headless UI**: Unstyled, accessible UI components

### Development Tools
* **ESLint**: Code linting and formatting
* **PostCSS**: CSS post-processing
* **Autoprefixer**: CSS vendor prefixing
* **ts-node**: TypeScript execution environment

### Build & Development
* **Node.js**: JavaScript runtime environment
* **npm**: Package management
* **Vanta.js**: 3D background animations
* **Three.js**: 3D graphics library

### Deployment
* **Vercel**: Deployment and hosting platform
* **Cloudflare**: Domain registration and DNS

---

## 🙏 Contributions / Acknowledgement

This project was built independently as my personal portfolio website. Inspired by several talented developers and their portfolio designs, mainly [Brittany Chiang](https://v4.brittanychiang.com).

---

## 🪪 License

This project is licensed under the [MIT License](/LICENSE). Feel free to use this code for your own project! If you do use it, I'd appreciate a link back to this repository and credit where appropriate.