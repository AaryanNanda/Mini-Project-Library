const axios = require('axios'); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// MongoDB Atlas connection string
const uri = 'mongodb+srv://aarnanrt23:maM7goYYV7Mm81d1@cluster0.jfqoyfq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Defining submission model
const submissionSchema = new mongoose.Schema({
    studentName: String,
    email: String,
    projectTitle: String,
    frontendLang: String,
    backendLang: String,
    databaseLang: String,
    githubLink: String,
    guideName: String
});

const Submission = mongoose.model('Submission', submissionSchema);

// API endpoint to handle form submissions
app.post('/api/submissions', async (req, res) => {
    try {
        const submission = new Submission(req.body);
        await submission.save();
        res.status(201).send(submission);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/api/submissions', async (req, res) => {
    try {
        const submissions = await Submission.find();
        res.send(submissions);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
