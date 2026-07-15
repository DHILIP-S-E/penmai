import React, { useState, useEffect } from 'react';
import { Bell, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

let toastListeners = [];

export const showToast = (message, type = 'info') => {
  toastListeners.forEach((listener) => listener(message, type));
};

export const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const addToast = (message, type) => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev, { id, message, type }]);
      
      // Auto remove after 4 seconds
      setTimeout(() => {
        removeToast(id);
      }, 4000);
    };

    toastListeners.push(addToast);
    return () => {
      toastListeners = toastListeners.filter((listener) => listener !== addToast);
    };
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="toast-icon text-green-500" size={20} style={{ color: '#10B981' }} />;
      case 'warning':
        return <AlertTriangle className="toast-icon text-yellow-500" size={20} style={{ color: '#F59E0B' }} />;
      case 'badge':
        return <CheckCircle className="toast-icon text-pink-500 font-bold glow-pulse" size={20} style={{ color: '#ef155e' }} />;
      default:
        return <Info className="toast-icon text-purple-500" size={20} style={{ color: '#C84DFF' }} />;
    }
  };

  const getBorderColor = (type) => {
    switch (type) {
      case 'success':
        return '#10B981';
      case 'warning':
        return '#F59E0B';
      case 'badge':
        return '#ef155e';
      default:
        return '#8B5CF6';
    }
  };

  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div 
          key={t.id} 
          className="toast" 
          style={{ 
            borderLeft: `4px solid ${getBorderColor(t.type)}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'white',
            boxShadow: '0 10px 25px -5px rgba(139, 92, 246, 0.15)',
            border: '1px solid rgba(139, 92, 246, 0.1)',
            borderLeftWidth: '4px',
            borderRadius: '16px',
            padding: '16px',
            minWidth: '320px',
            animation: 'slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {getIcon(t.type)}
            <span style={{ fontSize: '14px', fontWeight: 500, color: '#1E0F30' }}>{t.message}</span>
          </div>
          <button 
            onClick={() => removeToast(t.id)} 
            style={{ 
              color: '#9CA3AF', 
              display: 'flex', 
              alignItems: 'center', 
              padding: '2px' 
            }}
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};
