function email(data){
    let nodemailer = require('nodemailer')

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sandaksa98@gmail.com',
            pass: process.env.NODEMAILER_PASS
        }
    });


    let mailOptions = {
        from: 'sandaksa98@gmail.com',
        to: data,
        subject: 'welcome to todo app',
        text: `thank you for registering`
    };

    return transporter.sendMail(mailOptions, function(error,info) {
        if(error){
            console.log(error);
        } else {
            console.log('email sent!' + info.response);
        }
    });
}

module.exports = email;