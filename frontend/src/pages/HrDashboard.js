import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function HrDashboard() {
  const [activeTab, setActiveTab] = useState('Leave Applications');
  const tabs = ['Leave Applications', 'Employee Management', 'Announcements', 'Attendance'];

  // --- STATES ---
  const [employeeData, setEmployeeData] = useState({ name: '', email: '', department: '', position: '', salary: '', joinDate: '', phone: '', address: '' });
  const [employees, setEmployees] = useState([]);
  const [empMessage, setEmpMessage] = useState('');

  const [announcementData, setAnnouncementData] = useState({ title: '', message: '', targetAudience: 'ALL' });
  const [announcements, setAnnouncements] = useState([]);
  const [announceMessage, setAnnounceMessage] = useState('');

  const [leaves, setLeaves] = useState([]);
  const [attendance, setAttendance] = useState([]);

  // --- FETCH DATA ---
  const fetchEmployees = async () => {
    try {
      const response = await axios.get('https://staffsync-backend-1l4u.onrender.com/api/employees');
      setEmployees(response.data);
    } catch (error) { console.error(error); }
  };

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get('https://staffsync-backend-1l4u.onrender.com/api/announcements');
      setAnnouncements(response.data);
    } catch (error) { console.error(error); }
  };

  const fetchLeaves = async () => {
    try {
      const response = await axios.get('https://staffsync-backend-1l4u.onrender.com/api/leaves');
      setLeaves(response.data);
    } catch (error) { console.error(error); }
  };

  const fetchAttendance = async () => {
    try {
      const response = await axios.get('https://staffsync-backend-1l4u.onrender.com/api/attendance');
      setAttendance(response.data);
    } catch (error) { console.error(error); }
  };

  useEffect(() => {
    fetchEmployees();
    fetchAnnouncements();
    fetchLeaves();
    fetchAttendance();
  }, []);

  // --- HANDLERS ---
  const handleEmployeeChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://staffsync-backend-1l4u.onrender.com/api/employees', employeeData);
      setEmpMessage('Employee added successfully!');
      setEmployeeData({ name: '', email: '', department: '', position: '', salary: '', joinDate: '', phone: '', address: '' });
      fetchEmployees();
      setTimeout(() => setEmpMessage(''), 3000);
    } catch (error) { setEmpMessage('Error adding employee'); }
  };

  const handlePostAnnouncement = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      await axios.post('https://staffsync-backend-1l4u.onrender.com/api/announcements', { ...announcementData, createdBy: user._id });
      setAnnounceMessage('Announcement posted successfully!');
      setAnnouncementData({ title: '', message: '', targetAudience: 'ALL' });
      fetchAnnouncements();
      setTimeout(() => setAnnounceMessage(''), 3000);
    } catch (error) { setAnnounceMessage('Error posting'); }
  };

  const handleLeaveAction = async (id, newStatus) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      await axios.put(`https://staffsync-backend-1l4u.onrender.com/api/leaves/${id}`, { status: newStatus, approverRole: user.role });
      fetchLeaves();
    } catch (error) { console.error(error); }
  };

  return (
    <div style={{ backgroundColor: '#12141a', minHeight: '100vh', color: 'white' }}>
      <Navbar title="HR Portal" tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div style={{ padding: '30px' }}>
        
        {/* --- LEAVE TAB --- */}
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

        {/* --- EMPLOYEE TAB --- */}
        {activeTab === 'Employee Management' && (
          <div>
            <h2 style={{ marginBottom: '20px' }}>Employee Management</h2>
            <div style={{ backgroundColor: '#1a1d24', padding: '20px', borderRadius: '8px', border: '1px solid #2c313c', marginBottom: '30px' }}>
              <h3 style={{ marginBottom: '15px' }}>Add New Employee</h3>
              {empMessage && <p style={{ color: '#4ade80' }}>{empMessage}</p>}
              <form onSubmit={handleAddEmployee} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <input type="text" name="name" placeholder="Full Name" value={employeeData.name} onChange={handleEmployeeChange} required style={inputStyle} />
                <input type="email" name="email" placeholder="Email" value={employeeData.email} onChange={handleEmployeeChange} required style={inputStyle} />
                <input type="text" name="department" placeholder="Department" value={employeeData.department} onChange={handleEmployeeChange} required style={inputStyle} />
                <input type="text" name="position" placeholder="Position" value={employeeData.position} onChange={handleEmployeeChange} required style={inputStyle} />
                <input type="number" name="salary" placeholder="Salary" value={employeeData.salary} onChange={handleEmployeeChange} required style={inputStyle} />
                <input type="date" name="joinDate" value={employeeData.joinDate} onChange={handleEmployeeChange} required style={inputStyle} />
                <input type="text" name="phone" placeholder="Phone (Optional)" value={employeeData.phone} onChange={handleEmployeeChange} style={inputStyle} />
                <input type="text" name="address" placeholder="Address (Optional)" value={employeeData.address} onChange={handleEmployeeChange} style={inputStyle} />
                <button type="submit" style={{ gridColumn: 'span 2', padding: '12px', backgroundColor: '#e63946', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Add Employee</button>
              </form>
            </div>
            <div style={{ backgroundColor: '#1a1d24', padding: '20px', borderRadius: '8px', border: '1px solid #2c313c' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #2c313c', color: '#8b92a5' }}>
                    <th style={thStyle}>Name</th>
                    <th style={thStyle}>Email</th>
                    <th style={thStyle}>Department</th>
                    <th style={thStyle}>Position</th>
                    <th style={thStyle}>Salary</th>
                    <th style={thStyle}>Join Date</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp) => (
                    <tr key={emp._id} style={{ borderBottom: '1px solid #2c313c' }}>
                      <td style={tdStyle}>{emp.name}</td>
                      <td style={tdStyle}>{emp.email}</td>
                      <td style={tdStyle}>{emp.department}</td>
                      <td style={tdStyle}>{emp.position}</td>
                      <td style={tdStyle}>${emp.salary}</td>
                      <td style={tdStyle}>{new Date(emp.joinDate).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- ANNOUNCEMENTS TAB --- */}
        {activeTab === 'Announcements' && (
          <div>
            <h2 style={{ marginBottom: '20px' }}>Announcements</h2>
            <div style={{ backgroundColor: '#1a1d24', padding: '20px', borderRadius: '8px', border: '1px solid #2c313c', marginBottom: '30px' }}>
              <h3 style={{ marginBottom: '15px' }}>Post New Announcement</h3>
              {announceMessage && <p style={{ color: '#4ade80' }}>{announceMessage}</p>}
              <form onSubmit={handlePostAnnouncement} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input type="text" placeholder="Title" value={announcementData.title} onChange={(e) => setAnnouncementData({...announcementData, title: e.target.value})} required style={inputStyle} />
                <textarea placeholder="Message" rows="3" value={announcementData.message} onChange={(e) => setAnnouncementData({...announcementData, message: e.target.value})} required style={inputStyle} />
                <select value={announcementData.targetAudience} onChange={(e) => setAnnouncementData({...announcementData, targetAudience: e.target.value})} style={inputStyle}>
                  <option value="ALL">All</option>
                  <option value="Employees">Employees</option>
                  <option value="Managers">Managers</option>
                </select>
                <button type="submit" style={{ padding: '12px', backgroundColor: '#e63946', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Post Announcement</button>
              </form>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {announcements.map((ann) => (
                <div key={ann._id} style={{ backgroundColor: '#1a1d24', padding: '20px', borderRadius: '8px', border: '1px solid #2c313c' }}>
                  <h4 style={{ margin: '0 0 10px 0', color: '#e63946' }}>{ann.title}</h4>
                  <p style={{ margin: '0 0 10px 0', color: 'white' }}>{ann.message}</p>
                  <small style={{ color: '#8b92a5' }}>Posted by {ann.createdBy?.name || 'Unknown'} | Target: {ann.targetAudience}</small>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- ATTENDANCE TAB --- */}
        {activeTab === 'Attendance' && (
          <div>
            <h2 style={{ marginBottom: '20px' }}>Attendance Records</h2>
            <div style={{ backgroundColor: '#1a1d24', padding: '20px', borderRadius: '8px', border: '1px solid #2c313c' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #2c313c', color: '#8b92a5' }}>
                    <th style={thStyle}>Employee</th>
                    <th style={thStyle}>Date</th>
                    <th style={thStyle}>Check In</th>
                    <th style={thStyle}>Check Out</th>
                    <th style={thStyle}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.map((record) => (
                    <tr key={record._id} style={{ borderBottom: '1px solid #2c313c' }}>
                      <td style={tdStyle}>{record.user?.name}</td>
                      <td style={tdStyle}>{new Date(record.date).toLocaleDateString()}</td>
                      <td style={tdStyle}>{record.checkInTime}</td>
                      <td style={tdStyle}>{record.checkOutTime}</td>
                      <td style={tdStyle}><span style={{ color: '#4ade80' }}>{record.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- OTHER TABS PLACEHOLDER --- */}
        {activeTab !== 'Employee Management' && activeTab !== 'Announcements' && activeTab !== 'Leave Applications' && activeTab !== 'Attendance' && (
          <div>
            <h1 style={{ marginBottom: '20px' }}>{activeTab}</h1>
            <div style={{ backgroundColor: '#1a1d24', padding: '20px', borderRadius: '8px', border: '1px solid #2c313c' }}>
              <p style={{ color: '#8b92a5' }}>This is where the {activeTab} content will go.</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// --- STYLES ---
const inputStyle = { padding: '10px', borderRadius: '4px', border: '1px solid #2c313c', backgroundColor: '#12141a', color: 'white' };
const thStyle = { padding: '12px' };
const tdStyle = { padding: '12px', color: 'white' };
const btnStyle = { padding: '6px 12px', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' };

export default HrDashboard;