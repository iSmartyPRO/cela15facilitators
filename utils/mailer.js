const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const config = require('../config')

module.exports.send = (mailTo, mailSubject, mailTemplate, context) => {
  let transport = nodemailer.createTransport({
    host: config.mailHost,
    port: 465,
    secure: true,
    auth: {
      user: config.mailUser,
      pass: config.mailPass
    }
  })
  transport.use('compile', hbs({
    viewEngine: {
      partialsDir: __dirname + '/mailer/partials',
      layoutsDir: __dirname + '/mailer/layouts',
      extname: '.hbs'
    },
    viewPath: __dirname + '/mailer/views',
    extName: '.hbs'
  }))
  let message = {
    from: config.mailFrom,
    to: mailTo,
    subject: ' ✔ ' + mailSubject,
    template: mailTemplate,
    context
  }

  transport.sendMail(message, function(err, info){
    if(err){
      console.log(err)
    } else {
      console.log(info)
    }
  })
}