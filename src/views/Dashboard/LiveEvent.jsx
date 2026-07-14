import React, { useState, useEffect, useRef } from 'react';
import { Play, Send, ThumbsUp, Download, MessageSquare, HelpCircle, BarChart3, BellRing } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import { showToast } from '../../components/Toast';

export default function LiveEvent() {
  const [activeSubTab, setActiveSubTab] = useState('chat'); // 'chat', 'qa', 'poll'
  const [messages, setMessages] = useState([
    { user: 'Deepika S.', text: 'Excited to be here! The venue looks amazing.', time: '10:02 AM' },
    { user: 'Ranya K.', text: 'Jane Doe is absolute goals! What a presentation.', time: '10:05 AM' },
    { user: 'Priya Mani', text: 'Will slides be available after this session?', time: '10:06 AM' }
  ]);
  const [inputValue, setInputValue] = useState('');
  
  // Q&A
  const [questions, setQuestions] = useState([
    { id: 1, text: 'How do you prevent hallucinations in consumer-facing generative AI models?', votes: 12, user: 'Shanthi P.', upvoted: false },
    { id: 2, text: 'Are there any free computing credits provided for the hands-on lab projects?', votes: 8, user: 'Aparna V.', upvoted: false }
  ]);
  const [questionInput, setQuestionInput] = useState('');

  // Poll
  const [pollVoted, setPollVoted] = useState(false);
  const [pollVotes, setPollVotes] = useState({
    'Generative AI Labs': 45,
    'Vector Databases': 28,
    'Startup VC Pitching': 36,
    'Figma & UX Systems': 19
  });

  const chatEndRef = useRef(null);

  // Auto messages simulator to feel "live"
  useEffect(() => {
    const mockUsers = ['Ananya K.', 'Preethi R.', 'Dr. Aruna Devi', 'Divya Selvam', 'Sheryl V.', 'Subhashini M.'];
    const mockTexts = [
      'Yes, the resources tab has the slides!',
      'Awesome explanation of the attention mechanism.',
      'Anyone attending Workshop 1 at 12:00 PM?',
      'Check the maps tab for the cafeteria location!',
      'StartupTN panels are going to be super interesting.',
      'Love the glassmorphism layout of this virtual space!'
    ];

    const interval = setInterval(() => {
      const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
      const randomText = mockTexts[Math.floor(Math.random() * mockTexts.length)];
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      setMessages((prev) => [...prev, { user: randomUser, text: randomText, time }]);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [...prev, { user: 'You (Dhilip)', text: inputValue, time }]);
    setInputValue('');
    showToast("Message sent to chat room! 💬", "success");
  };

  const handleSendQuestion = (e) => {
    e.preventDefault();
    if (!questionInput.trim()) return;
    const newQ = {
      id: Date.now(),
      text: questionInput,
      votes: 1,
      user: 'You (Dhilip)',
      upvoted: true
    };
    setQuestions((prev) => [...prev, newQ]);
    setQuestionInput('');
    showToast("Question submitted to Q&A moderator!", "success");
  };

  const handleUpvote = (id) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === id) {
          const upvoted = !q.upvoted;
          return { ...q, votes: q.votes + (upvoted ? 1 : -1), upvoted };
        }
        return q;
      })
    );
  };

  const handleVotePoll = (option) => {
    setPollVotes((prev) => ({
      ...prev,
      [option]: prev[option] + 1
    }));
    setPollVoted(true);
    showToast("Vote recorded! Thank you for participating. 📊", "success");
  };

  const totalPollVotes = Object.values(pollVotes).reduce((a, b) => a + b, 0);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '24px', height: 'calc(100vh - 200px)', minHeight: '550px' }}>
      
      {/* Video Streaming Stage Column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <GlassCard 
          style={{ 
            flexGrow: 1, 
            background: '#1A0C2C', 
            borderRadius: '24px', 
            overflow: 'hidden', 
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Top floating elements */}
          <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', gap: '8px', zIndex: 1 }}>
            <span style={{ background: '#EF4444', color: 'white', fontSize: '10px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'white', animation: 'pulseGlow 1s infinite' }} /> LIVE
            </span>
            <span style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'white', fontSize: '10px', padding: '3px 8px', borderRadius: '4px', backdropFilter: 'blur(4px)' }}>
              👥 342 Watching
            </span>
          </div>

          {/* Virtual Speaker Presentation Slide Representation */}
          <div style={{ width: '85%', height: '70%', background: 'linear-gradient(135deg, #FF5CA8 0%, #8B5CF6 100%)', borderRadius: '16px', padding: '32px', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', position: 'relative' }}>
            <div style={{ fontSize: '12px', opacity: 0.8, textTransform: 'uppercase', tracking: '0.1em' }}>PenmAI 2.0 Keynote</div>
            
            <div>
              <h2 style={{ fontSize: '28px', color: 'white', marginBottom: '12px', lineHeight: 1.3 }}>
                Building AI Products for Millions of Users Worldwide
              </h2>
              <p style={{ fontSize: '13px', opacity: 0.9 }}>
                Speaker: Jane Doe, Senior ML Engineer @ Google AI
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', opacity: 0.7 }}>
              <span>Theme: Women Techmakers 2026</span>
              <span>Slide 12 / 45</span>
            </div>
            
            {/* Visual audio frequency overlay */}
            <div style={{ position: 'absolute', bottom: '16px', right: '16px', display: 'flex', gap: '3px', alignItems: 'flex-end', height: '24px' }}>
              <div style={{ width: '3px', height: '12px', background: 'white', borderRadius: '3px', animation: 'floatVector 1.2s infinite' }} />
              <div style={{ width: '3px', height: '20px', background: 'white', borderRadius: '3px', animation: 'floatVector 0.8s infinite' }} />
              <div style={{ width: '3px', height: '8px', background: 'white', borderRadius: '3px', animation: 'floatVector 1.5s infinite' }} />
              <div style={{ width: '3px', height: '16px', background: 'white', borderRadius: '3px', animation: 'floatVector 1s infinite' }} />
            </div>
          </div>

          {/* Bottom Video Controls bar */}
          <div style={{ width: '100%', height: '50px', background: 'rgba(0,0,0,0.4)', position: 'absolute', bottom: 0, left: 0, padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'white', fontSize: '12px' }}>
            <span>▶ Keynote Speech: Building AI Products</span>
            <span style={{ color: 'var(--color-pink)' }}>● Streaming in 1080p HD</span>
          </div>
        </GlassCard>
        
        {/* Slides/Resources Download Bar */}
        <GlassCard style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 'bold' }}>Session Slides & Sandbox Resource Code</h4>
            <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>Download the resources prepared for the session live labs.</p>
          </div>
          <button 
            onClick={() => showToast("Slide PDF download initiated!", "success")}
            className="btn-outline" 
            style={{ padding: '8px 16px', fontSize: '12px' }}
          >
            <Download size={14} /> Download PDF (12.4 MB)
          </button>
        </GlassCard>
      </div>

      {/* Interactive Tabs (Chat, Q&A, Live Poll) Column */}
      <GlassCard style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
        
        {/* Tab Headers */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--color-border)' }}>
          <button 
            onClick={() => setActiveSubTab('chat')}
            style={{ 
              flex: 1, 
              padding: '16px', 
              fontSize: '12px', 
              fontWeight: 'bold', 
              color: activeSubTab === 'chat' ? 'var(--color-pink)' : 'var(--color-text-secondary)',
              borderBottom: activeSubTab === 'chat' ? '3px solid var(--color-pink)' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <MessageSquare size={14} /> Chat
          </button>
          <button 
            onClick={() => setActiveSubTab('qa')}
            style={{ 
              flex: 1, 
              padding: '16px', 
              fontSize: '12px', 
              fontWeight: 'bold', 
              color: activeSubTab === 'qa' ? 'var(--color-pink)' : 'var(--color-text-secondary)',
              borderBottom: activeSubTab === 'qa' ? '3px solid var(--color-pink)' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <HelpCircle size={14} /> Q&A ({questions.length})
          </button>
          <button 
            onClick={() => setActiveSubTab('poll')}
            style={{ 
              flex: 1, 
              padding: '16px', 
              fontSize: '12px', 
              fontWeight: 'bold', 
              color: activeSubTab === 'poll' ? 'var(--color-pink)' : 'var(--color-text-secondary)',
              borderBottom: activeSubTab === 'poll' ? '3px solid var(--color-pink)' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <BarChart3 size={14} /> Polls
          </button>
        </div>

        {/* Tab Content Body (Scrollable) */}
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '16px' }}>
          
          {/* Chat Tab */}
          {activeSubTab === 'chat' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '100%' }}>
              <div style={{ flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '350px' }}>
                {messages.map((msg, i) => (
                  <div key={i} style={{ background: 'var(--color-lavender)', padding: '10px 14px', borderRadius: '14px', alignSelf: 'flex-start', maxWidth: '90%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginBottom: '2px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--color-violet)' }}>{msg.user}</span>
                      <span style={{ fontSize: '9px', color: 'var(--color-text-secondary)' }}>{msg.time}</span>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--color-text-primary)' }}>{msg.text}</p>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--color-border)', paddingTop: '12px', marginTop: 'auto' }}>
                <input 
                  type="text" 
                  placeholder="Type a message..." 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  style={{ flexGrow: 1, padding: '10px 16px', border: '1px solid var(--color-border)', borderRadius: '9999px', fontSize: '13px', outline: 'none' }}
                />
                <button type="submit" style={{ background: 'var(--color-pink)', color: 'white', padding: '10px', borderRadius: '50%', display: 'flex' }}>
                  <Send size={14} />
                </button>
              </form>
            </div>
          )}

          {/* Q&A Tab */}
          {activeSubTab === 'qa' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '100%' }}>
              <form onSubmit={handleSendQuestion} style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--color-border)', paddingBottom: '16px', marginBottom: '8px' }}>
                <input 
                  type="text" 
                  placeholder="Ask a technical question..." 
                  value={questionInput}
                  onChange={(e) => setQuestionInput(e.target.value)}
                  style={{ flexGrow: 1, padding: '10px 16px', border: '1px solid var(--color-border)', borderRadius: '9999px', fontSize: '13px', outline: 'none' }}
                />
                <button type="submit" style={{ background: 'var(--color-purple)', color: 'white', padding: '10px 16px', borderRadius: '9999px', fontSize: '12px', fontWeight: 'bold' }}>
                  Ask
                </button>
              </form>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto', maxHeight: '300px' }}>
                {questions.map((q) => (
                  <div key={q.id} style={{ border: '1px solid var(--color-border)', padding: '14px', borderRadius: '16px', background: 'white' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                      <p style={{ fontSize: '13px', fontWeight: 600 }}>{q.text}</p>
                      <button 
                        onClick={() => handleUpvote(q.id)}
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '4px', 
                          fontSize: '11px', 
                          border: '1px solid var(--color-border)', 
                          padding: '4px 8px', 
                          borderRadius: '10px',
                          background: q.upvoted ? 'var(--color-soft-pink)' : 'transparent',
                          color: q.upvoted ? 'var(--color-pink)' : 'var(--color-text-secondary)'
                        }}
                      >
                        <ThumbsUp size={11} /> {q.votes}
                      </button>
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--color-text-secondary)', marginTop: '8px' }}>
                      Asked by: {q.user}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Polls Tab */}
          {activeSubTab === 'poll' && (
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '16px' }}>
                What AI topic are you most excited to learn today?
              </h4>

              {!pollVoted ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {Object.keys(pollVotes).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleVotePoll(opt)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '12px 18px',
                        border: '1px solid var(--color-border)',
                        borderRadius: '16px',
                        fontSize: '13px',
                        background: 'white',
                        fontWeight: 500,
                        hover: { background: 'var(--color-soft-pink)' }
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {Object.entries(pollVotes).map(([opt, votes]) => {
                    const percentage = totalPollVotes > 0 ? Math.round((votes / totalPollVotes) * 100) : 0;
                    return (
                      <div key={opt}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>
                          <span>{opt}</span>
                          <span>{percentage}% ({votes} votes)</span>
                        </div>
                        {/* Progress Bar */}
                        <div style={{ width: '100%', height: '10px', background: 'var(--color-lavender)', borderRadius: '10px', overflow: 'hidden' }}>
                          <div style={{ width: `${percentage}%`, height: '100%', background: 'linear-gradient(to right, var(--color-pink), var(--color-purple))', borderRadius: '10px' }} />
                        </div>
                      </div>
                    );
                  })}
                  
                  <button 
                    onClick={() => setPollVoted(false)} 
                    style={{ fontSize: '11px', color: 'var(--color-pink)', fontWeight: 'bold', marginTop: '12px' }}
                  >
                    Change Vote / Reset
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </GlassCard>
    </div>
  );
}
