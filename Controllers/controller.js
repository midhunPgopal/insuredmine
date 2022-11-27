const dataModel = require('../models/dataSchema')

const postData = async (req, res) => {
    const newData = new dataModel(req.body)
    try {
        await newData.save()
        res.status(200).json({ msg: 'Data created' })
    } catch (error) {
        res.status(500).json(error)
    }
}

const getData = async (req, res) => {
    try {
        const allData = await dataModel.find()
        res.status(200).json(allData)
    } catch (error) {
        res.status(500).json(error)
    }
}

const editData = async (req, res) => {
    const data = req.body.data
    try {
        await dataModel.findByIdAndUpdate(req.body.id, {
            $set: { data }
        })
        res.status(200).json({ msg: 'Data updated' })
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteData = async (req, res) => {
    try {
        await dataModel.findByIdAndDelete(req.body.id)
        res.status(200).json({ msg: 'data cleared' })
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = { getData, postData, editData, deleteData }