const mongoose = require('mongoose')

const adSchema = new mongoose.Schema({
    userId: {
        type: mongoose.ObjectId,
        ref: 'User'
    },
    price: {
        type: Number
    },
    title: {
        type: String
    },
    location: {
        type: String
    },
    // this date will work as date when ad is published
    date: {
        type: Date,
    },
    description: {
        type: String
    }
})

// const adModel = mongoose.model('Ad', adSchema)
// module.exports = adModel

module.exports = mongoose.model('ad', adSchema)