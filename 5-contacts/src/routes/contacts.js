const contactRoutes = require('express').Router()
const Contact = require('../models/Contact')

contactRoutes.get('/', async (req, res) =>{
    const allContacts = await Contact.find({})
    res.json(allContacts)
})

contactRoutes.post('/', async (req, res) =>{
    const { contactName, contactNumber, contactImg } = req.body
    const newContact = new Contact({
        contactImg,
        contactName,
        contactNumber
    })
    const saveContact = await newContact.save()
    res.status(201).json(saveContact)
})

contactRoutes.get('/:contactName', async (req, res) =>{
    const { contactName } = req.params
    const contactByName = await Contact.findOne({ contactName: contactName })
    res.json(contactByName)
})

contactRoutes.put('/:id', async (req, res) =>{
    const { id } = req.params
    const { contactName, contactNumber, contactImg } = req.body
    const updatedNote = {
        contactImg,
        contactName,
        contactNumber
    }
    Contact.findByIdAndUpdate(id, updatedNote, { new: true })
    .then(result => {
        res.json(result)
    })
})

contactRoutes.delete('/:id', async (req, res) =>{
    const { id } = req.params
    Contact.findByIdAndRemove(id).then(result =>{
        res.status(204).end()
    })
})

module.exports = contactRoutes