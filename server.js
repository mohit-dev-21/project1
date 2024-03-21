const express = require('express');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/data', { useNewUrlParser: true, useUnifiedTopology: true });
const db=mongoose.connection;

db.once('open', () => {
    
});
const app = express();


// Middleware to parse JSON bodies
app.use(bodyParser.json());

// MongoDB schema
const ComponentSchema = new mongoose.Schema({
  title: String,
  content: String,
});
const cors = require('cors');
app.use(cors());
const Component = db.model('Component', ComponentSchema);

// API endpoints

app.post('/api/components/add', async (req, res) => {
  const startTime = new Date();
  const { title, content } = req.body;
  const newComponent = new Component({ title, content });
  await newComponent.save();
  const endTime = new Date();
  const executionTime = endTime - startTime; // in milliseconds
  console.log('Add API Execution Time:', executionTime, 'ms');
  res.json({ message: 'Component added successfully' });
});

app.put('/api/components/update/:id', async (req, res) => {
  const startTime = new Date();
  const { title, content } = req.body;
  await Component.findByIdAndUpdate(req.params.id, { title, content });
  const endTime = new Date();
  const executionTime = endTime - startTime; // in milliseconds
  console.log('Update API Execution Time:', executionTime, 'ms');
  res.json({ message: 'Component updated successfully' });
});

  
app.get('/api/components/count', async (req, res) => {
  const startTime = new Date();
  const addCount = await Component.countDocuments({}); // Count all documents
  const endTime = new Date();
  const executionTime = endTime - startTime; // in milliseconds
  console.log('Count API Execution Time:', executionTime, 'ms');
  res.json({ addCount });
});

  app.get('/api/components', async (req, res) => {
    try {
      const components = await Component.find().limit(3); // Limit the data to 3 components
      res.json(components);
    } catch (error) {
      console.error('Error fetching components:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  // Start the server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
