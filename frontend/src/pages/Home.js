import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#12141a', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>
      
      {/* Top Navbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 50px', borderBottom: '1px solid #2c313c' }}>
        <h2 style={{ margin: 0 }}>HRM Portal</h2>
        <div>
          <button onClick={() => navigate('/login')} style={{ backgroundColor: 'transparent', color: '#3b82f6', border: '1px solid #3b82f6', padding: '8px 20px', borderRadius: '4px', cursor: 'pointer', marginRight: '10px', fontWeight: 'bold' }}>Login</button>
          <button onClick={() => navigate('/register')} style={{ backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Register</button>
        </div>
      </div>

      {/* Hero Section */}
      <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>Empower Your Workforce with <span style={{ color: '#3b82f6' }}>HRM Portal</span></h1>
        <p style={{ color: '#8b92a5', fontSize: '18px', maxWidth: '600px', margin: '0 auto 40px auto' }}>
          A smart Human Resource Management platform designed to simplify attendance tracking, leave management, employee records, and communication across teams.
        </p>
        <button onClick={() => navigate('/login')} style={{ backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '15px 40px', borderRadius: '4px', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold' }}>
          Get Started
        </button>
      </div>

      {/* Features Grid */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', padding: '0 50px', flexWrap: 'wrap' }}>
        <div style={cardStyle}>
          <h3 style={{ color: '#3b82f6' }}>Employee Management</h3>
          <p style={{ color: '#8b92a5' }}>Manage employee records, roles, and information efficiently.</p>
        </div>
        <div style={cardStyle}>
          <h3 style={{ color: '#4ade80' }}>Attendance & Leaves</h3>
          <p style={{ color: '#8b92a5' }}>Track attendance and handle leave approvals easily.</p>
        </div>
        <div style={cardStyle}>
          <h3 style={{ color: '#facc15' }}>HR & Manager Tools</h3>
          <p style={{ color: '#8b92a5' }}>Handle team announcements, performance, and training modules.</p>
        </div>
      </div>

    </div>
  );
}

const cardStyle = { backgroundColor: '#1a1d24', padding: '30px', borderRadius: '8px', border: '1px solid #2c313c', width: '250px' };

export default Home;