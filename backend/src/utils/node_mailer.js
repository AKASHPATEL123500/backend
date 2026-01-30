import nodemailer from "nodemailer"

const sendEmail = async (options)=>{
    // 1. Transporter create karo (Mailtrap ki details use karke)
    const tranporter = nodemailer.createTransport(
        {
            host : process.env.MAIL_HOST,
            port : process.env.MAIL_PORT,
            auth : {
                user : process.env.MAIL_USERNAME,
                pass : process.env.MAIL_PASSWORD
            }
        }
    )

    // 2. Email ka content define karo
    const mailOptions = {
        from : "Akash Reddy <allahabadkin@gmail.com>",  // sender ka naam and email
        to : options.email,                             // reciver ka email
        subject : options.subject,                      // subject 
        html : options.html                          // plain text message
    }

    // mail ko bhej do
    await tranporter.sendMail(mailOptions)
}

export default sendEmail