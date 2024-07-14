const mailSender = require("nodemailer")



const mailSend =async (mail, sub, text)=>{
    const transport =mailSender.createTransport({
        service: "gmail",
        auth: {
            user: "rdxsathish96@gmail.com",
            pass: "bcwinujcthfhdaal"
        },
    })
    const mailOptions = {
        from: "rdxsathish96@gmail.com",
        to: mail,
        subject: sub,
        text: text
    }
    transport.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      })
}

module.exports = mailSend