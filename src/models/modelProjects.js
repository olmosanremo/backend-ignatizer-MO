


const mongoose = require('mongoose');

// Schema für Projekte
const projectSchema = new mongoose.Schema({
    name: String,
    synth_data_order: [
        {
            synth_data_id: { type: mongoose.Schema.Types.ObjectId, ref: 'SynthData' },
            order: Number
        }
    ],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
