import React from 'react';

// Color Palette Constants used in styles
const strokeColor = '#1E0F30';
const strokeWidth = 2.5;

// Shared character drawing helpers to maintain exact proportions, eye style, and outline weight
const HairStyle = ({ type, color }) => {
  if (type === 'bun') {
    return (
      <g>
        <path d="M-18,-10 C-18,-28 18,-28 18,-10 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />
        <circle cx="0" cy="-28" r="8" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />
      </g>
    );
  }
  if (type === 'bob') {
    return (
      <path d="M-20,-10 C-22,-26 22,-26 20,-10 C22,-5 18,2 18,2 L-18,2 C-18,2 -22,-5 -20,-10 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />
    );
  }
  // Wavy/curls
  return (
    <path d="M-20,-6 C-24,-24 24,-24 20,-6 C26,0 20,8 20,8 L-20,8 C-20,8 -26,0 -20,-6 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />
  );
};

const CharacterFace = ({ skinColor = '#FFE6F2', hairType = 'bun', hairColor = '#8B5CF6' }) => (
  <g>
    {/* Neck */}
    <rect x="-6" y="8" width="12" height="12" fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth} />
    {/* Face */}
    <circle cx="0" cy="0" r="16" fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth} />
    {/* Eyes (Simple matching curved arches/dots) */}
    <circle cx="-5" cy="-2" r="2" fill={strokeColor} />
    <circle cx="5" cy="-2" r="2" fill={strokeColor} />
    {/* Smile */}
    <path d="M-4,5 Q0,9 4,5" fill="none" stroke={strokeColor} strokeWidth={2} strokeLinecap="round" />
    {/* Hair */}
    <HairStyle type={hairType} color={hairColor} />
  </g>
);

// 1. Hero Illustration: Woman working with AI on a laptop, surrounded by neural nodes
export const HeroAIWomanIllustration = () => (
  <svg viewBox="0 0 600 500" width="100%" height="100%" className="float-animation" style={{ overflow: 'visible' }}>
    {/* Background Glow */}
    <circle cx="300" cy="220" r="180" fill="#F4EEFF" opacity="0.8" />

    {/* Tech grid background */}
    <g opacity="0.2">
      <path d="M 50,150 L 550,150 M 50,300 L 550,300 M 200,50 L 200,450 M 400,50 L 400,450" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="8,8" />
    </g>

    {/* Neural Connection lines in background */}
    <g stroke="#8B5CF6" strokeWidth="2" fill="none" opacity="0.4">
      <path d="M 120,120 L 200,80 L 240,140 M 360,100 L 450,80 L 440,180 M 150,350 L 220,420 M 450,350 L 380,410" />
      <circle cx="200" cy="80" r="5" fill="#ef155e" />
      <circle cx="240" cy="140" r="5" fill="#8B5CF6" />
      <circle cx="450" cy="80" r="5" fill="#C4B5FD" />
    </g>

    {/* Chair */}
    <path d="M 230,280 L 210,380 M 280,280 L 300,380" stroke={strokeColor} strokeWidth={strokeWidth} />
    <rect x="200" y="240" width="100" height="40" rx="10" fill="#C4B5FD" stroke={strokeColor} strokeWidth={strokeWidth} />
    <rect x="190" y="160" width="20" height="90" rx="6" fill="#C4B5FD" stroke={strokeColor} strokeWidth={strokeWidth} transform="rotate(-10 200 160)" />

    {/* Desk / Table */}
    <rect x="100" y="300" width="400" height="12" rx="4" fill="#F4EEFF" stroke={strokeColor} strokeWidth={strokeWidth} />
    <line x1="160" y1="312" x2="140" y2="440" stroke={strokeColor} strokeWidth={strokeWidth} />
    <line x1="440" y1="312" x2="460" y2="440" stroke={strokeColor} strokeWidth={strokeWidth} />

    {/* Coder Woman character */}
    <g transform="translate(250, 150)">
      {/* Torso / Shirt */}
      <path d="M -30,60 C -30,30 30,30 30,60 L 20,100 L -20,100 Z" fill="#ef155e" stroke={strokeColor} strokeWidth={strokeWidth} />
      {/* Head & Hair */}
      <CharacterFace skinColor="#FFE6F2" hairType="bun" hairColor="#8B5CF6" />
      {/* Arms extended to laptop */}
      <path d="M-25,50 Q-10,70 15,65" fill="none" stroke="#FFE6F2" strokeWidth="8" strokeLinecap="round" />
      <path d="M-25,50 Q-10,70 15,65" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
    </g>

    {/* Laptop on desk */}
    <g transform="translate(360, 250)">
      <polygon points="10,40 100,40 115,50 -5,50" fill="#E6E0F0" stroke={strokeColor} strokeWidth={strokeWidth} />
      <rect x="15" y="5" width="70" height="40" rx="4" fill="white" stroke={strokeColor} strokeWidth={strokeWidth} />
      <rect x="25" y="12" width="50" height="20" rx="2" fill="#F4EEFF" />
      {/* Glowing screen lines */}
      <line x1="30" y1="18" x2="60" y2="18" stroke="#8B5CF6" strokeWidth="2.5" />
      <line x1="30" y1="24" x2="70" y2="24" stroke="#ef155e" strokeWidth="2" />
    </g>

    {/* Floating AI Icons */}
    {/* AI Chip */}
    <g transform="translate(100, 100)" className="float-animation" style={{ animationDelay: '0.2s' }}>
      <rect x="-20" y="-20" width="40" height="40" rx="8" fill="white" stroke={strokeColor} strokeWidth={strokeWidth} />
      <rect x="-10" y="-10" width="20" height="20" rx="3" fill="#FFE6F2" stroke={strokeColor} strokeWidth={1.5} />
      <line x1="-15" y1="-5" x2="-10" y2="-5" stroke={strokeColor} strokeWidth="1.5" />
      <line x1="-15" y1="5" x2="-10" y2="5" stroke={strokeColor} strokeWidth="1.5" />
      <line x1="10" y1="-5" x2="15" y2="-5" stroke={strokeColor} strokeWidth="1.5" />
      <line x1="10" y1="5" x2="15" y2="5" stroke={strokeColor} strokeWidth="1.5" />
    </g>

    {/* Cloud Computing */}
    <g transform="translate(480, 120)" className="float-animation" style={{ animationDelay: '0.8s' }}>
      <rect x="-24" y="-20" width="48" height="40" rx="10" fill="white" stroke={strokeColor} strokeWidth={strokeWidth} />
      <path d="M-12,5 A6,6 0 0,1 -6,-3 A9,9 0 0,1 10,-3 A6,6 0 0,1 12,5 Z" fill="#F4EEFF" stroke={strokeColor} strokeWidth={1.5} />
    </g>

    {/* Rocket */}
    <g transform="translate(490, 280)" className="float-animation" style={{ animationDelay: '1.4s' }}>
      <rect x="-20" y="-20" width="40" height="40" rx="10" fill="white" stroke={strokeColor} strokeWidth={strokeWidth} />
      <polygon points="0,-10 5,2 0,5 -5,2" fill="#ef155e" stroke={strokeColor} strokeWidth="1.5" />
    </g>
  </svg>
);

// 2. About PenmAI: Women collaborating around a whiteboard
export const AboutIllustration = () => (
  <svg viewBox="0 0 600 450" width="100%" height="100%" style={{ overflow: 'visible' }}>
    <circle cx="300" cy="220" r="160" fill="#F4EEFF" opacity="0.6" />

    {/* Whiteboard */}
    <rect x="200" y="80" width="200" height="150" rx="8" fill="white" stroke={strokeColor} strokeWidth={strokeWidth} />
    <rect x="210" y="70" width="180" height="10" fill="#8B5CF6" rx="2" stroke={strokeColor} strokeWidth={strokeWidth} />
    {/* Stand legs */}
    <line x1="240" y1="230" x2="210" y2="350" stroke={strokeColor} strokeWidth={strokeWidth} />
    <line x1="360" y1="230" x2="390" y2="350" stroke={strokeColor} strokeWidth={strokeWidth} />
    {/* Chart on whiteboard */}
    <path d="M 230,180 L 270,140 L 320,160 L 370,110" fill="none" stroke="#ef155e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="270" cy="140" r="4" fill="#C4B5FD" stroke={strokeColor} strokeWidth="1.5" />
    <circle cx="370" cy="110" r="4" fill="#8B5CF6" stroke={strokeColor} strokeWidth="1.5" />

    {/* Collaborator Left (Pointing) */}
    <g transform="translate(140, 240)">
      <path d="M -30,60 C -30,30 30,30 30,60 L 20,110 L -20,110 Z" fill="#ef155e" stroke={strokeColor} strokeWidth={strokeWidth} />
      <CharacterFace skinColor="#FFE6F2" hairType="bob" hairColor="#8B5CF6" />
      {/* Hand pointing to board */}
      <path d="M15,40 Q40,20 60,30" fill="none" stroke="#FFE6F2" strokeWidth="7" strokeLinecap="round" />
      <path d="M15,40 Q40,20 60,30" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
    </g>

    {/* Collaborator Right (Holding folder) */}
    <g transform="translate(460, 250)">
      <path d="M -30,50 C -30,20 30,20 30,50 L 20,100 L -20,100 Z" fill="#C4B5FD" stroke={strokeColor} strokeWidth={strokeWidth} />
      <CharacterFace skinColor="#FFE6F2" hairType="wavy" hairColor="#1A0C2C" />
      {/* Folded Arm */}
      <path d="M-15,40 Q-30,55 -10,65" fill="none" stroke="#FFE6F2" strokeWidth="7" strokeLinecap="round" />
      <path d="M-15,40 Q-30,55 -10,65" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
    </g>
  </svg>
);

// 3. Why Attend: Students learning AI together (collaborating around gear/lightbulb)
export const WhyAttendIllustration = () => (
  <svg viewBox="0 0 600 450" width="100%" height="100%" style={{ overflow: 'visible' }}>
    <circle cx="300" cy="220" r="160" fill="#FFE6F2" opacity="0.6" />

    {/* Central Gear visual */}
    <g transform="translate(300, 210)">
      <circle cx="0" cy="0" r="60" fill="none" stroke="#C4B5FD" strokeWidth="16" />
      <circle cx="0" cy="0" r="45" fill="white" stroke={strokeColor} strokeWidth={strokeWidth} />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <rect key={a} x="-8" y="-68" width="16" height="16" rx="3" fill="#8B5CF6" stroke={strokeColor} strokeWidth={strokeWidth} transform={`rotate(${a})`} />
      ))}
      {/* Lightbulb inside Gear */}
      <path d="M-10,-5 Q0,-25 10,-5 C10,5 5,12 5,18 H-5 C-5,12 -10,5 -10,-5 Z" fill="#F4EEFF" stroke={strokeColor} strokeWidth={strokeWidth} />
      <line x1="-5" y1="22" x2="5" y2="22" stroke={strokeColor} strokeWidth="2.5" />
    </g>

    {/* Student Left */}
    <g transform="translate(130, 250)">
      <path d="M -30,60 C -30,30 30,30 30,60 L 25,110 L -25,110 Z" fill="#ef155e" stroke={strokeColor} strokeWidth={strokeWidth} />
      <CharacterFace skinColor="#FFE6F2" hairType="bun" hairColor="#8B5CF6" />
      <path d="M12,45 Q35,35 55,42" fill="none" stroke="#FFE6F2" strokeWidth="8" strokeLinecap="round" />
      <path d="M12,45 Q35,35 55,42" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
    </g>

    {/* Student Right */}
    <g transform="translate(470, 250)">
      <path d="M -30,60 C -30,30 30,30 30,60 L 25,110 L -25,110 Z" fill="#C4B5FD" stroke={strokeColor} strokeWidth={strokeWidth} />
      <CharacterFace skinColor="#FFE6F2" hairType="bob" hairColor="#1A0C2C" />
      <path d="M-12,45 Q-35,35 -55,42" fill="none" stroke="#FFE6F2" strokeWidth="8" strokeLinecap="round" />
      <path d="M-12,45 Q-35,35 -55,42" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
    </g>
  </svg>
);

// 4. AI Workshops: Mentor teaching participants on laptops
export const WorkshopsIllustration = () => (
  <svg viewBox="0 0 600 450" width="100%" height="100%" style={{ overflow: 'visible' }}>
    <circle cx="300" cy="220" r="160" fill="#F4EEFF" opacity="0.7" />

    {/* Large Display Screen */}
    <rect x="180" y="60" width="240" height="140" rx="8" fill="white" stroke={strokeColor} strokeWidth={strokeWidth} />
    <rect x="195" y="75" width="210" height="110" rx="4" fill="#1E0F30" />
    {/* Coding lines on screen */}
    <line x1="210" y1="95" x2="300" y2="95" stroke="#ef155e" strokeWidth="3" strokeLinecap="round" />
    <line x1="210" y1="110" x2="340" y2="110" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round" />
    <line x1="230" y1="125" x2="310" y2="125" stroke="#C4B5FD" strokeWidth="3" strokeLinecap="round" />

    {/* Stand */}
    <rect x="280" y="200" width="40" height="30" fill="#D3C9E2" stroke={strokeColor} strokeWidth={strokeWidth} />

    {/* Mentor (Standing Left pointing to screen) */}
    <g transform="translate(120, 220)">
      <path d="M -30,60 C -30,30 30,30 30,60 L 25,120 L -25,120 Z" fill="#ef155e" stroke={strokeColor} strokeWidth={strokeWidth} />
      <CharacterFace skinColor="#FFE6F2" hairType="bun" hairColor="#8B5CF6" />
      {/* Arm pointing */}
      <path d="M15,40 Q40,10 65,22" fill="none" stroke="#FFE6F2" strokeWidth="7" strokeLinecap="round" />
      <path d="M15,40 Q40,10 65,22" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
    </g>

    {/* Student coding (Right sitting) */}
    <g transform="translate(480, 240)">
      <path d="M -30,50 C -30,20 30,20 30,50 L 20,100 L -20,100 Z" fill="#C4B5FD" stroke={strokeColor} strokeWidth={strokeWidth} />
      <CharacterFace skinColor="#FFE6F2" hairType="wavy" hairColor="#1A0C2C" />
      {/* Coding hands */}
      <path d="M-15,45 Q-30,55 -45,50" fill="none" stroke="#FFE6F2" strokeWidth="7" strokeLinecap="round" />
      <path d="M-15,45 Q-30,55 -45,50" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
    </g>

    {/* Small desk laptop */}
    <polygon points="410,290 470,290 480,305 400,305" fill="#E6E0F0" stroke={strokeColor} strokeWidth={strokeWidth} />
  </svg>
);

// 5. Mentors Illustration: One mentor guiding small groups
export const MentorsIllustration = () => (
  <svg viewBox="0 0 600 450" width="100%" height="100%" style={{ overflow: 'visible' }}>
    <circle cx="300" cy="220" r="160" fill="#FFE6F2" opacity="0.6" />

    {/* Mentor (Center back) */}
    <g transform="translate(300, 180)">
      <path d="M -30,60 C -30,30 30,30 30,60 L 20,120 L -20,120 Z" fill="#8B5CF6" stroke={strokeColor} strokeWidth={strokeWidth} />
      <CharacterFace skinColor="#FFE6F2" hairType="bun" hairColor="#ef155e" />
      {/* Arms out wide guiding */}
      <path d="M-25,45 Q-60,55 -80,75" fill="none" stroke="#FFE6F2" strokeWidth="7" strokeLinecap="round" />
      <path d="M-25,45 Q-60,55 -80,75" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M25,45 Q60,55 80,75" fill="none" stroke="#FFE6F2" strokeWidth="7" strokeLinecap="round" />
      <path d="M25,45 Q60,55 80,75" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
    </g>

    {/* Small Desk */}
    <ellipse cx="300" cy="320" rx="140" ry="24" fill="white" stroke={strokeColor} strokeWidth={strokeWidth} />

    {/* Student Left */}
    <g transform="translate(180, 270)">
      <path d="M -25,50 C -25,25 25,25 25,50 L 15,100 L -15,100 Z" fill="#ef155e" stroke={strokeColor} strokeWidth={strokeWidth} />
      <CharacterFace skinColor="#FFE6F2" hairType="bob" hairColor="#1A0C2C" />
    </g>

    {/* Student Right */}
    <g transform="translate(420, 270)">
      <path d="M -25,50 C -25,25 25,25 25,50 L 15,100 L -15,100 Z" fill="#C4B5FD" stroke={strokeColor} strokeWidth={strokeWidth} />
      <CharacterFace skinColor="#FFE6F2" hairType="wavy" hairColor="#8B5CF6" />
    </g>
  </svg>
);

// 6. Networking: People exchanging ideas, coffee, laptop, chat bubbles
export const NetworkingIllustration = () => (
  <svg viewBox="0 0 600 450" width="100%" height="100%" style={{ overflow: 'visible' }}>
    <circle cx="300" cy="220" r="160" fill="#F4EEFF" opacity="0.7" />

    {/* Coffee Table */}
    <rect x="220" y="320" width="160" height="10" rx="3" fill="#D3C9E2" stroke={strokeColor} strokeWidth={strokeWidth} />
    <line x1="300" y1="330" x2="300" y2="400" stroke={strokeColor} strokeWidth={strokeWidth} />
    <line x1="260" y1="400" x2="340" y2="400" stroke={strokeColor} strokeWidth={strokeWidth} />

    {/* Coffee Mug */}
    <rect x="290" y="295" width="20" height="25" rx="4" fill="#ef155e" stroke={strokeColor} strokeWidth={2} />
    <path d="M 310,300 Q 318,307 310,315" fill="none" stroke={strokeColor} strokeWidth="2" />

    {/* Person Left */}
    <g transform="translate(150, 240)">
      <path d="M -30,60 C -30,30 30,30 30,60 L 25,120 L -25,120 Z" fill="#8B5CF6" stroke={strokeColor} strokeWidth={strokeWidth} />
      <CharacterFace skinColor="#FFE6F2" hairType="bun" hairColor="#C4B5FD" />
      {/* Hand holding mug */}
      <path d="M20,50 Q40,65 60,55" fill="none" stroke="#FFE6F2" strokeWidth="7" strokeLinecap="round" />
      <path d="M20,50 Q40,65 60,55" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
    </g>

    {/* Person Right */}
    <g transform="translate(450, 240)">
      <path d="M -30,60 C -30,30 30,30 30,60 L 25,120 L -25,120 Z" fill="#ef155e" stroke={strokeColor} strokeWidth={strokeWidth} />
      <CharacterFace skinColor="#FFE6F2" hairType="wavy" hairColor="#1A0C2C" />
      {/* Hand gesturing */}
      <path d="M-20,50 Q-40,40 -60,45" fill="none" stroke="#FFE6F2" strokeWidth="7" strokeLinecap="round" />
      <path d="M-20,50 Q-40,40 -60,45" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
    </g>

    {/* Chat Bubbles */}
    <g transform="translate(300, 110)">
      <rect x="-40" y="-20" width="80" height="40" rx="12" fill="white" stroke={strokeColor} strokeWidth={strokeWidth} />
      <polygon points="0,20 -10,30 -5,20" fill="white" stroke={strokeColor} strokeWidth={strokeWidth} />
      {/* Inner AI Nodes symbol */}
      <circle cx="-12" cy="0" r="4" fill="#ef155e" />
      <circle cx="12" cy="0" r="4" fill="#8B5CF6" />
      <line x1="-8" y1="0" x2="8" y2="0" stroke={strokeColor} strokeWidth="1.5" />
    </g>
  </svg>
);

// 7. Startup Showcase: Founder presenting on stage, audience watching
export const StartupShowcaseIllustration = () => (
  <svg viewBox="0 0 600 450" width="100%" height="100%" style={{ overflow: 'visible' }}>
    <circle cx="300" cy="220" r="160" fill="#FFE6F2" opacity="0.6" />

    {/* Presentation Screen background */}
    <rect x="150" y="50" width="300" height="160" rx="10" fill="#F4EEFF" stroke={strokeColor} strokeWidth={strokeWidth} />
    {/* Rocket launch inside showcase screen */}
    <path d="M 300,100 L 315,140 L 300,148 L 285,140 Z" fill="#ef155e" stroke={strokeColor} strokeWidth="1.5" />
    <path d="M 300,148 L 290,165 M 300,148 L 310,165" stroke={strokeColor} strokeWidth="2" />
    <text x="300" y="190" fontSize="12" fontWeight="bold" fill={strokeColor} textAnchor="middle">LAUNCH PITCH</text>

    {/* Stage Floor */}
    <rect x="80" y="320" width="440" height="15" fill="#C4B5FD" stroke={strokeColor} strokeWidth={strokeWidth} />

    {/* Founder (Standing pointing to screen) */}
    <g transform="translate(200, 220)">
      <path d="M -30,60 C -30,30 30,30 30,60 L 25,110 L -25,110 Z" fill="#8B5CF6" stroke={strokeColor} strokeWidth={strokeWidth} />
      <CharacterFace skinColor="#FFE6F2" hairType="bun" hairColor="#ef155e" />
      <path d="M15,45 Q45,25 60,35" fill="none" stroke="#FFE6F2" strokeWidth="7" strokeLinecap="round" />
      <path d="M15,45 Q45,25 60,35" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
    </g>

    {/* Stage Podiums */}
    <rect x="360" y="250" width="30" height="70" fill="white" stroke={strokeColor} strokeWidth={strokeWidth} />

    {/* Audience Silhouettes in foreground */}
    <path d="M 50,450 C 50,400 120,400 120,450 Z" fill="#D3C9E2" opacity="0.8" />
    <circle cx="85" cy="385" r="16" fill="#D3C9E2" opacity="0.8" />

    <path d="M 480,450 C 480,400 550,400 550,450 Z" fill="#D3C9E2" opacity="0.8" />
    <circle cx="515" cy="385" r="16" fill="#D3C9E2" opacity="0.8" />
  </svg>
);

// 8. Panel Discussion: Four women on stage with microphones
export const PanelDiscussionIllustration = () => (
  <svg viewBox="0 0 600 450" width="100%" height="100%" style={{ overflow: 'visible' }}>
    <circle cx="300" cy="220" r="160" fill="#F4EEFF" opacity="0.7" />

    {/* Backdrop Screen */}
    <rect x="120" y="50" width="360" height="120" rx="8" fill="white" stroke={strokeColor} strokeWidth={strokeWidth} />
    <text x="300" y="115" fontSize="16" fontWeight="900" fill={strokeColor} textAnchor="middle">WTM PANEL DISCUSSION</text>

    {/* Chairs and Panelists (Standing/Sitting) */}
    {/* Panelist 1 */}
    <g transform="translate(180, 220)">
      <path d="M -20,50 C -20,25 20,25 20,50 L 15,100 L -15,100 Z" fill="#ef155e" stroke={strokeColor} strokeWidth={strokeWidth} />
      <CharacterFace skinColor="#FFE6F2" hairType="bun" hairColor="#8B5CF6" />
    </g>

    {/* Panelist 2 */}
    <g transform="translate(260, 220)">
      <path d="M -20,50 C -20,25 20,25 20,50 L 15,100 L -15,100 Z" fill="#C4B5FD" stroke={strokeColor} strokeWidth={strokeWidth} />
      <CharacterFace skinColor="#FFE6F2" hairType="bob" hairColor="#1A0C2C" />
    </g>

    {/* Panelist 3 */}
    <g transform="translate(340, 220)">
      <path d="M -20,50 C -20,25 20,25 20,50 L 15,100 L -15,100 Z" fill="#8B5CF6" stroke={strokeColor} strokeWidth={strokeWidth} />
      <CharacterFace skinColor="#FFE6F2" hairType="wavy" hairColor="#C4B5FD" />
    </g>

    {/* Panelist 4 */}
    <g transform="translate(420, 220)">
      <path d="M -20,50 C -20,25 20,25 20,50 L 15,100 L -15,100 Z" fill="#ef155e" stroke={strokeColor} strokeWidth={strokeWidth} />
      <CharacterFace skinColor="#FFE6F2" hairType="bun" hairColor="#1A0C2C" />
    </g>

    {/* Microphones in front */}
    <line x1="200" y1="320" x2="200" y2="350" stroke={strokeColor} strokeWidth={strokeWidth} />
    <circle cx="200" cy="318" r="4" fill="#1E0F30" />
    
    <line x1="400" y1="320" x2="400" y2="350" stroke={strokeColor} strokeWidth={strokeWidth} />
    <circle cx="400" cy="318" r="4" fill="#1E0F30" />
  </svg>
);

// 9. Volunteers: Registration desk, badges
export const VolunteersIllustration = () => (
  <svg viewBox="0 0 600 450" width="100%" height="100%" style={{ overflow: 'visible' }}>
    <circle cx="300" cy="220" r="160" fill="#FFE6F2" opacity="0.6" />

    {/* Registration Counter */}
    <rect x="140" y="280" width="320" height="60" rx="8" fill="white" stroke={strokeColor} strokeWidth={strokeWidth} />
    <text x="300" y="315" fontSize="13" fontWeight="bold" fill="#ef155e" textAnchor="middle">REGISTRATION DESK</text>

    {/* Volunteer Left (Giving badge) */}
    <g transform="translate(220, 180)">
      <path d="M -25,50 C -25,25 25,25 25,50 L 20,110 L -20,110 Z" fill="#8B5CF6" stroke={strokeColor} strokeWidth={strokeWidth} />
      <CharacterFace skinColor="#FFE6F2" hairType="bun" hairColor="#C4B5FD" />
      {/* Hand holding badge */}
      <path d="M15,42 Q35,50 45,35" fill="none" stroke="#FFE6F2" strokeWidth="7" strokeLinecap="round" />
      <path d="M15,42 Q35,50 45,35" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
    </g>

    {/* Volunteer Right (Helping/Gesturing) */}
    <g transform="translate(380, 180)">
      <path d="M -25,50 C -25,25 25,25 25,50 L 20,110 L -20,110 Z" fill="#ef155e" stroke={strokeColor} strokeWidth={strokeWidth} />
      <CharacterFace skinColor="#FFE6F2" hairType="bob" hairColor="#1A0C2C" />
      <path d="M-15,42 Q-35,35 -40,50" fill="none" stroke="#FFE6F2" strokeWidth="7" strokeLinecap="round" />
      <path d="M-15,42 Q-35,35 -40,50" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
    </g>
  </svg>
);

// 10. Registration: Scanning QR Code
export const RegistrationIllustration = () => (
  <svg viewBox="0 0 600 450" width="100%" height="100%" style={{ overflow: 'visible' }}>
    <circle cx="300" cy="220" r="160" fill="#F4EEFF" opacity="0.7" />

    {/* Large Ticket Frame */}
    <rect x="200" y="80" width="200" height="260" rx="16" fill="white" stroke={strokeColor} strokeWidth={strokeWidth} filter="drop-shadow(0 10px 20px rgba(0,0,0,0.05))" />
    
    {/* QR Mesh representation */}
    <g transform="translate(250, 130)" stroke={strokeColor} strokeWidth="3" fill="none">
      <rect x="0" y="0" width="30" height="30" />
      <rect x="70" y="0" width="30" height="30" />
      <rect x="0" y="70" width="30" height="30" />
      <rect x="10" y="10" width="10" height="10" fill={strokeColor} />
      <rect x="80" y="10" width="10" height="10" fill={strokeColor} />
      <rect x="10" y="80" width="10" height="10" fill={strokeColor} />
      <path d="M 40,20 H 60 M 45,45 H 70 M 20,50 H 35 M 75,80 H 90" strokeWidth="4" />
    </g>

    {/* Coder scanning ticket (Left side arm) */}
    <g transform="translate(130, 240)">
      <path d="M -35,60 C -35,30 35,30 35,60 L 25,120 L -25,120 Z" fill="#ef155e" stroke={strokeColor} strokeWidth={strokeWidth} />
      <CharacterFace skinColor="#FFE6F2" hairType="bun" hairColor="#8B5CF6" />
      {/* Hand holding phone to scan */}
      <path d="M15,45 Q40,35 65,40" fill="none" stroke="#FFE6F2" strokeWidth="8" strokeLinecap="round" />
      <path d="M15,45 Q40,35 65,40" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
      {/* Phone */}
      <rect x="62" y="25" width="12" height="24" rx="2" fill="#1E0F30" stroke={strokeColor} strokeWidth="1" />
    </g>
  </svg>
);

// 11. Venue Map Illustration: Buildings, roads, pins
export const VenueMapIllustration = ({ activeHall = 'main', onSelectHall = () => {} }) => {
  const halls = [
    { id: 'main', label: 'Main stage', x: 200, y: 110, color: '#ef155e', icon: 'main' },
    { id: 'workshop', label: 'Tech Lab', x: 130, y: 220, color: '#8B5CF6', icon: 'lab' },
    { id: 'lounge', label: 'Cafe Area', x: 270, y: 220, color: '#C4B5FD', icon: 'lounge' }
  ];

  return (
    <svg viewBox="0 0 400 350" width="100%" height="300" style={{ overflow: 'visible' }}>
      {/* Paths and Roads */}
      <path d="M 200,110 L 130,220 L 270,220 Z" fill="none" stroke="#F4EEFF" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 200,110 L 200,280" fill="none" stroke="#F4EEFF" strokeWidth="6" strokeDasharray="6,6" />

      {/* Buildings drawings */}
      {/* Left building */}
      <rect x="30" y="180" width="50" height="80" rx="6" fill="white" stroke={strokeColor} strokeWidth={strokeWidth} />
      <rect x="40" y="200" width="12" height="15" fill="#F4EEFF" stroke={strokeColor} strokeWidth={1.5} />
      <rect x="60" y="200" width="12" height="15" fill="#F4EEFF" stroke={strokeColor} strokeWidth={1.5} />

      {/* Right Building */}
      <rect x="310" y="180" width="60" height="90" rx="6" fill="white" stroke={strokeColor} strokeWidth={strokeWidth} />
      <rect x="325" y="200" width="30" height="15" rx="3" fill="#FFE6F2" stroke={strokeColor} strokeWidth={1.5} />

      {/* Hall Pins */}
      {halls.map((hall) => {
        const isActive = activeHall === hall.id;
        return (
          <g 
            key={hall.id} 
            transform={`translate(${hall.x}, ${hall.y})`} 
            onClick={() => onSelectHall(hall.id)}
            style={{ cursor: 'pointer' }}
          >
            {isActive && (
              <circle cx="0" cy="0" r="30" fill={hall.color} opacity="0.3" className="glow-pulse" />
            )}
            <circle cx="0" cy="0" r="20" fill="white" stroke={strokeColor} strokeWidth={strokeWidth} />
            <circle cx="0" cy="0" r="16" fill={isActive ? hall.color : '#F4EEFF'} />
            
            {/* Visual Node Pin Header */}
            <g transform="translate(0, -28)">
              <rect x="-45" y="-10" width="90" height="20" rx="10" fill={isActive ? '#1E0F30' : 'white'} stroke={strokeColor} strokeWidth="1.5" />
              <text x="0" y="3" fontSize="8" fontWeight="bold" fill={isActive ? 'white' : '#1E0F30'} textAnchor="middle">
                {hall.label}
              </text>
            </g>
          </g>
        );
      })}
    </svg>
  );
};

// 12. FAQ: Small friendly assistant illustration
export const FAQAssistantIllustration = () => (
  <svg viewBox="0 0 200 200" width="120" height="120" style={{ overflow: 'visible' }}>
    <g transform="translate(100, 100)" className="float-animation">
      {/* Friendly Robot Assistant */}
      <rect x="-30" y="-30" width="60" height="50" rx="16" fill="white" stroke={strokeColor} strokeWidth={strokeWidth} />
      
      {/* Eyes */}
      <circle cx="-12" cy="-8" r="4" fill="#8B5CF6" />
      <circle cx="12" cy="-8" r="4" fill="#8B5CF6" />
      
      {/* Mouth */}
      <path d="M-8,8 Q0,14 8,8" fill="none" stroke={strokeColor} strokeWidth={2} strokeLinecap="round" />
      
      {/* Headphones */}
      <path d="M-34,-10 C-34,-42 34,-42 34,-10" fill="none" stroke="#ef155e" strokeWidth="4" />
      <rect x="-38" y="-12" width="10" height="16" rx="4" fill="#ef155e" />
      <rect x="28" y="-12" width="10" height="16" rx="4" fill="#ef155e" />
      
      {/* Body / Stand */}
      <rect x="-10" y="20" width="20" height="15" fill="#C4B5FD" stroke={strokeColor} strokeWidth={strokeWidth} />
      <path d="M-25,35 H25" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
    </g>
  </svg>
);

// 13. Final CTA: Group of women celebrating, rocket, confetti
export const FinalCTAIllustration = () => (
  <svg viewBox="0 0 600 450" width="100%" height="100%" style={{ overflow: 'visible' }}>
    <circle cx="300" cy="220" r="160" fill="#F4EEFF" opacity="0.6" />

    {/* Rocket launching in background */}
    <g transform="translate(300, 120)" className="float-animation">
      <path d="M-10,15 Q0,45 10,15 Z" fill="#ef155e" />
      <polygon points="0,-40 12,10 0,5 -12,10" fill="#8B5CF6" stroke={strokeColor} strokeWidth="2" />
      <circle cx="0" cy="-5" r="4" fill="white" stroke={strokeColor} strokeWidth="1.5" />
    </g>

    {/* Person Left celebrating */}
    <g transform="translate(180, 260)">
      <path d="M -30,60 C -30,30 30,30 30,60 L 25,120 L -25,120 Z" fill="#ef155e" stroke={strokeColor} strokeWidth={strokeWidth} />
      <CharacterFace skinColor="#FFE6F2" hairType="bun" hairColor="#8B5CF6" />
      {/* Arms in air */}
      <path d="M-20,40 Q-45,15 -50,5" fill="none" stroke="#FFE6F2" strokeWidth="7" strokeLinecap="round" />
      <path d="M-20,40 Q-45,15 -50,5" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
    </g>

    {/* Person Center celebrating */}
    <g transform="translate(300, 280)">
      <path d="M -30,50 C -30,20 30,20 30,50 L 25,110 L -25,110 Z" fill="#C4B5FD" stroke={strokeColor} strokeWidth={strokeWidth} />
      <CharacterFace skinColor="#FFE6F2" hairType="bob" hairColor="#1A0C2C" />
      {/* Arms up cheering */}
      <path d="M-20,35 Q-30,10 -40,-10" fill="none" stroke="#FFE6F2" strokeWidth="7" strokeLinecap="round" />
      <path d="M-20,35 Q-30,10 -40,-10" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M20,35 Q30,10 40,-10" fill="none" stroke="#FFE6F2" strokeWidth="7" strokeLinecap="round" />
      <path d="M20,35 Q30,10 40,-10" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
    </g>

    {/* Person Right celebrating */}
    <g transform="translate(420, 260)">
      <path d="M -30,60 C -30,30 30,30 30,60 L 25,120 L -25,120 Z" fill="#8B5CF6" stroke={strokeColor} strokeWidth={strokeWidth} />
      <CharacterFace skinColor="#FFE6F2" hairType="wavy" hairColor="#ef155e" />
      <path d="M20,40 Q45,15 50,5" fill="none" stroke="#FFE6F2" strokeWidth="7" strokeLinecap="round" />
      <path d="M20,40 Q45,15 50,5" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
    </g>

    {/* Confetti specs */}
    <circle cx="150" cy="180" r="4" fill="#ef155e" />
    <circle cx="450" cy="180" r="4" fill="#8B5CF6" />
    <rect x="220" y="160" width="8" height="8" fill="#C4B5FD" transform="rotate(45 220 160)" />
    <rect x="380" y="160" width="8" height="8" fill="#FFE6F2" transform="rotate(30 380 160)" />
  </svg>
);

// 14. Avatar Vector: Consistent character profiles used in Speakers/Mentors grids
export const AvatarVector = ({ type = 'female-ai', size = 64, ...props }) => {
  const getAvatarColors = () => {
    switch (type) {
      case 'female-ai':
        return { skin: '#FFE6F2', hairType: 'bun', hairColor: '#8B5CF6' };
      case 'founder':
        return { skin: '#FFE6F2', hairType: 'bob', hairColor: '#ef155e' };
      case 'data-scientist':
        return { skin: '#FFE6F2', hairType: 'wavy', hairColor: '#1A0C2C' };
      case 'ux-designer':
        return { skin: '#FFE6F2', hairType: 'bun', hairColor: '#1A0C2C' };
      case 'product-manager':
        return { skin: '#FFE6F2', hairType: 'bob', hairColor: '#C4B5FD' };
      default:
        return { skin: '#FFE6F2', hairType: 'bun', hairColor: '#8B5CF6' };
    }
  };

  const colors = getAvatarColors();

  return (
    <svg width={size} height={size} viewBox="0 0 80 80" style={{ overflow: 'visible' }} {...props}>
      <circle cx="40" cy="40" r="38" fill="#F4EEFF" stroke={strokeColor} strokeWidth={strokeWidth} />
      <g transform="translate(40, 42)">
        <CharacterFace skinColor={colors.skin} hairType={colors.hairType} hairColor={colors.hairColor} />
      </g>
    </svg>
  );
};

// 15. Rocket Launch Illustration (reused in gallery/cta, alias defined for backward-compatibility)
export const RocketLaunchIllustration = () => (
  <svg viewBox="0 0 120 120" width="100" height="100" style={{ overflow: 'visible' }}>
    <g transform="translate(60, 60)" className="float-animation">
      <path d="M-15,10 Q0,45 15,10 Z" fill="#ef155e" />
      <path d="M-8,10 Q0,30 8,10 Z" fill="#8B5CF6" />
      <path d="M-8,-10 L-25,12 L-8,12 Z" fill="#C4B5FD" stroke={strokeColor} strokeWidth={1.5} />
      <path d="M8,-10 L25,12 L8,12 Z" fill="#C4B5FD" stroke={strokeColor} strokeWidth={1.5} />
      <path d="M-10,-25 C-10,-45 0,-60 0,-60 C0,-60 10,-45 10,-25 L10,12 L-10,12 Z" fill="#FFE6F2" stroke={strokeColor} strokeWidth={strokeWidth} />
      <path d="M-10,-25 C-10,-45 0,-60 0,-60 C0,-60 10,-45 10,-25 Z" fill="#8B5CF6" stroke={strokeColor} strokeWidth={1.5} />
      <circle cx="0" cy="-15" r="4" fill="white" stroke={strokeColor} strokeWidth={1.5} />
    </g>
  </svg>
);
