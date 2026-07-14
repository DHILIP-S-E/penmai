import React, { useState } from 'react';
import { Award, Download, Share2, Calendar, CheckSquare } from 'lucide-react';

const Linkedin = ({ size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
import GlassCard from '../../components/GlassCard';
import { showToast } from '../../components/Toast';

export default function Certificates({ user, starredSessionsCount }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  
  // Requirement: Attend / Star at least 3 sessions to unlock certificate!
  const sessionsRequired = 3;
  const isUnlocked = starredSessionsCount >= sessionsRequired;
  const progressPercent = Math.min((starredSessionsCount / sessionsRequired) * 100, 100);

  const handleDownload = () => {
    if (!isUnlocked) return;
    setIsDownloading(true);
    showToast("Generating PDF certificate...", "info");
    
    setTimeout(() => {
      setIsDownloading(false);
      showToast("Certificate PDF downloaded! 📜", "success");
      
      const element = document.createElement("a");
      const file = new Blob([`PenmAI 2.0 Certificate of Participation\nGranted to: ${user.name}\nDesignation: ${user.role}\nVerified credential: CERT-PMAI-2026-${Math.floor(Math.random() * 90000 + 10000)}`], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `PenmAI-2026-Certificate-${user.name.replace(/\s+/g, '')}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 2500);
  };

  const handleShareLinkedIn = () => {
    setShowShareModal(true);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
      
      {/* Certificate Display Board */}
      <div>
        <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Your Certificate of Participation</h3>
        
        {isUnlocked ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Visual Certificate Card Representation */}
            <div 
              style={{ 
                width: '100%', 
                maxWidth: '480px', 
                background: 'white', 
                border: '8px double var(--color-purple)', 
                borderRadius: '8px', 
                padding: '32px',
                textAlign: 'center',
                boxShadow: 'var(--shadow-lg)',
                position: 'relative'
              }}
            >
              {/* Background watermark icon */}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '120px', opacity: 0.03, pointerEvents: 'none' }}>
                🧠
              </div>

              <div style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--color-pink)', uppercase: 'true', letterSpacing: '0.1em', marginBottom: '12px' }}>
                WOMEN TECHMAKERS INITIATIVE 2026
              </div>
              <h2 style={{ fontSize: '22px', fontFamily: 'var(--font-secondary)', color: 'var(--color-text-primary)' }}>Certificate of Excellence</h2>
              <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', margin: '8px 0 24px' }}>This is proudly presented to</p>
              
              <h3 style={{ fontSize: '20px', borderBottom: '1px solid var(--color-pink)', paddingBottom: '4px', width: '80%', margin: '0 auto', fontFamily: 'monospace' }}>
                {user.name}
              </h3>
              
              <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', width: '85%', margin: '20px auto 32px', lineHeight: 1.5 }}>
                for successfully attending the technical tracks, coding labs, and networking sessions during **PenmAI 2.0** on July 18, 2026.
              </p>

              {/* Signatures */}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 24px', borderTop: '1px dashed var(--color-border)', paddingTop: '16px', fontSize: '10px' }}>
                <div>
                  <div style={{ fontFamily: 'cursive', fontSize: '12px', color: 'var(--color-purple)' }}>Jane Doe</div>
                  <div style={{ fontWeight: 'bold', color: 'var(--color-text-primary)' }}>WTM India Committee</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'cursive', fontSize: '12px', color: 'var(--color-pink)' }}>Dr. Aruna Devi</div>
                  <div style={{ fontWeight: 'bold', color: 'var(--color-text-primary)' }}>OpenMadurAI Lead</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '16px', marginTop: '24px', width: '100%', maxWidth: '480px' }}>
              <button 
                onClick={handleDownload} 
                disabled={isDownloading}
                className="btn-gradient" 
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <Download size={16} /> {isDownloading ? 'Downloading...' : 'Download Certificate'}
              </button>
              <button 
                onClick={handleShareLinkedIn} 
                className="btn-outline" 
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <Share2 size={16} /> Share on LinkedIn
              </button>
            </div>
          </div>
        ) : (
          <GlassCard style={{ padding: '40px', textAlign: 'center', background: '#F9FAFB' }}>
            <Award size={48} style={{ color: '#D1D5DB', margin: '0 auto 16px' }} />
            <h4 style={{ fontSize: '16px', marginBottom: '8px' }}>Certificate Locked 🔒</h4>
            <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', maxWidth: '350px', margin: '0 auto' }}>
              Attend at least **3 sessions** on the schedule agenda. Star sessions in your schedule to represent attendance.
            </p>
          </GlassCard>
        )}
      </div>

      {/* Progress requirements tracker */}
      <div>
        <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Requirements Tracker</h3>
        <GlassCard style={{ padding: '24px' }}>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>
              <span>Attended Sessions</span>
              <span>{starredSessionsCount} / {sessionsRequired}</span>
            </div>
            
            {/* Progress Bar */}
            <div style={{ width: '100%', height: '12px', background: 'var(--color-lavender)', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ width: `${progressPercent}%`, height: '100%', background: 'linear-gradient(to right, var(--color-pink), var(--color-purple))', borderRadius: '10px' }} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px' }}>
              <CheckSquareIcon checked={starredSessionsCount >= 1} /> Star Session 1: Keynote Panel
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px' }}>
              <CheckSquareIcon checked={starredSessionsCount >= 2} /> Star Session 2: Industry Panel
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px' }}>
              <CheckSquareIcon checked={starredSessionsCount >= 3} /> Star Session 3: Workshop Lab
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Share Modal Dialog */}
      {showShareModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(30,15,48,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <GlassCard style={{ padding: '32px', background: 'white', maxWidth: '400px', width: '90%', textAlign: 'center' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '12px' }}>Share to Professional Feed</h3>
            <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '20px' }}>
              Post your success on LinkedIn to showcase your machine learning credentials.
            </p>
            
            <div style={{ background: 'var(--color-bg)', padding: '14px', borderRadius: '12px', border: '1px solid var(--color-border)', textAlign: 'left', fontSize: '11px', fontFamily: 'monospace', marginBottom: '24px' }}>
              🚀 Just finished attending PenmAI 2.0 (Women Techmakers Initiative 2026)! Incredible sessions on local LLM fine-tuning and AI product management. Check out my badge: PMAI-2026-001245 #WomenInTech #AI #WTM2026
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button 
                onClick={() => { setShowShareModal(false); showToast("Shared on LinkedIn feed successfully! 🤝", "success"); }}
                style={{ background: '#0077B5', color: 'white', padding: '10px 20px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Linkedin size={14} /> Post now
              </button>
              <button 
                onClick={() => setShowShareModal(false)}
                style={{ fontSize: '12px', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)', padding: '10px 20px', borderRadius: '20px' }}
              >
                Dismiss
              </button>
            </div>
          </GlassCard>
        </div>
      )}

    </div>
  );
}

const CheckSquareIcon = ({ checked }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={checked ? "#FF5CA8" : "#9CA3AF"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    {checked ? (
      <polyline points="20 6 9 17 4 12" />
    ) : (
      <rect x="3" y="3" width="18" height="18" rx="2" />
    )}
  </svg>
);
