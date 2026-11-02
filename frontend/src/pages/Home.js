import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#0f111a', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Navbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 50px', borderBottom: '1px solid #1f2330' }}>
        <h2 style={{ margin: 0, color: '#3b82f6' }}>HRM Portal</h2>
        <button onClick={() => navigate('/login')} style={{ backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Login / Register
        </button>
      </div>

      {/* Hero Section */}
      <div style={{ textAlign: 'center', padding: '80px 20px', flexGrow: 1 }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>
          Empower Your Workforce with <span style={{ color: '#3b82f6' }}>HRM Portal</span>
        </h1>
        <p style={{ color: '#8b92a5', fontSize: '18px', maxWidth: '600px', margin: '0 auto 40px auto' }}>
          A smart Human Resource Management platform designed to simplify attendance tracking, leave management, employee records, and communication across teams.
        </p>
        <button onClick={() => navigate('/login')} style={{ backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '12px 30px', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>
          Get Started
        </button>

        {/* Features Grid */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', padding: '60px 50px 20px 50px', flexWrap: 'wrap' }}>
          
          <div style={cardStyle}>
            <div style={{ color: '#3b82f6', fontSize: '30px', marginBottom: '15px' }}>👤</div>
            <h3 style={{ color: 'white', fontSize: '18px', marginBottom: '10px' }}>Employee Management</h3>
            <p style={{ color: '#8b92a5', fontSize: '14px' }}>Manage employee records, roles, and information efficiently.</p>
          </div>

          <div style={cardStyle}>
            <div style={{ color: '#4ade80', fontSize: '30px', marginBottom: '15px' }}>📅</div>
            <h3 style={{ color: 'white', fontSize: '18px', marginBottom: '10px' }}>Attendance & Leave</h3>
            <p style={{ color: '#8b92a5', fontSize: '14px' }}>Track attendance and handle leave approvals easily.</p>
          </div>

          <div style={cardStyle}>
            <div style={{ color: '#facc15', fontSize: '30px', marginBottom: '15px' }}>💼</div>
            <h3 style={{ color: 'white', fontSize: '18px', marginBottom: '10px' }}>HR & Manager Tools</h3>
            <p style={{ color: '#8b92a5', fontSize: '14px' }}>Handle team announcements, performance, and training modules.</p>
          </div>

          <div style={cardStyle}>
            <div style={{ color: '#ec4899', fontSize: '30px', marginBottom: '15px' }}>🎓</div>
            <h3 style={{ color: 'white', fontSize: '18px', marginBottom: '10px' }}>Employee Growth</h3>
            <p style={{ color: '#8b92a5', fontSize: '14px' }}>Monitor performance and assign development trainings.</p>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: '20px', borderTop: '1px solid #1f2330', color: '#555' }}>
        <p style={{ margin: 0, fontSize: '14px' }}>© 2026 HRM Portal — Empowering Teams, Simplifying Workflows.</p>
      </div>

    </div>
  );
}

const cardStyle = { backgroundColor: '#161922', padding: '30px 20px', borderRadius: '8px', border: '1px solid #1f2330', width: '220px', textAlign: 'center' };

export default Home;