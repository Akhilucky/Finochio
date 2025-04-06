const express = require('express');
const app = express();

// ...existing code...

const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');

app.use(authRoutes);
app.use(dashboardRoutes);

// ...existing code...
