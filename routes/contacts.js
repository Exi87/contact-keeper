const express = require('express')

const router = express.Router()
const { check, validationResult } = require('express-validator');

const auth = require('../middleware/auth')
const User = require('../models/User')
const Contact = require('../models/Contacts')
// @route  Get /api/contacts
//@des   Get all user contacts !!!!! 
//@access  private

router.get('/', auth, async (req, res) => {

    try {

        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 })

        res.json(contacts)
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error')

    }

})

// @route  Post /api/contacts
//@des  Add contact !!!!! 
//@access  private

router.post('/', [auth, [
    check('name', 'Name is required').not().isEmpty()
]], async (req, res) => {

    const errors = validationResult(req)


    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, name, phone, type } = req.body

    try {

        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        })

        const contact = await newContact.save();

        res.json(contact)
          console.log(contact);
          

    } catch (err) {
        console.error(err.message);

        res.status(500).send("Server Error")


    }

})


// @route  Put /api/contacts/:id
//@des   Update contacts !!!!! 
//@access  private

router.put('/:id', auth, async (req, res) => {
    const { email, name, phone, type } = req.body;

    //Build contact object

    const contactField = {}
    if (name) contactField.name = name;
    if (email) contactField.email = email;
    if (phone) contactField.phone = phone;
    if (type) contactField.type = type

    try {
        let checkContact = await Contact.findById(req.params.id)
        if (!checkContact) return res.status(404).json({ msg: 'Contact not found' })

        let addNewContact = await Contact.findByIdAndUpdate(req.params.id, { $set: contactField },
            { new: true });

        res.json(addNewContact)
    } catch (err) {

        console.error(err.message);

        res.status(500).send("Server Error")


    }
})


// @route  Delete /api/contacts/:id
//@des   delete contacts !!!!! 
//@access  private

router.delete('/:id', auth, async (req, res) => {

    try {
        let checkContact = await Contact.findById(req.params.id)
        if (!checkContact) return res.status(401).json({ msg: 'Contact not found' })

            await Contact.findByIdAndRemove(req.params.id)


        res.json({ msg: ' Contact delete' })
    } catch (err) {

        console.error(err.message);

        res.status(500).send("Server Error")


    }
})


module.exports = router