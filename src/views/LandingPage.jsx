import React, { useState, useEffect } from 'react';
import { 
  Calendar, MapPin, Clock, Users, BookOpen, Star, HelpCircle, 
  ChevronDown, ChevronUp, Play, Sparkles, Award, Compass, 
  UserCheck, ArrowRight, Heart, Cpu, Check, Briefcase, 
  Terminal, Settings, Trophy, Shield, Monitor
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import vrGirlImage from '../assets/VR Girl.png';
import { showToast } from '../components/Toast';

// Inline icons definition for social links
const Linkedin = ({ size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Twitter = ({ size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

// Minimal geometric monogram avatar to replace cartoon faces
const MemberAvatar = ({ name, size = 64 }) => {
  const initials = name.split(' ').map(n => n[0]).join('');
  return (
    <div style={{
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '50%',
      background: '#FFE6F2',
      border: '2.5px solid #1E0F30',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: `${size * 0.38}px`,
      fontWeight: '800',
      color: '#FF4FA3',
      fontFamily: 'Sora, sans-serif'
    }}>
      {initials}
    </div>
  );
};

// SVG illustration of women's silhouettes looking forward (from register card in poster)
const WomenSilhouetteIllustration = () => (
  <svg viewBox="0 0 400 150" width="100%" height="100%" style={{ overflow: 'visible' }}>
    <g fill="#1A0C2C" opacity="0.9">
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

// Partners Data (from poster header)
const PARTNERS = [
  { role: 'Organized by', name: 'StartupTN' },
  { role: 'Supported by', name: 'Google Developer Groups Madurai' },
  { role: 'In Association with', name: 'savemom' },
  { role: 'In Association with', name: 'Venture Nest' }
];

// Themes Data (from poster)
const THEMES = [
  { name: 'Digital Skills', icon: <Monitor size={28} color="white" /> },
  { name: 'HealthTech', icon: <Heart size={28} color="white" /> },
  { name: 'Entrepreneurship', icon: <Sparkles size={28} color="white" /> },
  { name: 'AI Innovation', icon: <Cpu size={28} color="white" /> }
];

// Highlights Data (from poster)
const HIGHLIGHTS = [
  { title: 'Hands-on AI learning & mentorship', icon: <Users size={32} color="#FF4FA3" /> },
  { title: 'Collaborative tool-building sessions', icon: <Settings size={32} color="#FF4FA3" /> },
  { title: 'Showcase of women-led innovations', icon: <Star size={32} color="#FF4FA3" /> },
  { title: 'Networking with industry, academia & startups', icon: <Compass size={32} color="#FF4FA3" /> }
];

// Speakers Data
const SPEAKERS = [
  { name: 'Jane Doe', company: 'Google AI', designation: 'Senior ML Engineer', topic: 'Building AI Products for Millions' },
  { name: 'Dr. Aruna Devi', company: 'OpenMadurAI', designation: 'Founder & AI Researcher', topic: 'The Power of Localized AI Systems' },
  { name: 'Priyanka Sen', company: 'Venture Nest', designation: 'Managing Partner', topic: 'Fundraising Hacks for Female Founders' },
  { name: 'Meera Jasmine', company: 'SaveMom', designation: 'VP of Product', topic: 'UX Design in HealthTech Solutions' }
];

// Mentors Data
const MENTORS = [
  { name: 'Ranya K.', domain: 'Business Strategy', exp: 12, companies: 'McKinsey, TechStars' },
  { name: 'Kavitha R.', domain: 'AI & Data Science', exp: 8, companies: 'Microsoft Research' },
  { name: 'Subhashini M.', domain: 'Funding & VC Pitching', exp: 15, companies: 'Sequoia, Y-Combinator' },
  { name: 'Sheryl V.', domain: 'Product Management', exp: 10, companies: 'Google, Meta' }
];

// Timeline Data
const TIMELINE = [
  { label: 'Registration & Welcoming check-in', time: '09:00 AM' },
  { label: 'Welcome Address: Women Techmakers 2026', time: '10:00 AM' },
  { label: 'Keynote Speech: Building AI for Millions', time: '10:30 AM' },
  { label: 'Industry Session: Edge AI & Serverless Labs', time: '11:15 AM' },
  { label: 'Workshop 1: GenAI & LLM fine-tuning', time: '12:00 PM' },
  { label: 'Coffee Break & Swag Distribution', time: '01:00 PM' },
  { label: 'Startup Pitching & Founder Circles', time: '01:45 PM' },
  { label: 'Workshop 2: Vector Architectures', time: '02:30 PM' },
  { label: 'Networking Lounge matching hour', time: '03:30 PM' },
  { label: 'Closing Ceremony & Handouts', time: '04:00 PM' }
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
  const [timeLeft, setTimeLeft] = useState({ days: 4, hours: 12, minutes: 30, seconds: 5 });
  const [openFaq, setOpenFaq] = useState(null);
  const [registered, setRegistered] = useState(false);
  const [bookingMentor, setBookingMentor] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

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
  };

  const handleConfirmBooking = () => {
    showToast(`Appointment confirmed with ${bookingMentor.name}! Details sent.`, "success");
    setBookingMentor(null);
  };

  const handleRegister = () => {
    setRegistered(true);
    showToast("Registration successful! Welcome to PenmAI 2.0.", "success");
  };

  return (
    <div style={{ position: 'relative', width: '100%', background: 'white' }}>
      
      {/* Top Banner Partner Logos Bar (Directly from poster header) */}
      <div style={{ borderBottom: '1px solid #FFE6F2', background: 'white', padding: '12px 0' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
          <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#5E4E70' }}>
            VIRUDHUNAGAR DISTRICT ADMINISTRATION
          </div>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
            {PARTNERS.map((p, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '9px', color: '#9CA3AF', textTransform: 'uppercase' }}>{p.role}</span>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#1E0F30' }}>{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky transparent navigation */}
      <header style={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 1000, 
        background: 'rgba(255, 255, 255, 0.9)', 
        backdropFilter: 'blur(16px)', 
        borderBottom: '1px solid var(--color-border)',
        padding: '16px 0'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '22px', fontWeight: '800', color: '#FF4FA3' }}>
              PenmAI 2.0
            </span>
            <span style={{ fontSize: '9px', background: '#FF4FA3', color: 'white', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>
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
          
          <button onClick={handleRegister} className="btn-gradient" style={{ padding: '8px 20px', fontSize: '13px' }}>
            {registered ? 'Registered ✓' : 'Register'}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ padding: '60px 0 80px', minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', background: 'white' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '48px', alignItems: 'center' }}>
            
            {/* Left text */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#FFE6F2', color: '#FF4FA3', padding: '8px 16px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', marginBottom: '24px' }}>
                WOMEN TECHMAKERS INITIATIVE 2026
              </div>
              
              <h1 style={{ fontSize: '64px', fontWeight: '900', lineHeight: '1.1', marginBottom: '16px', color: '#FF4FA3', fontFamily: 'Sora, sans-serif' }}>
                PenmAI 2.0
              </h1>
              
              <h3 style={{ fontSize: '20px', fontStyle: 'italic', fontWeight: '600', color: '#1E0F30', marginBottom: '24px', fontFamily: 'Poppins, sans-serif' }}>
                Empowering Women. Building AI-Powered Futures.
              </h3>
              
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px', marginBottom: '32px', maxWidth: '540px', lineHeight: '1.6' }}>
                PenmAI 2.0 is a celebration of women in technology. Join us for a day of learning, collaboration and inspiration as we explore the power of AI, innovation and leadership.
              </p>

              {/* Event Details Card (Plain flat layout from poster) */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '36px', borderTop: '1px solid #FFE6F2', borderBottom: '1px solid #FFE6F2', padding: '20px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '150px' }}>
                  <div style={{ background: '#FFE6F2', padding: '10px', borderRadius: '4px' }}>
                    <Calendar size={18} color="#FF4FA3" />
                  </div>
                  <div>
                    <span style={{ fontSize: '10px', color: 'var(--color-text-secondary)', display: 'block' }}>Date</span>
                    <strong style={{ fontSize: '14px', color: '#1E0F30' }}>25-July, 2026</strong>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '150px' }}>
                  <div style={{ background: '#FFE6F2', padding: '10px', borderRadius: '4px' }}>
                    <Clock size={18} color="#FF4FA3" />
                  </div>
                  <div>
                    <span style={{ fontSize: '10px', color: 'var(--color-text-secondary)', display: 'block' }}>Time</span>
                    <strong style={{ fontSize: '14px', color: '#1E0F30' }}>10AM to 4PM</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '150px' }}>
                  <div style={{ background: '#FFE6F2', padding: '10px', borderRadius: '4px' }}>
                    <MapPin size={18} color="#FF4FA3" />
                  </div>
                  <div>
                    <span style={{ fontSize: '10px', color: 'var(--color-text-secondary)', display: 'block' }}>Venue</span>
                    <strong style={{ fontSize: '14px', color: '#1E0F30' }}>To Be Announced</strong>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: '16px' }}>
                <button onClick={handleRegister} className="btn-gradient" style={{ padding: '14px 36px' }}>
                  Register Now
                </button>
                <button onClick={() => setShowTrailer(true)} className="btn-outline" style={{ padding: '14px 36px', borderColor: '#FF4FA3', color: '#FF4FA3' }}>
                  <Play size={16} fill="currentColor" /> Watch Trailer
                </button>
              </div>
            </div>

            {/* Right side poster high-resolution VR Girl image */}
            <div style={{ position: 'relative' }}>
              {/* Backing decorative circles to match poster layout */}
              <div style={{ position: 'absolute', width: '380px', height: '380px', borderRadius: '50%', background: '#FFE6F2', zIndex: -1, top: '10%', left: '10%', opacity: 0.8 }} />
              <div style={{ position: 'absolute', width: '80px', height: '80px', borderRadius: '50%', background: '#FF4FA3', zIndex: -1, bottom: '5%', left: '-5%', opacity: 0.15 }} />
              <img 
                src={vrGirlImage} 
                alt="PenmAI 2.0 VR Girl" 
                className="float-animation" 
                style={{ width: '100%', height: 'auto', maxHeight: '500px', display: 'block', margin: '0 auto', objectFit: 'contain', zIndex: 1 }} 
              />
            </div>

          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{ padding: '100px 0', borderTop: '1px solid #FFE6F2' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', marginBottom: '24px', color: '#1E0F30', fontFamily: 'Sora, sans-serif' }}>About PenmAI 2.0</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '16px', lineHeight: 1.8, marginBottom: '32px' }}>
            PenmAI 2.0 is a community initiative to build open, inclusive and impactful solutions. Curated to empower women technologists in distributed intelligence, machine learning systems, and software engineering.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '48px' }}>
            <div style={{ padding: '24px', background: '#F4EEFF', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1E0F30', marginBottom: '8px' }}>Our Mission</h4>
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Deliver coding sandboxes and expand student software pathways.</p>
            </div>
            <div style={{ padding: '24px', background: '#FFE6F2', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1E0F30', marginBottom: '8px' }}>Our Vision</h4>
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Cultivating a regional cohort of female tech founders.</p>
            </div>
            <div style={{ padding: '24px', background: '#F4EEFF', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1E0F30', marginBottom: '8px' }}>Core Goal</h4>
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Incubate inclusive digital products solving real challenges.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Themes ( Vibrate circles with solid icons - exactly from poster ) */}
      <section id="themes" style={{ padding: '80px 0', background: '#F4EEFF' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '12px', color: '#1E0F30', fontFamily: 'Sora, sans-serif' }}>Themes</h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>Core focus domains curating the sessions</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '64px', flexWrap: 'wrap' }}>
            {THEMES.map((theme, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', minWidth: '120px' }}>
                <div style={{ 
                  width: '72px', 
                  height: '72px', 
                  borderRadius: '50%', 
                  background: '#FF4FA3', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  boxShadow: '0 8px 20px rgba(255, 79, 163, 0.2)'
                }}>
                  {theme.icon}
                </div>
                <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#1E0F30' }}>{theme.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights (Clean cards with borders - from poster) */}
      <section id="highlights" style={{ padding: '100px 0', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '12px', color: '#1E0F30', fontFamily: 'Sora, sans-serif' }}>Highlights</h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>Key event offerings for participants</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            {HIGHLIGHTS.map((item, i) => (
              <div 
                key={i} 
                style={{ 
                  background: 'white', 
                  border: '1.5px solid #FFE6F2', 
                  borderRadius: '8px', 
                  padding: '24px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'flex-start',
                  gap: '16px'
                }}
              >
                {item.icon}
                <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#1E0F30', lineHeight: 1.5 }}>
                  {item.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Can Participate? Banner (Exact match from poster) */}
      <section style={{ padding: '40px 0', background: 'white' }}>
        <div className="container">
          <div style={{ 
            background: '#FFE6F2', 
            border: '2px solid #FF4FA3', 
            borderRadius: '8px', 
            padding: '20px 32px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Users size={28} color="#FF4FA3" />
              <span style={{ fontSize: '14px', fontWeight: '800', color: '#FF4FA3', letterSpacing: '0.05em' }}>
                WHO CAN PARTICIPATE?
              </span>
            </div>
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '16px', 
              fontSize: '13px', 
              fontWeight: 'bold', 
              color: '#1E0F30'
            }}>
              <span>Women Students</span>
              <span style={{ color: '#FF4FA3' }}>|</span>
              <span>Women Professionals</span>
              <span style={{ color: '#FF4FA3' }}>|</span>
              <span>Innovators</span>
              <span style={{ color: '#FF4FA3' }}>|</span>
              <span>Entrepreneurs</span>
              <span style={{ color: '#FF4FA3' }}>|</span>
              <span>Tech Enthusiasts</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Speakers */}
      <section id="speakers" style={{ padding: '100px 0', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '12px', color: '#1E0F30', fontFamily: 'Sora, sans-serif' }}>Featured Speakers</h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>Technical cohort leads guiding the sessions</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px' }}>
            {SPEAKERS.map((s, i) => (
              <div key={i} style={{ textAlign: 'center', background: '#F4EEFF', padding: '32px 24px', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                  <MemberAvatar name={s.name} size={90} />
                </div>
                <h3 style={{ fontSize: '18px', color: '#1E0F30', fontWeight: 'bold' }}>{s.name}</h3>
                <span style={{ color: '#FF4FA3', fontSize: '12px', fontWeight: 'bold', display: 'block', marginTop: '4px' }}>{s.company}</span>
                <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>{s.designation}</p>
                <div style={{ background: 'white', padding: '8px 12px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', marginTop: '16px', border: '1px solid #FFE6F2' }}>
                  {s.topic}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Workshops */}
      <section id="workshops" style={{ padding: '100px 0', background: '#F4EEFF' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '12px', color: '#1E0F30', fontFamily: 'Sora, sans-serif' }}>Technical Workshops</h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>Hands-on coding labs with limited seating capacities</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {WORKSHOPS.map((w, idx) => (
              <GlassCard key={idx} style={{ padding: '24px', position: 'relative', background: 'white' }}>
                <span style={{ position: 'absolute', top: '20px', right: '20px', background: '#FFE6F2', color: '#FF4FA3', padding: '2px 8px', borderRadius: '4px', fontSize: '9px', fontWeight: 'bold' }}>
                  {w.difficulty}
                </span>
                
                <h3 style={{ fontSize: '17px', marginBottom: '8px', color: '#1E0F30' }}>{w.title}</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '16px', borderTop: '1px solid #FFE6F2', paddingTop: '12px' }}>
                  <div>Mentor: {w.speaker}</div>
                  <div>Duration: {w.duration} • Seats left: <span style={{ color: '#FF4FA3', fontWeight: 'bold' }}>{w.seats}</span></div>
                  <div>Requirements: {w.reqs}</div>
                </div>
                
                <button onClick={() => showToast(`Registered for lab: "${w.title}"`, "success")} className="btn-gradient" style={{ width: '100%', justifyContent: 'center', fontSize: '12px' }}>
                  Register for Lab
                </button>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Mentors */}
      <section id="mentors" style={{ padding: '100px 0', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '12px', color: '#1E0F30', fontFamily: 'Sora, sans-serif' }}>Meet the Mentors</h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>Book 1-on-1 advisor slots with regional developers and directors</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            {MENTORS.map((m, i) => (
              <div key={i} style={{ padding: '24px', border: '1.5px solid #FFE6F2', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                  <MemberAvatar name={m.name} size={64} />
                </div>
                <h3 style={{ fontSize: '15px', color: '#1E0F30', fontWeight: 'bold' }}>{m.name}</h3>
                <span style={{ fontSize: '11px', color: '#FF4FA3', fontWeight: 'bold', display: 'block', marginTop: '2px' }}>{m.domain}</span>
                <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: '8px' }}>
                  Ex-{m.companies} • {m.exp} Years Exp
                </p>
                <button 
                  onClick={() => handleBookMentor(m)}
                  className="btn-outline" 
                  style={{ width: '100%', justifyContent: 'center', padding: '8px', fontSize: '11px', borderColor: '#FF4FA3', color: '#FF4FA3', marginTop: '16px' }}
                >
                  Book Session
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="schedule" style={{ padding: '100px 0', background: '#F4EEFF' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '16px', letterSpacing: '-0.01em', color: '#1E0F30', fontFamily: 'Sora, sans-serif' }}>Event Timeline</h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>Follow the chronological progression of PenmAI 2.0</p>
          </div>

          <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', width: '4px', height: '100%', background: '#8B5CF6', opacity: 0.35 }} />
            
            {TIMELINE.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: idx % 2 === 0 ? 'flex-start' : 'flex-end', width: '100%', marginBottom: '24px', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '50%', top: '10px', transform: 'translateX(-50%)', width: '16px', height: '16px', borderRadius: '50%', background: 'white', border: '3px solid #8B5CF6', zIndex: 1 }} />
                
                <GlassCard style={{ width: '45%', padding: '16px', borderLeftWidth: idx % 2 === 0 ? '4px' : '1px', borderLeftColor: '#FF4FA3', background: 'white' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#8B5CF6' }}>{item.time}</span>
                  </div>
                  <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#1E0F30' }}>{item.label}</h4>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ accordion */}
      <section id="faq" style={{ padding: '100px 0', background: 'white' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontSize: '32px', color: '#1E0F30', fontFamily: 'Sora, sans-serif' }}>FAQ & Support</h2>
            <p style={{ color: 'var(--color-text-secondary)', marginTop: '6px' }}>Find quick answers about scheduling and passes</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div 
                  key={i} 
                  style={{ padding: '20px', cursor: 'pointer', background: 'white', border: '1.5px solid #FFE6F2', borderRadius: '8px' }}
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#1E0F30' }}>{faq.q}</h4>
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                  {isOpen && (
                    <p style={{ marginTop: '12px', fontSize: '13px', color: 'var(--color-text-secondary)', borderTop: '1px solid #FFE6F2', paddingTop: '12px', lineHeight: 1.6 }}>
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Registration & QR Code Section (Directly from poster register card) */}
      <section id="register" style={{ padding: '80px 0', borderTop: '1px solid #FFE6F2', background: 'white' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ 
            background: '#FFE6F2', 
            border: '2px solid #FF4FA3', 
            borderRadius: '8px', 
            padding: '48px 40px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '40px',
            alignItems: 'center'
          }}>
            
            {/* Left side details and QR box */}
            <div>
              <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#1E0F30', marginBottom: '8px', fontFamily: 'Sora, sans-serif' }}>
                REGISTER HERE!
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginBottom: '24px', lineHeight: 1.5 }}>
                Scan the QR code to register and be a part of PenmAI 2.0. Join the largest female tech ecosystem in the region.
              </p>
              
              {/* QR Container Frame */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ 
                  background: 'white', 
                  border: '3px solid #FF4FA3', 
                  borderRadius: '8px', 
                  padding: '16px',
                  position: 'relative'
                }}>
                  {/* Decorative tag */}
                  <span style={{ position: 'absolute', top: '-10px', left: '10px', background: '#FF4FA3', color: 'white', fontSize: '8px', fontWeight: 'bold', padding: '1px 6px', borderRadius: '2px' }}>
                    REGISTER HERE
                  </span>
                  
                  {/* Flat geometric vector QR code */}
                  <svg width="100" height="100" viewBox="0 0 100 100" fill="#1E0F30">
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
                
                {/* Arrow and sub-CTA */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {/* Custom flat arrow */}
                  <svg width="40" height="20" viewBox="0 0 40 20" fill="none" stroke="#FF4FA3" strokeWidth="2.5">
                    <path d="M 5,10 H 35 M 25,2 L 35,10 L 25,18" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <button onClick={handleRegister} className="btn-gradient" style={{ padding: '8px 16px', fontSize: '12px' }}>
                    {registered ? 'Registered ✓' : 'Register Free'}
                  </button>
                </div>
              </div>
            </div>

            {/* Right side skyline women silhouettes illustration */}
            <div>
              <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#FF4FA3', display: 'block', marginBottom: '4px' }}>
                  Let's build an inclusive future together!
                </span>
              </div>
              <WomenSilhouetteIllustration />
            </div>

          </div>
        </div>
      </section>

      {/* Simple Premium Footer */}
      <footer style={{ background: '#1E0F30', color: 'rgba(255, 255, 255, 0.7)', padding: '60px 0 30px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '32px', marginBottom: '40px' }}>
            <div>
              <h3 style={{ color: 'white', fontSize: '20px', marginBottom: '16px' }}>PenmAI 2.0</h3>
              <p style={{ fontSize: '13px', lineHeight: '1.6', maxWidth: '300px' }}>
                A community initiative by the people of Madurai to build open, inclusive and impactful solutions.
              </p>
            </div>
            <div>
              <h4 style={{ color: 'white', fontSize: '14px', marginBottom: '16px' }}>Get Involved</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li><a href="#">Become a Speaker</a></li>
                <li><a href="#">Apply as a Mentor</a></li>
                <li><a href="#">Volunteer with us</a></li>
                <li><a href="#">Sponsor Us</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'white', fontSize: '14px', marginBottom: '16px' }}>Info & Terms</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms & Conditions</a></li>
                <li><a href="#">Code of Conduct</a></li>
                <li><a href="#">Contact Support</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'white', fontSize: '14px', marginBottom: '16px' }}>Community</h4>
              <div style={{ display: 'flex', gap: '12px' }}>
                <a href="#" style={{ color: 'white' }}><Twitter size={20} /></a>
                <a href="#" style={{ color: 'white' }}><Linkedin size={20} /></a>
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
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(30, 15, 48, 0.75)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
          <GlassCard style={{ padding: '32px', background: 'white', maxWidth: '400px', width: '90%', textAlign: 'center', position: 'relative' }}>
            <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#FF4FA3', textTransform: 'uppercase', tracking: '0.1em' }}>1-on-1 Consultation</span>
            <h3 style={{ fontSize: '20px', margin: '8px 0 16px', color: '#1E0F30' }}>Book slot with {bookingMentor.name}</h3>
            
            <div style={{ display: 'flex', gap: '12px', justify: 'center', marginBottom: '24px' }}>
              <MemberAvatar name={bookingMentor.name} size={64} style={{ margin: '0 auto' }} />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left', background: '#F4EEFF', padding: '16px', borderRadius: '16px', border: '1px solid var(--color-border)', fontSize: '12px', marginBottom: '24px' }}>
              <div style={{ color: '#1E0F30' }}>💼 Domain: {bookingMentor.domain}</div>
              <div style={{ color: '#1E0F30' }}>🏢 Experience: {bookingMentor.exp} Years</div>
              <div style={{ color: '#1E0F30' }}>⏱️ Duration: 30 Mins (July 18, 2026)</div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button onClick={handleConfirmBooking} className="btn-gradient" style={{ flex: 1, padding: '10px', fontSize: '12px' }}>
                Confirm Slot
              </button>
              <button onClick={() => setBookingMentor(null)} style={{ flex: 1, border: '1px solid var(--color-border)', padding: '10px', borderRadius: '24px', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                Dismiss
              </button>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Trailer Overlay Modal */}
      {showTrailer && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(30, 15, 48, 0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
          <div style={{ background: '#1E0F30', padding: '16px', borderRadius: '24px', width: '90%', maxWidth: '640px', position: 'relative' }}>
            <button onClick={() => setShowTrailer(false)} style={{ position: 'absolute', top: '-40px', right: '0px', color: 'white', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 'bold' }}>
              Close
            </button>
            <div style={{ width: '100%', height: '360px', background: '#8B5CF6', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', position: 'relative', overflow: 'hidden' }}>
              <div className="spin-slow" style={{ position: 'absolute', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '2px dashed rgba(255,255,255,0.2)' }} />
              <Play size={48} className="glow-pulse" style={{ background: 'white', color: '#FF4FA3', padding: '12px', borderRadius: '50%', marginBottom: '16px', cursor: 'pointer' }} />
              <h3 style={{ fontSize: '18px', color: 'white' }}>PenmAI 2.0 Trailer</h3>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginTop: '8px' }}>Streaming Presentation... (July 18, 2026)</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
