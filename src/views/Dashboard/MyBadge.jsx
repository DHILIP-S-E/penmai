import React, { useState } from 'react';
import { Award, CheckCircle, Download, RefreshCw, Cpu } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import { AvatarVector } from '../../components/SVGIllustrations';
import { showToast } from '../../components/Toast';

export default function MyBadge({ user, setUser }) {
  const [avatarType, setAvatarType] = useState(user.avatar || 'female-ai');
  const [badgeLevel, setBadgeLevel] = useState('All-Access Pass');
  const [isCompiling, setIsCompiling] = useState(false);

  const avatars = [
    { type: 'female-ai', label: 'AI Engineer' },
    { type: 'founder', label: 'Founder' },
    { type: 'data-scientist', label: 'Data Scientist' },
    { type: 'ux-designer', label: 'UX Designer' },
    { type: 'product-manager', label: 'Product Manager' },
    { type: 'cloud-architect', label: 'Cloud Architect' }
  ];

  const handleAvatarChange = (type) => {
    setAvatarType(type);
    setUser((prev) => ({ ...prev, avatar: type }));
    showToast("Avatar updated successfully! ✨", "success");
  };

  const handleDownload = () => {
    setIsCompiling(true);
    showToast("Compiling badge assets...", "info");
    
    setTimeout(() => {
      showToast("Packing digital vector configurations...", "info");
    }, 1500);

    setTimeout(() => {
      setIsCompiling(false);
      showToast("Badge downloaded successfully! check-in ticket: verified.", "badge");
      
      // Simple virtual download action - trigger window alert / download
      const element = document.createElement("a");
      const file = new Blob([`PenmAI 2.0 Badge\nName: ${user.name}\nID: PMAI-2026-001245\nRole: ${user.role}\nCompany: ${user.company}`], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `PenmAI-2026-Badge-${user.name.replace(/\s+/g, '')}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 3000);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
      {/* Configuration Panel */}
      <div>
        <GlassCard style={{ padding: '24px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Customize Your Avatar</h3>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '20px' }}>
            Choose a custom vector avatar that matches your professional look. Photos are not required.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
            {avatars.map((av) => (
              <button
                key={av.type}
                onClick={() => handleAvatarChange(av.type)}
                style={{
                  border: avatarType === av.type ? '2px solid var(--color-pink)' : '1px solid var(--color-border)',
                  background: avatarType === av.type ? 'var(--color-soft-pink)' : 'white',
                  borderRadius: '16px',
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <AvatarVector type={av.type} size={48} />
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-primary)' }}>{av.label}</span>
              </button>
            ))}
          </div>

          <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Badge Information</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '6px' }}>Attendee Name</label>
              <input 
                type="text" 
                value={user.name} 
                onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))}
                style={{ width: '100%', padding: '10px 16px', borderRadius: '12px', border: '1px solid var(--color-border)', fontSize: '14px', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '6px' }}>Company / Organization</label>
              <input 
                type="text" 
                value={user.company} 
                onChange={(e) => setUser(prev => ({ ...prev, company: e.target.value }))}
                style={{ width: '100%', padding: '10px 16px', borderRadius: '12px', border: '1px solid var(--color-border)', fontSize: '14px', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '6px' }}>Designation / Role</label>
              <input 
                type="text" 
                value={user.role} 
                onChange={(e) => setUser(prev => ({ ...prev, role: e.target.value }))}
                style={{ width: '100%', padding: '10px 16px', borderRadius: '12px', border: '1px solid var(--color-border)', fontSize: '14px', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '6px' }}>Badge Level</label>
              <select 
                value={badgeLevel} 
                onChange={(e) => setBadgeLevel(e.target.value)}
                style={{ width: '100%', padding: '10px 16px', borderRadius: '12px', border: '1px solid var(--color-border)', fontSize: '14px', outline: 'none', background: 'white' }}
              >
                <option value="All-Access Pass">All-Access Pass</option>
                <option value="VIP Developer">VIP Developer</option>
                <option value="Speaker Panelist">Speaker Panelist</option>
                <option value="Organizer">Organizer / Host</option>
              </select>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Badge View Visual Card */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <GlassCard 
          style={{ 
            width: '320px', 
            background: 'white',
            borderRadius: '24px', 
            boxShadow: 'var(--shadow-lg)',
            border: '2px solid var(--color-pink)',
            padding: '24px',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          {/* Top banner background decorations */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '80px', background: 'linear-gradient(135deg, var(--color-pink) 0%, var(--color-purple) 100%)', zIndex: 0 }} />
          
          {/* Badge Level Header */}
          <div style={{ zIndex: 1, color: 'white', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase', tracking: '0.1em', marginTop: '10px' }}>
            {badgeLevel}
          </div>
          
          {/* Avatar Container */}
          <div style={{ zIndex: 1, marginTop: '24px', background: 'white', padding: '6px', borderRadius: '50%', border: '3px solid white', boxShadow: 'var(--shadow-md)' }}>
            <AvatarVector type={avatarType} size={100} />
          </div>

          {/* User details */}
          <div style={{ marginTop: '16px', zIndex: 1 }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>{user.name || 'Dhilip'}</h2>
            <p style={{ fontSize: '12px', color: 'var(--color-pink)', fontWeight: 600, marginTop: '2px' }}>{user.role || 'Senior ML Engineer'}</p>
            <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>{user.company || 'Google AI'}</p>
          </div>

          <div style={{ width: '100%', height: '1px', background: 'var(--color-border)', margin: '20px 0' }} />

          {/* QR Code section */}
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', textAlign: 'left', width: '100%' }}>
            {/* Mock QR SVG */}
            <svg width="64" height="64" viewBox="0 0 100 100" fill="#1E0F30" style={{ border: '1px solid var(--color-border)', padding: '4px', borderRadius: '8px', background: '#FFF' }}>
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
            <div>
              <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Attendee ID</div>
              <div style={{ fontSize: '13px', fontWeight: 'bold', fontFamily: 'monospace' }}>PMAI-2026-001245</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                <span style={{ fontSize: '9px', background: '#10B981', color: 'white', padding: '1px 6px', borderRadius: '8px', fontWeight: 'bold' }}>Verified Ticket</span>
              </div>
            </div>
          </div>

          {/* NFC Indicator / Wave */}
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '20px', fontSize: '10px', color: 'var(--color-text-secondary)', borderTop: '1px dashed var(--color-border)', paddingTop: '12px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Cpu size={12} color="#8B5CF6" /> NFC Ready Touchless Check-in
            </span>
            <span style={{ fontWeight: 'bold', color: '#10B981' }}>● Present at Gate</span>
          </div>
        </GlassCard>

        {/* Download Button */}
        <button 
          onClick={handleDownload} 
          disabled={isCompiling}
          className="btn-gradient" 
          style={{ marginTop: '24px', width: '320px', justifyContent: 'center', gap: '10px' }}
        >
          {isCompiling ? (
            <>
              <RefreshCw className="spin-slow" size={18} /> Compiling configuration...
            </>
          ) : (
            <>
              <Download size={18} /> Download Badge (txt/ticket)
            </>
          )}
        </button>
      </div>
    </div>
  );
}
