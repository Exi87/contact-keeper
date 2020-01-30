const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const router = express.Router()
const { check, validationResult } = require('express-validator');
const User = require('../models/User')
// @route  Post /api/users
//@des    user has been register !!!!! 
//@access  public

router.post('/', [
    check('name', 'Name is require').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Enter a password with a 6 or mor caracters').isLength({
        min: 6
    })
], async (req, res) => {

    const errors = validationResult(req)


    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    //body should have name, email, password
    const { name, email, password } = req.body

    try {

        //find a user by email
        let user = await User.findOne({ email })
        
        //check user exist
        if (user) {
            return res.status(400).json({ msg: 'User already exists' })


        }
        //now create the new user
        user = new User({
            name,
            email,
            password
        });

        //hash the passord

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        //get the token

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {
            if (err) throw err;

            res.json({ token })

        })

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')

    }
})



module.exports = router