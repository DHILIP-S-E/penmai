import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, User, ChevronRight } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import { AvatarVector } from '../../components/SVGIllustrations';
import { showToast } from '../../components/Toast';

export default function Mentorship() {
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookedMeetings, setBookedMeetings] = useState([
    { mentor: 'Sheryl V.', domain: 'Product Management', time: '02:00 PM - 02:30 PM', date: 'July 18, 2026' }
  ]);

  const mentors = [
    { id: 1, name: 'Kavitha R.', domain: 'AI & Data Science', companies: 'Microsoft Research', slots: ['10:30 AM', '11:00 AM', '02:00 PM'], avatar: 'female-ai' },
    { id: 2, name: 'Ranya K.', domain: 'Business Strategy', companies: 'TechStars, McKinsey', slots: ['11:30 AM', '03:00 PM'], avatar: 'founder' },
    { id: 3, name: 'Subhashini M.', domain: 'Funding & VC Pitching', companies: 'Sequoia Capital', slots: ['01:45 PM', '02:15 PM', '04:00 PM'], avatar: 'product-manager' },
    { id: 4, name: 'Sheryl V.', domain: 'Product Management', companies: 'Google, Meta', slots: ['03:30 PM'], avatar: 'ux-designer' }
  ];

  const handleSelectMentor = (m) => {
    setSelectedMentor(m);
    setSelectedTime(null);
  };

  const handleConfirmBooking = () => {
    if (!selectedMentor || !selectedTime) return;
    
    const isSlotTaken = bookedMeetings.some(
      (meet) => meet.mentor === selectedMentor.name && meet.time.includes(selectedTime)
    );

    if (isSlotTaken) {
      showToast("You already have a slot booked at this time!", "warning");
      return;
    }

    const newMeeting = {
      mentor: selectedMentor.name,
      domain: selectedMentor.domain,
      time: `${selectedTime} - ${calculateEndTime(selectedTime)}`,
      date: 'July 18, 2026'
    };

    setBookedMeetings((prev) => [...prev, newMeeting]);
    showToast(`Slot confirmed with ${selectedMentor.name} at ${selectedTime}! 📅`, "success");
    setSelectedMentor(null);
    setSelectedTime(null);
  };

  const calculateEndTime = (timeStr) => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    minutes += 30;
    if (minutes >= 60) {
      hours += 1;
      minutes -= 60;
    }
    const minsStr = minutes === 0 ? '00' : minutes.toString();
    return `${hours}:${minsStr} ${modifier}`;
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
      
      {/* Mentor Selection List & Scheduler */}
      <div>
        <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Select a Mentor</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          {mentors.map((m) => (
            <GlassCard 
              key={m.id} 
              interactive={true}
              onClick={() => handleSelectMentor(m)}
              style={{ 
                padding: '20px', 
                border: selectedMentor?.id === m.id ? '2px solid var(--color-pink)' : '1px solid var(--color-border)',
                background: selectedMentor?.id === m.id ? 'var(--color-soft-pink)' : 'white'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <AvatarVector type={m.avatar} size={56} />
                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: 'bold' }}>{m.name}</h4>
                    <p style={{ fontSize: '12px', color: 'var(--color-pink)', fontWeight: 600 }}>{m.domain}</p>
                    <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>Ex- {m.companies}</p>
                  </div>
                </div>
                <ChevronRight size={18} color="var(--color-text-secondary)" />
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Dynamic Scheduler Frame if mentor selected */}
        {selectedMentor && (
          <GlassCard style={{ padding: '24px', border: '1.5px solid var(--color-purple)' }}>
            <h3 style={{ fontSize: '16px', marginBottom: '12px' }}>
              Schedule with {selectedMentor.name}
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              Select an available time slot for your 30-minute 1-on-1 consultation:
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
              {selectedMentor.slots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedTime(slot)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    background: selectedTime === slot ? 'var(--color-purple)' : 'white',
                    color: selectedTime === slot ? 'white' : 'var(--color-text-primary)',
                    border: '1px solid var(--color-border)'
                  }}
                >
                  {slot}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={handleConfirmBooking} 
                disabled={!selectedTime}
                className="btn-gradient" 
                style={{ padding: '8px 20px', fontSize: '12px', opacity: selectedTime ? 1 : 0.6 }}
              >
                Confirm Appointment
              </button>
              <button 
                onClick={() => setSelectedMentor(null)} 
                style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}
              >
                Cancel
              </button>
            </div>
          </GlassCard>
        )}
      </div>

      {/* Confirmed Meetings Board */}
      <div>
        <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Your Confirmed Slots</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {bookedMeetings.length > 0 ? (
            bookedMeetings.map((meet, i) => (
              <GlassCard key={i} style={{ padding: '20px', background: 'white' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ background: '#E0F2FE', padding: '8px', borderRadius: '10px' }}>
                    <CheckCircle2 size={20} color="#0284C7" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 'bold' }}>1-on-1 Consultation</h4>
                    <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>Mentor: {meet.mentor} ({meet.domain})</p>
                  </div>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '8px', fontSize: '12px', color: 'var(--color-text-secondary)', borderTop: '1px solid var(--color-border)', paddingTop: '10px' }}>
                  <div>📅 Date: {meet.date}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-pink)', fontWeight: 'bold' }}>
                    <Clock size={12} /> {meet.time}
                  </div>
                </div>
              </GlassCard>
            ))
          ) : (
            <GlassCard style={{ padding: '32px', textAlign: 'center' }}>
              <User size={32} style={{ color: 'var(--color-text-secondary)', marginBottom: '8px' }} />
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>No mentorship slots booked yet.</p>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
}
