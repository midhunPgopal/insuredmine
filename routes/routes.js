const router = require('express').Router()
const { deleteData, editData, postData, getData } = require('../Controllers/controller')

router.get('/', getData)

router.post('/', postData)

router.put('/', editData)

router.delete('/', deleteData)

module.exports = router