const express = require('express');
const routerProjects = express.Router();
const Project = require('../models/modelProjects');

// Route zum Abrufen aller Projekte
routerProjects.get('/', async (req, res) => {
    console.log("GET /api/projects aufgerufen");
    try {
        const projects = await Project.find();
        res.status(200).send(projects);
    } catch (error) {
        console.log("Fehler beim Abrufen der Projekte:", error);
        res.status(500).send(error);
    }
});

// Route zum Abrufen eines Projekts nach ID
routerProjects.get('/:id', async (req, res) => {
    console.log("GET /api/projects/:id aufgerufen");
    try {
        const project = await Project.findById(req.params.id).populate('synth_data_order.synth_data_id');
        if (!project) {
            return res.status(404).send({ message: 'Projekt nicht gefunden' });
        }
        console.log("Projekt abgerufen:", project);
        res.status(200).json(project);
    } catch (error) {
        console.log("Fehler beim Abrufen des Projekts:", error);
        res.status(500).send(error);
    }
});

// Route zum Aktualisieren eines Projekts
routerProjects.put('/:id', async (req, res) => {
    console.log("PUT /api/projects/:id aufgerufen");
    console.log("Request Body:", req.body);
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                synth_data_order: req.body.synth_data_order,
                updated_at: new Date()
            },
            { new: true, runValidators: true }
        );
        if (!project) {
            return res.status(404).send({ message: 'Projekt nicht gefunden' });
        }
        console.log("Projekt erfolgreich aktualisiert");
        res.status(200).send(project);
    } catch (error) {
        console.log("Fehler beim Aktualisieren des Projekts:", error);
        res.status(400).send(error);
    }
});

// Route zum Löschen eines Projekts nach ID
routerProjects.delete('/:id', async (req, res) => {
    console.log("DELETE /api/projects/:id aufgerufen");
    try {
        const project = await Project.findByIdAndDelete(req.params.id.trim());
        if (!project) {
            return res.status(404).send({ message: 'Projekt nicht gefunden' });
        }
        console.log("Projekt erfolgreich gelöscht");
        res.status(200).send({ message: 'Projekt erfolgreich gelöscht' });
    } catch (error) {
        console.log("Fehler beim Löschen des Projekts:", error);
        res.status(500).send(error);
    }
});



module.exports = routerProjects;
