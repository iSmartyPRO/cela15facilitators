const Log = require('../models/log')
const ApplicationForms = require('../models/applicationForm')
const User = require('../models/user')

module.exports.dashboard = async (req, res) => {
    if(req.session.isAuthenticated === true){
        let data = {}
        data.frontSiteStats = await Log.find({"entryPoint":"frontSite"}).countDocuments().lean()
        data.applicationsStats = await ApplicationForms.find().countDocuments().lean()
        data.userStats = await User.find().countDocuments().lean()
        res.render('cp/dashboard', {data})
    } else {
        res.redirect('/auth/login')
    }
}
module.exports.applications = async (req, res) => {
    if(req.session.isAuthenticated === true){
        let applications = await ApplicationForms.find().lean()
        res.render('cp/applications', {applications})
    } else {
        res.redirect('/auth/login')
    }
}
module.exports.applicationView = async(req, res) => {
    if(req.session.isAuthenticated === true){
        console.log(req.params)
        let application = await ApplicationForms.findById(req.params.id).lean()
        console.log(application)
        res.render('cp/applicationView', {application})
    } else {
        res.redirect('/auth/login')
    }
}

module.exports.logs = async (req, res) => {
    if(req.session.isAuthenticated === true){
        try {
            const logData = await Log.find().sort({"createdAt":-1}).lean()
            console.log('typeof ',typeof logData)
            res.render('cp/logs',{logData:logData})
        } catch(e) {
            console.log(e)
        }

    } else {
        res.redirect('/auth/login')
    }
}
module.exports.users = async(req, res) => {
    if(req.session.isAuthenticated === true){
        try {
            const users = await User.find().lean()
            res.render('cp/users',{users})
        } catch(e) {
            console.log(e)
        }

    } else {
        res.redirect('/auth/login')
    }
}