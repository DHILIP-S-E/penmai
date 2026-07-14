import React, { useState } from 'react';
import { Award, Zap, RefreshCw, Gift } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import { showToast } from '../../components/Toast';

export default function Gamification({ points, setPoints, unlockedAchievements, setUnlockedAchievements }) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState(null);
  const [rotationDegrees, setRotationDegrees] = useState(0);

  const badges = [
    { id: 'early', name: 'Early Bird', desc: 'Registered before July 18', icon: '🐣', pts: 50 },
    { id: 'badge', name: 'Badge Customizer', desc: 'Personalized your digital badge', icon: '🎫', pts: 50 },
    { id: 'builder', name: 'AI Builder', desc: 'Attended GenAI Workshops', icon: '🤖', pts: 80 },
    { id: 'network', name: 'Networking Champ', desc: 'Made 3+ lounge connections', icon: '🤝', pts: 60 },
    { id: 'mentor', name: 'Mentor Connect', desc: 'Booked a 1-on-1 mentorship slot', icon: '📅', pts: 50 },
    { id: 'quiz', name: 'Quiz Winner', desc: 'Won a live stage poll challenge', icon: '🏆', pts: 40 },
    { id: 'lucky', name: 'Lucky Star', desc: 'Won an item from the Lucky Draw', icon: '🎡', pts: 100 }
  ];

  const challenges = [
    { id: 'agenda', text: 'Star 3 sessions in your Agenda schedule', pts: 30, completed: true },
    { id: 'avatar', text: 'Customize and download your digital badge', pts: 30, completed: true },
    { id: 'chat', text: 'Post a question or comment in the Live Chat room', pts: 20, completed: true },
    { id: 'mentor_slot', text: 'Book your first mentor meeting slot', pts: 50, completed: true },
    { id: 'connect', text: 'Connect with at least 2 attendees in the lounge', pts: 50, completed: false }
  ];

  const prizes = [
    { name: 'WTM Premium T-Shirt 👕', color: '#FF5CA8' },
    { name: 'PenmAI Sticker Pack 💻', color: '#C84DFF' },
    { name: 'Canvas Tote Bag 🛍️', color: '#8B5CF6' },
    { name: '50 OpenAI AI Credits ⚡', color: '#FF5CA8' },
    { name: 'Coffee Voucher ☕', color: '#C84DFF' },
    { name: 'Try Again Next Time 🍀', color: '#8B5CF6' }
  ];

  const handleSpinWheel = () => {
    if (points < 40) {
      showToast("Insufficient points! Complete challenges to earn more.", "warning");
      return;
    }

    setIsSpinning(true);
    setSpinResult(null);
    setPoints((prev) => prev - 40);

    // Calculate a random prize index and spin rotation
    const prizeIndex = Math.floor(Math.random() * prizes.length);
    const segmentDeg = 360 / prizes.length;
    const spinsCount = 5; // Spin 5 times
    const targetDeg = (spinsCount * 360) + (360 - (prizeIndex * segmentDeg)) - (segmentDeg / 2);
    
    setRotationDegrees(targetDeg);

    setTimeout(() => {
      setIsSpinning(false);
      const prize = prizes[prizeIndex];
      setSpinResult(prize);

      if (prize.name.includes('Try Again')) {
        showToast("Oops, no luck this time! Spin again for 40 pts.", "info");
      } else {
        showToast(`Congratulations! You won: ${prize.name}! 🎉`, "success");
        if (!unlockedAchievements.includes('lucky')) {
          setUnlockedAchievements((prev) => [...prev, 'lucky']);
          setPoints((prev) => prev + 100); // 100 bonus pts
          showToast("Badge unlocked: Lucky Star! (+100 pts) 🏆", "badge");
        }
      }
    }, 4000); // Spinner spin time
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
      
      {/* Badges & Challenges Panel */}
      <div>
        {/* Points Display banner */}
        <GlassCard style={{ padding: '20px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(135deg, rgba(200, 77, 255, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--color-pink)', uppercase: 'true' }}>Balance</span>
            <h2 style={{ fontSize: '28px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={24} fill="var(--color-pink)" color="var(--color-pink)" /> {points} Points
            </h2>
          </div>
          <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Spend 40 pts to spin the Lucky Draw!</span>
        </GlassCard>

        {/* Badges Achievements */}
        <GlassCard style={{ padding: '24px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={20} color="var(--color-pink)" /> Earned Event Badges
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(85px, 1fr))', gap: '12px' }}>
            {badges.map((b) => {
              const isUnlocked = unlockedAchievements.includes(b.id);
              return (
                <div 
                  key={b.id} 
                  style={{ 
                    textAlign: 'center',
                    padding: '12px 6px',
                    borderRadius: '16px',
                    border: '1px solid var(--color-border)',
                    background: isUnlocked ? 'white' : 'rgba(0,0,0,0.02)',
                    opacity: isUnlocked ? 1 : 0.45,
                    filter: isUnlocked ? 'none' : 'grayscale(100%)',
                    transition: 'all 0.3s'
                  }}
                  title={`${b.name}: ${b.desc}`}
                >
                  <div style={{ fontSize: '28px', marginBottom: '6px' }}>{b.icon}</div>
                  <h4 style={{ fontSize: '10px', fontWeight: 'bold', lineHeight: 1.2 }}>{b.name}</h4>
                  <span style={{ fontSize: '8px', color: 'var(--color-pink)', fontWeight: 600 }}>+{b.pts} pts</span>
                </div>
              );
            })}
          </div>
        </GlassCard>

        {/* Challenges checklist */}
        <GlassCard style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Missions & Challenges</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {challenges.map((c) => (
              <div 
                key={c.id} 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '12px', 
                  border: '1px solid var(--color-border)', 
                  borderRadius: '14px',
                  background: c.completed ? 'var(--color-lavender)' : 'white'
                }}
              >
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <input 
                    type="checkbox" 
                    checked={c.completed} 
                    readOnly
                    style={{ accentColor: 'var(--color-pink)', cursor: 'default' }}
                  />
                  <span style={{ fontSize: '12px', color: 'var(--color-text-primary)', textDecoration: c.completed ? 'line-through' : 'none' }}>
                    {c.text}
                  </span>
                </div>
                <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--color-pink)' }}>
                  +{c.pts} pts
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Lucky Draw Wheel Panel */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h3 style={{ fontSize: '18px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Gift size={20} color="var(--color-purple)" /> Lucky Draw Spinner
        </h3>

        {/* Spinner Wheel Graphic using CSS rotation */}
        <GlassCard style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
          
          {/* Wheel Pointer needle */}
          <div style={{ 
            position: 'absolute', 
            top: '12px', 
            zIndex: 10, 
            width: 0, 
            height: 0, 
            borderLeft: '12px solid transparent', 
            borderRight: '12px solid transparent', 
            borderTop: '20px solid var(--color-pink)',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
          }} />

          {/* Spinner Circle */}
          <div 
            style={{ 
              width: '220px', 
              height: '220px', 
              borderRadius: '50%', 
              border: '6px solid var(--color-lavender)',
              position: 'relative',
              overflow: 'hidden',
              transform: `rotate(${rotationDegrees}deg)`,
              transition: isSpinning ? 'transform 4s cubic-bezier(0.1, 0.8, 0.1, 1)' : 'none',
              background: 'white',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            {/* Draw segments */}
            {prizes.map((p, i) => {
              const rot = i * (360 / prizes.length);
              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    transform: `rotate(${rot}deg)`,
                    transformOrigin: '50% 50%',
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: '16px'
                  }}
                >
                  <div style={{
                    transform: 'rotate(30deg)',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    cursor: 'default'
                  }}>
                    {p.name.split(' ').slice(-1)[0]}
                  </div>
                </div>
              );
            })}

            {/* Inner Hub Pin */}
            <div style={{ 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)', 
              width: '32px', 
              height: '32px', 
              borderRadius: '50%', 
              background: 'white', 
              border: '4px solid var(--color-purple)',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }} />
          </div>

          {/* Draw Button */}
          <button 
            onClick={handleSpinWheel} 
            disabled={isSpinning || points < 40}
            className="btn-gradient" 
            style={{ 
              marginTop: '24px', 
              width: '180px', 
              justifyContent: 'center',
              opacity: (isSpinning || points < 40) ? 0.6 : 1
            }}
          >
            {isSpinning ? <RefreshCw className="spin-slow" size={16} /> : 'Spin (40 Points)'}
          </button>
        </GlassCard>

        {/* Prize Winner Modal / Card */}
        {spinResult && (
          <GlassCard style={{ marginTop: '24px', padding: '16px 24px', border: '1.5px solid var(--color-pink)', textAlign: 'center', width: '268px', animation: 'slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
            <span style={{ fontSize: '10px', fontWeight: 'bold', color: 'var(--color-pink)', textTransform: 'uppercase', tracking: '0.05em' }}>Prize Won!</span>
            <h4 style={{ fontSize: '15px', fontWeight: 'bold', marginTop: '4px' }}>{spinResult.name}</h4>
            <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
              {!spinResult.name.includes('Try Again') ? 'Swag claim code sent to dashboard notifications!' : 'Better luck next time! Complete more tasks.'}
            </p>
          </GlassCard>
        )}
      </div>
    </div>
  );
}
