const path = require('path')
const express = require('express')
const router = express.Router()

router.use(express.static(path.join(__dirname, 'dist')))
router.get('/*', (req, res) => res.sendFile(path.join(__dirname, 'dist/index.html')))

module.exports = router
