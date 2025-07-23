


const mongoose = require('mongoose');
const quoteRoutes = require('./routes/quoteRoutes');
const express = require('express');
// const mongoURI = 'mongodb://localhost:27017/my-mongo';
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/my-mongo';

const bodyParser = require('body-parser');
const paymentRoutes = require('./routes/payment');
require('dotenv').config();
const cors = require('cors');

const client = require('prom-client'); // Prometheus client

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

const app = express();

// Prometheus: collect default metrics (CPU, memory, etc.) every 5 seconds
client.collectDefaultMetrics({ timeout: 5000 });

// Create a Histogram metric for HTTP request durations
const httpRequestDurationMicroseconds = new client.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['method', 'route', 'code'],
    buckets: [50, 100, 200, 300, 400, 500, 1000] // buckets for response time from 50ms to 1000ms
});

// Middleware to measure HTTP request duration
app.use((req, res, next) => {
    const startHrTime = process.hrtime();

    res.on('finish', () => {
        const diff = process.hrtime(startHrTime);
        // convert to ms
        const responseTimeInMs = diff[0] * 1e3 + diff[1] / 1e6;

        httpRequestDurationMicroseconds
            .labels(req.method, req.route ? req.route.path : req.path, res.statusCode)
            .observe(responseTimeInMs);
    });

    next();
});

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(bodyParser.json());

// Add your existing routes
app.use("/api/quotes", quoteRoutes);
app.use('/api/payment', paymentRoutes);

// Prometheus metrics endpoint
app.get('/metrics', async (req, res) => {
    try {
        res.set('Content-Type', client.register.contentType);
        const metrics = await client.register.metrics();
        res.end(metrics);
    } catch (ex) {
        res.status(500).end(ex);
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
