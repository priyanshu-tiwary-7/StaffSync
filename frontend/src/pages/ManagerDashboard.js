import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function ManagerDashboard() {
  const [activeTab, setActiveTab] = useState('Leave Applications');
  const tabs = ['Leave Applications', 'Training & Development'];
  
  const user = JSON.parse(localStorage.getItem('user'));

  // --- LEAVE STATES ---
  const [leaves, setLeaves] = useState([]);

  // --- TRAINING STATES ---
  const [trainingData, setTrainingData] = useState({ title: '', description: '', date: '', trainer: '' });
  const [trainings, setTrainings] = useState([]);
  const [trainingMessage, setTrainingMessage] = useState('');

  // --- FETCH DATA ---
  const fetchLeaves = async () => {
    try {
      const response = await axios.get('https://staffsync-backend-1l4u.onrender.com/api/leaves');
      setLeaves(response.data);
    } catch (error) { console.error(error); }
  };

  const fetchTrainings = async () => {
    try {
      const response = await axios.get('https://staffsync-backend-1l4u.onrender.com/api/trainings');
      setTrainings(response.data);
    } catch (error) { console.error(error); }
  };
 // eslint-disable-next-line react-hooks/exhaustive-deps
 useEffect(() => {
    fetchLeaves();
    fetchTrainings();
  }, []);

  // --- HANDLERS ---
  const handleLeaveAction = async (id, newStatus) => {
    try {
      await axios.put(`https://staffsync-backend-1l4u.onrender.com/api/leaves/${id}`, { 
        status: newStatus, 
        approverRole: user.role 
      });
      fetchLeaves();
    } catch (error) { console.error(error); }
  };

  const handleCreateTraining = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://staffsync-backend-1l4u.onrender.com/api/trainings', {
        ...trainingData,
        createdBy: user._id
      });
      setTrainingMessage('Training created successfully!');
      setTrainingData({ title: '', description: '', date: '', trainer: '' });
      fetchTrainings();
      setTimeout(() => setTrainingMessage(''), 3000);
    } catch (error) {
      setTrainingMessage('Error creating training');
    }
  };

  return (
    <div style={{ backgroundColor: '#12141a', minHeight: '100vh', color: 'white' }}>
      <Navbar title="Manager Dashboard" tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div style={{ padding: '30px' }}>
        
        {/* --- LEAVE APPLICATIONS TAB --- */}
        {activeTab === 'Leave Applications' && (
          <div>
            <h2 style={{ marginBottom: '20px' }}>Leave Applications</h2>
            <div style={{ backgroundColor: '#1a1d24', padding: '20px', borderRadius: '8px', border: '1px solid #2c313c' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #2c313c', color: '#8b92a5' }}>
                    <th style={thStyle}>Employee</th>
                    <th style={thStyle}>Email</th>
                    <th style={thStyle}>Start Date</th>
                    <th style={thStyle}>End Date</th>
                    <th style={thStyle}>Reason</th>
                    <th style={thStyle}>Status</th>
                    <th style={thStyle}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leaves.map((leave) => (
                    <tr key={leave._id} style={{ borderBottom: '1px solid #2c313c' }}>
                      <td style={tdStyle}>{leave.user?.name}</td>
                      <td style={tdStyle}>{leave.user?.email}</td>
                      <td style={tdStyle}>{new Date(leave.startDate).toLocaleDateString()}</td>
                      <td style={tdStyle}>{new Date(leave.endDate).toLocaleDateString()}</td>
                      <td style={tdStyle}>{leave.reason}</td>
                      <td style={{...tdStyle, color: leave.status === 'Pending' ? '#facc15' : leave.status === 'Approved' ? '#4ade80' : '#e63946'}}>
                        {leave.status}
                      </td>
                      <td style={tdStyle}>
                        {leave.status === 'Pending' && (
                          <>
                            <button onClick={() => handleLeaveAction(leave._id, 'Approved')} style={{...btnStyle, backgroundColor: '#4ade80', marginRight: '10px'}}>Approve</button>
                            <button onClick={() => handleLeaveAction(leave._id, 'Rejected')} style={{...btnStyle, backgroundColor: '#e63946'}}>Reject</button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- TRAINING TAB --- */}
        {activeTab === 'Training & Development' && (
          <div>
            <h2 style={{ marginBottom: '20px' }}>Training & Development</h2>
            
            <div style={{ backgroundColor: '#1a1d24', padding: '20px', borderRadius: '8px', border: '1px solid #2c313c', marginBottom: '30px' }}>
              <h3 style={{ marginBottom: '15px' }}>Create Training Program</h3>
              {trainingMessage && <p style={{ color: '#4ade80' }}>{trainingMessage}</p>}
              
              <form onSubmit={handleCreateTraining} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <input type="text" placeholder="Training Title" value={trainingData.title} onChange={(e) => setTrainingData({...trainingData, title: e.target.value})} required style={inputStyle} />
                <input type="date" value={trainingData.date} onChange={(e) => setTrainingData({...trainingData, date: e.target.value})} required style={inputStyle} />
                <input type="text" placeholder="Trainer Name" value={trainingData.trainer} onChange={(e) => setTrainingData({...trainingData, trainer: e.target.value})} style={inputStyle} />
                <input type="text" placeholder="Description" value={trainingData.description} onChange={(e) => setTrainingData({...trainingData, description: e.target.value})} required style={inputStyle} />
                <button type="submit" style={{ gridColumn: 'span 2', padding: '12px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Create Training</button>
              </form>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {trainings.map((training) => (
                <div key={training._id} style={{ backgroundColor: '#1a1d24', padding: '20px', borderRadius: '8px', border: '1px solid #2c313c' }}>
                  <h4 style={{ margin: '0 0 10px 0', color: '#3b82f6' }}>{training.title}</h4>
                  <p style={{ margin: '0 0 10px 0', color: 'white' }}>{training.description}</p>
                  <small style={{ color: '#8b92a5' }}>Date: {new Date(training.date).toLocaleDateString()} | Trainer: {training.trainer || 'TBD'}</small>
                </div>
              ))}
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
const btnStyle = { padding: '6px 12px', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' };

export default ManagerDashboard;