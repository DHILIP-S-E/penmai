import React, { useState } from 'react';
import { Star, Clock, MapPin, Award } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import { showToast } from '../../components/Toast';

export default function MySchedule({ starredSessions, setStarredSessions }) {
  const [filterTab, setFilterTab] = useState('all'); // 'all' or 'starred'

  const sessions = [
    { id: 1, time: '09:00 AM', title: 'Registration & Welcoming Pass check', room: 'Main Gate & Hallway', speaker: 'Logistics Volunteers' },
    { id: 2, time: '10:00 AM', title: 'Welcome Address: Women Techmakers 2026', room: 'Auditorium A', speaker: 'WTM Team India' },
    { id: 3, time: '10:30 AM', title: 'Keynote Speech: Building AI Products for Millions', room: 'Auditorium A', speaker: 'Jane Doe (Google AI)' },
    { id: 4, time: '11:15 AM', title: 'Industry Session: Future of Distributed AI Systems', room: 'Auditorium B', speaker: 'Dr. Aruna Devi' },
    { id: 5, time: '12:00 PM', title: 'Workshop 1: Fine-tuning Generative Models', room: 'Workshops Lab', speaker: 'Kavitha R.' },
    { id: 6, time: '01:00 PM', title: 'Networking Coffee Break & Swag distribution', room: 'Networking Lounge', speaker: 'Sponsors Hub' },
    { id: 7, time: '01:45 PM', title: 'Panel: Resilience Stories of Female Startup Founders', room: 'Auditorium A', speaker: 'Priyanka Sen, Meera Jasmine' },
    { id: 8, time: '02:30 PM', title: 'Workshop 2: Vector Search & Agent Architectures', room: 'Workshops Lab', speaker: 'Jane Doe' },
    { id: 9, time: '03:30 PM', title: 'Roundtable Discussion & Investor Matching', room: 'Networking Lounge', speaker: 'All Mentors' },
    { id: 10, time: '04:00 PM', title: 'Closing Ceremony & Certificates handout', room: 'Auditorium A', speaker: 'WTM Organizing Committee' }
  ];

  const handleToggleStar = (sessionId, sessionTitle) => {
    const isAlreadyStarred = starredSessions.includes(sessionId);
    if (isAlreadyStarred) {
      setStarredSessions((prev) => prev.filter((id) => id !== sessionId));
      showToast(`Removed "${sessionTitle}" from agenda.`, "info");
    } else {
      setStarredSessions((prev) => [...prev, sessionId]);
      showToast(`Starred "${sessionTitle}"! Added to My Agenda. ⭐`, "success");
    }
  };

  const filteredSessions = filterTab === 'all' 
    ? sessions 
    : sessions.filter((s) => starredSessions.includes(s.id));

  return (
    <div>
      {/* Tabs selector */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <button 
          onClick={() => setFilterTab('all')} 
          style={{ 
            background: filterTab === 'all' ? 'linear-gradient(135deg, var(--color-pink) 0%, var(--color-purple) 100%)' : 'white',
            color: filterTab === 'all' ? 'white' : 'var(--color-text-primary)',
            padding: '10px 24px',
            borderRadius: '20px',
            fontWeight: 'bold',
            boxShadow: filterTab === 'all' ? 'var(--shadow-sm)' : 'none',
            border: filterTab === 'all' ? 'none' : '1px solid var(--color-border)'
          }}
        >
          All Sessions Schedule
        </button>
        <button 
          onClick={() => setFilterTab('starred')} 
          style={{ 
            background: filterTab === 'starred' ? 'linear-gradient(135deg, var(--color-pink) 0%, var(--color-purple) 100%)' : 'white',
            color: filterTab === 'starred' ? 'white' : 'var(--color-text-primary)',
            padding: '10px 24px',
            borderRadius: '20px',
            fontWeight: 'bold',
            boxShadow: filterTab === 'starred' ? 'var(--shadow-sm)' : 'none',
            border: filterTab === 'starred' ? 'none' : '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Star size={16} fill={filterTab === 'starred' ? 'white' : 'currentColor'} /> Starred Agenda ({starredSessions.length})
        </button>
      </div>

      {/* Sessions list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredSessions.length > 0 ? (
          filteredSessions.map((s) => {
            const isStarred = starredSessions.includes(s.id);
            return (
              <GlassCard 
                key={s.id} 
                style={{ 
                  padding: '20px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  borderLeft: isStarred ? '4px solid var(--color-pink)' : '1.5px solid var(--color-border)'
                }}
              >
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                  {/* Time Stamp */}
                  <div style={{ minWidth: '85px', textAlign: 'left' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 'bold', color: 'var(--color-pink)' }}>
                      <Clock size={14} /> {s.time}
                    </div>
                  </div>
                  
                  {/* Topic and details */}
                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: 700 }}>{s.title}</h4>
                    <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>🗣️ Speaker: {s.speaker}</p>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'var(--color-lavender)', color: 'var(--color-violet)', fontSize: '10px', padding: '2px 8px', borderRadius: '10px', marginTop: '6px', fontWeight: 600 }}>
                      <MapPin size={10} /> {s.room}
                    </div>
                  </div>
                </div>

                {/* Star Action */}
                <button 
                  onClick={() => handleToggleStar(s.id, s.title)}
                  style={{
                    padding: '8px',
                    borderRadius: '50%',
                    background: isStarred ? 'var(--color-soft-pink)' : 'transparent',
                    border: '1px solid var(--color-border)',
                    color: isStarred ? 'var(--color-pink)' : 'var(--color-text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Star size={18} fill={isStarred ? 'var(--color-pink)' : 'none'} />
                </button>
              </GlassCard>
            );
          })
        ) : (
          <GlassCard style={{ padding: '48px', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>⭐</div>
            <h4 style={{ fontSize: '16px', marginBottom: '4px' }}>No Starred Sessions Yet</h4>
            <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
              Go back to the schedule and star sessions to build your custom agenda.
            </p>
          </GlassCard>
        )}
      </div>
    </div>
  );
}
