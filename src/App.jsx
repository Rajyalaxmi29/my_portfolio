import React, { useState, useEffect } from 'react';
import GradientCards from './components/GradientCards';
import EtheralShadow from './components/EtheralShadow';
import { InteractiveRobotSpline } from './components/ui/interactive-3d-robot';
import avatarImg from './assets/avatar.png';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeNode, setActiveNode] = useState(0);
  const navItems = ['About', 'Skills', 'Projects', 'Contact'];

  // Section Reveal Observer for smooth scrolling entry
  React.useEffect(() => {
    const observerOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Scroll effect for Journey Line
  React.useEffect(() => {
    const handleScroll = () => {
       const section = document.getElementById('journey');
       if(section) {
          const rect = section.getBoundingClientRect();
          const viewHeight = window.innerHeight;
          // Percentage of the section scrolled into view
          let rawPercent = (viewHeight - rect.top) / (rect.height + viewHeight * 0.5);
          if (rawPercent < 0) rawPercent = 0;
          if (rawPercent > 1) rawPercent = 1;

          document.documentElement.style.setProperty('--scroll-percent', rawPercent);

          if (rawPercent > 0.1 && rawPercent <= 0.4) setActiveNode(1);
          else if (rawPercent > 0.4 && rawPercent <= 0.7) setActiveNode(2);
          else if (rawPercent > 0.7) setActiveNode(3);
          else setActiveNode(0);
       }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // init on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Inline SVG Icons
  const Icons = {
    Github: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
    ),
    Linkedin: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
    ),
    Twitter: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-1 2.17-2 4a10 10 0 1 1-10.46-4H10"></path></svg>
    ),
    GitHub: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
    ),
    LinkedIn: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
    ),
    Mail: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
    ),
    ExternalLink: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
    ),
    Menu: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
    ),
    X: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    ),
    Briefcase: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
    ),
    GraduationCap: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path></svg>
    ),
    Calendar: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
    )
  };

  return (
    <div className="portfolio-container">
      {/* Global Animated Background */}
      <EtheralShadow isFixed={true} />

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="logo">Kunchala Rajyalaxmi</div>

          <div className="nav-links desktop-only">
            <a href="#about" className="nav-link">About</a>
            <a href="#experience" className="nav-link">Experience</a>
            <a href="#projects" className="nav-link">Journey</a>
            <a href="#designs" className="nav-link">Designs</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>

          <div className="nav-actions">
            <button className="cta-button">Contact Me</button>
            <button className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <Icons.X /> : <Icons.Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
          <a href="#experience" onClick={() => setIsMenuOpen(false)}>Experience</a>
          <a href="#projects" onClick={() => setIsMenuOpen(false)}>Journey</a>
          <a href="#designs" onClick={() => setIsMenuOpen(false)}>Designs</a>
          <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
        </div>
      )}

      {/* Hero Section */}
      <main className="hero">
        <div className="hero-background-text">
          <h1 className="huge-text">RAJYALAXMI</h1>
        </div>

        <div className="hero-content fade-in">
          <div className="hero-grid">
            <div className="hero-text-side">
              <div className="badge">AVAILABLE FOR PROJECTS</div>
              <h2 className="main-title">
                HI, I’M <span className="gradient-text">RAJYALAXMI</span>
              </h2>
              <p className="description">
                A passionate Full Stack Developer focused on building impactful and innovative solutions. 
              </p>
              
              <div className="hero-actions">
                <a href="/fullstack -resume.pdf" target="_blank" rel="noopener noreferrer" className="resume-btn">
                  Download Resume
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                </a>
                <div className="social-links">
                  <a href="https://github.com/Rajyalaxmi29" target="_blank" rel="noopener noreferrer"><Icons.Github /></a>
                  <a href="https://www.linkedin.com/in/rajyalaxmi-k-794b74327/" target="_blank" rel="noopener noreferrer"><Icons.Linkedin /></a>
                  <a href="mailto:rajyalaxmikunchala06@gmail.com"><Icons.Mail /></a>
                </div>
              </div>
            </div>

            <div className="hero-avatar-side">
              <div className="avatar-wrapper">
                <div className="avatar-container animate-float">
                  <img src={avatarImg} alt="Avatar" className="avatar-img" />
                </div>
                <div className="avatar-glow"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="scroll-indicator">
          <span>Scroll to explore</span>
          <div className="line pulse" />
        </div>
      </main>

      {/* About Section - Bento Grid */}
      <section id="about" className="about-section reveal">
        <h2 className="section-title">
          ABOUT <span className="gradient-text">ME</span>
        </h2>
        
        <div className="bento-grid">
          <div className="bento-card intro-card card-3d">
            <div className="card-glow"></div>
            <div className="card-content">
              <h3>B.Tech AI & ML Student</h3>
              <p>I’m Rajyalaxmi, a B.Tech student specializing in <strong>AI & Machine Learning</strong>, passionate about building real-world solutions using technology.</p>
            </div>
          </div>

          <div className="bento-card stack-card card-3d">
            <div className="card-glow"></div>
            <div className="card-content">
              <h3>Full Stack Development</h3>
              <p>Strong skills in <strong>React, Node.js, Express, MongoDB, and MySQL</strong>. I focus on creating scalable and efficient applications.</p>
            </div>
          </div>

          <div className="bento-card ui-card card-3d">
            <div className="card-glow"></div>
            <div className="card-content">
              <h3>UI/UX Design</h3>
              <p>Interested in building clean and user-friendly interfaces with a premium touch.</p>
            </div>
          </div>

          <div className="bento-card dsa-card card-3d">
            <div className="card-glow"></div>
            <div className="card-content">
              <h3>Algorithms</h3>
              <p>Solid understanding of <strong>Data Structures & Algorithms</strong>. I write optimized code and enjoy solving problems.</p>
            </div>
          </div>

          <div className="bento-card ai-card card-3d">
            <div className="card-glow"></div>
            <div className="card-content">
              <h3>Data & AI Integration</h3>
              <p>I explore <strong>Data Analysis</strong> and integrate AI-driven features into my projects to make them smarter and more impactful.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Education Section */}
      <section id="experience" className="experience-section reveal">
        <h2 className="section-title">
          EXPERIENCE & <span className="gradient-text">EDUCATION</span>
        </h2>

        <div className="experience-grid">
          {/* Work Experience Column */}
          <div className="experience-column">
            <h3 className="column-title">
              <Icons.Briefcase /> Work Experience
            </h3>
            
            <div className="experience-card card-3d">
              <div className="card-glow"></div>
              <div className="card-content">
                <div className="card-header-row">
                  <span className="time-badge">
                    <Icons.Calendar /> 2026 — Present
                  </span>
                </div>
                <h4 className="job-title">Product Development Apprentice</h4>
                <div className="org-name">Gennovate Foundation Club • Hyderabad, India</div>
                <ul className="bullet-list">
                  <li>Contributed to product ideation and development cycles as part of a student-led innovation club focused on real-world problem-solving.</li>
                  <li>Collaborated with cross-functional peers to prototype solutions, gather user feedback, and iterate on product design.</li>
                  <li>Applied full-stack development skills to build and demo internal tools supporting club operations and events.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education Column */}
          <div className="experience-column">
            <h3 className="column-title">
              <Icons.GraduationCap /> Education
            </h3>

            <div className="experience-card card-3d">
              <div className="card-glow"></div>
              <div className="card-content">
                <div className="card-header-row">
                  <span className="time-badge">
                    <Icons.Calendar /> 2023 — 2027
                  </span>
                  <span className="merit-badge">CGPA: 8.2 / 10.0</span>
                </div>
                <h4 className="job-title">B.Tech in Computer Science AI & ML</h4>
                <div className="org-name">Geethanjali College of Engineering and Technology</div>
                
                <div className="coursework-section">
                  <h5>Key Coursework:</h5>
                  <div className="coursework-chips">
                    {[
                      "Data Structures", "Algorithms Analysis", "Database Management", 
                      "Artificial Intelligence", "Machine Learning", "Internet Technology", 
                      "Software Methodology", "Computer Architecture"
                    ].map((course, idx) => (
                      <span key={idx} className="course-chip">{course}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="experience-card card-3d">
              <div className="card-glow"></div>
              <div className="card-content">
                <div className="card-header-row">
                  <span className="time-badge">
                    <Icons.Calendar /> 2021 — 2023
                  </span>
                  <span className="merit-badge">Score: 96.6%</span>
                </div>
                <h4 className="job-title">Intermediate Education (MPC)</h4>
                <div className="org-name">Narayana Junior College • Hyderabad, India</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey / Projects Section */}
      <section id="projects" className="journey-section reveal">
        <div className="spline-robot-container">
          <InteractiveRobotSpline 
            scene="https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode" 
          />
        </div>
        <h2 className="section-title">
          MY <span className="gradient-text">JOURNEY</span>
        </h2>
        
        <div className="timeline-container" id="journey">
          <div className="timeline-svg-wrapper">
            <svg className="animated-line" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path 
                d="M 50 0 L 50 100" 
                stroke="var(--accent-purple)" 
                strokeWidth="4" 
                strokeOpacity="0.15"
                fill="none" 
                vectorEffect="non-scaling-stroke" 
              />
              <path 
                d="M 50 0 L 50 100" 
                stroke="var(--accent-purple)" 
                strokeWidth="4" 
                fill="none" 
                vectorEffect="non-scaling-stroke"
                className="scroll-path"
                pathLength="100"
              />
            </svg>
          </div>

          {[
            {
              title: "Personal Portfolio Website",
              stack: "React, MongoDB, JavaScript, HTML, Bootstrap",
              desc: "Developed a personal portfolio website showcasing projects like FoodMart, ATM, and MyStore. Built a responsive UI using React and Bootstrap with full-stack integration using MongoDB, focusing on user-centric design and smooth navigation.",
              link: "https://rajyalaxmi29-github-io.vercel.app/p4",
              icons: ["/java.jpg", "/db.jpg", "/other.jpg"]
            },
            {
              title: "Startup & Social Innovation Platform",
              stack: "React, Node.js, Express, MongoDB, AI",
              desc: "Built a full-stack platform to support startups and social innovation initiatives with a user-friendly interface. Implemented scalable backend features and structured UI/UX for managing ideas, users, and workflows. Integrated AI-based insights and recommendation features to enhance decision-making.",
              link: "https://startupsim-new.vercel.app/",
              icons: ["/node.jpg", "/python.jpg", "/supabase.jpg"]
            },
            {
              title: "ProTask AI",
              stack: "React, TypeScript, Supabase, PostgreSQL, Vercel",
              desc: "Developed a full-stack task management application with secure authentication and database integration using Supabase. Implemented user-specific CRUD operations with Row Level Security (RLS) and deployed on Vercel.",
              link: "https://protask-ai.vercel.app/login",
              icons: ["/node.jpg", "/other.jpg", "/python.jpg"]
            }
          ].map((project, index) => (
            <div 
              key={index} 
              className={`timeline-item ${index % 2 !== 0 ? 'reverse' : ''} ${activeNode >= index + 1 ? 'active' : ''}`}
            >
              <div className={`timeline-node ${activeNode >= index + 1 ? 'node-active' : ''}`}></div>
              <div className="timeline-content card-3d">
                <div className="card-glow"></div>
                
                {/* Surrounding Icons */}
                <div className="surrounding-icons">
                  {project.icons?.map((icon, i) => (
                    <div key={i} className={`s-icon s-icon-${i}`}>
                      <img src={icon} alt="tech icon" />
                    </div>
                  ))}
                </div>

                <div className="content-inner">
                  <h3>{project.title}</h3>
                  <div className="tech-stack-label">{project.stack}</div>
                  <p>{project.desc}</p>
                  
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link-btn">
                    <div className="btn-avatar animate-float-fast">
                      <img src={avatarImg} alt="3D Avatar" className="mini-avatar" />
                    </div>
                    <span className="btn-text">View Live App</span>
                    <Icons.ExternalLink />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Graphic Design Section */}
      <section id="designs" className="design-section reveal">
        <h2 className="section-title" style={{ marginBottom: "0px" }}>
          GRAPHIC <span className="gradient-text">DESIGNS</span>
        </h2>
        
        <GradientCards />
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section reveal">
        <h2 className="section-title">
          GET IN <span className="gradient-text">TOUCH</span>
        </h2>
        <div className="contact-container card-3d animate-3d-float">
          <div className="card-glow"></div>
          <div className="contact-content content-inner">
            <h3 className="contact-heading">Let's Build Something Together</h3>
            <p className="contact-desc">
              I'm always open to new opportunities, collaborations, and exciting projects. 
              Feel free to reach out to me through any of the platforms below!
            </p>
            
            <div className="contact-links">
              <a href="https://www.linkedin.com/in/rajyalaxmi-k-794b74327/" target="_blank" rel="noopener noreferrer" className="contact-btn linkedin-btn">
                <Icons.LinkedIn />
                <span>LinkedIn</span>
              </a>
              <a href="https://github.com/Rajyalaxmi29" target="_blank" rel="noopener noreferrer" className="contact-btn github-btn">
                <Icons.GitHub />
                <span>GitHub</span>
              </a>
              <a href="mailto:rajyalaxmikunchala06@gmail.com" className="contact-btn mail-btn">
                <Icons.Mail />
                <span>Email Me</span>
              </a>
            </div>
            
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email" required />
              </div>
              <textarea placeholder="Your Message" rows="4" required></textarea>
              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Rajyalaxmi. All rights reserved.</p>
        <p className="footer-sub">Designed and built with ❤️</p>
      </footer>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        
        @keyframes pulse {
          0% { transform: scaleY(1); opacity: 0.5; }
          50% { transform: scaleY(0.5); opacity: 1; }
          100% { transform: scaleY(1); opacity: 0.5; }
        }
        .pulse { animation: pulse 2s infinite; transform-origin: top; }
      `}</style>
    </div>
  );
};

export default App;
