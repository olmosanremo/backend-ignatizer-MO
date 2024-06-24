const mongoose = require('mongoose');

const PointSchema = new mongoose.Schema({
    x: Number,
    y: Number
});

const LineSchema = new mongoose.Schema({
    points: [PointSchema]
});

const SynthDataSchema = new mongoose.Schema({
    name: String,
    lines: {
        red: [LineSchema],
        yellow: [LineSchema],
        green: [LineSchema]
    }
});

module.exports = mongoose.model('SynthData', SynthDataSchema);
