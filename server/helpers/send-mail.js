const nodemailer = require('nodemailer');
function transporter(nodemailer_mail, nodemailer_pass){
    return transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: nodemailer_mail,
            pass: nodemailer_pass
        }
    });
}

function registerSuccess(nodemailer_mail, nodemailer_pass, recipient) {
    transporter(nodemailer_mail, nodemailer_pass).sendMail({
        from: nodemailer_mail,
        to: recipient,
        subject: 'Register Success! - Fancy Todo',
        text: `Thank you ${recipient} your account has successful registered!`
    });

    console.log(`Message sent to ${recipient}`);
}

function submitTodo(nodemailer_mail, nodemailer_pass, recipient, payload) {
    transporter(nodemailer_mail, nodemailer_pass).sendMail({
        from: nodemailer_mail,
        to: recipient,
        subject: `[New Todo] - ${payload.title}`,
        html: `<h3 style="text-align: center;">Fancy Todo</h3><div style="background-color: #fff6a8; width: 20rem; margin: auto;">
        <h2 style="border-bottom: 5px solid #bb888879; font-size:25px;">${payload.title}</h1>
        <p style="color: darkolivegreen; font-size: 15px;">${payload.status}</p>
        <p style="font-size:18px;">${payload.description}</p>
        <p style="color: rgb(107, 47, 62); font-size: 15px;">Due Date: ${payload.due_date}</p>
    </div>`
    });

    console.log(`Message sent to ${recipient}`);
}


module.exports = {registerSuccess, submitTodo}