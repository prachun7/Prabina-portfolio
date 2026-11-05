import React, { useState, useEffect, useRef } from 'react';

// Lightweight, zero-dependency SVG Icons
const Icons = {
  Building: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5m-4 0h4"/>
    </svg>
  ),
  Camera: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
    </svg>
  ),
  FileText: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
  Printer: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>
    </svg>
  )
};

export const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [customPhoto, setCustomPhoto] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [workshopFilter, setWorkshopFilter] = useState('all');
  const [activeSection, setActiveSection] = useState('hero');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Restore cached portrait from local storage
  useEffect(() => {
    const saved = localStorage.getItem('prabina_shrestha_photo');
    if (saved) setCustomPhoto(saved);
  }, []);

  // Track active section for sticky navbar highlight
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'experience', 'education', 'publications', 'presentations', 'workshops', 'involvement', 'contact'];
      const scrollPos = window.scrollY + 120;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          if (scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const base64 = ev.target?.result as string;
        setCustomPhoto(base64);
        try {
          localStorage.setItem('prabina_shrestha_photo', base64);
        } catch {
          // Ignore quota limits
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const workshops = [
    { name: "Training on Good Governance for Community Campuses", org: "University Grants Commission (UGC) Nepal", date: "22–24 May 2026", cat: "ugc" },
    { name: "Three-Day Workshop on Article Writing", org: "RMC, Balkumari College (Supported by UGC Nepal)", date: "15–17 Jestha 2083", cat: "ugc research" },
    { name: "Teachers' Professional Development Training Program (TPDTP), 2nd Cohort", org: "University Grants Commission (UGC) Nepal", date: "14–20 Chaitra 2082", cat: "ugc pedagogy" },
    { name: "Five-Day Workshop on Data Analysis Using MS-Excel", org: "RMC, Balkumari College (Supported by UGC Nepal)", date: "10–15 May 2025", cat: "ugc research" },
    { name: "Digital Pedagogy Training", org: "Balkumari College (Supported by UGC Nepal)", date: "2082 B.S.", cat: "ugc pedagogy" },
    { name: "Two-Day Workshop on Designing Seminar Paper, Article Writing, Publication and Pedagogical Approaches", org: "Faculty Development Council", date: "2023", cat: "research pedagogy" },
    { name: "National Conference on Nepalese Higher Education: Education and Learning Through Social Innovation", org: "Higher Education Forum Nepal", date: "2023", cat: "pedagogy" },
    { name: "Three-Day Faculty Development Program", org: "Purbanchal University", date: "2023", cat: "pedagogy" },
    { name: "Workshop on Developing Research Career and Publication", org: "Academic Research Center", date: "2023", cat: "research" },
    { name: "Workshop on Application of Excel in Analyzing and Visualizing Data (AEAVD-2018)", org: "Data Analytics Cell", date: "2018", cat: "research" },
    { name: "Workshop on Research Methodology and Thesis/Report Writing", org: "Tribhuvan University Affiliated Research Wing", date: "2073 B.S.", cat: "research" },
    { name: "Seven-Day Teacher Training/Orientation Program", org: "Curriculum and Training Division, Higher Secondary Education Board (HSEB)", date: "2068 B.S.", cat: "pedagogy" },
    { name: "Nepal International Infrastructure Finance Conference (NIIFC)", org: "NIIFC Nepal", date: "2010", cat: "research" },
    { name: "Training and Workshop in Research Methodology", org: "Research Committee", date: "2009", cat: "research" },
    { name: "Reducing HIV Stigma in Health Care Settings", org: "Nepal Medical Association (NMA)", date: "2063 B.S.", cat: "health" },
    { name: "Training Preparation on Health Logistics", org: "Nepal Family Health Program and CTEVT", date: "2005", cat: "health" }
  ];

  const filteredWorkshops = workshops.filter(w => workshopFilter === 'all' || w.cat.includes(workshopFilter));

  return (
    <div>
      {/* Hidden Photo Uploader */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handlePhotoUpload}
        accept="image/*"
        style={{ display: 'none' }}
      />

      {/* Institutional Bar */}
      <aside aria-label="Institutional Information" className="top-bar">
        <div className="container top-bar-inner">
          <div className="top-bar-left">
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Icons.Building /> Balkumari Campus, Narayangarh, Chitwan, Nepal
            </span>
            <span>•</span>
            <span>Faculty of Management Studies</span>
          </div>
          <div className="top-bar-right">
            <a href="mailto:prabinashrestha031@gmail.com">prabinashrestha031@gmail.com</a>
            <span>•</span>
            <span>+977 9845050478</span>
          </div>
        </div>
      </aside>

      {/* Sticky Navigation */}
      <nav className="site-header">
        <div className="container nav-container">
          <a href="#hero" className="brand-link">
            <span className="brand-name">Prabina Shrestha</span>
            <span className="brand-title">Vice Principal & Lecturer</span>
          </a>

          <ul className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`} id="navMenu">
            {[
              { id: 'about', label: 'About' },
              { id: 'experience', label: 'Experience' },
              { id: 'education', label: 'Education' },
              { id: 'publications', label: 'Publications' },
              { id: 'presentations', label: 'Presentations' },
              { id: 'workshops', label: 'Workshops' },
              { id: 'involvement', label: 'Involvement' },
              { id: 'contact', label: 'Contact' },
            ].map(item => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(item.id);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button className="btn-cv-header" onClick={() => setCvModalOpen(true)}>
              <Icons.FileText /> Academic CV
            </button>
            <button
              className="mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="container hero-grid">
          <div className="hero-content">
            <div>
              <span className="badge badge-gold">Tribhuvan University Affiliated Faculty</span>
            </div>
            <div>
              <h1 className="hero-heading">Prabina Shrestha</h1>
              <p className="hero-role">Lecturer | Academic Leader | Researcher</p>
              <p className="hero-campus">📍 Balkumari Campus, Narayangarh, Chitwan, Nepal</p>
            </div>
            <p className="hero-intro">
              An experienced academic professional with extensive experience in management education, institutional leadership, research, academic administration, and community engagement.
            </p>

            <div className="hero-stats">
              <div>
                <div className="stat-number">28+</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div>
                <div className="stat-number">3.89</div>
                <div className="stat-label">M.Phil. TU CGPA</div>
              </div>
              <div>
                <div className="stat-number">06</div>
                <div className="stat-label">Publications</div>
              </div>
            </div>

            <div className="hero-actions">
              <button onClick={() => scrollTo('about')} className="btn-primary">
                Explore My Profile →
              </button>
              <button onClick={() => setCvModalOpen(true)} className="btn-secondary">
                Download Academic CV
              </button>
            </div>
          </div>

          {/* Portrait Frame */}
          <div className="portrait-wrapper">
            <div className="portrait-card">
              <div className="portrait-frame">
                {customPhoto ? (
                  <>
                    <img src={customPhoto} alt="Prabina Shrestha portrait" className="portrait-img" />
                    <button
                      className="upload-trigger"
                      onClick={() => fileInputRef.current?.click()}
                      style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(10,22,40,0.85)', color: '#fff', border: 'none' }}
                    >
                      <Icons.Camera /> Update Photo
                    </button>
                  </>
                ) : (
                  <>
                    <div className="portrait-monogram">PS</div>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--navy-950)' }}>
                      Prabina Shrestha
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--ink-500)', marginTop: '0.25rem' }}>
                      Vice Principal & Lecturer in Management
                    </p>
                    <p style={{ fontSize: '0.72rem', color: 'var(--gold-600)', fontWeight: 600 }}>
                      Balkumari Campus • Chitwan
                    </p>
                    <button className="upload-trigger" onClick={() => fileInputRef.current?.click()}>
                      <Icons.Camera /> Upload Faculty Photo
                    </button>
                  </>
                )}
              </div>
              <div className="portrait-info">
                <span style={{ fontWeight: 600, color: 'var(--navy-950)' }}>Balkumari Campus</span>
                <span className="badge badge-gold">Active Faculty</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-about">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Academic Profile</span>
            <h2 className="section-title">About Me</h2>
            <div className="section-rule"></div>
            <p className="section-desc">A trajectory uniting pharmaceutical precision, strategic business leadership, and empirical management research.</p>
          </div>

          <div className="about-grid">
            <div className="about-narrative">
              <p>
                Prabina Shrestha is an accomplished educator, academic administrator, and researcher currently serving as the <strong>Vice Principal</strong> and permanent <strong>Lecturer in Management</strong> at Balkumari College / Balkumari Campus, Narayangarh, Chitwan.
              </p>
              <p>
                Her academic journey commenced in the health sciences with a <strong>Proficiency Certificate Level (PCL) in Pharmacy</strong> from the Institute of Medicine (IOM), Maharajgunj, Tribhuvan University (1993–1994), graduating with First Division honors (71.60%). Bridging health logistics with commercial enterprise, she completed her <strong>Bachelor of Business Administration (BBA)</strong> and <strong>Master of Business Administration (MBA)</strong> from Tribhuvan University, Kirtipur.
              </p>
              <div className="quote-block">
                <p className="quote-text">
                  "Higher education in community campuses is founded upon institutional integrity, pedagogical excellence, and an enduring commitment to student empowerment."
                </p>
              </div>
              <p>
                Further cementing her scholarly commitments, she completed her <strong>Master of Philosophy (M.Phil.) in Management</strong> from Tribhuvan University (2024–2026), achieving an outstanding cumulative <strong>CGPA of 3.89</strong>. Her empirical investigations center on corporate culture, organizational performance, capital structures, and women's entrepreneurship in Chitwan.
              </p>
              <p>
                With over twenty-four years of continuous service at Balkumari College, she has steered academic coordination, examination administration, curriculum alignment, and comprehensive campus quality assurance.
              </p>
            </div>

            <aside className="profile-card">
              <h3 className="profile-card-title">Personal Particulars</h3>
              <div className="profile-item">
                <span className="profile-key">Full Name</span>
                <span className="profile-val">Prabina Shrestha</span>
              </div>
              <div className="profile-item">
                <span className="profile-key">Date of Birth</span>
                <span className="profile-val">2031/06/28 B.S.</span>
              </div>
              <div className="profile-item">
                <span className="profile-key">Nationality</span>
                <span className="profile-val">Nepali</span>
              </div>
              <div className="profile-item">
                <span className="profile-key">Permanent Address</span>
                <span className="profile-val">Narayangarh, Chitwan, Nepal</span>
              </div>
              <div className="profile-item">
                <span className="profile-key">Current Institution</span>
                <span className="profile-val">Balkumari Campus</span>
              </div>
              <div className="profile-item">
                <span className="profile-key">Executive Office</span>
                <span className="profile-val">Vice Principal</span>
              </div>
              <div className="profile-item">
                <span className="profile-key">Department</span>
                <span className="profile-val">Faculty of Management</span>
              </div>
              <div style={{ marginTop: '1.5rem' }}>
                <button
                  onClick={() => scrollTo('contact')}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem' }}
                >
                  Initiate Contact
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Professional Experience */}
      <section id="experience" className="section-experience">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Career Trajectory</span>
            <h2 className="section-title">Professional Experience</h2>
            <div className="section-rule"></div>
            <p className="section-desc">A chronological record of administrative leadership, university lectureships, and healthcare instruction.</p>
          </div>

          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-card">
                <span className="timeline-period">2024 – Present</span>
                <h3 className="timeline-role">Vice Principal</h3>
                <p className="timeline-inst">Balkumari College, Narayangarh</p>
                <ul className="timeline-desc">
                  <li>Executive institutional administration, policy execution, and academic leadership.</li>
                  <li>Supervision of academic quality enhancement, faculty development, and UGC coordination.</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-card">
                <span className="timeline-period">2023 – Present</span>
                <h3 className="timeline-role">Teaching Management Subjects</h3>
                <p className="timeline-inst">Balkumari Campus</p>
                <ul className="timeline-desc">
                  <li>Delivering graduate and undergraduate lectures in organizational behavior and management.</li>
                  <li>Guiding student research theses, seminar paper presentations, and field surveys.</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-card">
                <span className="timeline-period">2000 – 2024</span>
                <h3 className="timeline-role">Assistant Lecturer / Lecturer / Program Coordinator</h3>
                <p className="timeline-inst">Balkumari College</p>
                <ul className="timeline-desc">
                  <li>Assistant Lecturer in Management (Part-Time).</li>
                  <li>Lecturer in Management (Permanent merit appointment).</li>
                  <li>Program Coordinator (Management, Day Shift) managing academic timetables, examinations, and student welfare.</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-card">
                <span className="timeline-period">1996 – 1999</span>
                <h3 className="timeline-role">Instructor</h3>
                <p className="timeline-inst">Balkumari Nursing College</p>
                <ul className="timeline-desc">
                  <li>Instruction in Pharmacy and Human Anatomy.</li>
                  <li>Coordination and supervision of student Community Survey Project Work.</li>
                  <li>Evaluation of community health survey presentations.</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-card">
                <span className="timeline-period">1995 – 1996</span>
                <h3 className="timeline-role">Pharmacy Assistant</h3>
                <p className="timeline-inst">Simca Laboratories Pvt. Ltd.</p>
                <ul className="timeline-desc">
                  <li>Pharmaceutical inventory maintenance, laboratory operations, and healthcare dispensing.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Qualifications */}
      <section id="education" className="section-education">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Academic Credentials</span>
            <h2 className="section-title">Academic Qualifications</h2>
            <div className="section-rule"></div>
            <p className="section-desc">Distinguished university degrees from Tribhuvan University, Institute of Medicine, and foundational schooling.</p>
          </div>

          <div className="edu-grid">
            <div className="edu-card-highlight">
              <div>
                <span className="badge badge-gold">Highest Academic Credential</span>
                <h3>Master of Philosophy (M.Phil.) in Management</h3>
                <p style={{ color: 'var(--gold-300)', fontWeight: 500, margin: '0.5rem 0' }}>
                  Tribhuvan University, Kirtipur, Kathmandu
                </p>
                <p style={{ fontSize: '0.95rem', color: '#D1CDBC', maxWidth: '600px', lineHeight: 1.6 }}>
                  Advanced post-master's scholarly research program focusing on corporate culture, capital structure, and higher education governance.
                </p>
              </div>
              <div className="edu-highlight-score">
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--gold-300)', fontWeight: 700, letterSpacing: '0.1em', display: 'block', marginBottom: '0.35rem' }}>
                  Academic Score
                </span>
                <span className="score-val">3.89</span>
                <span style={{ fontSize: '0.75rem', color: '#A0B3D1', display: 'block', marginTop: '0.35rem' }}>
                  CGPA • 2024–2026
                </span>
              </div>
            </div>

            <div className="edu-card">
              <div>
                <span className="edu-year">1998 – 1999</span>
                <h4 className="edu-degree">Master's Degree in Business Administration (MBA)</h4>
                <p className="edu-institution">Tribhuvan University, Kirtipur</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--ink-500)' }}>
                  Postgraduate studies in corporate finance, strategic human resource management, and organizational behavior.
                </p>
              </div>
              <div className="edu-footer">
                <span style={{ color: 'var(--ink-500)' }}>Division / Mark</span>
                <span className="edu-score-pill">59.68%</span>
              </div>
            </div>

            <div className="edu-card">
              <div>
                <span className="edu-year">1995 – 1997</span>
                <h4 className="edu-degree">Bachelor's Degree in Business Administration (BBA)</h4>
                <p className="edu-institution">Tribhuvan University, Kirtipur</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--ink-500)' }}>
                  Undergraduate foundations in managerial economics, corporate accounting, and business statistics.
                </p>
              </div>
              <div className="edu-footer">
                <span style={{ color: 'var(--ink-500)' }}>Division / Mark</span>
                <span className="edu-score-pill">46.50%</span>
              </div>
            </div>

            <div className="edu-card">
              <div>
                <span className="edu-year">1993 – 1994</span>
                <h4 className="edu-degree">Proficiency Certificate Level in Pharmacy</h4>
                <p className="edu-institution">Institute of Medicine (IOM), Maharajgunj, TU</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--ink-500)' }}>
                  Specialized healthcare education covering pharmacology, medicinal chemistry, clinical dispensing, and anatomy.
                </p>
              </div>
              <div className="edu-footer">
                <span style={{ color: 'var(--gold-600)', fontWeight: 600 }}>First Division</span>
                <span className="edu-score-pill">71.60%</span>
              </div>
            </div>

            <div className="edu-card">
              <div>
                <span className="edu-year">1990</span>
                <h4 className="edu-degree">School Leaving Certificate (SLC)</h4>
                <p className="edu-institution">Balkumari Secondary School</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--ink-500)' }}>
                  Foundational secondary education successfully completed with first division academic merit.
                </p>
              </div>
              <div className="edu-footer">
                <span style={{ color: 'var(--gold-600)', fontWeight: 600 }}>Distinction / 1st Div</span>
                <span className="edu-score-pill">74.14%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Publications */}
      <section id="publications" className="section-publications">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Scholarly Output</span>
            <h2 className="section-title">Research & Publications</h2>
            <div className="section-rule"></div>
            <p className="section-desc">Authored publications spanning peer-reviewed journals, institutional proceedings, and community scholarship.</p>
          </div>

          <div className="pub-grid">
            <article className="pub-card">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span className="badge badge-gold">Peer Reviewed</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--ink-500)' }}>January 2024</span>
                </div>
                <h3 className="pub-title">"Corporate Culture and Organisational Performance: A Review of Literature"</h3>
                <p className="pub-source">Nepalese Journal of Management Research, Peer Reviewed Journal</p>
                <p className="pub-details">Vol. 4, Nepal Journals Online (NepJOL)</p>
              </div>
              <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--paper-warm)', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--ink-500)' }}>
                <span style={{ fontWeight: 600, color: 'var(--navy-950)' }}>Prabina Shrestha</span>
                <span>Research Article</span>
              </div>
            </article>

            <article className="pub-card">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span className="badge badge-outline">Conference Proceeding</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--ink-500)' }}>2010</span>
                </div>
                <h3 className="pub-title">"Public Participation in Infrastructure Development of Community Colleges in Nepal with Special Reference to Infrastructure Development of Balkumari College"</h3>
                <p className="pub-source">Nepal International Infrastructure Finance Conference (NIIFC)</p>
                <p className="pub-details">NIIFC Proceedings, Nepal</p>
              </div>
              <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--paper-warm)', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--ink-500)' }}>
                <span style={{ fontWeight: 600, color: 'var(--navy-950)' }}>Prabina Shrestha</span>
                <span>Conference Paper</span>
              </div>
            </article>

            <article className="pub-card">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span className="badge badge-outline">Journal Article</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--ink-500)' }}>2066 B.S.</span>
                </div>
                <h3 className="pub-title">"Research: What and How?"</h3>
                <p className="pub-source">Journal of Balkumari College</p>
                <p className="pub-details">Vol. 1, Balkumari College Research Committee</p>
              </div>
              <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--paper-warm)', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--ink-500)' }}>
                <span style={{ fontWeight: 600, color: 'var(--navy-950)' }}>Prabina Shrestha</span>
                <span>Methodological Paper</span>
              </div>
            </article>

            <article className="pub-card">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span className="badge badge-outline">Institutional</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--ink-500)' }}>2082 B.S.</span>
                </div>
                <h3 className="pub-title">"Balkumari College: Advancing Toward Excellence in Quality Education"</h3>
                <p className="pub-source">Balkumari Souvenir</p>
                <p className="pub-details">Balkumari College Commemorative Publication</p>
              </div>
              <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--paper-warm)', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--ink-500)' }}>
                <span style={{ fontWeight: 600, color: 'var(--navy-950)' }}>Prabina Shrestha</span>
                <span>Institutional Essay</span>
              </div>
            </article>

            <article className="pub-card">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span className="badge badge-outline">Rotary Publication</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--ink-500)' }}>2025/26</span>
                </div>
                <h3 className="pub-title">"Aligning Corporate Values with Rotary Club Performance"</h3>
                <p className="pub-source">Pinnacle Rotary Souvenir</p>
                <p className="pub-details">Rotary Community Publication Wing</p>
              </div>
              <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--paper-warm)', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--ink-500)' }}>
                <span style={{ fontWeight: 600, color: 'var(--navy-950)' }}>Prabina Shrestha</span>
                <span>Souvenir Contribution</span>
              </div>
            </article>

            <article className="pub-card">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span className="badge badge-outline">Rotary Publication</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--ink-500)' }}>2026/27</span>
                </div>
                <h3 className="pub-title">"Rotarian as a Social Entrepreneur: Transforming Communities Through Service and Innovation"</h3>
                <p className="pub-source">Pinnacle Rotary Souvenir</p>
                <p className="pub-details">Annual Rotary Publication</p>
              </div>
              <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--paper-warm)', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--ink-500)' }}>
                <span style={{ fontWeight: 600, color: 'var(--navy-950)' }}>Prabina Shrestha</span>
                <span>Social Entrepreneurship</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Presentations */}
      <section id="presentations" className="section-presentations">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Academic Conferences</span>
            <h2 className="section-title">Research Paper Presentations</h2>
            <div className="section-rule"></div>
            <p className="section-desc">Key research papers delivered before national and international academic congresses.</p>
          </div>

          <div className="presentation-list">
            <div className="presentation-item">
              <div>
                <span className="badge badge-navy">National Conference</span>
                <h3 className="pres-title">"Impact of Micro-Economic Variable on Corporate Capital Structure in Listed Manufacturing Companies in Nepal"</h3>
                <p className="pres-conf">National Conference on Reforming Higher Education in Time of Crisis: Strategies for Retention, Quality and Societal Impact</p>
                <p className="pres-organizer">Organized by Madhyabindu Multiple Campus, Kawasoti, Nawalpur</p>
              </div>
              <div className="pres-year-box">
                <span className="pres-year">2025</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--ink-500)', display: 'block' }}>Delivered</span>
              </div>
            </div>

            <div className="presentation-item">
              <div>
                <span className="badge badge-gold">International Conference</span>
                <h3 className="pres-title">"Socio-Cultural Influence on Women's Entrepreneurship in Chitwan District, Nepal"</h3>
                <p className="pres-conf">International Conference 2024 on Inclusive and Sustainable Development through Transformation, Innovation and Digitalization</p>
                <p className="pres-organizer">International Academic Forum</p>
              </div>
              <div className="pres-year-box">
                <span className="pres-year">2024</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--ink-500)', display: 'block' }}>Delivered</span>
              </div>
            </div>

            <div className="presentation-item">
              <div>
                <span className="badge badge-gold">International Conference</span>
                <h3 className="pres-title">"Public Participation in Infrastructure Development of Community Colleges in Nepal with Special Reference to Infrastructure Development of Balkumari College"</h3>
                <p className="pres-conf">Nepal International Infrastructure Finance Conference (NIIFC)</p>
                <p className="pres-organizer">NIIFC Nepal</p>
              </div>
              <div className="pres-year-box">
                <span className="pres-year">2010</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--ink-500)', display: 'block' }}>Delivered</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workshops & Training */}
      <section id="workshops" className="section-workshops">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Faculty Empowerment</span>
            <h2 className="section-title">Workshops, Training & Development</h2>
            <div className="section-rule"></div>
            <p className="section-desc">Sixteen certified professional workshops supported by UGC Nepal, universities, and training divisions.</p>
          </div>

          <div className="workshop-filters">
            {[
              { id: 'all', label: 'All Programs (16)' },
              { id: 'ugc', label: 'UGC Nepal Supported' },
              { id: 'research', label: 'Research & Data Analysis' },
              { id: 'pedagogy', label: 'Pedagogy & Teaching' },
              { id: 'health', label: 'Healthcare & Logistics' }
            ].map(tab => (
              <button
                key={tab.id}
                className={`filter-btn ${workshopFilter === tab.id ? 'active' : ''}`}
                onClick={() => setWorkshopFilter(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="workshop-table-card">
            {filteredWorkshops.map((w, idx) => (
              <div key={idx} className="workshop-item">
                <div>
                  <h4 className="ws-name">{w.name}</h4>
                  <p className="ws-org">{w.org}</p>
                </div>
                <span className="ws-date">{w.date}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Involvement */}
      <section id="involvement" className="section-involvement">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Civic Leadership</span>
            <h2 className="section-title">Social & Professional Involvement</h2>
            <div className="section-rule"></div>
            <p className="section-desc">Active governance, service clubs, cultural preservation, and cooperative administration in Chitwan.</p>
          </div>

          <div className="involvement-grid">
            <div className="involvement-card">
              <span className="badge badge-gold">Cultural Heritage</span>
              <h3 className="inv-role">Executive Member</h3>
              <p className="inv-org">Narayani Kala Mandir</p>
              <p className="inv-desc">Promoting regional music, arts, literature, and indigenous cultural festivals in Chitwan valley.</p>
            </div>

            <div className="involvement-card">
              <span className="badge badge-navy">Humanitarian Service</span>
              <h3 className="inv-role">Past President</h3>
              <p className="inv-org">Lions Club of Balkumari College</p>
              <p className="inv-desc">Spearheaded philanthropic student drives, educational scholarships, and local community health initiatives.</p>
            </div>

            <div className="involvement-card">
              <span className="badge badge-gold">Community Welfare</span>
              <h3 className="inv-role">Executive Member</h3>
              <p className="inv-org">Spouse Club of Rotary Club of Narayangarh</p>
              <p className="inv-desc">Active participation in maternal health awareness, youth literacy, and service above self.</p>
            </div>

            <div className="involvement-card">
              <span className="badge badge-outline">Commerce & Trade</span>
              <h3 className="inv-role">Member</h3>
              <p className="inv-org">Chitwan Chamber of Commerce and Industry (CCCI)</p>
              <p className="inv-desc">Engaged in regional enterprise development, entrepreneurship empowerment, and trade networks.</p>
            </div>

            <div className="involvement-card">
              <span className="badge badge-gold">Social Preservation</span>
              <h3 className="inv-role">Secretary</h3>
              <p className="inv-org">Narayangarh Newa Puch</p>
              <p className="inv-desc">Secretarial governance, cultural preservation, and social mobilization for the Newar community.</p>
            </div>

            <div className="involvement-card">
              <span className="badge badge-outline">Financial Governance</span>
              <h3 className="inv-role">Secretary</h3>
              <p className="inv-org">Abhiyan Cooperative Society</p>
              <p className="inv-desc">Overseeing secretarial administration, regulatory compliance, and community micro-finance access.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-contact">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Academic Dialogue</span>
            <h2 className="section-title">Contact Information</h2>
            <div className="section-rule"></div>
            <p className="section-desc">Connect for research collaborations, institutional inquiries, or student mentorship.</p>
          </div>

          <div className="contact-grid">
            <div className="contact-info-panel">
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--navy-950)', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
                Faculty Office
              </h3>

              <div className="contact-box">
                <div className="contact-label">Electronic Mail</div>
                <div className="contact-value">
                  <a href="mailto:prabinashrestha031@gmail.com">prabinashrestha031@gmail.com</a>
                  <button className="copy-btn" onClick={() => handleCopyEmail('prabinashrestha031@gmail.com')}>
                    {copiedEmail ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              <div className="contact-box">
                <div className="contact-label">Telephone Contacts</div>
                <div className="contact-value">
                  <a href="tel:9845050478">+977 9845050478</a>
                  <span className="badge badge-outline" style={{ fontSize: '0.65rem' }}>Primary</span>
                </div>
                <div className="contact-value" style={{ marginTop: '0.5rem' }}>
                  <a href="tel:9855093125">+977 9855093125</a>
                  <span className="badge badge-outline" style={{ fontSize: '0.65rem' }}>Alternative</span>
                </div>
              </div>

              <div className="contact-box">
                <div className="contact-label">Campus Location</div>
                <p style={{ fontSize: '0.9rem', color: 'var(--ink-700)', lineHeight: 1.5, marginTop: '0.25rem' }}>
                  <strong>Balkumari Campus</strong><br />
                  Office of the Vice Principal<br />
                  Narayangarh, Chitwan District, Nepal
                </p>
              </div>
            </div>

            <div className="contact-form-panel">
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--navy-950)', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
                Transmit Message
              </h3>

              <form onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you! Your academic message has been recorded.');
                (e.target as HTMLFormElement).reset();
              }}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="senderName">Your Full Name *</label>
                    <input className="form-input" type="text" id="senderName" required placeholder="Prof. / Dr. / Scholar Name" />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="senderEmail">Email Address *</label>
                    <input className="form-input" type="email" id="senderEmail" required placeholder="colleague@institution.edu.np" />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="senderSubject">Subject *</label>
                  <input className="form-input" type="text" id="senderSubject" required placeholder="Research inquiry / Institutional academic collaboration" />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="senderMessage">Message Particulars *</label>
                  <textarea className="form-textarea" id="senderMessage" rows={4} required placeholder="Write your academic correspondence here..."></textarea>
                </div>

                <button type="submit" className="btn-submit" id="submitBtn">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <h4 className="footer-title">Prabina Shrestha</h4>
              <p style={{ color: 'var(--gold-300)', fontSize: '0.78rem', textTransform: 'uppercase', marginBottom: '1rem' }}>
                Lecturer & Vice Principal | Balkumari Campus
              </p>
              <p style={{ maxWidth: '420px', fontSize: '0.82rem', lineHeight: 1.6, color: '#8FA2BF' }}>
                Authoritative faculty portfolio honoring over 28 years of academic teaching, healthcare instruction, research output, and institutional leadership in Chitwan, Nepal.
              </p>
            </div>

            <div>
              <h5 style={{ color: '#FFFFFF', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '1rem' }}>
                Navigation
              </h5>
              <ul className="footer-links">
                <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>About Biography</a></li>
                <li><a href="#experience" onClick={(e) => { e.preventDefault(); scrollTo('experience'); }}>Career Timeline</a></li>
                <li><a href="#education" onClick={(e) => { e.preventDefault(); scrollTo('education'); }}>Qualifications</a></li>
                <li><a href="#publications" onClick={(e) => { e.preventDefault(); scrollTo('publications'); }}>Research Publications</a></li>
                <li><a href="#presentations" onClick={(e) => { e.preventDefault(); scrollTo('presentations'); }}>Paper Presentations</a></li>
              </ul>
            </div>

            <div>
              <h5 style={{ color: '#FFFFFF', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '1rem' }}>
                Verified Document
              </h5>
              <p style={{ fontSize: '0.78rem', color: '#8FA2BF', marginBottom: '1rem' }}>
                Compliant with official faculty biodata from Balkumari Campus, Narayangarh.
              </p>
              <button onClick={() => setCvModalOpen(true)} className="badge badge-gold" style={{ cursor: 'pointer' }}>
                <Icons.Printer /> Print Verified CV
              </button>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 Prabina Shrestha. All Rights Reserved.</span>
            <span>Balkumari Campus • Narayangarh, Chitwan, Nepal</span>
          </div>
        </div>
      </footer>

      {/* CV Modal with Instant Print Engine */}
      {cvModalOpen && (
        <div className="cv-modal-backdrop open" onClick={(e) => {
          if (e.target === e.currentTarget) setCvModalOpen(false);
        }}>
          <div className="cv-modal-window">
            <div className="cv-modal-header">
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 700 }}>
                Curriculum Vitae — Prabina Shrestha
              </span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="badge badge-gold" onClick={() => window.print()} style={{ cursor: 'pointer', padding: '0.4rem 0.85rem' }}>
                  <Icons.Printer /> Print / Save as PDF
                </button>
                <button onClick={() => setCvModalOpen(false)} style={{ color: '#FFFFFF', fontSize: '1.25rem', padding: '0 0.5rem' }}>
                  ✕
                </button>
              </div>
            </div>

            <div className="cv-modal-body" id="printableCv">
              <div style={{ textAlign: 'center', borderBottom: '2px solid #222', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
                <h1 style={{ fontSize: '2.2rem', textTransform: 'uppercase', color: '#111' }}>Prabina Shrestha</h1>
                <p style={{ fontWeight: 700, fontSize: '1.1rem', color: '#333' }}>Vice Principal & Lecturer in Management</p>
                <p style={{ fontSize: '0.95rem' }}>Balkumari Campus, Narayangarh, Chitwan, Nepal</p>
                <p style={{ fontSize: '0.85rem', color: '#555', marginTop: '0.25rem' }}>
                  Email: prabinashrestha031@gmail.com | Phone: +977-9845050478 / 9855093125
                </p>
              </div>

              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, textTransform: 'uppercase', borderBottom: '1px solid #333', paddingBottom: '0.25rem', marginBottom: '0.75rem' }}>
                I. Personal Details
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                <div><strong>Date of Birth:</strong> 2031/06/28 B.S.</div>
                <div><strong>Nationality:</strong> Nepali</div>
                <div><strong>Permanent Address:</strong> Narayangarh, Chitwan, Nepal</div>
                <div><strong>Current Affiliation:</strong> Balkumari Campus</div>
              </div>

              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, textTransform: 'uppercase', borderBottom: '1px solid #333', paddingBottom: '0.25rem', marginBottom: '0.75rem' }}>
                II. Academic Qualifications
              </h2>
              <div style={{ fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                  <span>Master of Philosophy (M.Phil.) in Management</span>
                  <span>2024–2026 (CGPA: 3.89)</span>
                </div>
                <div style={{ color: '#444', marginBottom: '0.5rem' }}>Tribhuvan University, Kirtipur, Kathmandu, Nepal</div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                  <span>Master's Degree in Business Administration (MBA)</span>
                  <span>1998–1999 (59.68%)</span>
                </div>
                <div style={{ color: '#444', marginBottom: '0.5rem' }}>Tribhuvan University, Kirtipur, Kathmandu, Nepal</div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                  <span>Bachelor's Degree in Business Administration (BBA)</span>
                  <span>1995–1997 (46.50%)</span>
                </div>
                <div style={{ color: '#444', marginBottom: '0.5rem' }}>Tribhuvan University, Kirtipur, Kathmandu, Nepal</div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                  <span>Proficiency Certificate Level in Pharmacy (PCL)</span>
                  <span>1993–1994 (71.60% - 1st Division)</span>
                </div>
                <div style={{ color: '#444', marginBottom: '0.5rem' }}>Institute of Medicine (IOM), Maharajgunj, Tribhuvan University</div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                  <span>School Leaving Certificate (SLC)</span>
                  <span>1990 (74.14% - Distinction/1st Div)</span>
                </div>
                <div style={{ color: '#444' }}>Balkumari Secondary School, Narayangarh</div>
              </div>

              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, textTransform: 'uppercase', borderBottom: '1px solid #333', paddingBottom: '0.25rem', marginBottom: '0.75rem' }}>
                III. Professional Appointments
              </h2>
              <div style={{ fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                  <span>Vice Principal — Balkumari College, Narayangarh</span>
                  <span>2024 – Present</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, marginTop: '0.5rem' }}>
                  <span>Teaching Management Subjects — Balkumari Campus</span>
                  <span>2023 – Present</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, marginTop: '0.5rem' }}>
                  <span>Assistant Lecturer / Lecturer / Coordinator — Balkumari College</span>
                  <span>2000 – 2024</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, marginTop: '0.5rem' }}>
                  <span>Instructor — Balkumari Nursing College</span>
                  <span>1996 – 1999</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, marginTop: '0.5rem' }}>
                  <span>Pharmacy Assistant — Simca Laboratories Pvt. Ltd.</span>
                  <span>1995 – 1996</span>
                </div>
              </div>

              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, textTransform: 'uppercase', borderBottom: '1px solid #333', paddingBottom: '0.25rem', marginBottom: '0.75rem' }}>
                IV. Publications
              </h2>
              <ul style={{ paddingLeft: '1.25rem', fontSize: '0.9rem', lineHeight: 1.6 }}>
                <li>"Corporate Culture and Organisational Performance: A Review of Literature", <em>Nepalese Journal of Management Research</em>, Peer Reviewed Journal, Vol. 4, NepJOL, Jan 2024.</li>
                <li>"Public Participation in Infrastructure Development of Community Colleges in Nepal with Special Reference to Infrastructure Development of Balkumari College", <em>NIIFC</em>, 2010.</li>
                <li>"Research: What and How?", <em>Journal of Balkumari College</em>, Vol. 1, 2066 B.S.</li>
                <li>"Balkumari College: Advancing Toward Excellence in Quality Education", <em>Balkumari Souvenir</em>, 2082 B.S.</li>
                <li>"Aligning Corporate Values with Rotary Club Performance", <em>Pinnacle Rotary Souvenir</em>, 2025/26.</li>
                <li>"Rotarian as a Social Entrepreneur: Transforming Communities Through Service and Innovation", <em>Pinnacle Rotary Souvenir</em>, 2026/27.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;