import { useEffect, useState } from 'react';
import './App.css';

interface BaseInfo {
  name: string;
  title: string;
  about: string;
}

interface Contacts {
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
}

interface PetProject {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

interface WorkExperience {
  role: string;
  company: string;
  period: string;
  description: string;
}

interface Education {
  degree: string;
  institution: string;
  period: string;
}

interface PortfolioConfig {
  base_info: BaseInfo;
  contacts: Contacts;
  soft_skills: string[];
  hard_skills: string[];
  pet_projects: PetProject[];
  work_experience: WorkExperience[];
  education: Education[];
}

function App() {
  const [config, setConfig] = useState<PortfolioConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => {
        setConfig(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching portfolio data:', err);
        setLoading(false);
      });
  }, []);

  const handleDownloadResume = () => {
    window.location.href = '/api/resume/download';
  };

  if (loading || !config) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Hero Section */}
      <section className="hero animate-fade-in">
        <h1>{config.base_info.name}</h1>
        <p>{config.base_info.title}</p>
        
        <div className="contact-links">
          <span>📍 {config.contacts.location}</span>
          <a href={`mailto:${config.contacts.email}`}>✉️ {config.contacts.email}</a>
          <a href={`tel:${config.contacts.phone}`}>📞 {config.contacts.phone}</a>
          {config.contacts.linkedin && <a href={config.contacts.linkedin} target="_blank" rel="noopener noreferrer">💼 LinkedIn</a>}
          {config.contacts.github && <a href={config.contacts.github} target="_blank" rel="noopener noreferrer">💻 GitHub</a>}
        </div>

        <button className="btn-primary delay-100 animate-fade-in" onClick={handleDownloadResume}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Download Resume
        </button>
      </section>

      {/* About Section */}
      <section className="section animate-fade-in delay-200">
        <h2 className="section-title">About Me</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>{config.base_info.about}</p>
      </section>

      {/* Projects Section */}
      <section className="section animate-fade-in delay-300">
        <h2 className="section-title">Pet Projects</h2>
        <div className="grid">
          {config.pet_projects.map((project, idx) => (
            <div className="card" key={idx}>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <div className="badges" style={{ marginBottom: project.link ? '1.5rem' : '0' }}>
                {project.technologies.map((tech, i) => (
                  <span className="badge" key={i}>{tech}</span>
                ))}
              </div>
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600, display: 'inline-block', marginTop: 'auto' }}>
                  View Project &rarr;
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Work Experience Section */}
      <section className="section animate-fade-in">
        <h2 className="section-title">Work Experience</h2>
        <div className="timeline">
          {config.work_experience.map((exp, idx) => (
            <div className="timeline-item" key={idx}>
              <div className="timeline-title">{exp.role}</div>
              <div className="timeline-subtitle">{exp.company}</div>
              <span className="timeline-period">{exp.period}</span>
              <p style={{ color: 'var(--text-secondary)' }}>{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="section animate-fade-in">
        <h2 className="section-title">Skills</h2>
        <div className="grid">
          <div className="card">
            <h3>Hard Skills</h3>
            <div className="badges">
              {config.hard_skills.map((skill, idx) => (
                <span className="badge" key={idx}>{skill}</span>
              ))}
            </div>
          </div>
          <div className="card">
            <h3>Soft Skills</h3>
            <div className="badges">
              {config.soft_skills.map((skill, idx) => (
                <span className="badge" style={{ backgroundColor: '#e6f7fa', color: '#0c7593' }} key={idx}>{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="section animate-fade-in" style={{ marginBottom: '2rem' }}>
        <h2 className="section-title">Education</h2>
        <div className="timeline">
          {config.education.map((edu, idx) => (
            <div className="timeline-item" key={idx}>
              <div className="timeline-title">{edu.degree}</div>
              <div className="timeline-subtitle">{edu.institution}</div>
              <span className="timeline-period">{edu.period}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
