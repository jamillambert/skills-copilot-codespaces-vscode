// Create web server
const express = require('express');
const app = express();
const port = 3000;

// Database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const Comment = require('./models/comment');

// Middleware
app.use(express.json());

// Routes
app.get('/comments', async (req, res) => {
    const comments = await Comment.find();
    res.json(comments);
});

app.post('/comments', async (req, res) => {
    const comment = new Comment(req.body);
    await comment.save();
    res.json(comment);
});

app.get('/comments/:id', async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    res.json(comment);
});

app.put('/comments/:id', async (req, res) => {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(comment);
});

app.delete('/comments/:id', async (req, res) => {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    res.json(comment);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Path: models/comment.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
