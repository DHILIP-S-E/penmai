import React, { useState } from 'react';
import { Sparkles, Check, Send, Search } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import { AvatarVector } from '../../components/SVGIllustrations';
import { showToast } from '../../components/Toast';

export default function Networking() {
  const [filterRole, setFilterRole] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Connection states map (id -> 'connect' | 'pending' | 'connected')
  const [connStates, setConnStates] = useState({});

  const profiles = [
    { id: 1, name: 'Srinidhi G.', role: 'Student', details: 'CS Senior @ TCE Madurai', matchScore: 98, reason: 'Both coding in Python & GenAI', tag: 'student', avatar: 'female-ai' },
    { id: 2, name: 'Kavitha R.', role: 'Founder', details: 'CEO @ OpenMadurAI Labs', matchScore: 94, reason: 'Looking to hire ML engineers', tag: 'founder', avatar: 'founder' },
    { id: 3, name: 'Sheryl V.', role: 'Mentor', details: 'Lead Product Manager @ Google', matchScore: 91, reason: 'Specialized in UI/UX systems', tag: 'mentor', avatar: 'ux-designer' },
    { id: 4, name: 'Meera Jasmine', role: 'Investor', details: 'Partner @ Venture Nest', matchScore: 89, reason: 'Investing in female-led Tech', tag: 'investor', avatar: 'product-manager' },
    { id: 5, name: 'Aparna V.', role: 'Recruiter', details: 'Talent Acquisition @ Microsoft', matchScore: 86, reason: 'Hiring React & Cloud interns', tag: 'recruiter', avatar: 'data-scientist' },
    { id: 6, name: 'Divya Selvam', role: 'Student', details: 'AI Scholar @ KLN College', matchScore: 82, reason: 'Both attending Workshop 2', tag: 'student', avatar: 'ux-designer' }
  ];

  const handleConnect = (id, name) => {
    const currentState = connStates[id] || 'connect';
    
    if (currentState === 'connect') {
      setConnStates((prev) => ({ ...prev, [id]: 'pending' }));
      showToast(`Connection request sent to ${name}! ✉️`, "info");
      
      // Simulate automatic mock accept after 5 seconds!
      setTimeout(() => {
        setConnStates((prev) => ({ ...prev, [id]: 'connected' }));
        showToast(`You and ${name} are now connected! Start chatting in the lounge. 🤝`, "success");
      }, 5000);
    } else if (currentState === 'connected') {
      setConnStates((prev) => ({ ...prev, [id]: 'connect' }));
      showToast(`Disconnected from ${name}.`, "info");
    }
  };

  const filteredProfiles = profiles.filter((p) => {
    const matchesRole = filterRole === 'all' || p.tag === filterRole;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.reason.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div>
      {/* Search and Tag filters */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
        <div style={{ position: 'relative', flexGrow: 1, maxWidth: '400px' }}>
          <Search size={18} style={{ position: 'absolute', left: '16px', top: '12px', color: 'var(--color-text-secondary)' }} />
          <input 
            type="text" 
            placeholder="Search connections by name, skills, interests..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '10px 16px 10px 48px', 
              borderRadius: '24px', 
              border: '1px solid var(--color-border)', 
              fontSize: '13px', 
              outline: 'none',
              background: 'white'
            }}
          />
        </div>

        {/* AI matching text */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 'bold', color: 'var(--color-pink)', background: 'var(--color-soft-pink)', padding: '6px 14px', borderRadius: '20px' }}>
          <Sparkles size={14} /> Powered by PenmAI Matchmaking
        </div>
      </div>

      {/* Role categories selector */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
        {['all', 'student', 'founder', 'recruiter', 'mentor', 'investor'].map((tag) => (
          <button
            key={tag}
            onClick={() => setFilterRole(tag)}
            style={{
              padding: '8px 18px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 'bold',
              textTransform: 'capitalize',
              background: filterRole === tag ? 'var(--color-purple)' : 'white',
              color: filterRole === tag ? 'white' : 'var(--color-text-secondary)',
              border: '1px solid var(--color-border)'
            }}
          >
            {tag === 'all' ? 'All Matches' : `${tag}s`}
          </button>
        ))}
      </div>

      {/* Matching Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map((p) => {
            const state = connStates[p.id] || 'connect';
            return (
              <GlassCard key={p.id} style={{ padding: '24px', borderLeftWidth: '4px', borderLeftColor: p.matchScore >= 90 ? 'var(--color-pink)' : 'var(--color-purple)' }}>
                
                {/* Header detail */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <AvatarVector type={p.avatar} size={56} />
                    <div>
                      <h4 style={{ fontSize: '16px', fontWeight: 'bold' }}>{p.name}</h4>
                      <span style={{ fontSize: '11px', background: 'var(--color-lavender)', color: 'var(--color-violet)', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>
                        {p.role}
                      </span>
                    </div>
                  </div>
                  
                  {/* AI Compatibility score */}
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--color-pink)' }}>{p.matchScore}%</div>
                    <div style={{ fontSize: '9px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', fontWeight: 'bold' }}>AI Match</div>
                  </div>
                </div>

                {/* Sub details */}
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontWeight: 500, marginBottom: '8px' }}>
                  💼 {p.details}
                </p>
                <div style={{ background: '#FFF8FC', padding: '10px 14px', borderRadius: '12px', fontSize: '11px', color: 'var(--color-text-primary)', border: '1px solid rgba(255, 92, 168, 0.1)', marginBottom: '16px' }}>
                  🧠 Match Reason: {p.reason}
                </div>

                {/* Connect button switcher */}
                <button
                  onClick={() => handleConnect(p.id, p.name)}
                  disabled={state === 'pending'}
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '10px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: state === 'connected' 
                      ? '#E0F2FE' 
                      : state === 'pending' 
                        ? 'var(--color-lavender)' 
                        : 'linear-gradient(135deg, var(--color-pink) 0%, var(--color-purple) 100%)',
                    color: state === 'connected' 
                      ? '#0284C7' 
                      : state === 'pending' 
                        ? 'var(--color-text-secondary)' 
                        : 'white',
                    border: state === 'connected' ? '1px solid #BAE6FD' : 'none'
                  }}
                >
                  {state === 'connected' && (
                    <>
                      <Check size={14} /> Connected (Chat Lounge)
                    </>
                  )}
                  {state === 'pending' && (
                    <>
                      <Send className="spin-slow" size={14} /> Request Sent...
                    </>
                  )}
                  {state === 'connect' && 'Connect'}
                </button>

              </GlassCard>
            );
          })
        ) : (
          <div style={{ gridColumn: 'span 3' }}>
            <GlassCard style={{ padding: '48px', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔍</div>
              <h4 style={{ fontSize: '16px', marginBottom: '4px' }}>No matches found</h4>
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                Try adjusting your search query or role filters.
              </p>
            </GlassCard>
          </div>
        )}
      </div>
    </div>
  );
}
