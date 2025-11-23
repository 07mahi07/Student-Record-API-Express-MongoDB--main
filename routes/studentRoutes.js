const express = require('express');
const router = express.Router();
const Student = require('../models/studentModel');

// GET /students → fetch all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /students → add new student
router.post('/', async (req, res) => {
  try {
    const { name, course, age, city } = req.body;

    if (!name || !course) {
      return res.status(400).json({ message: 'Name and course are required' });
    }

    const newStudent = new Student({ name, course, age, city });
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /students/:id → update student info
router.put('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /students/:id → delete student
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
