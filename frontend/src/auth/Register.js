import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Employee', department: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://staffsync-backend-1l4u.onrender.com/api/users/register', formData);
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#12141a' }}>
      <div style={{ backgroundColor: '#1a1d24', padding: '40px', borderRadius: '8px', border: '1px solid #2c313c', width: '350px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: 'white' }}>HRM Portal Register</h2>
        
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ color: '#8b92a5', marginBottom: '5px' }}>Name</label>
          <input type="text" onChange={(e) => setFormData({...formData, name: e.target.value})} required style={inputStyle} />

          <label style={{ color: '#8b92a5', marginBottom: '5px' }}>Email</label>
          <input type="email" onChange={(e) => setFormData({...formData, email: e.target.value})} required style={inputStyle} />

          <label style={{ color: '#8b92a5', marginBottom: '5px' }}>Password</label>
          <input type="password" onChange={(e) => setFormData({...formData, password: e.target.value})} required style={inputStyle} />

          <label style={{ color: '#8b92a5', marginBottom: '5px' }}>Role</label>
          <select onChange={(e) => setFormData({...formData, role: e.target.value})} style={inputStyle}>
            <option value="Employee">Employee</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
          </select>

          <label style={{ color: '#8b92a5', marginBottom: '5px' }}>Department</label>
          <input type="text" onChange={(e) => setFormData({...formData, department: e.target.value})} style={inputStyle} />

          <button type="submit" style={{ padding: '12px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}>
            Register
          </button>
        </form>

        <p style={{ textAlign: 'center', color: '#8b92a5', marginTop: '20px', fontSize: '14px' }}>
          Already have an account? <Link to="/login" style={{ color: '#3b82f6', textDecoration: 'none' }}>Login</Link>
        </p>
      </div>
    </div>
  );
}

const inputStyle = { padding: '10px', marginBottom: '15px', borderRadius: '4px', border: '1px solid #2c313c', backgroundColor: '#12141a', color: 'white' };

export default Register;