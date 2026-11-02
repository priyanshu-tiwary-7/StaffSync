import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar({ title, tabs, activeTab, setActiveTab }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div>
      {/* Top Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1a1d24', padding: '15px 30px', borderBottom: '2px solid #2c313c' }}>
        <h2 style={{ color: 'white', margin: 0, fontSize: '20px' }}>{title}</h2>
        <button 
          onClick={handleLogout}
          style={{ backgroundColor: '#e63946', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Logout
        </button>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '20px', backgroundColor: '#1a1d24', padding: '10px 30px' }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              backgroundColor: activeTab === tab ? '#2c313c' : 'transparent',
              color: activeTab === tab ? 'white' : '#8b92a5',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: activeTab === tab ? 'bold' : 'normal'
            }}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Navbar;