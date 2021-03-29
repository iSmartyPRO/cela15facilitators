const fs = require('fs')
const path = require('path')
const moment = require('moment')
const logger = require('../utils/logger')

module.exports.home = (req, res) => {
    let countries = JSON.parse(fs.readFileSync('./data/countries.json', 'utf8'))
    let networks = JSON.parse(fs.readFileSync('./data/networks.json', 'utf8'))
    let todayDate = new Date()
    let todayDateFormat = moment(todayDate).format('DD.MM.yyyy')
    logger.add(req, 'frontSite')
    res.render('appForm', { layout: 'frontSite', countries, networks, todayDateFormat })
}