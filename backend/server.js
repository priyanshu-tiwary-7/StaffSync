const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// --- BRING IN ROUTES ---
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes'); // <-- ADDED
const announcementRoutes = require('./routes/announcementRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const trainingRoutes = require('./routes/trainingRoutes');

// --- USE ROUTES ---
app.use('/api/users', userRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/employees', employeeRoutes); // <-- ADDED
app.use('/api/leaves', leaveRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/trainings', trainingRoutes);


app.get('/', (req, res) => {
    res.send('HRM Backend Running...');
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));