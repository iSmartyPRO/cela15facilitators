const Log = require('../models/log')

module.exports.dashboard = (req, res) => {
    if(req.session.isAuthenticated === true){
        res.render('cp/dashboard')
    } else {
        res.redirect('/auth/login')
    }
}
module.exports.applications = (req, res) => {
    if(req.session.isAuthenticated === true){
        res.render('cp/applications')
    } else {
        res.redirect('/auth/login')
    }
}

module.exports.logs = async (req, res) => {
    if(req.session.isAuthenticated === true){
        try {
            const logData = await Log.find().lean()
            console.log('typeof ',typeof logData)
            res.render('cp/logs',{logData:logData})
        } catch(e) {
            console.log(e)
        }

    } else {
        res.redirect('/auth/login')
    }
}