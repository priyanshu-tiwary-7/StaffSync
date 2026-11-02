import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function EmployeeDashboard() {
  const [activeTab, setActiveTab] = useState('Announcements');
  const tabs = ['Announcements', 'Leaves', 'Attendance', 'Profile'];
  
  // Get logged-in user from local storage
  const user = JSON.parse(localStorage.getItem('user'));

  // --- LEAVE STATES ---
  const [leaveData, setLeaveData] = useState({ startDate: '', endDate: '', reason: '' });
  const [myLeaves, setMyLeaves] = useState([]);
  const [leaveMessage, setLeaveMessage] = useState('');

  // --- ATTENDANCE STATES ---
  const [myAttendance, setMyAttendance] = useState([]);

  // --- ANNOUNCEMENT STATES ---
  const [announcements, setAnnouncements] = useState([]);

  // --- FETCH DATA ---
  const fetchMyLeaves = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/leaves?userId=${user._id}`);
      setMyLeaves(response.data);
    } catch (error) { console.error(error); }
  };

  const fetchMyAttendance = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/attendance?userId=${user._id}`);
      setMyAttendance(response.data);
    } catch (error) { console.error(error); }
  };

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/announcements');
      setAnnouncements(response.data);
    } catch (error) { console.error(error); }
  };

  useEffect(() => {
    fetchMyLeaves();
    fetchMyAttendance();
    fetchAnnouncements();
  }, []);

  // --- HANDLERS ---
  const handleApplyLeave = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/leaves', {
        ...leaveData,
        user: user._id
      });
      setLeaveMessage('Leave applied successfully!');
      setLeaveData({ startDate: '', endDate: '', reason: '' });
      fetchMyLeaves();
      setTimeout(() => setLeaveMessage(''), 3000);
    } catch (error) {
      setLeaveMessage('Error applying for leave');
    }
  };

  const handleCheckInOut = async () => {
    try {
      await axios.post('http://localhost:8000/api/attendance', { user: user._id });
      fetchMyAttendance();
    } catch (error) { console.error(error); }
  };

  return (
    <div style={{ backgroundColor: '#12141a', minHeight: '100vh', color: 'white' }}>
      <Navbar title="Employee Portal" tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div style={{ padding: '30px' }}>
        
        {/* --- ANNOUNCEMENTS TAB --- */}
        {activeTab === 'Announcements' && (
          <div>
            <h2 style={{ marginBottom: '20px' }}>Company Announcements</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {announcements.length === 0 ? (
                <div style={{ backgroundColor: '#1a1d24', padding: '20px', borderRadius: '8px', border: '1px solid #2c313c' }}>
                  <p style={{ color: '#8b92a5' }}>No announcements available.</p>
                </div>
              ) : (
                announcements.map((ann) => (
                  <div key={ann._id} style={{ backgroundColor: '#1a1d24', padding: '20px', borderRadius: '8px', border: '1px solid #2c313c' }}>
                    <h4 style={{ margin: '0 0 10px 0', color: '#e63946' }}>{ann.title}</h4>
                    <p style={{ margin: '0 0 10px 0', color: 'white' }}>{ann.message}</p>
                    <small style={{ color: '#8b92a5' }}>Posted by {ann.createdBy?.name || 'Unknown'} | Target: {ann.targetAudience}</small>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* --- LEAVES TAB --- */}
        {activeTab === 'Leaves' && (
          <div>
            <h2 style={{ marginBottom: '20px' }}>Apply for Leave</h2>
            
            <div style={{ backgroundColor: '#1a1d24', padding: '20px', borderRadius: '8px', border: '1px solid #2c313c', marginBottom: '30px' }}>
              {leaveMessage && <p style={{ color: '#4ade80' }}>{leaveMessage}</p>}
              <form onSubmit={handleApplyLeave} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <input type="date" value={leaveData.startDate} onChange={(e) => setLeaveData({...leaveData, startDate: e.target.value})} required style={inputStyle} />
                <input type="date" value={leaveData.endDate} onChange={(e) => setLeaveData({...leaveData, endDate: e.target.value})} required style={inputStyle} />
                <input type="text" placeholder="Reason for leave" value={leaveData.reason} onChange={(e) => setLeaveData({...leaveData, reason: e.target.value})} required style={{ ...inputStyle, gridColumn: 'span 2' }} />
                <button type="submit" style={{ gridColumn: 'span 2', padding: '12px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Apply Leave</button>
              </form>
            </div>

            <h3 style={{ marginBottom: '15px' }}>My Leaves</h3>
            <div style={{ backgroundColor: '#1a1d24', padding: '20px', borderRadius: '8px', border: '1px solid #2c313c' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #2c313c', color: '#8b92a5' }}>
                    <th style={thStyle}>Start Date</th>
                    <th style={thStyle}>End Date</th>
                    <th style={thStyle}>Reason</th>
                    <th style={thStyle}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {myLeaves.map((leave) => (
                    <tr key={leave._id} style={{ borderBottom: '1px solid #2c313c' }}>
                      <td style={tdStyle}>{new Date(leave.startDate).toLocaleDateString()}</td>
                      <td style={tdStyle}>{new Date(leave.endDate).toLocaleDateString()}</td>
                      <td style={tdStyle}>{leave.reason}</td>
                      <td style={{...tdStyle, color: leave.status === 'Pending' ? '#facc15' : leave.status === 'Approved' ? '#4ade80' : '#e63946'}}>
                        {leave.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- ATTENDANCE TAB --- */}
        {activeTab === 'Attendance' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2>My Attendance</h2>
              <button onClick={handleCheckInOut} style={{ padding: '12px 24px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                Mark Attendance (Check In / Out)
              </button>
            </div>
            
            <div style={{ backgroundColor: '#1a1d24', padding: '20px', borderRadius: '8px', border: '1px solid #2c313c' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #2c313c', color: '#8b92a5' }}>
                    <th style={thStyle}>Date</th>
                    <th style={thStyle}>Check In</th>
                    <th style={thStyle}>Check Out</th>
                    <th style={thStyle}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {myAttendance.map((record) => (
                    <tr key={record._id} style={{ borderBottom: '1px solid #2c313c' }}>
                      <td style={tdStyle}>{new Date(record.date).toLocaleDateString()}</td>
                      <td style={tdStyle}>{record.checkInTime || '-'}</td>
                      <td style={tdStyle}>{record.checkOutTime || '-'}</td>
                      <td style={tdStyle}><span style={{ color: '#4ade80' }}>{record.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- PROFILE TAB --- */}
        {activeTab === 'Profile' && (
          <div>
            <h2 style={{ marginBottom: '20px' }}>My Profile</h2>
            <div style={{ backgroundColor: '#1a1d24', padding: '30px', borderRadius: '8px', border: '1px solid #2c313c', maxWidth: '500px' }}>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ color: '#8b92a5', fontSize: '14px' }}>Name</label>
                <p style={{ margin: '5px 0 0 0', fontSize: '18px', fontWeight: 'bold' }}>{user.name}</p>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ color: '#8b92a5', fontSize: '14px' }}>Email</label>
                <p style={{ margin: '5px 0 0 0', fontSize: '18px', fontWeight: 'bold' }}>{user.email}</p>
              </div>

              <div>
                <label style={{ color: '#8b92a5', fontSize: '14px' }}>Role</label>
                <p style={{ margin: '5px 0 0 0', fontSize: '18px', fontWeight: 'bold', color: '#4ade80' }}>{user.role}</p>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

const inputStyle = { padding: '10px', borderRadius: '4px', border: '1px solid #2c313c', backgroundColor: '#12141a', color: 'white' };
const thStyle = { padding: '12px' };
const tdStyle = { padding: '12px', color: 'white' };

export default EmployeeDashboard;