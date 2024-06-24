const express = require('express');
const router = express.Router();
const SynthData = require('../models/modelSynthData');

// Route to save synth data
router.post('/save', async (req, res) => {
    const { name, lines } = req.body;
    if (!name || !lines) {
        return res.status(400).send({ message: 'Name and lines are required' });
    }
    const newSynthData = new SynthData({ name, lines });
    try {
        await newSynthData.save();
        res.status(201).send({ message: 'Synth data saved successfully!' });
    } catch (error) {
        console.error('Error saving synth data:', error);
        res.status(500).send({ message: 'Error saving synth data', error });
    }
});

// Route to load synth data
router.get('/load/:name', async (req, res) => {
    const { name } = req.params;
    try {
        const synthData = await SynthData.findOne({ name });
        if (synthData) {
            res.status(200).send(synthData);
        } else {
            res.status(404).send({ message: 'Synth data not found' });
        }
    } catch (error) {
        console.error('Error loading synth data:', error);
        res.status(500).send({ message: 'Error loading synth data', error });
    }
});

// Route to update synth data
router.patch('/update', async (req, res) => {
    const { name, lines } = req.body;
    if (!name || !lines) {
        return res.status(400).send({ message: 'Name and lines are required' });
    }
    try {
        const updatedSynthData = await SynthData.findOneAndUpdate({ name }, { lines }, { new: true });
        if (updatedSynthData) {
            res.status(200).send({ message: 'Synth data updated successfully!', data: updatedSynthData });
        } else {
            res.status(404).send({ message: 'Synth data not found' });
        }
    } catch (error) {
        console.error('Error updating synth data:', error);
        res.status(500).send({ message: 'Error updating synth data', error });
    }
});

module.exports = router;
