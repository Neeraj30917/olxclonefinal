const express = require('express')
const router = express.Router()
const adTemplateCopy = require('../models/AdModel')
const userTemplateCopy = require('../models/UserDetailsModel')
const bcrypt = require('bcrypt')
const axios = require('axios')

// signup request
router.post('/signup', async (req, res) => {
    console.log("signup", req.body);
    const string = `https://2factor.in/API/V1/${process.env.MESSAGE_API_KEY}/SMS/+91${req.body.mobileNumber}/AUTOGEN`;
    axios.get(string)
        .then(response2Factor => {
            res.json(response2Factor.data)
        })
        .catch(error => {
            res.json({})
        })
})

router.post('/otpverify', async (request, response) => {
    console.log("otp verify", request.body);
    const string = `https://2factor.in/API/V1/${process.env.MESSAGE_API_KEY}/SMS/VERIFY/${request.body.details}/${request.body.otp}`
    axios.get(string)
        .then(async (response2Factor) => {
            const saltPassword = await bcrypt.genSalt(10)
            const securePassword = await bcrypt.hash(request.body.password, saltPassword)

            const user = new userTemplateCopy({
                fullName: request.body.fullName,
                mobileNumber: request.body.mobileNumber,
                userName: request.body.userName,
                password: securePassword,
                date: new Date()
            })

            user.save()
                .then(data => {
                    response.json(data);
                })
                .catch(error => {
                    response.json({})
                })
        })
        .catch(error => {
            // console.log(error);
            response.json({})
        })

})

// login request
// this should be done synchronously
router.post('/login', (request, response) => {

    const findUser = {
        userName: request.body.userName,
    };

    //only wants to finds data with user name
    userTemplateCopy.findOne(findUser, (error, user) => {
        if (bcrypt.compareSync(request.body.password, user.password)) {
            response.json(user)
        }
        else {
            response.json({})
        }
    });
})

// save new ads in the database
router.post('/addnewad', async (request, response) => {

    const myAd = new adTemplateCopy({
        userId: request.body.userId,
        title: request.body.title,
        description: request.body.description,
        location: request.body.location,
        price: request.body.price,
        date: new Date()
    })

    myAd.save()
        .then(data => {
            response.json(data);
        })
        .catch(error => {
            response.json(error)
        })
})


// get the ads stored in the database
router.post('/fetchads', async (request, response) => {

    adTemplateCopy.find(request.body, (error, data) => {
        response.json(data)
    });
})

// get the ads stored in the database
router.post('/fetchuserdetails', async (request, response) => {
    console.log(request.body);
    userTemplateCopy.find(request.body, (error, data) => {
        response.json(data)
    });
})

//updating the document
router.post('/updateprofile', async (request, response) => {
    userTemplateCopy.updateOne(request.body.filter, request.body.update, (error, result) => {
        response.json(result)
    })
})

//deleting the ad
router.post('/deletead', async (request, response) => {
    // adTemplateCopy.deleteOne(request.body, (error,response)=>{
    //     if(error) return response.json({})
    //     response.json({message:"Delted Successfully"})
    // })
    const res = await adTemplateCopy.deleteOne(request.body);
    response.json({ itemsDeleted: res.deletedCount });
})

module.exports = router