import React from 'react';
import { Bell, Calendar, Sparkles, Award, MessageSquare, ShieldCheck, Zap } from 'lucide-react';
import GlassCard from '../../components/GlassCard';

export default function DashboardHome({ user, activeTab, setActiveTab }) {
  const stats = [
    { label: 'My Gamification Points', value: '180 pts', icon: <Zap size={20} color="#FF5CA8" /> },
    { label: 'Saved Sessions', value: '3 Starred', icon: <Calendar size={20} color="#C84DFF" /> },
    { label: 'Completed Workshops', value: '1 / 3 Labs', icon: <Sparkles size={20} color="#8B5CF6" /> },
    { label: 'Connections Made', value: '4 Matchings', icon: <MessageSquare size={20} color="#FF5CA8" /> }
  ];

  const notifications = [
    { time: '10 mins ago', text: 'Workshop "Intro to GenAI" starts in 10 minutes. Head to room: Workshops Lab!' },
    { time: '1 hour ago', text: 'Dr. Aruna Devi updated the resources link for local fine-tuning.' },
    { time: '3 hours ago', text: 'Congratulations! You earned the "Early Bird" achievement badge!' }
  ];

  return (
    <div>
      {/* Welcome Banner */}
      <GlassCard style={{ padding: '32px', marginBottom: '32px', background: 'linear-gradient(135deg, rgba(255, 92, 168, 0.1) 0%, rgba(200, 77, 255, 0.1) 100%)', border: '1px solid rgba(255, 92, 168, 0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Hello {user.name} 👋</h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px' }}>
              Welcome back to your **PenmAI 2.0 Dashboard**. The main keynote will stream live in the auditorium hall.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', background: 'white', padding: '12px 18px', borderRadius: '16px', border: '1px solid var(--color-border)' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981', animation: 'pulseGlow 1.5s infinite' }} />
            <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>Event is Live</span>
          </div>
        </div>
      </GlassCard>

      {/* Stats Widgets */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        {stats.map((s, i) => (
          <GlassCard key={i} style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: 'var(--color-lavender)', padding: '12px', borderRadius: '14px' }}>
              {s.icon}
            </div>
            <div>
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>{s.label}</p>
              <h3 style={{ fontSize: '20px', fontWeight: '800', marginTop: '4px' }}>{s.value}</h3>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Grid Layout for Notifications and Quick Tasks */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '24px' }}>
        {/* Notifications Feed */}
        <GlassCard style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bell size={20} color="#FF5CA8" /> Event Notifications
            </h3>
            <span style={{ fontSize: '11px', background: 'var(--color-soft-pink)', color: 'var(--color-pink)', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>
              3 New
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {notifications.map((n, i) => (
              <div key={i} style={{ paddingBottom: '16px', borderBottom: i < notifications.length - 1 ? '1px solid var(--color-border)' : 'none', display: 'flex', gap: '12px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-pink)', marginTop: '6px', flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-primary)' }}>{n.text}</p>
                  <span style={{ fontSize: '10px', color: 'var(--color-text-secondary)' }}>{n.time}</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Quick Launchpad Actions */}
        <GlassCard style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Your Quick Links</h3>
          
          <button 
            onClick={() => setActiveTab('live')} 
            className="btn-gradient" 
            style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
          >
            📺 Go to Live Event Stage
          </button>
          
          <button 
            onClick={() => setActiveTab('badge')} 
            style={{ 
              width: '100%', 
              background: 'white', 
              border: '1px solid var(--color-pink)', 
              color: 'var(--color-pink)', 
              padding: '12px', 
              borderRadius: '24px', 
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            🎫 Edit Digital Badge
          </button>
          
          <button 
            onClick={() => setActiveTab('gamification')} 
            style={{ 
              width: '100%', 
              background: 'white', 
              border: '1px solid var(--color-border)', 
              color: 'var(--color-text-primary)', 
              padding: '12px', 
              borderRadius: '24px', 
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            🎡 Spin Lucky Draw Wheel
          </button>
        </GlassCard>
      </div>
    </div>
  );
}
