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
const uri = 'mongodb+srv://aaryan:aryan_1234@cluster0.glhysjf.mongodb.net/testDB?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Submission schema
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

// User schema
const userSchema = new mongoose.Schema({
    name: String,
    rollno: String,
    usn: String,
    phone: String,
    email: String,
    password: String,
  });

// Submission model
const Submission = mongoose.model('Submission', submissionSchema);

// User model
const User = mongoose.model('User', userSchema);

// API endpoint to handle signup route
app.post('/signup', async (req, res) => { //change api path - /api/signup
  const { name, rollno, usn, phone, email, password } = req.body;

  const newUser = new User({ name, rollno, usn, phone, email, password });
  try {
    await newUser.save();
    res.status(201).send('User signed up successfully!');
  } catch (error) {
    res.status(400).send('Error signing up user: ' + error.message);
  }
});

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

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
