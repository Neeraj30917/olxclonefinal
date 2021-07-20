const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName: {
        type: String
    },
    mobileNumber: {
        type: Number
    },
    userName: {
        type: String
    },
    password: {
        type: String
    },
    // this date will work as when user have signed up
    date: {
        type: Date,
        // default: Date.now
    }
})

// const userModel = mongoose.model('User', userSchema)
// module.exports = userModel

module.exports = mongoose.model('user', userSchema)