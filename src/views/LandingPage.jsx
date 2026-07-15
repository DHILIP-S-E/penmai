import React, { useState, useEffect } from 'react';
import {
  Calendar, MapPin, Clock, Users, BookOpen, Star, HelpCircle,
  ChevronDown, ChevronUp, Play, Sparkles, Award, Compass,
  UserCheck, ArrowRight, Heart, Cpu, Check, Briefcase,
  Terminal, Settings, Trophy, Shield, Monitor, Menu, X, Mail
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import vrGirlImage from '../assets/VR Girl.png';
import { showToast } from '../components/Toast';

// Import speaker profile images
import speakerJaneDoe from '../assets/speaker_jane_doe.png';
import speakerArunaDevi from '../assets/speaker_aruna_devi.png';
import speakerPriyankaSen from '../assets/speaker_priyanka_sen.png';
import speakerMeeraJasmine from '../assets/speaker_meera_jasmine.png';

// Import mentor profile images
import mentorRanyaK from '../assets/mentor_ranya_k.png';
import mentorKavithaR from '../assets/mentor_kavitha_r.png';
import mentorSubhashiniM from '../assets/mentor_subhashini_m.png';
import mentorSherylV from '../assets/mentor_sheryl_v.png';

// Import theme illustrations
import themeDigitalSkills from '../assets/theme_digital_skills.png';
import themeHealthTech from '../assets/theme_healthtech.png';
import themeEntrepreneurship from '../assets/theme_entrepreneurship.png';
import themeAIInnovation from '../assets/theme_ai_innovation.png';

// Import partner logos
import partnerStartupTN from '../assets/partner_startuptn.png';
import partnerGDGMadurai from '../assets/partner_gdg_madurai.png';
import partnerSaveMom from '../assets/partner_savemom.png';
import partnerVentureNest from '../assets/partner_venture_nest.png';

// Inline icons definition for social links
const Linkedin = ({ size = 18, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Twitter = ({ size = 18, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

// Minimal geometric monogram avatar
const MemberAvatar = ({ name, size = 64 }) => {
  const initials = name.split(' ').map(n => n[0]).join('');
  return (
    <div style={{
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '50%',
      background: 'var(--color-soft-pink)',
      border: '2px solid var(--color-pink)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: `${size * 0.38}px`,
      fontWeight: '800',
      color: 'var(--color-pink)',
      fontFamily: 'Sora, sans-serif'
    }}>
      {initials}
    </div>
  );
};

// SVG illustration of women's silhouettes looking forward
const WomenSilhouetteIllustration = () => (
  <svg viewBox="0 0 400 150" width="100%" height="100%" style={{ overflow: 'visible' }}>
    <g fill="var(--color-text-secondary)" opacity="0.15">
      {/* 5 women silhouettes standing side by side */}
      <path d="M 60,150 C 60,110 80,105 90,110 C 95,100 105,100 110,110 C 120,105 140,110 140,150 Z" />
      <circle cx="100" cy="85" r="14" />

      <path d="M 120,150 C 120,105 140,100 150,105 C 155,95 165,95 170,105 C 180,100 200,105 200,150 Z" />
      <circle cx="160" cy="80" r="14" />

      <path d="M 180,150 C 180,110 200,105 210,110 C 215,100 225,100 230,110 C 240,105 260,110 260,150 Z" />
      <circle cx="220" cy="85" r="14" />

      <path d="M 240,150 C 240,105 260,100 270,105 C 275,95 285,95 290,105 C 300,100 320,105 320,150 Z" />
      <circle cx="280" cy="80" r="14" />

      <path d="M 300,150 C 300,110 320,105 330,110 C 335,100 345,100 350,110 C 360,105 380,110 380,150 Z" />
      <circle cx="330" cy="85" r="14" />
    </g>
  </svg>
);

// Partners Data
const PARTNERS = [
  { role: 'Organized by', name: 'StartupTN', logo: partnerStartupTN },
  { role: 'Supported by', name: 'Google Developer Groups Madurai', logo: partnerGDGMadurai },
  { role: 'In Association with', name: 'savemom', logo: partnerSaveMom },
  { role: 'In Association with', name: 'Venture Nest', logo: partnerVentureNest }
];

// Themes Data with tech stacks
const THEMES = [
  { name: 'Digital Skills', image: themeDigitalSkills, desc: 'Mastering modern cloud infrastructure, software delivery, and automated testing tools.', tags: ['React', 'Vite', 'Cloud', 'CI/CD'] },
  { name: 'HealthTech', image: themeHealthTech, desc: 'Developing smart, accessible, and life-saving tech solutions for maternal health and diagnostics.', tags: ['Maternal Care', 'IoT', 'Diagnostics'] },
  { name: 'Entrepreneurship', image: themeEntrepreneurship, desc: 'Building sustainable startups, pitch methodologies, and expanding seed funding opportunities.', tags: ['Pitch Deck', 'Seed Fund', 'MVP'] },
  { name: 'AI Innovation', image: themeAIInnovation, desc: 'Harnessing Large Language Models, localized training pipelines, and custom agent networks.', tags: ['LLMs', 'Fine-tuning', 'Vector DB'] }
];

// Highlights Data
const HIGHLIGHTS = [
  { title: 'Hands-on AI learning & mentorship', icon: <Users size={28} color="var(--color-pink)" />, desc: 'Work directly with lead developers to build production ready applications.' },
  { title: 'Collaborative tool-building sessions', icon: <Settings size={28} color="var(--color-pink)" />, desc: 'Interactive developer sandboxes where you code live alongside industry experts.' },
  { title: 'Showcase of women-led innovations', icon: <Star size={28} color="var(--color-pink)" />, desc: 'Present and pitching your projects to prospective sponsors and local venture hubs.' },
  { title: 'Networking with industry, academia & startups', icon: <Compass size={28} color="var(--color-pink)" />, desc: 'Build long term relationships in our collaborative local ecosystem.' }
];

// Speakers Data
const SPEAKERS = [
  { name: 'Jane Doe', company: 'Google AI', designation: 'Senior ML Engineer', topic: 'Building AI Products for Millions', avatarImg: speakerJaneDoe },
  { name: 'Dr. Aruna Devi', company: 'OpenMadurAI', designation: 'Founder & AI Researcher', topic: 'The Power of Localized AI Systems', avatarImg: speakerArunaDevi },
  { name: 'Priyanka Sen', company: 'Venture Nest', designation: 'Managing Partner', topic: 'Fundraising Hacks for Female Founders', avatarImg: speakerPriyankaSen },
  { name: 'Meera Jasmine', company: 'SaveMom', designation: 'VP of Product', topic: 'UX Design in HealthTech Solutions', avatarImg: speakerMeeraJasmine }
];

// Mentors Data
const MENTORS = [
  { name: 'Ranya K.', domain: 'Business Strategy', exp: 12, companies: 'McKinsey, TechStars', avatarImg: mentorRanyaK },
  { name: 'Kavitha R.', domain: 'AI & Data Science', exp: 8, companies: 'Microsoft Research', avatarImg: mentorKavithaR },
  { name: 'Subhashini M.', domain: 'Funding & VC Pitching', exp: 15, companies: 'Sequoia, Y-Combinator', avatarImg: mentorSubhashiniM },
  { name: 'Sheryl V.', domain: 'Product Management', exp: 10, companies: 'Google, Meta', avatarImg: mentorSherylV }
];

// Timeline Data
const TIMELINE = [
  { label: 'Registration & Welcoming check-in', time: '09:00 AM', desc: 'Pick up your badge, event handouts and PenmAI Swag bag.' },
  { label: 'Welcome Address: Women Techmakers 2026', time: '10:00 AM', desc: 'Opening statement and introduction to WTM Madurai chapter.' },
  { label: 'Keynote Speech: Building AI for Millions', time: '10:30 AM', desc: 'Exploring high-throughput neural models and product deployment.' },
  { label: 'Industry Session: Edge AI & Serverless Labs', time: '11:15 AM', desc: 'Technical presentation on deploying low latency models locally.' },
  { label: 'Workshop 1: GenAI & LLM fine-tuning', time: '12:00 PM', desc: 'Practical sandbox building interactive chatbot agents.' },
  { label: 'Coffee Break & Swag Distribution', time: '01:00 PM', desc: 'Catered food, drinks and interactive sponsor lounge.' },
  { label: 'Startup Pitching & Founder Circles', time: '01:45 PM', desc: 'Speed pitching session in front of regional seed investors.' },
  { label: 'Workshop 2: Vector Architectures', time: '02:30 PM', desc: 'Advanced coding session using vector databases.' },
  { label: 'Networking Lounge matching hour', time: '03:30 PM', desc: 'Interactive 1-on-1 matches in the main auditorium.' },
  { label: 'Closing Ceremony & Handouts', time: '04:00 PM', desc: 'Certificates distribution and group photo session.' }
];

// Workshops Data
const WORKSHOPS = [
  { title: 'Intro to GenAI & LLMs', duration: '90 Mins', difficulty: 'Beginner', seats: 15, reqs: 'Laptop + internet', speaker: 'Jane Doe' },
  { title: 'Fine-Tuning Local Models', duration: '120 Mins', difficulty: 'Advanced', seats: 8, reqs: 'Colab Account + Basic Python', speaker: 'Dr. Aruna Devi' },
  { title: 'Product Design with Figma & AI', duration: '90 Mins', difficulty: 'Intermediate', seats: 24, reqs: 'Figma Account', speaker: 'Meera Jasmine' }
];

// FAQs Data
const FAQS = [
  { q: 'Is this event completely free?', a: 'Yes! PenmAI 2.0 is entirely free, sponsored by our partners to support the Women Techmakers Initiative.' },
  { q: 'Who can register for PenmAI 2.0?', a: 'This event is primarily curated for women developers, students, founders, researchers, and tech enthusiasts. All skill levels are welcome.' },
  { q: 'Will I get a certificate?', a: 'Yes, every attendee who completes the sessions and verifies check-in will receive a digital certificate of participation.' },
  { q: 'Is there a physical venue or is it virtual?', a: 'It is a hybrid event! You can join us physically at the main auditorium in Madurai or connect virtually using this platform.' }
];

export default function LandingPage() {
  const [timeLeft, setTimeLeft] = useState({ days: 10, hours: 8, minutes: 45, seconds: 30 });
  const [openFaq, setOpenFaq] = useState(null);
  const [registered, setRegistered] = useState(false);
  const [bookingMentor, setBookingMentor] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Registration Form States
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [ticketDetails, setTicketDetails] = useState(null);

  // Mentor Booking Slot State
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Countdown timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.seconds === 0 ? 59 : prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        clearInterval(timer);
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleBookMentor = (mentor) => {
    setBookingMentor(mentor);
    setSelectedSlot(null);
  };

  const handleConfirmBooking = () => {
    if (!selectedSlot) {
      showToast("Please choose a time slot.", "warning");
      return;
    }
    showToast(`Appointment confirmed with ${bookingMentor.name} at ${selectedSlot}! Details sent.`, "success");
    setBookingMentor(null);
  };

  const handleRegister = (e) => {
    if (e) e.preventDefault();
    const attendee = registerName.trim() || "Jane Doe";
    setRegistered(true);
    
    // Generate a unique ticket
    const ticketId = "WTM-" + Math.floor(100000 + Math.random() * 900000);
    setTicketDetails({
      name: attendee,
      email: registerEmail.trim() || "jane.doe@example.com",
      id: ticketId,
      tier: Math.random() > 0.5 ? "VIP Pass" : "General Pass"
    });
    
    showToast("Registration successful! Your digital ticket is ready.", "success");
  };

  const handleDownloadTicket = () => {
    showToast("Downloading your digital pass as PDF...", "success");
  };

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', background: 'var(--color-bg)' }}>
      {/* Background shapes */}
      <div className="blob-container">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
      </div>

      {/* Navigation Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--color-border)',
        padding: '16px 0'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '22px', fontWeight: '800', color: 'var(--color-pink)', fontFamily: 'Sora, sans-serif' }}>
              PenmAI 2.0
            </span>
            <span style={{ fontSize: '9px', background: 'var(--color-pink)', color: 'white', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>
              WTM 2026
            </span>
          </div>

          <nav className="desktop-sidebar" style={{ display: 'flex', gap: '24px', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
            <a href="#about">About</a>
            <a href="#themes">Themes</a>
            <a href="#highlights">Highlights</a>
            <a href="#speakers">Speakers</a>
            <a href="#schedule">Schedule</a>
            <a href="#workshops">Workshops</a>
            <a href="#mentors">Mentors</a>
            <a href="#register">Register</a>
            <a href="#faq">FAQ</a>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button onClick={() => {
              if (registered) {
                document.getElementById('register').scrollIntoView({ behavior: 'smooth' });
              } else {
                setRegisterName("Jane Doe");
                handleRegister();
              }
            }} className="btn-gradient" style={{ padding: '8px 20px', fontSize: '13px' }}>
              {registered ? 'View Pass ✓' : 'Register'}
            </button>

            {/* Mobile Hamburger menu */}
            <button 
              className={`hamburger-btn ${mobileMenuOpen ? 'open' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-drawer-overlay ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(false)} />
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <span style={{ fontSize: '20px', fontWeight: '800', color: 'var(--color-pink)', fontFamily: 'Sora, sans-serif' }}>PenmAI 2.0</span>
          <button onClick={() => setMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center' }}>
            <X size={24} color="var(--color-text-secondary)" />
          </button>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <a href="#about" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="#themes" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Themes</a>
          <a href="#highlights" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Highlights</a>
          <a href="#speakers" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Speakers</a>
          <a href="#schedule" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Schedule</a>
          <a href="#workshops" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Workshops</a>
          <a href="#mentors" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Mentors</a>
          <a href="#register" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Register</a>
          <a href="#faq" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
        </nav>
        <button onClick={() => {
          setMobileMenuOpen(false);
          if (registered) {
            document.getElementById('register').scrollIntoView({ behavior: 'smooth' });
          } else {
            setRegisterName("Jane Doe");
            handleRegister();
          }
        }} className="btn-gradient" style={{ marginTop: '32px', width: '100%', justifyContent: 'center' }}>
          {registered ? 'View Pass ✓' : 'Register Now'}
        </button>
      </div>

      {/* Hero Section */}
      <section style={{ padding: '40px 0', minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', position: 'relative' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px', alignItems: 'center' }}>
            {/* Left text */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--color-soft-pink)', color: 'var(--color-pink)', padding: '8px 16px', borderRadius: '20px', fontSize: '11px', fontWeight: '800', letterSpacing: '0.05em', marginBottom: '12px', border: '1px solid rgba(239, 21, 94, 0.2)' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-pink)', display: 'inline-block' }} className="glow-pulse" />
                WOMEN TECHMAKERS INITIATIVE 2026
              </div>

              <h1 style={{ fontSize: '52px', fontWeight: '900', lineHeight: '1.1', marginBottom: '8px', fontFamily: 'Sora, sans-serif' }}>
                <span className="text-gradient">PenmAI 2.0</span>
              </h1>

              <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '12px', fontFamily: 'Poppins, sans-serif' }}>
                Empowering Women. Building AI-Powered Futures.
              </h3>

              <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginBottom: '20px', maxWidth: '540px', lineHeight: '1.5' }}>
                PenmAI 2.0 is a celebration of women in technology. Join us for a day of learning, collaboration and inspiration as we explore the power of AI, innovation and leadership.
              </p>

              {/* Countdown Timer */}
              <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
                {[
                  { value: timeLeft.days, label: 'Days' },
                  { value: timeLeft.hours, label: 'Hours' },
                  { value: timeLeft.minutes, label: 'Mins' },
                  { value: timeLeft.seconds, label: 'Secs' }
                ].map((t, idx) => (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px 12px', minWidth: '64px', borderRadius: '12px', background: 'var(--color-soft-pink)', border: '1.5px solid rgba(239, 21, 94, 0.25)' }}>
                    <span style={{ fontSize: '20px', fontWeight: '800', color: 'var(--color-pink)', fontFamily: 'Sora, sans-serif', lineHeight: 1.2 }}>
                      {String(t.value).padStart(2, '0')}
                    </span>
                    <span style={{ fontSize: '8px', textTransform: 'uppercase', color: 'var(--color-text-primary)', fontWeight: '800', marginTop: '2px', letterSpacing: '0.05em' }}>
                      {t.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Event Details Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', marginBottom: '24px' }}>
                {[
                  { icon: <Calendar size={16} color="var(--color-pink)" />, label: 'Date', value: '25-July, 2026' },
                  { icon: <Clock size={16} color="var(--color-pink)" />, label: 'Time', value: '10AM to 4PM' },
                  { icon: <MapPin size={16} color="var(--color-pink)" />, label: 'Venue', value: 'To Be Announced' }
                ].map((item, idx) => (
                  <div key={idx} className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', background: 'white', borderRadius: '12px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ background: 'var(--color-soft-pink)', padding: '8px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {item.icon}
                    </div>
                    <div>
                      <span style={{ fontSize: '10px', color: 'var(--color-text-secondary)', display: 'block', fontWeight: '500' }}>{item.label}</span>
                      <strong style={{ fontSize: '12px', color: 'var(--color-text-primary)' }}>{item.value}</strong>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <a href="#register" className="btn-gradient" style={{ padding: '10px 24px' }}>
                  Register Now
                </a>
                <button onClick={() => setShowTrailer(true)} className="btn-outline" style={{ padding: '10px 24px' }}>
                  <Play size={14} fill="currentColor" /> Watch Trailer
                </button>
              </div>
            </div>

            {/* Right side poster high-resolution VR Girl image */}
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {/* Backing decorative circles to match poster layout */}
              <div className="spin-slow" style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-soft-pink) 0%, rgba(124, 58, 237, 0.08) 100%)', zIndex: -1 }} />
              <div style={{ position: 'absolute', width: '60px', height: '60px', borderRadius: '50%', background: 'var(--color-pink)', zIndex: -1, bottom: '5%', left: '5%', opacity: 0.1 }} />
              
              <div style={{ position: 'relative', zIndex: 1 }}>
                <img
                  src={vrGirlImage}
                  alt="PenmAI 2.0 VR Girl"
                  className="float-animation"
                  style={{ width: '100%', height: 'auto', maxWidth: '380px', display: 'block', objectFit: 'contain' }}
                />
                {/* Floating pill badge */}
                <div className="glass-panel float-animation" style={{ position: 'absolute', bottom: '15%', right: '-5%', background: 'white', padding: '10px 16px', borderRadius: '12px', border: '1.5px solid var(--color-pink)', boxShadow: 'var(--shadow-md)', zIndex: 5, display: 'flex', alignItems: 'center', gap: '8px', animationDelay: '1.5s' }}>
                  <Sparkles size={16} color="var(--color-pink)" className="glow-pulse" />
                  <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--color-text-primary)' }}>MADURAI 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section style={{ padding: '40px 0', background: 'rgba(255, 255, 255, 0.4)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', alignItems: 'center', gap: '24px' }}>
            {PARTNERS.map((partner, i) => (
              <div key={i} className="glass-panel partner-logo-hover" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', background: 'rgba(255, 255, 255, 0.65)', border: '1px solid rgba(124, 58, 237, 0.06)', borderRadius: '12px' }}>
                <span style={{ fontSize: '8px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '8px', letterSpacing: '0.05em' }}>{partner.role}</span>
                <img src={partner.logo} alt={partner.name} style={{ height: '34px', maxWidth: '100%', objectFit: 'contain' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{ padding: '100px 0', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container" style={{ maxWidth: '880px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', marginBottom: '24px', color: 'var(--color-text-primary)', fontFamily: 'Sora, sans-serif' }}>About PenmAI 2.0</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '16px', lineHeight: 1.8, marginBottom: '40px' }}>
            PenmAI 2.0 is a community initiative to build open, inclusive and impactful solutions. Curated to empower women technologists in distributed intelligence, machine learning systems, and software engineering.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            <div className="glass-panel" style={{ padding: '28px 24px', background: 'white', border: '1px solid rgba(124, 58, 237, 0.08)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'var(--color-soft-pink)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Award size={22} color="var(--color-pink)" />
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--color-text-primary)', marginBottom: '8px' }}>Our Mission</h4>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>Deliver coding sandboxes and expand student software pathways.</p>
            </div>
            <div className="glass-panel" style={{ padding: '28px 24px', background: 'white', border: '1px solid var(--color-pink)', boxShadow: 'var(--shadow-glow)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'var(--color-soft-pink)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Sparkles size={22} color="var(--color-pink)" />
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--color-text-primary)', marginBottom: '8px' }}>Our Vision</h4>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>Cultivating a regional cohort of female tech founders.</p>
            </div>
            <div className="glass-panel" style={{ padding: '28px 24px', background: 'white', border: '1px solid rgba(124, 58, 237, 0.08)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'var(--color-soft-pink)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Compass size={22} color="var(--color-pink)" />
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--color-text-primary)', marginBottom: '8px' }}>Core Goal</h4>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>Incubate inclusive digital products solving real challenges.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Themes */}
      <section id="themes" style={{ padding: '100px 0', background: 'rgba(124, 58, 237, 0.02)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '12px', color: 'var(--color-text-primary)', fontFamily: 'Sora, sans-serif' }}>Themes</h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>Core focus domains curating the sessions</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '32px' }}>
            {THEMES.map((theme, i) => (
              <GlassCard key={i} interactive={true} style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column', borderRadius: '16px', background: 'white' }}>
                <div className="theme-card-image-container">
                  <img src={theme.image} alt={theme.name} className="theme-card-image" />
                  <div style={{ position: 'absolute', bottom: 12, left: 12, display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {theme.tags.map((tag, idx) => (
                      <span key={idx} style={{ fontSize: '9px', background: 'rgba(255, 255, 255, 0.95)', color: 'var(--color-pink)', padding: '3px 10px', borderRadius: '6px', fontWeight: '800', border: '1px solid rgba(239, 21, 94, 0.15)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ padding: '24px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--color-text-primary)', marginBottom: '8px' }}>{theme.name}</h4>
                    <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{theme.desc}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section id="highlights" style={{ padding: '100px 0', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '12px', color: 'var(--color-text-primary)', fontFamily: 'Sora, sans-serif' }}>Highlights</h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>Key event offerings for participants</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {HIGHLIGHTS.map((item, i) => (
              <div
                key={i}
                className="glass-panel glass-card-interactive"
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '12px',
                  border: '1px solid rgba(124, 58, 237, 0.08)'
                }}
              >
                <div style={{ background: 'var(--color-soft-pink)', padding: '10px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {item.icon}
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>
                  {item.title}
                </h4>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Can Participate? Banner */}
      <section style={{ padding: '40px 0' }}>
        <div className="container">
          <div className="glass-panel" style={{
            background: 'var(--color-soft-pink)',
            border: '1.5px solid var(--color-pink)',
            borderRadius: '16px',
            padding: '24px 32px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Users size={28} color="var(--color-pink)" />
              <span style={{ fontSize: '14px', fontWeight: '800', color: 'var(--color-pink)', letterSpacing: '0.05em' }}>
                WHO CAN PARTICIPATE?
              </span>
            </div>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              fontSize: '13px',
              fontWeight: '700',
              color: 'var(--color-text-primary)'
            }}>
              {['Women Students', 'Women Professionals', 'Innovators', 'Entrepreneurs', 'Tech Enthusiasts'].map((role, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span>{role}</span>
                  {idx < 4 && <span style={{ color: 'var(--color-pink)', opacity: 0.5 }}>|</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Speakers */}
      <section id="speakers" style={{ padding: '100px 0', background: 'rgba(124, 58, 237, 0.01)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '12px', color: 'var(--color-text-primary)', fontFamily: 'Sora, sans-serif' }}>Featured Speakers</h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>Technical cohort leads guiding the sessions</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '32px' }}>
            {SPEAKERS.map((s, i) => (
              <div key={i} className="glass-panel glass-card-interactive" style={{ textAlign: 'center', background: 'white', padding: '32px 24px', borderRadius: '16px', border: '1px solid rgba(124, 58, 237, 0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px', position: 'relative' }}>
                  <div style={{ position: 'absolute', width: '98px', height: '98px', borderRadius: '50%', background: 'var(--color-soft-pink)', zIndex: 0, opacity: 0.5 }} />
                  {s.avatarImg ? (
                    <img
                      src={s.avatarImg}
                      alt={s.name}
                      style={{
                        width: '90px',
                        height: '90px',
                        borderRadius: '50%',
                        border: '2.5px solid var(--color-pink)',
                        objectFit: 'cover',
                        zIndex: 1
                      }}
                    />
                  ) : (
                    <MemberAvatar name={s.name} size={90} />
                  )}
                </div>
                <h3 style={{ fontSize: '18px', color: 'var(--color-text-primary)', fontWeight: 'bold' }}>{s.name}</h3>
                <span style={{ background: 'var(--color-soft-pink)', color: 'var(--color-pink)', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', display: 'inline-block', marginTop: '4px' }}>
                  {s.company}
                </span>
                <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: '8px' }}>{s.designation}</p>
                <div style={{ background: 'var(--color-soft-pink)', padding: '10px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', color: 'var(--color-pink)', marginTop: '16px', border: '1px solid rgba(239, 21, 94, 0.1)' }}>
                  {s.topic}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '16px', opacity: 0.7 }}>
                  <a href="#" style={{ color: 'var(--color-text-secondary)' }} className="social-icon-hover"><Twitter size={16} /></a>
                  <a href="#" style={{ color: 'var(--color-text-secondary)' }} className="social-icon-hover"><Linkedin size={16} /></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Workshops */}
      <section id="workshops" style={{ padding: '100px 0', background: 'rgba(124, 58, 237, 0.02)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '12px', color: 'var(--color-text-primary)', fontFamily: 'Sora, sans-serif' }}>Technical Workshops</h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>Hands-on coding labs with limited seating capacities</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {WORKSHOPS.map((w, idx) => (
              <GlassCard key={idx} style={{ padding: '28px 24px', position: 'relative', background: 'white', borderRadius: '16px' }}>
                <span style={{ position: 'absolute', top: '20px', right: '20px', background: 'var(--color-soft-pink)', color: 'var(--color-pink)', padding: '2px 10px', borderRadius: '6px', fontSize: '10px', fontWeight: 'bold' }}>
                  {w.difficulty}
                </span>

                <h3 style={{ fontSize: '18px', marginBottom: '16px', color: 'var(--color-text-primary)' }}>{w.title}</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '16px', borderTop: '1px solid var(--color-border)', paddingTop: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Mentor:</span>
                    <strong style={{ color: 'var(--color-text-primary)' }}>{w.speaker}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Duration:</span>
                    <strong style={{ color: 'var(--color-text-primary)' }}>{w.duration}</strong>
                  </div>
                  
                  {/* Seats progress bar */}
                  <div style={{ margin: '8px 0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>
                      <span>Seats Left</span>
                      <strong style={{ color: 'var(--color-pink)' }}>{w.seats} / 25</strong>
                    </div>
                    <div style={{ height: '6px', background: 'var(--color-lavender)', borderRadius: '999px', overflow: 'hidden' }}>
                      <div style={{ width: `${((25 - w.seats) / 25) * 100}%`, height: '100%', background: 'linear-gradient(90deg, var(--color-pink), var(--color-purple))', borderRadius: '999px' }} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: '11px' }}>Requirements:</span>
                    <strong style={{ color: 'var(--color-text-primary)' }}>{w.reqs}</strong>
                  </div>
                </div>

                <button onClick={() => showToast(`Registered for lab: "${w.title}"`, "success")} className="btn-gradient" style={{ width: '100%', justifyContent: 'center', fontSize: '13px', marginTop: '8px' }}>
                  Register for Lab
                </button>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Mentors */}
      <section id="mentors" style={{ padding: '100px 0', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '12px', color: 'var(--color-text-primary)', fontFamily: 'Sora, sans-serif' }}>Meet the Mentors</h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>Book 1-on-1 advisor slots with regional developers and directors</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            {MENTORS.map((m, i) => (
              <div key={i} className="glass-panel glass-card-interactive" style={{ padding: '28px 24px', background: 'white', borderRadius: '16px', textAlign: 'center', border: '1px solid rgba(124, 58, 237, 0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px', position: 'relative' }}>
                  <div style={{ position: 'absolute', width: '72px', height: '72px', borderRadius: '50%', background: 'var(--color-soft-pink)', zIndex: 0, opacity: 0.5 }} />
                  {m.avatarImg ? (
                    <img
                      src={m.avatarImg}
                      alt={m.name}
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        border: '2.5px solid var(--color-pink)',
                        objectFit: 'cover',
                        zIndex: 1
                      }}
                    />
                  ) : (
                    <MemberAvatar name={m.name} size={64} />
                  )}
                </div>
                <h3 style={{ fontSize: '16px', color: 'var(--color-text-primary)', fontWeight: 'bold' }}>{m.name}</h3>
                <span style={{ fontSize: '12px', color: 'var(--color-pink)', fontWeight: 'bold', display: 'block', marginTop: '2px' }}>{m.domain}</span>
                <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: '8px', minHeight: '34px' }}>
                  Ex-{m.companies} • {m.exp} Years Exp
                </p>
                <button
                  onClick={() => handleBookMentor(m)}
                  className="btn-outline"
                  style={{ width: '100%', justifyContent: 'center', padding: '10px', fontSize: '12px', marginTop: '16px' }}
                >
                  Book Session
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="schedule" style={{ padding: '100px 0', background: 'rgba(124, 58, 237, 0.01)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '16px', letterSpacing: '-0.01em', color: 'var(--color-text-primary)', fontFamily: 'Sora, sans-serif' }}>Event Timeline</h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>Follow the chronological progression of PenmAI 2.0</p>
          </div>

          <div className="timeline-wrapper">
            {/* Vertical timeline line */}
            <div className="timeline-line" />

            {TIMELINE.map((item, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-badge" />

                <div className="timeline-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--color-pink)', background: 'var(--color-soft-pink)', padding: '2px 8px', borderRadius: '4px' }}>{item.time}</span>
                  </div>
                  <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: '8px' }}>{item.label}</h4>
                  <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ accordion */}
      <section id="faq" style={{ padding: '100px 0', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontSize: '32px', color: 'var(--color-text-primary)', fontFamily: 'Sora, sans-serif' }}>FAQ & Support</h2>
            <p style={{ color: 'var(--color-text-secondary)', marginTop: '6px' }}>Find quick answers about scheduling and passes</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="glass-panel"
                  style={{ padding: '20px', cursor: 'pointer', background: 'white', borderRadius: '12px', border: '1px solid rgba(124, 58, 237, 0.08)' }}
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>{faq.q}</h4>
                    {isOpen ? <ChevronUp size={18} color="var(--color-pink)" /> : <ChevronDown size={18} color="var(--color-pink)" />}
                  </div>
                  {isOpen && (
                    <p style={{ marginTop: '12px', fontSize: '13px', color: 'var(--color-text-secondary)', borderTop: '1px solid rgba(124, 58, 237, 0.08)', paddingTop: '12px', lineHeight: 1.6 }}>
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Registration / QR Ticket Section */}
      <section id="register" style={{ padding: '100px 0', background: 'white' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          
          {registered && ticketDetails ? (
            /* Ticket Generated View */
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--color-soft-pink)', color: 'var(--color-pink)', padding: '8px 16px', borderRadius: '8px', fontSize: '11px', fontWeight: '800', letterSpacing: '0.05em', marginBottom: '24px' }}>
                <UserCheck size={14} /> YOUR DIGITAL TICKET IS READY
              </div>
              <h2 style={{ fontSize: '32px', marginBottom: '24px', fontFamily: 'Sora, sans-serif' }}>Congratulations! You're In!</h2>

              {/* Physical ticket mockup */}
              <div className="ticket-card" style={{ marginBottom: '32px', textAlign: 'left' }}>
                {/* Top Half */}
                <div style={{ padding: '24px 28px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                    <div>
                      <span style={{ fontSize: '20px', fontWeight: '800', color: 'var(--color-pink)', fontFamily: 'Sora, sans-serif' }}>PenmAI 2.0</span>
                      <span style={{ fontSize: '9px', display: 'block', color: 'var(--color-text-secondary)', fontWeight: 'bold' }}>WOMEN TECHMAKERS</span>
                    </div>
                    <span style={{ fontSize: '10px', background: 'var(--color-pink)', color: 'white', padding: '3px 10px', borderRadius: '6px', fontWeight: '800', letterSpacing: '0.05em' }}>
                      {ticketDetails.tier}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div>
                      <span style={{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--color-text-secondary)', display: 'block', fontWeight: 'bold' }}>Attendee</span>
                      <span style={{ fontSize: '18px', fontWeight: '800', color: 'var(--color-text-primary)' }}>{ticketDetails.name}</span>
                    </div>
                    <div>
                      <span style={{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--color-text-secondary)', display: 'block', fontWeight: 'bold' }}>Email Reference</span>
                      <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-text-secondary)' }}>{ticketDetails.email}</span>
                    </div>
                  </div>
                </div>

                <div className="ticket-divider" />

                {/* Bottom Half */}
                <div style={{ padding: '20px 28px 24px', background: 'rgba(239, 21, 94, 0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--color-text-secondary)', display: 'block', fontWeight: 'bold' }}>Date & Location</span>
                    <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-text-primary)' }}>25-July, 2026</span>
                    <span style={{ fontSize: '11px', display: 'block', color: 'var(--color-text-secondary)' }}>Madurai Auditorium</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    {/* Barcode Graphic */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                      <svg width="100" height="24" viewBox="0 0 100 24" fill="var(--color-text-primary)">
                        <rect x="0" y="0" width="3" height="24" />
                        <rect x="5" y="0" width="1" height="24" />
                        <rect x="8" y="0" width="2" height="24" />
                        <rect x="12" y="0" width="4" height="24" />
                        <rect x="18" y="0" width="1" height="24" />
                        <rect x="21" y="0" width="3" height="24" />
                        <rect x="26" y="0" width="2" height="24" />
                        <rect x="30" y="0" width="1" height="24" />
                        <rect x="33" y="0" width="4" height="24" />
                        <rect x="39" y="0" width="2" height="24" />
                        <rect x="43" y="0" width="1" height="24" />
                        <rect x="46" y="0" width="3" height="24" />
                        <rect x="51" y="0" width="2" height="24" />
                        <rect x="55" y="0" width="4" height="24" />
                        <rect x="61" y="0" width="1" height="24" />
                        <rect x="64" y="0" width="2" height="24" />
                        <rect x="68" y="0" width="3" height="24" />
                        <rect x="73" y="0" width="1" height="24" />
                        <rect x="76" y="0" width="4" height="24" />
                        <rect x="82" y="0" width="2" height="24" />
                        <rect x="86" y="0" width="1" height="24" />
                        <rect x="89" y="0" width="3" height="24" />
                        <rect x="94" y="0" width="2" height="24" />
                        <rect x="98" y="0" width="2" height="24" />
                      </svg>
                      <span style={{ fontSize: '8px', color: 'var(--color-text-secondary)', fontFamily: 'monospace', letterSpacing: '1px' }}>
                        {ticketDetails.id}
                      </span>
                    </div>

                    {/* Flat geometric vector QR code */}
                    <svg width="40" height="40" viewBox="0 0 100 100" fill="var(--color-text-primary)">
                      <rect x="0" y="0" width="30" height="30" />
                      <rect x="70" y="0" width="30" height="30" />
                      <rect x="0" y="70" width="30" height="30" />
                      <rect x="10" y="10" width="10" height="10" fill="white" />
                      <rect x="80" y="10" width="10" height="10" fill="white" />
                      <rect x="10" y="80" width="10" height="10" fill="white" />
                      <rect x="40" y="10" width="15" height="15" />
                      <rect x="45" y="45" width="20" height="20" />
                      <rect x="15" y="45" width="15" height="10" />
                      <rect x="75" y="75" width="15" height="15" />
                    </svg>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                <button onClick={handleDownloadTicket} className="btn-gradient" style={{ padding: '12px 28px' }}>
                  Download Pass (PDF)
                </button>
                <button onClick={() => { setRegistered(false); setTicketDetails(null); }} className="btn-outline" style={{ padding: '12px 28px' }}>
                  Register Someone Else
                </button>
              </div>
            </div>
          ) : (
            /* Register Form View */
            <div style={{
              background: 'var(--color-soft-pink)',
              border: '2px solid var(--color-pink)',
              borderRadius: '16px',
              padding: '48px 40px',
              display: 'grid',
              gridTemplateColumns: '1fr 1.1fr',
              gap: '40px',
              alignItems: 'center',
              boxShadow: 'var(--shadow-md)'
            }}>
              {/* Left side details and QR box */}
              <div>
                <h2 style={{ fontSize: '32px', fontWeight: '900', color: 'var(--color-text-primary)', marginBottom: '8px', fontFamily: 'Sora, sans-serif' }}>
                  REGISTER HERE!
                </h2>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '13px', marginBottom: '24px', lineHeight: 1.5 }}>
                  Scan the QR code or fill out the form to secure your free entry badge. Join the largest female tech ecosystem in the region.
                </p>

                {/* QR Container Frame */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{
                    background: 'white',
                    border: '2.5px solid var(--color-pink)',
                    borderRadius: '12px',
                    padding: '16px',
                    position: 'relative'
                  }}>
                    {/* Decorative tag */}
                    <span style={{ position: 'absolute', top: '-10px', left: '10px', background: 'var(--color-pink)', color: 'white', fontSize: '8px', fontWeight: 'bold', padding: '2px 8px', borderRadius: '4px' }}>
                      SCAN ME
                    </span>

                    {/* Flat geometric vector QR code */}
                    <svg width="80" height="80" viewBox="0 0 100 100" fill="var(--color-text-primary)">
                      <rect x="0" y="0" width="30" height="30" />
                      <rect x="70" y="0" width="30" height="30" />
                      <rect x="0" y="70" width="30" height="30" />
                      <rect x="10" y="10" width="10" height="10" fill="white" />
                      <rect x="80" y="10" width="10" height="10" fill="white" />
                      <rect x="10" y="80" width="10" height="10" fill="white" />
                      <rect x="40" y="10" width="15" height="15" />
                      <rect x="45" y="45" width="20" height="20" />
                      <rect x="15" y="45" width="15" height="10" />
                      <rect x="75" y="75" width="15" height="15" />
                    </svg>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <svg width="40" height="20" viewBox="0 0 40 20" fill="none" stroke="var(--color-pink)" strokeWidth="2.5">
                      <path d="M 5,10 H 35 M 25,2 L 35,10 L 25,18" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: '600' }}>Scan to register directly</span>
                  </div>
                </div>
              </div>

              {/* Form Input Side */}
              <form onSubmit={handleRegister} style={{ background: 'white', padding: '28px', borderRadius: '12px', border: '1px solid rgba(124, 58, 237, 0.08)', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ fontSize: '16px', color: 'var(--color-text-primary)', marginBottom: '4px' }}>Attendee Information</h3>
                
                <div>
                  <label htmlFor="reg-name" style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '6px' }}>FULL NAME</label>
                  <input
                    id="reg-name"
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', fontSize: '13px', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none', background: 'var(--color-lavender)' }}
                  />
                </div>

                <div>
                  <label htmlFor="reg-email" style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '6px' }}>EMAIL ADDRESS</label>
                  <input
                    id="reg-email"
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', fontSize: '13px', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none', background: 'var(--color-lavender)' }}
                  />
                </div>

                <button type="submit" className="btn-gradient" style={{ width: '100%', justifyContent: 'center', padding: '12px', marginTop: '8px' }}>
                  Register Free Ticket <ArrowRight size={16} />
                </button>
              </form>
            </div>
          )}

          {/* Bottom girls silhouette illustration */}
          <div style={{ marginTop: '48px' }}>
            <WomenSilhouetteIllustration />
          </div>
        </div>
      </section>

      {/* Simple Premium Footer */}
      <footer style={{ background: 'var(--color-text-primary)', color: 'rgba(255, 255, 255, 0.7)', padding: '60px 0 30px', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '32px', marginBottom: '40px' }}>
            <div>
              <h3 style={{ color: 'white', fontSize: '20px', marginBottom: '16px', fontFamily: 'Sora, sans-serif' }}>PenmAI 2.0</h3>
              <p style={{ fontSize: '13px', lineHeight: '1.6', maxWidth: '300px' }}>
                A community initiative by the people of Madurai to build open, inclusive and impactful solutions.
              </p>
            </div>
            <div>
              <h4 style={{ color: 'white', fontSize: '14px', marginBottom: '16px' }}>Get Involved</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li><a href="#" className="hover:text-white" style={{ transition: 'color 0.2s' }}>Become a Speaker</a></li>
                <li><a href="#" className="hover:text-white" style={{ transition: 'color 0.2s' }}>Apply as a Mentor</a></li>
                <li><a href="#" className="hover:text-white" style={{ transition: 'color 0.2s' }}>Volunteer with us</a></li>
                <li><a href="#" className="hover:text-white" style={{ transition: 'color 0.2s' }}>Sponsor Us</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'white', fontSize: '14px', marginBottom: '16px' }}>Info & Terms</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li><a href="#" className="hover:text-white" style={{ transition: 'color 0.2s' }}>Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white" style={{ transition: 'color 0.2s' }}>Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-white" style={{ transition: 'color 0.2s' }}>Code of Conduct</a></li>
                <li><a href="#" className="hover:text-white" style={{ transition: 'color 0.2s' }}>Contact Support</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'white', fontSize: '14px', marginBottom: '16px' }}>Community</h4>
              <div style={{ display: 'flex', gap: '12px' }}>
                <a href="#" style={{ color: 'white', background: 'rgba(255, 255, 255, 0.1)', padding: '10px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Twitter size={18} /></a>
                <a href="#" style={{ color: 'white', background: 'rgba(255, 255, 255, 0.1)', padding: '10px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Linkedin size={18} /></a>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '20px', textAlign: 'center', fontSize: '12px' }}>
            © 2026 PenmAI WTM Initiative. All Rights Reserved. Built for developers.
          </div>
        </div>
      </footer>

      {/* Mentor Slot Booking Modal Overlay */}
      {bookingMentor && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(15, 7, 26, 0.6)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
          <GlassCard style={{ padding: '32px 24px', background: 'white', maxWidth: '400px', width: '90%', textAlign: 'center', position: 'relative', borderRadius: '20px' }}>
            <span style={{ fontSize: '10px', fontWeight: 'bold', color: 'var(--color-pink)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>1-ON-1 CONSULTATION</span>
            <h3 style={{ fontSize: '20px', margin: '8px 0 16px', color: 'var(--color-text-primary)' }}>Book slot with {bookingMentor.name}</h3>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '20px' }}>
              {bookingMentor.avatarImg ? (
                <img
                  src={bookingMentor.avatarImg}
                  alt={bookingMentor.name}
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    border: '2px solid var(--color-pink)',
                    objectFit: 'cover',
                    margin: '0 auto'
                  }}
                />
              ) : (
                <MemberAvatar name={bookingMentor.name} size={64} style={{ margin: '0 auto' }} />
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left', background: 'var(--color-lavender)', padding: '14px', borderRadius: '12px', border: '1px solid var(--color-border)', fontSize: '12px', marginBottom: '20px' }}>
              <div style={{ color: 'var(--color-text-primary)' }}>💼 Domain: <strong>{bookingMentor.domain}</strong></div>
              <div style={{ color: 'var(--color-text-primary)' }}>🏢 Experience: <strong>{bookingMentor.exp} Years</strong></div>
            </div>

            <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '10px', textAlign: 'left' }}>CHOOSE A TIME SLOT</span>
            
            {/* Slot Picker Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '24px' }}>
              {['10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM'].map((slot, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSlot(slot)}
                  style={{
                    padding: '8px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: '700',
                    border: selectedSlot === slot ? '2px solid var(--color-pink)' : '1px solid var(--color-border)',
                    background: selectedSlot === slot ? 'var(--color-soft-pink)' : 'white',
                    color: selectedSlot === slot ? 'var(--color-pink)' : 'var(--color-text-primary)'
                  }}
                >
                  {slot}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button onClick={handleConfirmBooking} className="btn-gradient" style={{ flex: 1, padding: '10px', fontSize: '12px', justifyContent: 'center' }}>
                Confirm Slot
              </button>
              <button onClick={() => setBookingMentor(null)} className="btn-outline" style={{ flex: 1, padding: '10px', fontSize: '12px', justifyContent: 'center', borderColor: 'var(--color-text-secondary)', color: 'var(--color-text-secondary)' }}>
                Dismiss
              </button>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Trailer Overlay Modal */}
      {showTrailer && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(15, 7, 26, 0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
          <div style={{ background: 'var(--color-text-primary)', padding: '16px', borderRadius: '24px', width: '90%', maxWidth: '640px', position: 'relative' }}>
            <button onClick={() => setShowTrailer(false)} style={{ position: 'absolute', top: '-40px', right: '0px', color: 'white', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 'bold' }}>
              Close
            </button>
            <div style={{ width: '100%', height: '360px', background: 'var(--color-purple)', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', position: 'relative', overflow: 'hidden' }}>
              <div className="spin-slow" style={{ position: 'absolute', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '2px dashed rgba(255,255,255,0.2)' }} />
              <Play size={48} className="glow-pulse" style={{ background: 'white', color: 'var(--color-pink)', padding: '12px', borderRadius: '50%', marginBottom: '16px', cursor: 'pointer' }} />
              <h3 style={{ fontSize: '18px', color: 'white' }}>PenmAI 2.0 Trailer</h3>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginTop: '8px' }}>Streaming Presentation... (July 18, 2026)</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
